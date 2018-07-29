import { Command } from "./Command"
import { Message } from "discord.js"

export class CommandError extends Error {
    command: Command
    msg: Message

    constructor(message: string, command: Command, msg: Message) {
        super(message)
        this.command = command
        this.msg = msg
    }
}
