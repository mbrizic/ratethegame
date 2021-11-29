import { DomainModel } from "../core/domain.model"
import { UserSettingModel } from "./user-setting.model"

export type SettingName = "receiveTopRatedNotifications"

export class UserSettingsModel implements DomainModel {

	public readonly id: number | undefined
	public readonly userId: number | undefined
	public readonly receiveTopRatedNotifications: boolean
	public readonly receiveTopRatedNotificationsSetting: UserSettingModel

	constructor(
		id: number | undefined,
		userId: number | undefined,
		receiveTopRatedNotificationsSetting: UserSettingModel
	) {
		this.id = id
		this.userId = userId

		this.receiveTopRatedNotifications = receiveTopRatedNotificationsSetting.value
		this.receiveTopRatedNotificationsSetting = receiveTopRatedNotificationsSetting
	}

	public getReceiveTopRatedNotificationsSetting = () => {
		return this.receiveTopRatedNotificationsSetting
	}

	public getSettings = () => {
		return [this.getReceiveTopRatedNotificationsSetting()]
	}

	public ensureValid = () => {
		
	}
}