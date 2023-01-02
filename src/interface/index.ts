import { PostComment } from '../generated/graphql';

export interface CardData {
  id: number;
  title: string;
  description: string;
  link: string;
}

export interface CommentProps {
  comment: PostComment;
  index: number;
  handleCommentDelete: (id: string) => void;
  handleEditComment: (editReply: { id: string; message: string }) => void;
  handleReplyComment: (reply: { id: string; message: string }) => void;
  editDialogOpen: { isEdit: boolean; id: string };
  onDispatch: (action: CommentBoxAction) => void;
  replyInputId: { isReply: boolean; id: string };
}

export type CommentBoxSate = {
  comment: string;
  comments: PostComment[];
  replyDelete: boolean;
  editDialogOpen: {
    isEdit: boolean;
    id: string;
  };
  replyInputId: {
    isReply: boolean;
    id: string;
  };
};
export type CommentBoxAction =
  | {
      type: "SET_COMMENTS";
      value: PostComment[];
    }
  | {
      type: "SET_COMMENT";
      value: string;
    }
  | {
      type: "REPLY_DELETE";
      value: boolean;
    }
  | {
      type: "REPLY_INPUT_ID";
      value: {
        isReply: boolean;
        id: string;
      };
    }
  | {
      type: "EDIT_DIALOG_OPEN";
      value: {
        isEdit: boolean;
        id: string;
      };
    };

export type SingleCommentSate = {
  deleteDialogOpen: boolean;
  reply: {
    id: string;
    message: string;
  };
  showReplies: {
    status: boolean;
    id: string;
  };
  editReply: {
    message: string;
    id: string;
  };
};
export type SingleCommentAction =
  | {
      type: "SET_DELETE_DIALOG_OPEN";
      value: boolean;
    }
  | {
      type: "SET_SHOW_REPLIES";
      value: {
        status: boolean;
        id: string;
      };
    }
  | {
      type: "SET_EDIT_REPLY";
      value: {
        message: string;
        id: string;
      };
    }
  | {
      type: "SET_REPLY";
      value: {
        message: string;
        id: string;
      };
    };
