import ValidationException from "./exceptions/validation.exception";
import { replaceAll } from "./util";

const forbiddenCharacters = new RegExp(/[^a-zA-Z0-9 ]/g)
const duplicateWhitespace = new RegExp(/\s{2,}/g)

export function createSlug(name: string) {
    const trimmed = name.toLowerCase().trim()

    if (trimmed.length < 1) {
        throw new ValidationException("Slug can't be contructed from this name")
    }

    const withoutForbiddenCharacters = trimmed
        .replace(forbiddenCharacters, "")

    const withNormalizedWhitespace = withoutForbiddenCharacters
        .replace(duplicateWhitespace, " ")

    const slug = replaceAll(withNormalizedWhitespace, " ", "-")
        .trim()     

    return slug
}


