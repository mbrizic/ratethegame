import * as fs from 'fs'
import { join as joinPath } from 'path'
import { replaceAll } from '../../server/core/util'
import { deleteFile, ensureDirectoryExists, readFile, writeFile } from '../../server/core/file.service'
import { Entity, replacementsToPerform } from './generator.models'

const instructions = [
    ` To be used like this:`,
    `\t npm run generator <entity-to-generate> <entity-to-base-it-on>`,
    `\n Please use capitalized singular form:`,
    `\t npm run generator Carburetor Sport`,
]

const rootPath = joinPath(__dirname, "../..")

if (process.argv.length < 4) {
    printInstructionMessage()
    process.exit()
}


const entity = new Entity(process.argv[2])
const template = new Entity(process.argv[3])

console.log(`Generating entity "${entity.getSingularUppercase()}" from entity "${template.getSingularUppercase()}"`)

const templateLowerCasePluralName = template.getPluralLowercase()
const templateLowerCaseSingularName = template.getSingularLowercase()

const folders = [
    `/server/${templateLowerCasePluralName}/`,
]

const paths = [
    `/server/${templateLowerCasePluralName}/${templateLowerCasePluralName}.controller.ts`,
    `/server/${templateLowerCasePluralName}/${templateLowerCasePluralName}.dto.ts`,
    `/server/${templateLowerCasePluralName}/${templateLowerCasePluralName}.mapper.ts`,
    `/server/${templateLowerCasePluralName}/${templateLowerCasePluralName}.route.ts`,
    `/server/${templateLowerCasePluralName}/${templateLowerCasePluralName}.service.ts`,

    `/ui/page/${templateLowerCaseSingularName}.page.ts`,
    `/ui/page/${templateLowerCasePluralName}.page.ts`,
    `/ui/page/${templateLowerCaseSingularName}-list.page.ts`,
    `/ui/page/${templateLowerCaseSingularName}-details.page.ts`,

    `/ui/component/${templateLowerCaseSingularName}-list.component.ts`,
    `/ui/component/${templateLowerCaseSingularName}-details.component.ts`,
]

generateFiles()
registerNewRoutes()


function generateFiles() {
    folders.forEach(folder => {
        const doesTemplateFolderExist = fs.existsSync(getAbsolutePath(folder))
    
        if (!doesTemplateFolderExist) {
            console.log(`Required template file does not exist: ${folder}`)
            process.exit()
        }
    
        const newFolderPath = performAllReplacements(folder)
        ensureDirectoryExists(
            getAbsolutePath(newFolderPath)
        )
    
        console.log(`Generated folder: ${newFolderPath}`)
    })
    
    paths.forEach(path => {
        const absoluteTemplatePath = getAbsolutePath(path)
        const doesTemplateFileExist = fs.existsSync(absoluteTemplatePath)
    
        if (!doesTemplateFileExist) {
            return
        }
    
        const contents = readFile(absoluteTemplatePath)
    
        const newPath = performAllReplacements(path)
        const newContents = performAllReplacements(contents)
    
        const absoluteNewPath = getAbsolutePath(newPath)
    
        deleteFile(absoluteNewPath)
        writeFile(absoluteNewPath, newContents)
        console.log(`Generated file: ${newPath}`)
    })
}

function registerNewRoutes() {
    const serverPath = getAbsolutePath(`/server/server.ts`)

    const contentToFind = `new ${template.getPluralUppercase()}Route`
    const contentToReplace = `${contentToFind}(),\n\t\tnew ${entity.getPluralUppercase()}Route`

    const contents = readFile(serverPath)

    const newContents = replaceAll(
        contents,
        contentToFind,
        contentToReplace
    )

    writeFile(serverPath, newContents)
    console.log(`Updated server.ts file`)
}

function performAllReplacements(contents: string) {
    let output = contents

    replacementsToPerform.forEach(replacementKey => {
        output = replaceAll(
            output,
            template[replacementKey](),
            entity[replacementKey]()
        )
    })

    return output
}

function getAbsolutePath(path: string) {
    return joinPath(rootPath, path)
}

function printInstructionMessage() {
    instructions.forEach(instruction => {
        console.log(instruction)
    })
}