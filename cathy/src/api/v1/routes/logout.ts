import { Router } from 'express';
import { Redirects } from '../../../utils/Constants';
import Logger from '../../../utils/Logger';

const logout = Router();

logout.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect(Redirects.unAuthenticated(false));
    }

    Logger.info(`[${req.user.user_id}] logout`);

    req.session.destroy(() => {
        req.logout();

        res.redirect(Redirects.unAuthenticated(true));
    });
});

export default logout;
