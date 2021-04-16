import { promisify } from 'util';

const wait = promisify(setTimeout);

export default wait;