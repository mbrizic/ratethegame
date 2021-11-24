// Typescript throws import errors when using stuff like `Op.gte` in Sequelize queries, 
// so we're reimplementing the stuff ourselves from their code:
//
// https://github.com/sequelize/sequelize/blob/9f950cbcbdd659d559496b77c40e0f827b108561/lib/operators.js
//
// ¯\_(ツ)_/¯

export function afterDate(date: Date) {
    return {
        [ Symbol.for('gte') ]: date
    }
}

export function beforeDate(date: Date) {
    return {
        [ Symbol.for('lte') ]: date
    }
}

export function notEqual(field: any) {
    return {
        [ Symbol.for('ne') ]: field
    }
}

export function notNull() {
    return notEqual(null)
}