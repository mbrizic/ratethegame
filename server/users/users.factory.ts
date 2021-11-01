import { Sports } from "../../database/models/sports"
import { Users } from "../../database/models/users"
import ValidationException from "../core/exceptions/validation.exception"
import { SportModel } from "../sports/sports.model"
import { UserSettingsModel } from "./user-settings.model"
import { SportSubscriptionsModel } from "./user-sport-subscriptions.model"
import { UserModel } from "./users.model"

export class UserFactory {

	public static Create(email: string, password: string, isAdmin: boolean = false) {

        const defaultUserSettings = new UserSettingsModel(undefined, undefined)

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
        sports: SportModel[] | undefined = undefined,
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
            user.user_setting.receive_top_rated,
        )

        const subscriptions = user.sport_subscriptions.map(
            user_subscription =>
            new SportSubscriptionsModel(
                user_subscription.id,
                user_subscription.sport_id,
                sports ? getSportName(user_subscription.sport_id, sports) : undefined,
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