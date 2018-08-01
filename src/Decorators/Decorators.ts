import { Message, PermissionResolvable, RoleResolvable } from "discord.js"
import { CommandError } from "../Classes/CommandError"
import { hasAllRoles } from "../Helpers/hasAllRoles"

/**
 * (Decorator) Require all permissions specified to run the command.
 * @param {PermissionResolvable[]} permissions An array of permissions to require.
 */
export function requiresPermissions(permissions: PermissionResolvable[]) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const commandRun = descriptor.value

        descriptor.value = (msg: Message, ...args: any[]) => {
            if (msg.member.hasPermission(permissions)) commandRun(msg, ...args)
            else throw new CommandError("Insufficient permissions.", target, msg)
        }
    }
}

/**
 * (Decorator) Require all roles specified to run the command.
 * @param {RoleResolvable[]} roles An array of roles to require.
 */
export function requiresRoles(roles: RoleResolvable[]) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const commandRun = descriptor.value

        descriptor.value = (msg: Message, ...args: any[]) => {
            const hasRoles = hasAllRoles(msg.member, roles)
            if (hasRoles) commandRun(msg, ...args)
            else throw new CommandError("Insufficient roles.", target, msg)
        }
    }
}
