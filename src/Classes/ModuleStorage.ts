import { Client } from "discord.js"
import { bind } from "decko"
import { sync } from "globby"
import { join } from "path"

/**
 * It stores the module instances to be used.
 */
export class ModuleStorage<T extends Module> {
    storage = new Array<T>()

    constructor(
        private client: Client, //
    ) {}

    /**
     * Gets all module files from a directory and it's subdirectories
     * and adds them to the module storage.
     * @param {(string | string[])} folderPath Direct path or multiple paths to the modules directory.
     */
    @bind
    fetchFolder(folderPath: string | string[]) {
        if (folderPath instanceof Array) folderPath.forEach(this.fetchFolder)
        else {
            folderPath = join(folderPath, "**/*.(js|ts)")

            const modulePaths = sync(folderPath)
            modulePaths.forEach(this.fetchModule)
        }
    }

    /**
     * Gets a single module file and adds it to the module storage.
     * @param {string | string[]} path Direct path to the module file.
     */
    @bind
    fetchModule(path: string | string[]) {
        if (path instanceof Array) path.forEach(this.fetchModule)
        else {
            const ModuleConstructor = require(path).default.prototype.constructor
            const module: T = new ModuleConstructor(this.client)

            this.load(module)
        }
    }

    /**
     * Adds a Module object to the module storage.
     * @param {T} module A Module instance.
     */
    load(module: T) {
        const moduleExists = this.find(module.name)
        if (moduleExists) throw new Error(`Module ${module.name} already loaded.`)

        this.storage.push(module)
    }

    /**
     * Finds a module in storage by it's name.
     * @param {string} moduleName The name of the module.
     * @returns {(T | undefined)} A module object if found, undefined otherwise.
     */
    find(moduleName: string) {
        return this.storage.find((module) => module.name === moduleName)
    }
}

interface Module {
    name: string
}
