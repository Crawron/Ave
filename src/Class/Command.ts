import { Message, Client, PermissionResolvable } from "discord.js"
import { CommandOptions } from "../Interfaces/CommandOptions"

export abstract class Command {
    name: string
    description: string
    examples?: string[]
    syntax?: string

    constructor(public client: Client, options: CommandOptions) {
        this.name = options.name
        this.description = options.description
        this.examples = options.examples
        this.syntax = options.syntax
    }

    abstract run(msg: Message, ...args: any[]): Promise<any>
}
