import { join } from "path"
import { AveClient } from "../src"

const tokenPath = join(__dirname, "token.json")
const { token } = require(tokenPath)
const ave = new AveClient(token, {
    ownerId: "109677308410875904",
    prefix: ".",
})

const commandDirectory = join(__dirname, "/Commands")
ave.comamndManager.storage.fetchFolder(commandDirectory)

ave.login()
