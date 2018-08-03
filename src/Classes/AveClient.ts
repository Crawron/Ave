import { Client } from "discord.js"
import { join } from "path"

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

        const commandsFolderPath = options.commandDirectory || join(__dirname, "/Commands")
        this.comamndManager.storage.fetchFolder(commandsFolderPath)
        if (options.commandPath) this.comamndManager.storage.fetchModule(options.commandPath)
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
    commandDirectory?: string | string[]
    commandPath?: string | string[]
}
