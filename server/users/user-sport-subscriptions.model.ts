import { DomainModel } from "../core/domain.model"

export class UserSportSubscriptionsModel implements DomainModel {
	public readonly id: number | undefined
	public readonly sportId: number
	public readonly sportName: string
	public readonly userId: number

	constructor(
		id: number | undefined,
		sportId: number,
		sportName: string,
		userId: number,
	) {
		this.id = id
		this.sportId = sportId
		this.sportName = sportName
		this.userId = userId
	}

	public ensureValid = () => {
		
	}
}