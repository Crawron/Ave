import { Client } from "discord.js"
import { CommandError } from "../main"

import * as path from "path"

import Hi from "./Commands/Hi"
import { CommandManager } from "../Classes/CommandManager"

const client = new Client()

const manager = new CommandManager(client, {
    prefix: ".",
})

manager.storage.fetchCommand(path.join(__dirname, "/Commands/Hi"))

client.on("message", manager.handleMessage)

const { token } = require(__dirname + "/token.json")
client.login(token)
