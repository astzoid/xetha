import { createContext } from 'react';
import type { User } from '../Typings';

interface IContext {
  user: User;
  loaded: boolean;
}
export const userContext = createContext<IContext>({
  user: null,
  loaded: false,
});
