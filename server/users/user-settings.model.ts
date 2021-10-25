import { DomainModel } from "../core/domain.model"
export class UserSettingsModel implements DomainModel {

	public readonly id: number | undefined
	public readonly userId: number | undefined
	public readonly receiveTopRated: boolean
	public readonly receiveTopRatedDescr: string

	constructor(
		id: number | undefined,
		userId: number | undefined,
        receiveTopRated: boolean = false
	) {
		this.id = id
		this.userId = userId

		this.receiveTopRatedDescr = "Receive notifications about top-rated sport events"
		this.receiveTopRated = receiveTopRated
	}

	public getReceiveTopRatedState = () => {
		return `${this.receiveTopRated ? "✔️": "❌"}`
	}
	public getReceiveTopRatedDescription = () => {
		return this.receiveTopRatedDescr
	}
	public getReceiveTopRatedName = () => {
		return "receive_top_rated"
	}

	public ensureValid = () => {
		
	}
}