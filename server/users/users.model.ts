import * as crypto from 'crypto'
import { DomainModel } from "../core/domain.model"
import ValidationException from "../core/exceptions/validation.exception"
import { UserSportSubscriptionsModel } from "../users/user-sport-subscriptions.model"
import { UserSettingsModel } from "../users/user-settings.model"

export class UserModel implements DomainModel {
	public readonly id?: number
	public readonly unsubscribeToken?: string;
	public readonly email: string
	public readonly isAdmin: boolean
	public readonly subscriptions: UserSportSubscriptionsModel[]
	public readonly settings: UserSettingsModel
	
	constructor(
		id: number | undefined,
		unsubscribeToken: string | undefined,
		email: string,
		isAdmin: boolean,
		subscriptions: UserSportSubscriptionsModel[],
		settings: UserSettingsModel
	) {
		this.id = id
		this.unsubscribeToken = unsubscribeToken
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

	public getUnsubscribeLink() {
		return `${this.unsubscribeToken!}`
	}

}