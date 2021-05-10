import { readFile } from "../../server/core/file.service"

const pattern = {
    newline: "\n",
    nothing: "",
    whitespace: " ",
    leadingWhitespace: /^[\t ]+/gm,
    consecutiveNewlines: /[\n\r]{2,}/gm,
    consecutiveWhitespace: /[ ]{2,}/gm
}

let cssCache: { [fileName: string]: string } = {} 

export function minifyCss(css: string) {
    return css
        .replace(pattern.leadingWhitespace, pattern.nothing)
        .replace(pattern.consecutiveNewlines, pattern.nothing)
        .replace(pattern.newline, pattern.nothing)
}

export function readCssFiles(...filePaths: string[]) {
    return filePaths
        .map(readCssFile)
        .join("")
}

export function readCssFile(filePath: string) {
    if (cssCache[filePath]) {
        return cssCache[filePath]
    }

    const fileContents = minifyCss(
        readFile(filePath)
    )

    cssCache[filePath] = fileContents

    return fileContents
}

export function clearCssCache() {
    cssCache = {}
}