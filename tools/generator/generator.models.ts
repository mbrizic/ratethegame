export class Entity {
    constructor(
        private name: string
    ) {
        if (name.endsWith("s")) {
            this.name = name.slice(0, -1)
        }
    }

    getSingularUppercase = () => {
        return this.name
    }

    getPluralUppercase = () => {
        return this.name + "s"
    }

    getSingularLowercase = () => {
        return this.name.toLowerCase()
    }

    getPluralLowercase = () => {
        return this.name.toLowerCase() + "s"
    }
}

export const replacementsToPerform: (keyof Entity)[] = [
    "getPluralLowercase",
    "getPluralUppercase",
    "getSingularLowercase",
    "getSingularUppercase"
] 

