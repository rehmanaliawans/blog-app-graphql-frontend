import { Dispatch } from 'react';
import { Action } from './appReduced';

export interface UserType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
export interface InitialState {
  user: UserType | null;
  dispatch: Dispatch<Action>;
}
