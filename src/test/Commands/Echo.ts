import { Message, Client } from "discord.js"
import { Command, CommandArguments } from "../../main"

export default class extends Command {
    constructor(client: Client) {
        super(client, {
            name: "echo",
            description: "Test command.",
        })
    }

    async run(msg: Message, args: CommandArguments) {
        const memberNames = args.members.length > 0 ? args.members.map((member) => `@${member.user.tag} (ID: ${member.id})`).join("\n") : "<none>"
        const channelNames = args.channels.length > 0 ? args.channels.map((channel) => `#${channel.name} (ID: ${channel.id})`).join("\n") : "<none>"
        const roleNames = args.roles.length > 0 ? args.roles.map((role) => `${role.name} (ID: ${role.id})`).join("\n") : "<none>"
        const numbers = args.numbers.length > 0 ? args.numbers.join("\n") : "<none>"
        const strings = args.strings.length > 0 ? args.strings.map((str) => `"${str}"`).join("\n") : "<none>"
        const argsString = args.args.join(", ")

        msg.channel.send(
            `\`\`\`js
Argument array:
[${argsString}]

Members:
${memberNames}

Channels:
${channelNames}

Roles:
${roleNames}

Numbers:
${numbers}

Text:
${strings}
\`\`\``,
        )
    }
}
