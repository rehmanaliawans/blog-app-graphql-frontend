import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Button, Paper, styled, TextField, Typography } from '@mui/material';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

import { useGlobalContext } from '../../context';
import MessageBox from './MessageBox';
import UsersShown from './UsersShown';

interface MessageList {
  room: string;
  author: string;
  message: string;
  time: string;
}
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

interface Users {
  id: string;
  name: string;
  clientId: string;
  room?: string[];
}
const ChatPopup = () => {
  const { userId, userName } = useGlobalContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [onlineUsers, setOnlineUsers] = useState<Users[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const [socket, setSocket] = useState<Socket>();
  const [user, setUser] = useState<Users>();
  const [chatMessage, setChatMessage] = useState<string>("");
  const [newRoomCreate, setNewRoomCreate] = useState<string>("");
  const [messageList, setMessageList] = useState<MessageList[]>([]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  useEffect(() => {
    if (userId) {
      const socketCon = io(`http://localhost:8001/chat-app`, {
        query: {
          userId: userId,
          name: userName
        }
      });
      setSocket(socketCon);
    }
  }, [setSocket, userId, userName]);

  const joinRoom = (room: string, user: Users) => {
    setNewRoomCreate(room);
    socket?.emit("join_room", room, user);
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
      setMessageList((list) => [...list, messageData]);
      setChatMessage("");
    }
  };

  useEffect(() => {
    socket?.on("online_users", (data) => {
      setOnlineUsers(data);
      return;
    });

    socket?.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
      return;
    });
  }, [messageList, socket, userId]);

  useEffect(() => {
    socket?.on("join_room_check", (sendUser, newRoom) => {
      if (!!onlineUsers.length) {
        const newUsers = onlineUsers.map((user) => {
          if (user.id === sendUser.id || user.id === userId) {
            const data1 = {
              ...user,
              room: user?.room?.length! > 0 ? [...user?.room!, newRoom!] : [newRoom]
            };
            return data1;
          } else {
            return user;
          }
        });
        let currentUser = onlineUsers?.find((user) => user.id === userId);
        setNewRoomCreate(newRoom);

        socket?.emit("join_room", newRoom, currentUser);

        setOnlineUsers(newUsers);
        setUser(sendUser);
        setChatOpen(true);
        setUsersOpen(false);
        setChatOpen(true);
      }
      return;
    });
  }, [onlineUsers, socket, userId]);

  const handleUserCall = (id: string) => {
    let updateUser = onlineUsers;
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

      updateUser = onlineUsers?.map((user) => {
        if (user.id === id.toString() || user.id === userId) {
          const data = {
            ...user,
            room: user?.room?.length! > 0 ? [...user?.room!, newRoom!] : [newRoom!]
          };
          return data;
        }
        return user;
      });

      joinRoom(newRoom, currentUser);

      socket?.emit("join_room_request", user?.clientId, currentUser, newRoom);
      setOnlineUsers(updateUser!);
      setUser(user);
      setUsersOpen(false);
      setChatOpen(true);
    } else {
      setUser(user);
      setUsersOpen(false);
      setChatOpen(true);
    }
  };

  return (
    <Box>
      <ChatBoxPaper
        onClick={() => {
          if (user && !usersOpen && !chatOpen) {
            setChatOpen(true);
          } else if (!chatOpen && !usersOpen) {
            setUsersOpen(true);
          } else if (usersOpen && !chatOpen) {
            setUsersOpen(false);
          } else if (!usersOpen && chatOpen) {
            setChatOpen(false);
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
                setUser(undefined);
                setChatOpen(false);
                setUsersOpen(true);
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
                      messagesEndRef={messagesEndRef}
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
                setChatMessage(e.target.value);
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
