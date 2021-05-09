const forbiddenCharacters = [
	"<",
	">"
]

export function ensureInputIsClean(input: string) {
	const containsForbiddenCharacters = forbiddenCharacters.some(char => input.includes(char))

	if (containsForbiddenCharacters) {
		throw Error("Input contains forbidden characters.")
	}
}