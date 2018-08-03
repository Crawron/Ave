import { Client } from "discord.js"
import { bind } from "decko"
import { sync } from "globby"
import { join } from "path"

/**
 * It stores the command instances to be used.
 */
export class ModuleStorage<T extends Module> {
    storage = new Array<T>()

    constructor(
        private client: Client, //
    ) {}

    /**
     * Gets all module files from a directory and it's subdirectories
     * and adds them to the module storage.
     * @param {(string|string[])} folderPath Direct path or multiple paths to the modules directory.
     */
    @bind
    fetchFolder(folderPath: string | string[]) {
        if (folderPath instanceof Array) folderPath.forEach(this.fetchFolder)
        else {
            folderPath = join(folderPath, "**/*.(js|ts)")

            const commandPaths = sync(folderPath)
            commandPaths.forEach(this.fetchModule)
        }
    }

    /**
     * Gets a single command file and adds it to the command storage.
     * @param {string | string[]} path Direct path to the command file.
     */
    @bind
    fetchModule(path: string | string[]) {
        if (path instanceof Array) path.forEach(this.fetchModule)
        else {
            const ModuleConstructor = require(path).default.prototype.constructor
            const command: T = new ModuleConstructor(this.client)

            this.load(command)
        }
    }

    /**
     * Adds a Command object to the command storage.
     * @param {T} module A Command instance.
     */
    load(module: T) {
        const commandExists = this.find(module.name)
        if (commandExists) throw new Error(`Module ${module.name} already loaded.`)

        this.storage.push(module)
    }

    /**
     * Finds a command in storage by it's name.
     * @param {string} moduleName The name of the comamnd.
     * @returns {(T|undefined)} A command object if found, undefined otherwise.
     */
    find(moduleName: string) {
        return this.storage.find((module) => module.name === moduleName)
    }
}

interface Module {
    name: string
}
