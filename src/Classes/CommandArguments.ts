import { GuildMember, Role, User, TextChannel } from "discord.js"
import { bind } from "decko"

export class CommandArguments {
    /**
     * Array storing in order all arguments.
     */
    args = new Array<ArgumentType>()

    /**
     * Adds an argument to the argument array.
     * @param {ArgumentType} argument Argument to add.
     */
    @bind
    addArgument(argument: ArgumentType) {
        this.args.push(argument)
    }

    /**
     * GuildMember objects in the argument array.
     * @returns {GuildMember[]} Array with all the guild member arguments.
     */
    get members(): GuildMember[] {
        const members = this.args.filter((arg) => arg instanceof GuildMember)
        return <GuildMember[]>members
    }

    /**
     * User objects in the argument array.
     * @returns {User[]} Array with all the user arguments.
     */
    get users() {
        const users = this.args.filter((arg) => arg instanceof User)
        return <User[]>users
    }

    /**
     * Channel objects in the argument array.
     * @return {TextChannel[]} Array with all the channel arguments.
     */
    get channels() {
        const channels = this.args.filter((arg) => arg instanceof TextChannel)
        return <TextChannel[]>channels
    }

    /**
     * Role objects in the argument array.
     * @return {Role[]} Array with all the role arguments.
     */
    get roles() {
        const roles = this.args.filter((arg) => arg instanceof Role)
        return <Role[]>roles
    }

    /**
     * Strings in the argument array.
     * @return {string[]} Array with all the string arguments.
     */
    get strings() {
        const strings = this.args.filter((arg) => typeof arg === "string")
        return <string[]>strings
    }

    /**
     * Numbers in the argument array.
     * @return {number[]} Array with all the number arguments.
     */
    get numbers() {
        const numbers = this.args.filter((arg) => typeof arg === "number")
        return <number[]>numbers
    }
}

type ArgumentType = GuildMember | User | TextChannel | Role | number | string
