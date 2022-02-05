import * as crypto from 'crypto'
import { DomainModel } from "../core/domain.model"
import ValidationException from "../core/exceptions/validation.exception"
import { UserSportSubscriptionsModel } from "../users/user-sport-subscriptions.model"
import { UserSettingsModel } from "../users/user-settings.model"

export class UserModel implements DomainModel {
	public readonly id?: number
	public readonly uuid?: string;
	public readonly salt?: string;
	public readonly email: string
	public readonly isAdmin: boolean
	public readonly subscriptions: UserSportSubscriptionsModel[]
	public readonly settings: UserSettingsModel
	
	constructor(
		id: number | undefined,
		uuid: string | undefined,
		salt: string | undefined,
		email: string,
		isAdmin: boolean,
		subscriptions: UserSportSubscriptionsModel[],
		settings: UserSettingsModel
	) {
		this.id = id
		this.uuid = uuid
		this.salt = salt
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

	public getHashedIdentifier() {
		return crypto.createHmac('sha512', this.salt!).update(this.id!.toString()).digest('hex');
	}

	public getUnsubscribeLink() {
		return `${this.uuid!}&${this.getHashedIdentifier()}`
	}

}