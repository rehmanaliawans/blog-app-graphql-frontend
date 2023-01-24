import React, { useMemo, createContext, useReducer, Reducer, ReactElement } from 'react';
import { InitialState } from './interface';
import appReducer, { Action, initialState } from './appReduced';

export const GlobalContext = createContext<InitialState>({
  ...initialState
});

interface Props {
  children: ReactElement;
}

const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<InitialState, Action>>(appReducer, initialState);

  const store = useMemo(
    () => ({
      user: state.user,
      dispatch
    }),
    [state]
  );

  return <GlobalContext.Provider value={{ ...store }}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
