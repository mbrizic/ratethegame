class ValidationException extends Error {
	public message: string;

	constructor(message: string) {
		super(message);
		this.message = message;
	}
}

export function ensureInputIsEmail(input: string) {
	if (!input.includes("@") || !input.includes(".")) {
		throw new ValidationException("Email not in valid format")
	}
}

export function ensureLongerThan(input: string, minLength: number) {
	if (input.length < minLength) {
		throw new ValidationException("Email not in valid format")
	}
}