import { DomainModel } from "../core/domain.model"
export class UserSettingsModel implements DomainModel {

	public readonly id: number | undefined
	public readonly receiveTopRated: boolean
	public readonly userId: number | undefined

	constructor(
		id: number | undefined,
		userId: number | undefined,
        receiveTopRated: boolean = false
	) {
		this.id = id
		this.receiveTopRated = receiveTopRated
		this.userId = userId
	}

	public ensureValid = () => {
		
	}
}