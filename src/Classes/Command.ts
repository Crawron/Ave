import { Message, Client } from "discord.js"
import { CommandOptions } from "../Interfaces/Options"
import { CommandArguments } from "./CommandArguments"

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

    abstract run(msg: Message, args: CommandArguments): Promise<any>
}
