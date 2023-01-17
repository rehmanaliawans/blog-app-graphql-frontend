import {
  ChatAppAction,
  ChatAppState,
  CommentBoxAction,
  CommentBoxSate,
  SingleCommentAction,
  SingleCommentSate
} from "../interface";

export const chatInitialState = {
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
export const chatReducer = (state: ChatAppState, action: ChatAppAction) => {
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

export const commentInitialState = {
  comment: "",
  comments: [],
  replyDelete: false,
  editDialogOpen: {
    isEdit: false,
    id: ""
  },
  replyInputId: {
    isReply: false,
    id: ""
  }
};
export const commentReducer = (state: CommentBoxSate, action: CommentBoxAction) => {
  switch (action.type) {
    case "SET_COMMENTS":
      return {
        ...state,
        comments: action.value
      };
    case "SET_COMMENT":
      return {
        ...state,
        comment: action.value
      };
    case "REPLY_DELETE":
      return {
        ...state,
        replyDelete: action.value
      };
    case "EDIT_DIALOG_OPEN":
      return {
        ...state,
        editDialogOpen: action.value
      };
    case "REPLY_INPUT_ID":
      return {
        ...state,
        replyInputId: action.value
      };
  }
};

export const singleCommentInitialState = {
  deleteDialogOpen: false,
  reply: {
    id: "",
    message: ""
  },
  showReplies: {
    status: false,
    id: ""
  },
  editReply: {
    message: "",
    id: ""
  }
};
export const singleCommentReducer = (state: SingleCommentSate, action: SingleCommentAction) => {
  switch (action.type) {
    case "SET_DELETE_DIALOG_OPEN":
      return {
        ...state,
        deleteDialogOpen: action.value
      };
    case "SET_SHOW_REPLIES":
      return {
        ...state,
        showReplies: action.value
      };
    case "SET_EDIT_REPLY":
      return {
        ...state,
        editReply: action.value
      };
    case "SET_REPLY":
      return {
        ...state,
        reply: action.value
      };
  }
};
