import { Message, Client } from "discord.js"
import { CommandOptions } from "../Interfaces/CommandOptions"

export abstract class Command {
    client: Client
    name: string
    description: string
    examples?: string[]
    syntax?: string

    constructor(client: Client, options: CommandOptions) {
        this.client = client
        this.name = options.name
        this.description = options.description
        if (options.examples) this.examples = options.examples
        if (options.syntax) this.syntax = options.syntax
    }

    abstract run(msg: Message, ...args: any[]): Promise<any>
}
