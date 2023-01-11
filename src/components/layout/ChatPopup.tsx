import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Button, Paper, styled, TextField, Typography } from '@mui/material';
import React, { Fragment, useEffect, useReducer, useRef, useState } from 'react';
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

const initialState = {
  onlineUsers: [],
  chatOpen: false,
  usersOpen: false,
  socket: null,
  user: null,
  chatMessage: "",
  newRoomCreate: "",
  messageList: []
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
  }
};
const ChatPopup = () => {
  const { userId, userName } = useGlobalContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { onlineUsers, chatOpen, usersOpen, user, socket, chatMessage, newRoomCreate, messageList } = state;

  // // const [onlineUsers, setOnlineUsers] = useState<Users[]>([]);
  // const [chatOpen, setChatOpen] = useState(false);
  // const [usersOpen, setUsersOpen] = useState(false);
  // const [socket, setSocket] = useState<Socket>();
  // const [user, setUser] = useState<Users>();
  // const [chatMessage, setChatMessage] = useState<string>("");
  // const [newRoomCreate, setNewRoomCreate] = useState<string>("");
  // const [messageList, setMessageList] = useState<MessageList[]>([]);

  useEffect(() => {
    if (userId) {
      const socketCon = io(`http://localhost:8002/chat-app`, {
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
      // setMessageList((list) => [...list, messageData]);
      // setChatMessage("");
    }
  };

  useEffect(() => {
    socket?.on("online_users", (data) => {
      dispatch({
        type: "SET_ONLINE_USERS",
        value: data
      });
      // setOnlineUsers(data);
      return;
    });

    socket?.on("receive_message", (data) => {
      // setMessageList([...messageList, data]);
      dispatch({
        type: "SET_MESSAGE_LIST",
        value: [...messageList, data]
      });
      return;
    });
  }, [messageList, socket, userId]);

  useEffect(() => {
    socket?.on("join_room_check", (sendUser, newRoom) => {
      if (!!onlineUsers.length) {
        let currentUser = onlineUsers?.find((user) => user.id === userId);
        // setNewRoomCreate(newRoom);
        dispatch({
          type: "SET_NEW_ROOM_CREATE",
          value: newRoom
        });

        socket?.emit("join_room", { room: newRoom, user: currentUser });
        dispatch({
          type: "SET_USER",
          value: sendUser
        });
        dispatch({
          type: "SET_CHAT_OPEN",
          value: true
        });
        dispatch({
          type: "SET_USERS_OPEN",
          value: false
        });
        // // setUser(sendUser);
        // // setChatOpen(true);
        // setUsersOpen(false);
        // setChatOpen(true);
      }
      return;
    });
  }, [onlineUsers, socket, userId]);

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
      // setUser(user);
      // setUsersOpen(false);
      // setChatOpen(true);
    } else {
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
      // setUser(user);
      // setUsersOpen(false);
      // setChatOpen(true);
    }
  };

  return (
    <Box>
      <ChatBoxPaper
        onClick={() => {
          if (user && !usersOpen && !chatOpen) {
            dispatch({
              type: "SET_CHAT_OPEN",
              value: true
            });
            // setChatOpen(true);
          } else if (!chatOpen && !usersOpen) {
            // setUsersOpen(true);

            dispatch({
              type: "SET_USERS_OPEN",
              value: true
            });
          } else if (usersOpen && !chatOpen) {
            // setUsersOpen(false);

            dispatch({
              type: "SET_USERS_OPEN",
              value: false
            });
          } else if (!usersOpen && chatOpen) {
            dispatch({
              type: "SET_CHAT_OPEN",
              value: false
            });
            // setChatOpen(false);
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
                  type: "SET_USER",
                  value: null
                });
                dispatch({
                  type: "SET_CHAT_OPEN",
                  value: false
                });
                dispatch({
                  type: "SET_USERS_OPEN",
                  value: true
                });

                // setUser(undefined);
                // setChatOpen(false);
                // setUsersOpen(true);
              }}
            />
          )}
          <Typography color="white" variant="body1">
            {user?.name}
          </Typography>
        </Box>
        <Box sx={{ width: "100%", textAlign: "right" }}>
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
              if (user?.room?.includes(message.room)) {
                return (
                  <Fragment key={index}>
                    <MessageBox
                      text={message.message}
                      side={message.author === userId ? "right" : "left"}
                      time={message.time}
                    />
                  </Fragment>
                );
              }
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
                // setChatMessage(e.target.value);
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
                if (user.id !== userId)
                  return (
                    <Fragment key={index}>
                      <UsersShown name={user.name} id={user.id} handleUserCall={(id) => handleUserCall(id)} />
                    </Fragment>
                  );
              })
            ) : (
              <Typography textAlign="center" variant="h5">
                No one online
              </Typography>
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ChatPopup;
