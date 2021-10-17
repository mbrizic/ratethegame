import ValidationException from "./exceptions/validation.exception"

const forbiddenCharacters = [
	"<",
	">"
]

export function ensureInputIsClean(input: string) {
	const containsForbiddenCharacters = forbiddenCharacters.some(char => input.includes(char))

	if (containsForbiddenCharacters) {
		throw new ValidationException("Input contains forbidden characters.")
	}
}