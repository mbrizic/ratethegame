String.prototype.containsText = function(text) {
    return this.toLowerCase().includes(text.toLowerCase())
}

String.prototype.withoutCharacters = function(charactersRegex) {
    return this.replace(charactersRegex, "")
}

function required() {
    throw new Error("This parameter is required")
}
