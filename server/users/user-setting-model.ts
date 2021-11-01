import { DomainModel } from "../core/domain.model"
export class UserSettingModel implements DomainModel {
	
	public readonly description: string
	public readonly value: boolean
	public readonly column_name: string

	constructor(
		description: string,
		value: boolean,
        column_name: string
	) {
		this.description = description
		this.value = value
        this.column_name = column_name
	}

    public ensureValid = () => {
		
	}
}