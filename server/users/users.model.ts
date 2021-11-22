import { DomainModel } from "../core/domain.model"
import ValidationException from "../core/exceptions/validation.exception"
import { UserSportSubscriptionsModel } from "../users/user-sport-subscriptions.model"
import { UserSettingsModel } from "../users/user-settings.model"
import { ensureLongerThan } from "../core/validation"

export class UserModel implements DomainModel {
	public readonly id?: number
	public readonly email: string
	public readonly password: string;
	public readonly isAdmin: boolean
	public readonly subscriptions: UserSportSubscriptionsModel[]
	public readonly settings: UserSettingsModel
	
	public readonly totalSubscriptions: number

	constructor(
		id: number | undefined,
		email: string,
		password: string,
		isAdmin: boolean,
		subscriptions: UserSportSubscriptionsModel[],
		settings: UserSettingsModel
	) {
		this.id = id
		this.email = email
		this.password = password
		this.isAdmin = isAdmin
		this.subscriptions = subscriptions
		this.settings = settings

		this.ensureValid()

		this.totalSubscriptions = subscriptions.length
	}

	public ensureValid = () => {
		ensureLongerThan(this.password, 6)

		if (this.settings == null) {
			throw new ValidationException(`Must have a settings field.`)
		}
	}

}