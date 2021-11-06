import { DomainModel } from "../core/domain.model"
import { UserSettingModel } from "./user-setting-model"
export class UserSettingsModel implements DomainModel {

	public readonly id: number | undefined
	public readonly userId: number | undefined
	public readonly receiveTopRatedNotifications: boolean
	public readonly receiveTopRatedNotificationsSetting: UserSettingModel

	constructor(
		id: number | undefined,
		userId: number | undefined,
        receiveTopRatedNotifications: boolean = false
	) {
		this.id = id
		this.userId = userId

		this.receiveTopRatedNotifications = receiveTopRatedNotifications
		this.receiveTopRatedNotificationsSetting = new UserSettingModel("Receive notifications about top-rated sport events", receiveTopRatedNotifications, "receive_top_rated_notifications")
	}

	private getReceiveTopRatedNotificationsSetting = () => {
		return this.receiveTopRatedNotificationsSetting
	}

	public getSettings = () => {
		return [this.getReceiveTopRatedNotificationsSetting()]
	}

	public ensureValid = () => {
		
	}
}