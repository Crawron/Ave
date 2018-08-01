import { Client } from "discord.js"
import { join } from "path"

import { CommandManager } from "../main"

const client = new Client()

const manager = new CommandManager(client, { prefix: "." })
manager.storage.fetchCommandFolder(join(__dirname, "/Commands"))

const tokenPath = join(__dirname, "/token.json")
const { token } = require(tokenPath)
client.login(token)
