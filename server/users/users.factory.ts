import { Sports } from "../../database/models/sports"
import { Users } from "../../database/models/users"
import { UserSettingsAttributes } from "../../database/models/user_settings"
import ValidationException from "../core/exceptions/validation.exception"
import { SportModel } from "../sports/sports.model"
import { UserSettingModel } from "./user-setting-model"
import { UserSettingsModel } from "./user-settings.model"
import { UserSportSubscriptionsModel } from "./user-sport-subscriptions.model"
import { UserModel } from "./users.model"

export type ValidSettingColumNames = Pick<UserSettingsAttributes, "receive_top_rated_notifications">
export type ValidSettingColumName = keyof ValidSettingColumNames

export class UserFactory {

	public static Create(email: string, password: string, isAdmin: boolean = false) {

        const defaultUserSettings = new UserSettingsModel(undefined, undefined, new UserSettingModel(undefined, false, undefined))

		return new UserModel(
			undefined,
			email,
			password,
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

        function getSportName(sport_id: number, sports: SportModel[]) {
            const sport = sports.find(sport => sport.id == sport_id )
            if (!sport) {
                throw new ValidationException("No sport with that ID")
            }

            return sport.name
        }

        const settings = new UserSettingsModel(
            user.user_setting.id,
            user.user_setting.user_id,
            new UserSettingModel("Receive notifications about top-rated sport events", user.user_setting.receive_top_rated_notifications, "receive_top_rated_notifications")
        )

        const subscriptions = user.user_sport_subscriptions.map(
            user_subscription =>
            new UserSportSubscriptionsModel(
                user_subscription.id,
                user_subscription.sport_id,
                getSportName(user_subscription.sport_id, sports),
                user_subscription.user_id
            )
        )

		return new UserModel(
			user.id,
			user.email,
			user.password,
			user.is_admin,
            subscriptions,
            settings
		)
	}

}