import { createContext } from 'react';
import type User from '@typings/User';

const Auth = createContext<User>(null);

export const Context = Auth;

export const { Provider } = Auth;
