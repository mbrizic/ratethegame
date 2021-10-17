class ValidationException extends Error {
	public status: number;
	public message: string;

	constructor(message: string) {
		super(message);
		this.status = 400;
		this.message = message;
	}
}

export default ValidationException;
