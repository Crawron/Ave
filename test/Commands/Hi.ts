import { Message, Client } from "discord.js"
import { Command, CommandArguments } from "../.."

export default class extends Command {
    constructor(client: Client) {
        super(client, {
            name: "hi",
            description: "Test command.",
        })
    }

    async run(msg: Message, { members }: CommandArguments) {
        if (members.length > 0) return msg.channel.send(`Hello, ${members.pop()}!`)
        return msg.channel.send(`Hello, ${msg.member}!`)
    }
}
