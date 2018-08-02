import { Client } from "discord.js"
import { bind } from "decko"
import { sync } from "globby"
import { join } from "path"

import { Command } from "./Command"

/**
 * It stores the command instances to be used.
 */
export class CommandStorage {
    commands = new Array<Command>()

    constructor(
        private client: Client, //
    ) {}

    /**
     * Gets all command files from a directory and it's subdirectories
     * and adds them to the command storage.
     * @param {string} folderPath Direct path to the commands directory.
     */
    fetchCommandFolder(folderPath: string) {
        folderPath = join(folderPath, "**/*.(js|ts)")

        const commandPaths = sync(folderPath)

        commandPaths.forEach(this.fetchCommand)
    }

    /**
     * Gets a single command file and adds it to the command storage.
     * @param {string} path Direct path to the command file.
     */
    @bind
    fetchCommand(path: string) {
        const CommandClass = require(path).default.prototype.constructor
        const command: Command = new CommandClass(this.client)

        this.loadCommand(command)
    }

    /**
     * Adds a Command object to the command storage.
     * @param {Command} command A Command instance.
     */
    loadCommand(command: Command) {
        const commandExists = this.findCommand(command.name)
        if (commandExists) throw new Error(`Command ${command.name}`)

        this.commands.push(command)
    }

    /**
     * Finds a command in storage by it's name.
     * @param {string} commandName The name of the comamnd.
     * @returns {(Command|undefined)} A command object if found, undefined otherwise.
     */
    findCommand(commandName: string) {
        return this.commands.find((command) => command.name === commandName)
    }
}
