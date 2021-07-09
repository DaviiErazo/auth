import { Router, Request, Response } from 'express';
import container from '../dependency-injection';

export const register = (router: Router) => {
    const userPutController = container.get('App.controllers.StatusUserPutController');
    router.put('/user', (req: Request, res: Response) => userPutController.run(req, res));
}