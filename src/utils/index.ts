export const getToken = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState == null) {
      return undefined;
    }
    return serializedState;
  } catch (err) {
    return undefined;
  }
};

export const saveToken = (state: string, key: string) => {
  try {
    localStorage.setItem(key, state);
  } catch (err) {}
};

export const deleteToken = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {}
};
