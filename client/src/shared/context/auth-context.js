import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  userEmail: null,
  token: null,
  login: () => {},
  logout: () => {}
});
