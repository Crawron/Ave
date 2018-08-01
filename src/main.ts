import { Command } from "./Classes/Command"
import { CommandArguments } from "./Classes/CommandArguments"
import { CommandError } from "./Classes/CommandError"
import { CommandManager } from "./Classes/CommandManager"
import { CommandStorage } from "./Classes/CommandStorage"

import { requiresPermissions, requiresRoles } from "./Decorators/Decorators"

import { CommandManagerOptions, CommandOptions } from "./Interfaces/Options"

export {
    // Classes
    Command,
    CommandArguments,
    CommandError,
    CommandManager,
    CommandStorage,
    // Decorators
    requiresPermissions,
    requiresRoles,
    // Interfaces
    CommandManagerOptions,
    CommandOptions,
}
