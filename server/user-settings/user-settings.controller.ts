import { NextFunction, Request, Response } from 'express';
import { UserSettingsPage } from '../../ui/page/user-settings.page';
import { RequestWithUser } from '../auth/auth.interface';
import UserService from '../users/users.service';

class UserSettingsController {
    public userService = new UserService();

    public getUserById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const userId: number = Number(req.params.id);
        const userData = await this.userService.getById(userId);

        try {
            res.send(UserSettingsPage({
                email: userData.email,
                user: req.user
            }));
        } catch (error) {
            next(error);
        }
    }

    // public deleteUser
}

export default UserSettingsController;
