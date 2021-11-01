import { DomainModel } from "../core/domain.model"
import { UserSettingModel } from "./user-setting-model"
export class UserSettingsModel implements DomainModel {

	public readonly id: number | undefined
	public readonly userId: number | undefined
	public readonly receiveTopRated: boolean
	public readonly receiveTopRatedSetting: UserSettingModel

	constructor(
		id: number | undefined,
		userId: number | undefined,
        receiveTopRated: boolean = false
	) {
		this.id = id
		this.userId = userId

		this.receiveTopRated = receiveTopRated
		this.receiveTopRatedSetting = new UserSettingModel("Receive notifications about top-rated sport events", receiveTopRated, "receive_top_rated")
	}

	private getReceiveTopRatedSettings = () => {
		return this.receiveTopRatedSetting
	}

	public getSettings = () => {
		return [this.getReceiveTopRatedSettings()]
	}

	public ensureValid = () => {
		
	}
}