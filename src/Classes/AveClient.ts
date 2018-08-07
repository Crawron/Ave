import { Client } from "discord.js"

import { CommandManagerOptions } from "../Interfaces/Options"
import { CommandManager } from "./CommandManager"

export class AveClient {
    client: Client
    comamndManager: CommandManager

    ownerId?: string

    constructor(public botToken: string, options: ClientOptions = {}) {
        this.client = new Client()

        this.ownerId = options.ownerId
        this.client.once("ready", () => {
            if (this.ownerId) this.client.fetchUser(this.ownerId, true)
        })

        this.comamndManager = new CommandManager(this.client, options)
    }

    get owner() {
        if (this.ownerId) return this.client.users.get(this.ownerId)
    }

    login() {
        this.client.login(this.botToken)
    }
}

type ClientOptions = CommandManagerOptions & {
    ownerId?: string
}
