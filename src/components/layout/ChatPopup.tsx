import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { Fragment, useEffect, useReducer } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

import { useGlobalContext } from '../../context';
import { MessageList, User } from '../../interface';
import { chatInitialState, chatReducer } from '../../reducers';
import { ChatBox, ChatBoxPaper, ChatOpenBox, ChatOpenTextBox, ChatPaper, UserOpenBox } from '../../styledComponent';
import MessageBox from './MessageBox';
import UsersShown from './UsersShown';

const ChatPopup = () => {
  const { userId, userName } = useGlobalContext();
  const [state, dispatch] = useReducer(chatReducer, chatInitialState);
  const {
    onlineUsers,
    notifications,
    chatOpen,
    usersOpen,
    user,
    socket,
    chatMessage,
    newRoomCreate,
    messageList
  } = state;


  useEffect(() => {
    if (localStorage) {
      const data = localStorage.getItem('message');
      if (data) {
        const message = JSON.parse(data);
        dispatch({
          type: 'SET_MESSAGE_LIST',
          value: message
        });
      }
    }
  }, []);
  useEffect(() => {
    if (userId) {
      const socketCon = io(`${process.env.REACT_APP_BACKEND_URL_SOCKET}/chat-app`, {
        query: {
          userId: userId,
          name: userName
        }
      });
      dispatch({
        type: 'SET_SOCKET',
        value: socketCon
      });
    }
  }, [userId, userName]);

  useEffect(() => {
    socket?.on('join_room_check', (sendUser, newRoom) => {
      if (!!onlineUsers.length) {
        let currentUser = onlineUsers?.find((user) => user.id === userId);

        socket?.emit('join_room', { room: newRoom, user: currentUser });
      }
    });

    socket?.on('online_users', (data) => {
      dispatch({
        type: 'SET_ONLINE_USERS',
        value: data
      });
      const userUpdate = data.find((online: { id: string | undefined }) => {
        return online.id === user?.id;
      });
      if (userUpdate)
        dispatch({
          type: 'SET_USER',
          value: userUpdate
        });
      return;
    });

    socket?.on('receive_message', (data) => {
      localStorage.setItem('message', JSON.stringify([...messageList, data]));
      dispatch({
        type: 'SET_MESSAGE_LIST',
        value: [...messageList, data]
      });
      let updateUser = onlineUsers?.find((user) => user.id === data.author);
      if (notifications?.some((e) => e?.user?.id === data.author)) {
        const notification = notifications.map((notification) => {
          if (notification.user?.id === data.author)
            return (notification = {
              ...notification,
              count: notification.count + 1
            });
          else return notification;
        });
        dispatch({
          type: 'SET_NOTIFICATION',
          value: notification
        });
      } else if (notifications?.some((e) => e?.user?.id !== data.author) || user?.id !== data.author) {
        const notification = {
          status: true,
          user: updateUser!,
          count: 1
        };
        dispatch({
          type: 'SET_NOTIFICATION',
          value: [...notifications, notification]
        });
      }
    });

    return () => {
      socket?.off('receive_message');
      socket?.off('join_room_check');
      socket?.off('online_users');
    };
  }, [chatOpen, messageList, notifications, onlineUsers, socket, user, userId, usersOpen]);

  const joinRoom = (room: string, user: User) => {
    socket?.emit('join_room', { room: room, user: user });
  };

  const sendMessage = async (room: string) => {
    if (chatMessage !== '') {
      const messageData: MessageList = {
        room: room,
        author: userId,
        message: chatMessage,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      };
      localStorage.setItem('message', JSON.stringify([...messageList, messageData]));

      socket?.emit('send_message', { messageData, clientId: user?.clientId });
      dispatch({
        type: 'SET_MESSAGE_LIST',
        value: [...messageList, messageData]
      });
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        value: ''
      });
    }
  };

  const handleUserCall = (id: string) => {
    let currentUser = onlineUsers?.find((user) => user.id === userId);
    let user = onlineUsers?.find((user) => user.id === id.toString());
    let getRoom = '';
    currentUser?.room?.find((room) => {
      user?.room?.find((userRoom) => {
        if (room === userRoom) {
          getRoom = room;
          return room;
        }
      });
    });
    if (!getRoom) {
      const newRoom = uuidv4();
      dispatch({
        type: 'SET_NEW_ROOM_CREATE',
        value: newRoom!
      });
      currentUser = {
        ...currentUser!,
        room: currentUser?.room?.length! > 0 ? [...currentUser?.room!, newRoom!] : [newRoom]
      };

      user = {
        ...user!,
        room: user?.room?.length! > 0 ? [...user?.room!, newRoom!] : [newRoom!]
      };

      joinRoom(newRoom, currentUser);

      socket?.emit('join_room_request', {
        clientId: user?.clientId,
        sendUser: currentUser,
        newRoom: newRoom
      });
    } else {
      dispatch({
        type: 'SET_NEW_ROOM_CREATE',
        value: getRoom!
      });
    }
    if (!!notifications.length) {
      const notification = notifications.filter((notification) => notification.user?.id !== id);
      dispatch({
        type: 'SET_NOTIFICATION',
        value: notification
      });
    }

    dispatch({
      type: 'SET_USER',
      value: user!
    });
    dispatch({
      type: 'SET_CHAT_OPEN',
      value: true
    });
    dispatch({
      type: 'SET_USERS_OPEN',
      value: false
    });
  };
  const handleChatBoxClick = () => {
    if (!chatOpen && !usersOpen) {
      dispatch({
        type: 'SET_USERS_OPEN',
        value: true
      });
    } else if (usersOpen && !chatOpen) {
      dispatch({
        type: 'SET_USERS_OPEN',
        value: false
      });
    } else if (!usersOpen && chatOpen) {
      dispatch({
        type: 'SET_CHAT_OPEN',
        value: false
      });
      dispatch({
        type: 'SET_USER',
        value: null
      });
    }
  };

  return (
    <ChatBox>
      <ChatBoxPaper onClick={() => handleChatBoxClick()}>
        <Box sx={{ display: 'flex', width: '30rem' }}>
          {!usersOpen && !chatOpen ? (
            <KeyboardArrowUpIcon sx={{ color: 'whitesmoke' }} />
          ) : (
            !chatOpen && <KeyboardArrowDownIcon sx={{ color: 'whitesmoke' }} />
          )}
          {chatOpen && (
            <ArrowBackIcon
              sx={{ color: 'whitesmoke' }}
              onClick={() => {
                dispatch({
                  type: 'SET_CHAT_OPEN',
                  value: false
                });
                dispatch({
                  type: 'SET_USERS_OPEN',
                  value: true
                });
              }}
            />
          )}
          {chatOpen && (
            <Typography color="white" variant="body1">
              {user?.name}
            </Typography>
          )}
        </Box>
        <Box sx={{ width: '100%', textAlign: 'right' }}>
          {!!notifications.length && !chatOpen && !usersOpen && (
            <CircleIcon
              sx={{ color: 'red', position: 'absolute', fontSize: '20px', left: '-5px', top: '-10px' }}
            />
          )}
          <Typography color="white" sx={{ marginRight: '1rem' }} variant="h6">
            Chat
          </Typography>
        </Box>
      </ChatBoxPaper>
      {chatOpen && (
        <ChatPaper>
          <ChatOpenBox>
            {messageList.map((message, index) => {
              return (
                <Fragment key={index}>
                  {user?.room?.includes(message.room) && (
                    <MessageBox
                      user={user}
                      text={message.message}
                      side={message.author === userId ? 'right' : 'left'}
                      time={message.time}
                    />
                  )}
                </Fragment>
              );
            })}
          </ChatOpenBox>
          <ChatOpenTextBox>
            <TextField
              type="text"
              value={chatMessage}
              onChange={(e) => {
                dispatch({
                  type: 'SET_CHAT_MESSAGE',
                  value: e.target.value
                });
              }}
              size="small"
              placeholder="Enter Message"
              fullWidth
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage(newRoomCreate);
                }
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                sendMessage(newRoomCreate);
              }}>
              Send
            </Button>
          </ChatOpenTextBox>
        </ChatPaper>
      )}
      {usersOpen && (
        <ChatPaper>
          <UserOpenBox>
            {onlineUsers.length >= 2 ? (
              onlineUsers.map((user, index) => {
                if (user.id !== userId && !!user.status) {
                  let notification = undefined;
                  if (!!notifications.length) {
                    notification = notifications.find((notification) => notification?.user?.id === user.id);
                  }
                  return (
                    <Fragment key={index}>
                      <UsersShown
                        name={user.name}
                        id={user.id}
                        handleUserCall={(id) => handleUserCall(id)}
                        notification={notification}
                      />
                    </Fragment>
                  );
                }
              })
            ) : (
              <Typography textAlign="center" variant="h5">
                No one online
              </Typography>
            )}
          </UserOpenBox>
        </ChatPaper>
      )}
    </ChatBox>
  );
};

export default ChatPopup;
