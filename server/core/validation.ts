import ValidationException from "./exceptions/validation.exception"

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