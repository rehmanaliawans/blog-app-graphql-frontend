import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Button, Paper, styled, TextField, Typography } from '@mui/material';
import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

import { useGlobalContext } from '../../context';
import { ChatAppAction, ChatAppState, MessageList, User } from '../../interface';
import MessageBox from './MessageBox';
import UsersShown from './UsersShown';

const ChatBoxPaper = styled(Paper)(({ theme }) => ({
  width: "22rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1),
  cursor: "pointer",
  backgroundColor: theme.palette.primary.main,
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px"
}));
const ChatBox = styled(Box)(() => ({
  position: "fixed",
  bottom: "0",
  right: "10px",
  margin: "0",
  padding: "0"
}));

const initialState = {
  onlineUsers: [],
  chatOpen: false,
  usersOpen: false,
  socket: null,
  user: null,
  chatMessage: "",
  newRoomCreate: "",
  messageList: [],
  notifications: []
};
const reducer = (state: ChatAppState, action: ChatAppAction) => {
  switch (action.type) {
    case "SET_ONLINE_USERS":
      return {
        ...state,
        onlineUsers: action.value
      };
    case "SET_CHAT_OPEN":
      return {
        ...state,
        chatOpen: action.value
      };
    case "SET_USERS_OPEN":
      return {
        ...state,
        usersOpen: action.value
      };
    case "SET_USER":
      return {
        ...state,
        user: action.value
      };
    case "SET_SOCKET":
      return {
        ...state,
        socket: action.value
      };
    case "SET_CHAT_MESSAGE":
      return {
        ...state,
        chatMessage: action.value
      };
    case "SET_NEW_ROOM_CREATE":
      return {
        ...state,
        newRoomCreate: action.value
      };
    case "SET_MESSAGE_LIST":
      return {
        ...state,
        messageList: action.value
      };
    case "SET_NOTIFICATION":
      return {
        ...state,
        notifications: action.value
      };
  }
};
const ChatPopup = () => {
  const { userId, userName } = useGlobalContext();
  const [state, dispatch] = useReducer(reducer, initialState);
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
    if (userId) {
      const socketCon = io(`${process.env.REACT_APP_BACKEND_URL_SOCKET}/chat-app`, {
        query: {
          userId: userId,
          name: userName
        }
      });
      dispatch({
        type: "SET_SOCKET",
        value: socketCon
      });
    }
  }, [userId, userName]);

  const joinRoom = (room: string, user: User) => {
    dispatch({
      type: "SET_NEW_ROOM_CREATE",
      value: room
    });
    socket?.emit("join_room", { room: room, user: user });
  };

  const sendMessage = async (room: string) => {
    if (chatMessage !== "") {
      const messageData: MessageList = {
        room: room,
        author: userId,
        message: chatMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      };
      socket?.emit("send_message", messageData);
      dispatch({
        type: "SET_MESSAGE_LIST",
        value: [...messageList, messageData]
      });
      dispatch({
        type: "SET_CHAT_MESSAGE",
        value: ""
      });
    }
  };

  useEffect(() => {
    socket?.on("join_room_check", (sendUser, newRoom) => {
      if (!!onlineUsers.length) {
        let currentUser = onlineUsers?.find((user) => user.id === userId);

        socket?.emit("join_room", { room: newRoom, user: currentUser });
        dispatch({
          type: "SET_NEW_ROOM_CREATE",
          value: newRoom
        });
      }
    });

    socket?.on("online_users", (data) => {
      dispatch({
        type: "SET_ONLINE_USERS",
        value: data
      });
      return;
    });

    socket?.on("receive_message", (data) => {
      dispatch({
        type: "SET_MESSAGE_LIST",
        value: [...messageList, data]
      });
      let updateUser = onlineUsers?.find((user) => user.id === data.author);

      if (notifications?.some((e) => e?.user?.id === data.author) && !chatOpen) {
        const notification = notifications.map((notification) => {
          if (notification.user?.id === data.author)
            return (notification = {
              ...notification,
              count: notification.count + 1
            });
          else return notification;
        });
        dispatch({
          type: "SET_NOTIFICATION",
          value: notification
        });
      } else if (notifications?.some((e) => e?.user?.id !== data.author) || !chatOpen) {
        const notification = {
          status: true,
          user: updateUser!,
          count: 1
        };
        dispatch({
          type: "SET_NOTIFICATION",
          value: [...notifications, notification]
        });
      }
    });

    return () => {
      socket?.off("receive_message");
      socket?.off("join_room_check");
      socket?.off("online_users");
    };
  }, [chatOpen, messageList, notifications, onlineUsers, socket, user, userId, usersOpen]);

  const handleUserCall = (id: string) => {
    let currentUser = onlineUsers?.find((user) => user.id === userId);
    let user = onlineUsers?.find((user) => user.id === id.toString());

    if (!user?.room?.includes(newRoomCreate!) || !currentUser?.room?.includes(newRoomCreate!)) {
      const newRoom = uuidv4();
      currentUser = {
        ...currentUser!,
        room: currentUser?.room?.length! > 0 ? [...currentUser?.room!, newRoom!] : [newRoom]
      };

      user = {
        ...user!,
        room: user?.room?.length! > 0 ? [...user?.room!, newRoom!] : [newRoom!]
      };

      joinRoom(newRoom, currentUser);

      socket?.emit("join_room_request", {
        clientId: user?.clientId,
        sendUser: currentUser,
        newRoom: newRoom
      });
    }
    if (!!notifications.length) {
      const notification = notifications.filter((notification) => notification.user?.id !== id);
      dispatch({
        type: "SET_NOTIFICATION",
        value: notification
      });
    }
    dispatch({
      type: "SET_USER",
      value: user
    });
    dispatch({
      type: "SET_CHAT_OPEN",
      value: true
    });
    dispatch({
      type: "SET_USERS_OPEN",
      value: false
    });
  };

  return (
    <ChatBox>
      <ChatBoxPaper
        onClick={() => {
          if (!chatOpen && !usersOpen) {
            dispatch({
              type: "SET_USERS_OPEN",
              value: true
            });
          } else if (usersOpen && !chatOpen) {
            dispatch({
              type: "SET_USERS_OPEN",
              value: false
            });
          } else if (!usersOpen && chatOpen) {
            dispatch({
              type: "SET_CHAT_OPEN",
              value: false
            });
          }
        }}
      >
        <Box sx={{ display: "flex", width: "30rem" }}>
          {!usersOpen && !chatOpen ? (
            <KeyboardArrowUpIcon sx={{ color: "whitesmoke" }} />
          ) : (
            !chatOpen && <KeyboardArrowDownIcon sx={{ color: "whitesmoke" }} />
          )}
          {chatOpen && (
            <ArrowBackIcon
              sx={{ color: "whitesmoke" }}
              onClick={() => {
                dispatch({
                  type: "SET_CHAT_OPEN",
                  value: false
                });
                dispatch({
                  type: "SET_USERS_OPEN",
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
        <Box sx={{ width: "100%", textAlign: "right" }}>
          {!!notifications.length && !chatOpen && !usersOpen && (
            <CircleIcon
              sx={{ color: "red", position: "absolute", fontSize: "20px", left: "-5px", top: "-10px" }}
            />
          )}
          <Typography color="white" sx={{ marginRight: "1rem" }} variant="h6">
            Chat
          </Typography>
        </Box>
      </ChatBoxPaper>
      {chatOpen && (
        <Paper
          sx={{
            height: "30rem",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            position: "relative"
          }}
        >
          <Box sx={{ height: "27rem", width: "100%", overflowY: "scroll", overflowX: "hidden" }}>
            {messageList.map((message, index) => {
              return (
                <Fragment key={index}>
                  {user?.room?.includes(message.room) && (
                    <MessageBox
                      text={message.message}
                      side={message.author === userId ? "right" : "left"}
                      time={message.time}
                    />
                  )}
                </Fragment>
              );
            })}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "absolute",
              bottom: "5px"
            }}
          >
            <TextField
              type="text"
              value={chatMessage}
              onChange={(e) => {
                dispatch({
                  type: "SET_CHAT_MESSAGE",
                  value: e.target.value
                });
              }}
              size="small"
              placeholder="Enter Message"
              fullWidth
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(newRoomCreate);
                }
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                sendMessage(newRoomCreate);
              }}
            >
              Send
            </Button>
          </Box>
        </Paper>
      )}
      {usersOpen && (
        <Paper
          sx={{
            height: "30rem",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            position: "relative"
          }}
        >
          <Box sx={{ height: "100%", width: "100%", overflowY: "scroll", overflowX: "hidden" }}>
            {onlineUsers.length >= 2 ? (
              onlineUsers.map((user, index) => {
                if (user.id !== userId) {
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
          </Box>
        </Paper>
      )}
    </ChatBox>
  );
};

export default ChatPopup;
