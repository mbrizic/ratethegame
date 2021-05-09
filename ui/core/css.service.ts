import { readFile } from "../../server/core/file.service"

const pattern = {
    newline: "\n",
    nothing: "",
    whitespace: " ",
    leadingWhitespace: /^[\t ]+/gm,
    consecutiveNewlines: /[\n\r]{2,}/gm,
    consecutiveWhitespace: /[ ]{2,}/gm
}

export function minifyCss(css: string) {
    return css
        .replace(pattern.leadingWhitespace, pattern.nothing)
        .replace(pattern.consecutiveNewlines, pattern.nothing)
        .replace(pattern.newline, pattern.nothing)
}

const cache: { [fileName: string]: string } = {} 

export function readCssFiles(...filePaths: string[]) {
    return filePaths
        .map(readCssFile)
        .join("")
}

export function readCssFile(filePath: string) {
    if (cache[filePath]) {
        return cache[filePath]
    }

    const fileContents = minifyCss(
        readFile(filePath)
    )

    cache[filePath] = fileContents

    return fileContents
}