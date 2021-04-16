import { Request, Response } from 'express';

export default function gateway(req: Request, res: Response, next: () => void) {
    
    if (!req.isAuthenticated()) return res.status(401).json({ message: 'Not Authorized' });

    next();

}