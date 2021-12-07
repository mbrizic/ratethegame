import { Cache } from "../core/cache.service";
import { UserModel } from "./users.model";

export const usersCache = new Cache<UserModel>()
