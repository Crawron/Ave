import { Client, Message } from "discord.js"
import { Command } from "./Command"
import { CommandStorage } from "./CommandStorage"
import { CommandError } from "./CommandError"
import { CommandArguments } from "./CommandArguments"
import { CommandManagerOptions } from "../Interfaces/Options"
import { bind } from "decko"

export class CommandManager {
    storage: CommandStorage
    prefix: string
    respondMentions: boolean

    constructor(public client: Client, options: CommandManagerOptions = {}) {
        this.storage = new CommandStorage(client)

        this.prefix = options.prefix || "."
        this.respondMentions = options.respondMentions || true

        this.client.on("message", this.handleMessage)
    }

    /** Handles an incoming message and runs a command if found. */
    @bind
    async handleMessage(msg: Message) {
        if (!this.shouldHandleMessage(msg)) return

        const command = this.getCommandFromMessage(msg)
        if (command) {
            try {
                const args = await this.parseArguments(msg, command)
                command.run(msg, args)
            } catch (e) {
                if (e instanceof CommandError) msg.channel.send(e.message)
                else console.log(e)
            }
        }
    }

    /** Determines if a message should be handled. */
    shouldHandleMessage(msg: Message) {
        if (msg.author.bot) return false

        if (msg.content.startsWith(this.prefix)) return true

        const mentionsBot = msg.mentions.users.has(this.client.user.id)
        if (mentionsBot && this.respondMentions) return true
    }

    /** Finds which command should be run from a message. */
    getCommandFromMessage(msg: Message) {
        const commandName = msg.content.replace(this.prefix, "").split(" ")[0]
        return this.storage.findCommand(commandName)
    }

    async parseArguments(msg: Message, command: Command): Promise<CommandArguments> {
        const args = new CommandArguments()

        const regexp = /(?:@everyone)|<(?:@&?|#)\d+>|(\d+(?:[.,]\d+)?)|"([^"]*)"|(\S+)/g
        const argumentsString = msg.content.replace(this.prefix + command.name, "").replace(/^<@${this.client.user.id}>/, "")

        let match: RegExpExecArray | null
        while ((match = regexp.exec(argumentsString))) {
            const numberArg = match[1]
            if (numberArg) {
                const number = parseFloat(numberArg.replace(/,/g, "."))
                if (number) args.addArgument(number)
                else args.addArgument(numberArg)
            }

            const quotedStringArg = match[2]
            if (quotedStringArg) args.addArgument(quotedStringArg)

            const stringArg = match[3]
            if (stringArg) args.addArgument(stringArg)
        }

        msg.mentions.channels.forEach(args.addArgument)
        msg.mentions.roles.forEach(args.addArgument)
        msg.mentions.members.forEach(args.addArgument)

        return args
    }
}
