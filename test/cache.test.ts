import { Cacheable, getCacheStats, InvalidatesCache } from "../server/core/cache.service";
import { UserSettingModel } from "../server/users/user-setting.model";
import { UserSettingsModel } from "../server/users/user-settings.model";
import { usersCache } from "../server/users/users.cache";
import { UserFactory } from "../server/users/users.factory";
import { UserModel } from "../server/users/users.model";

const userId = 1
const userSettingsId = 1
const sportId = 1

const userModel = new UserModel(userId,
    'mail@mail.com',
    false,
    [], 
    new UserSettingsModel(
        userId,
        userSettingsId,
        new UserSettingModel(
            "Receive notifications about top-rated sport events",
            false,
            "receiveTopRatedNotifications"
        )
    )
)

class MockUserService {

    @Cacheable(usersCache)
    public async getById(userId: number) {
        return new Promise<UserModel>(
            resolve => resolve(userModel)
        )
    }

    @InvalidatesCache(usersCache)
    public async invalidateBasedOnReturnedId() {
        return new Promise<number>(
            resolve => resolve(1)
        )
    }

    @InvalidatesCache(usersCache)
    public async invalidateBasedOnReturnedObject() {
        return new Promise<UserModel>(
            resolve => resolve(userModel)
        )
    }
}


test('test user cache works and invalidates with full object returned', async () => {
    const userService = new MockUserService()
    usersCache.clear()

    // verify initial state
    expect(usersCache.get(userId)).toBeUndefined()
    expect(getCacheStats().cacheMisses).toBe(1)
    expect(getCacheStats().cacheHits).toBe(0)

    // make a call which should cache the result
    await userService.getById(userId)

    // verify
    expect(getCacheStats().cacheMisses).toBe(2)
    expect(getCacheStats().cacheHits).toBe(0)
    expect(usersCache.get(userId)).toBeDefined()

    // verify next calls will be cache hits
    await userService.getById(userId)
    await userService.getById(userId)

    expect(getCacheStats().cacheMisses).toBe(2)
    expect(getCacheStats().cacheHits).toBe(3)
    expect(usersCache.get(userId)).toBeDefined()

    // test if data invalidates successfully
    await userService.invalidateBasedOnReturnedObject()

    expect(usersCache.get(userId)).toBeNull()

    // make sure next call will be a cache miss
    await userService.getById(userId)

    expect(getCacheStats().cacheMisses).toBe(4)
    expect(getCacheStats().cacheHits).toBe(5)
});

test('test invalidation with just id returned works', async () => {
    const userService = new MockUserService()

    usersCache.clear()

    expect(usersCache.get(userId)).toBeUndefined()

    await userService.getById(userId)

    expect(usersCache.get(userId)).toBeDefined()

    await userService.invalidateBasedOnReturnedId()

    expect(usersCache.get(userId)).toBeNull()
});
