import { DomainModel } from "../core/domain.model"
import ValidationException from "../core/exceptions/validation.exception"
import { UserSportSubscriptionsModel } from "../users/user-sport-subscriptions.model"
import { UserSettingsModel } from "../users/user-settings.model"

export class UserModel implements DomainModel {
	public readonly id?: number
	public readonly email: string
	public readonly isAdmin: boolean
	public readonly subscriptions: UserSportSubscriptionsModel[]
	public readonly settings: UserSettingsModel
	
	constructor(
		id: number | undefined,
		email: string,
		isAdmin: boolean,
		subscriptions: UserSportSubscriptionsModel[],
		settings: UserSettingsModel
	) {
		this.id = id
		this.email = email
		this.isAdmin = isAdmin
		this.subscriptions = subscriptions
		this.settings = settings

		this.ensureValid()
	}

	public ensureValid = () => {
		if (this.settings == null) {
			throw new ValidationException(`Must have a settings field.`)
		}
	}

}