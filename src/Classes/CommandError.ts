import { Message } from "discord.js"
import { Command } from "./Command"

export class CommandError extends Error {
    command: Command
    msg: Message

    constructor(message: string, command: Command, msg: Message) {
        super(message)
        this.command = command
        this.msg = msg
    }
}
