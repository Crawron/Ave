import { Client } from "discord.js"
import { CommandError } from "../main"

import Hi from "./Commands/Hi"

const client = new Client()
const hi = new Hi(client)

client.on("message", (msg) => {
    if (!msg.author.bot) {
        try {
            hi.run(msg, msg.author)
        } catch (e) {
            if (e instanceof CommandError) {
                msg.channel.send(e.message)
                msg.channel.send("```js\n" + e.command.name + "```")
            }
        }
    }
})

const { token } = require(__dirname + "/token.json")
client.login(token)
