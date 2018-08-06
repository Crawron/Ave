import { Client, Message } from "discord.js"
import { Command } from "./Command"
import { CommandError } from "./CommandError"
import { CommandArguments } from "./CommandArguments"
import { CommandManagerOptions } from "../Interfaces/Options"
import { bind } from "decko"
import { ModuleStorage } from "./ModuleStorage"

export class CommandManager {
    storage: ModuleStorage<Command>
    prefix: string
    respondMentions: boolean

    constructor(public client: Client, options: CommandManagerOptions = {}) {
        this.storage = new ModuleStorage<Command>(client)

        this.prefix = options.prefix || "."
        this.respondMentions = options.respondMentions || true

        this.client.on("message", this.handleMessage)
    }

    /**
     * Handles an incoming message and runs a command if found.
     * @param {Message} msg Message to handle.
     */
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

    /**
     * Determines if a message should be handled.
     * @param {Message} msg Message to handle.
     */
    shouldHandleMessage(msg: Message) {
        if (msg.author.bot) return false

        if (msg.content.startsWith(this.prefix)) return true

        const mentionsBot = msg.mentions.users.has(this.client.user.id)
        if (mentionsBot && this.respondMentions) return true
    }

    /**
     * Finds which command should be run from a message.
     * @param {Message}msg Message calling a command.
     * @returns {(Command|undefined)} Command object if found, undefined otherwise.
     */
    getCommandFromMessage(msg: Message) {
        const commandName = msg.content.replace(this.prefix, "").split(" ")[0]
        return this.storage.find(commandName)
    }

    /**
     * Parses all arguments from a message calling a command.
     * @param msg Message to parse command arguments from.
     * @param command The Command these arguments are for.
     * @returns {CommandArguments} Parsed arguments.
     */
    async parseArguments(msg: Message, command: Command): Promise<CommandArguments> {
        const args = new CommandArguments()

        const regexp = /(?:@everyone)|<(@&?|#)(\d+)>|(\d+(?:[.,]\d+)?)|"([^"]*)"|(\S+)/g
        const argumentsString = msg.content.replace(this.prefix + command.name, "").replace(/^<@${this.client.user.id}>/, "")

        let match: RegExpExecArray | null
        while ((match = regexp.exec(argumentsString))) {
            const mentionType = match[1]
            if (mentionType) {
                const mentionId = match[2]
                const mentionMap: any = {
                    "@": msg.mentions.members.get(mentionId),
                    "@&": msg.mentions.roles.get(mentionId),
                    "#": msg.mentions.channels.get(mentionId),
                }

                const mention = mentionMap[mentionType]
                if (mention) args.addArgument(mention)
                else args.addArgument(match[0])
            }

            const numberArg = match[3]
            if (numberArg) {
                const number = parseFloat(numberArg.replace(/,/g, "."))
                if (number) args.addArgument(number)
                else args.addArgument(numberArg)
            }

            const quotedStringArg = match[4]
            if (quotedStringArg) args.addArgument(quotedStringArg)

            const stringArg = match[5]
            if (stringArg) args.addArgument(stringArg)
        }

        return args
    }
}
