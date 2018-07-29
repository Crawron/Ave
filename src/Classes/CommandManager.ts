import { CommandStorage } from "./CommandStorage"
import { Client, Message } from "discord.js"
import { CommandError } from "./CommandError"

export class CommandManager {
    storage: CommandStorage
    prefix: string
    respondMentions: boolean

    constructor(public client: Client, options: CommandManagerOptions = {}) {
        this.storage = new CommandStorage(client)

        this.prefix = options.prefix || "."
        this.respondMentions = options.respondMentions || true

        this.handleMessage = this.handleMessage.bind(this)
        this.shouldHandleMessage = this.shouldHandleMessage.bind(this)
    }

    handleMessage(msg: Message) {
        if (!this.shouldHandleMessage(msg)) return
        const commandName = msg.content.replace(this.prefix, "").split(" ")[0]

        const command = this.storage.findCommand(commandName)
        if (command) {
            try {
                command.run(msg)
            } catch (e) {
                if (e instanceof CommandError) {
                    msg.channel.send(e.message)
                }
            }
        }
    }

    shouldHandleMessage(msg: Message) {
        if (msg.author.bot) return false

        if (msg.content.startsWith(this.prefix)) return true

        const mentionsBot = msg.mentions.users.has(this.client.user.id)
        if (mentionsBot && this.respondMentions) return true
    }
}

interface CommandManagerOptions {
    prefix?: string
    respondMentions?: boolean
}
