import { Message, Client, User } from "discord.js"
import { Command, requiresRoles } from "../../main"

const serverAdminRoleId = "421565847815979018"

export default class extends Command {
    constructor(client: Client) {
        super(client, {
            name: "hi",
            description: "Test command.",
        })
    }

    @requiresRoles([serverAdminRoleId])
    async run(msg: Message) {
        return msg.channel.send(`Hello, ${msg.author}!`)
    }
}
