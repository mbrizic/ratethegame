import { DomainModel } from "../core/domain.model"
import { ValidSettingColumName } from "./users.factory"
export class UserSettingModel implements DomainModel {
	
	public readonly description: string | undefined
	public readonly value: boolean
	public readonly columnName: string | undefined

	constructor(
		description: string | undefined,
		value: boolean,
        columnName: ValidSettingColumName | undefined
	) {
		this.description = description
		this.value = value
        this.columnName = columnName
	}

    public ensureValid = () => {
		
	}
}