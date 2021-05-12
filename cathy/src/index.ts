import './App';
import type { UserAttributes } from '@shared/database';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface User extends UserAttributes {}
    }
}
