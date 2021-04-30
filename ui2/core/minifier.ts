const pattern = {
    whitespace: /\s/g,
    newline: "\n",
    nothing: "",
    whitespaceBetweenTags: />\s+</gm,
    leadingWhitespace: /^[\t ]+/gm,
    consecutiveNewlines: /[\n\r]{2,}/gm
}

export function minifyHtml(html: string) {
    return html
        .replace(pattern.leadingWhitespace, pattern.nothing)
        .replace(pattern.consecutiveNewlines, pattern.newline)
}

export function minifyCss(css: string) {
    return css
        .replace(pattern.whitespace, pattern.nothing)
}