import { Command } from "./Command"
import { Client } from "discord.js"

export class CommandStorage {
    commands = new Array<Command>()

    constructor(
        private client: Client, //
    ) {}

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
