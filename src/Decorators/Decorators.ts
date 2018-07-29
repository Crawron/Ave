import { Message, PermissionResolvable, User, RoleResolvable, Role, GuildMember } from "discord.js"
import { CommandError } from "../Classes/CommandError"
import { hasAllRoles } from "../Helpers/hasAllRoles"

export function requiresPermissions(permissions: PermissionResolvable[]) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const commandRun = descriptor.value

        descriptor.value = (msg: Message, ...args: any[]) => {
            if (msg.member.hasPermission(permissions)) commandRun(msg, ...args)
            else throw new CommandError("Insufficient roles.", target, msg)
        }
    }
}

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
