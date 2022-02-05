import { Users } from "../../database/models/users"
import { UserSettingsAttributes } from "../../database/models/user_settings"
import ValidationException from "../core/exceptions/validation.exception"
import { SportModel } from "../sports/sports.model"
import { UserSettingModel } from "./user-setting.model"
import { UserSettingsModel } from "./user-settings.model"
import { UserSportSubscriptionsModel } from "./user-sport-subscriptions.model"
import { UserModel } from "./users.model"

export type ValidSettingColumNames = Pick<UserSettingsAttributes, "receiveTopRatedNotifications">
export type ValidSettingColumName = keyof ValidSettingColumNames

export class UserFactory {

    public static Create(email: string, isAdmin: boolean = false) {

        const defaultUserSettings = new UserSettingsModel(
            undefined,
            undefined,
            new UserSettingModel(undefined, false, undefined)
        )

        return new UserModel(
            undefined,
            undefined,
            undefined,
            email,
            isAdmin,
            [],
            defaultUserSettings
        )
    }

    public static FromDatabase(
        user: Users,
        sports: SportModel[],
    ) {
        if (user == null) {
            throw new ValidationException("No user with that ID")
        }

        const settings = new UserSettingsModel(
            user.userSetting.id,
            user.userSetting.userId,
            new UserSettingModel(
                "Receive notifications about top-rated events of subscribed sports",
                user.userSetting.receiveTopRatedNotifications,
                "receiveTopRatedNotifications"
            )
        )

        const subscriptions = user.userSportSubscriptions.map(
            userSubscription =>
                new UserSportSubscriptionsModel(
                    userSubscription.id,
                    userSubscription.sportId,
                    getSportName(userSubscription.sportId, sports),
                    userSubscription.userId
                )
        )

        return new UserModel(
            user.id,
            user.uuid,
            user.salt,
            user.email,
            user.isAdmin,
            subscriptions,
            settings
        )
    }

}

function getSportName(sportId: number, sports: SportModel[]) {
    const sport = sports.find(sport => sport.id == sportId)
    if (!sport) {
        throw new ValidationException("No sport with that ID")
    }

    return sport.name
}