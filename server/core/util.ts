export const isEmptyObject = (obj: object): boolean => {
    return !Object.keys(obj).length;
};

export function onlyUnique(value: object, index: number, self: any[]) { 
    return self.indexOf(value) === index;
}

export function matchAll(str: string, regex: RegExp) {
    var result = [];
    var m;
    if (regex.global) {
        while (m = regex.exec(str)) {
            result.push(m[0]);
        }
    } else {
        if (m = regex.exec(str)) {
            result.push(m[0]);
        }
    }
    return result;
}

export function sum(array: number[]) {
    return array.reduce((acc, value) => acc + value, 0)
}

export function average(array: number[]) {
    if (array.length == 0) {
        return 0
    }

    return sum(array) / array.length
}

export function concatNotNull(...array: (string | null)[]) {
    return array
        .filter(item => item != null)
        .join("")
}