import { InitialState, UserType } from './interface';

export const initialState: InitialState = {
  user: null,

  dispatch: () => {
    return;
  }
};

export enum ActionTypes {
  SET_USER = 'setUser'
}

export type Action = { type: ActionTypes.SET_USER; user: UserType | null };

export default function appReducer(state: InitialState, action: Action) {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
}
