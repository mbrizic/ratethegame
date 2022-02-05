import { createNewCache } from "../core/cache/cache.service";
import { UserModel } from "./users.model";

export const usersCache = createNewCache<UserModel>()
