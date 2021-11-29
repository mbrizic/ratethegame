import { createCache } from "../core/cache.service";
import { UserModel } from "./users.model";

export const usersCache = createCache<UserModel>()
