import oauth from 'discord-oauth2';
import { Config } from '../utils/Constants';

const OAuth = new oauth({
    clientId: Config.clientID,
    clientSecret: Config.clientSecret,
    redirectUri: Config.redirectURI,
    version: 'v8',
});

export default OAuth;
