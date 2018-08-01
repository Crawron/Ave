import { Client } from "discord.js"
import { bind } from "decko"
import { sync } from "globby"
import { join } from "path"

import { Command } from "./Command"

export class CommandStorage {
    commands = new Array<Command>()

    constructor(
        private client: Client, //
    ) {}

    fetchCommandFolder(folderPath: string) {
        folderPath = join(folderPath, "*.js")

        const commandPaths = sync(folderPath)

        commandPaths.forEach(this.fetchCommand)
    }

    @bind
    fetchCommand(path: string) {
        const CommandClass = require(path).default.prototype.constructor
        const command: Command = new CommandClass(this.client)

        this.loadCommand(command)
    }

    loadCommand(command: Command) {
        const commandExists = this.findCommand(command.name)
        if (commandExists) throw new Error(`Command ${command.name}`)

        this.commands.push(command)
    }

    findCommand(commandName: string) {
        return this.commands.find((command) => command.name === commandName)
    }
}
