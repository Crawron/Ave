import { join } from "path"
import { AveClient } from "../main"

const commandDirectory = join(__dirname, "/Commands")
const { token } = require("../../token.json")

const ave = new AveClient(token, {
    ownerId: "109677308410875904",
    commandDirectory,
    prefix: ".",
})

ave.login()
