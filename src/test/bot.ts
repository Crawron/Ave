import { Client } from "discord.js"
import { join } from "path"

import { CommandManager } from "../main"

const client = new Client()

const manager = new CommandManager(client, { prefix: "." })
const commandsFolderPath = join(__dirname, "/Commands")
manager.storage.fetchFolder(commandsFolderPath)

const { token } = require("../../token.json")
client.login(token)
