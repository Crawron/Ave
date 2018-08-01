import { GuildMember, Role, User, TextChannel } from "discord.js"

export class CommandArguments {
    args = new Array<ArgumentType>()

    constructor() {
        this.addArgument = this.addArgument.bind(this)
    }

    addArgument(argument: ArgumentType) {
        this.args.push(argument)
    }

    get members(): GuildMember[] {
        const members = this.args.filter((arg) => arg instanceof GuildMember)
        return <GuildMember[]>members
    }

    get users() {
        const users = this.args.filter((arg) => arg instanceof User)
        return <User[]>users
    }

    get channels() {
        const channels = this.args.filter((arg) => arg instanceof TextChannel)
        return <TextChannel[]>channels
    }

    get roles() {
        const roles = this.args.filter((arg) => arg instanceof Role)
        return <Role[]>roles
    }

    get strings() {
        const strings = this.args.filter((arg) => typeof arg === "string")
        return <string[]>strings
    }

    get numbers() {
        const numbers = this.args.filter((arg) => typeof arg === "number")
        return <number[]>numbers
    }
}

type ArgumentType = GuildMember | User | TextChannel | Role | number | string
