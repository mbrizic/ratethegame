import * as fs from 'fs'

export const getFilesFromFolder = (path: string): FileRequestResult[] => {
    const files = fs.readdirSync(path, { withFileTypes: true })
        .filter(file => file.isFile())

    return files.map(file => {
        const fileContents = readFile(path + file.name)        
        return {
            name: file.name,
            contents: fileContents
        }
    })
}

export const getFolderContents = (path: string): string[] => {
    return fs.readdirSync(path)
}

export const writeFile = (path: string, contents: string) => {
    fs.writeFileSync(path, contents)
}

export function ensureDirectoryExists(path: string) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
    }
}

export function checkIfExists(path: string) {
    return fs.existsSync(path)
}

export function copyFile(source: string, destination: string) {
    fs.copyFileSync(source, destination)
}

export const readFile = (path: string) => {
    const size = getFileSizeinKb(path)
    
    return fs.readFileSync(path, "utf-8")
}

export const readFileForgiving = (path: string) => {
    if (!checkIfExists(path)) {
        return null
    }

    const size = getFileSizeinKb(path)
    
    return fs.readFileSync(path, "utf-8")
}

export const getFileSizeinKb = (path: string) => {
    const stats = fs.statSync(path)
    const sizeInBytes = stats.size
    const sizeInKb = sizeInBytes / 1024

    return sizeInKb
}

export interface FileRequestResult {
    name: string,
    contents: string,
}