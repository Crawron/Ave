import { GuildMember, RoleResolvable, Role } from "discord.js"

/**
 * Checks if a guild member has all specified roles.
 * @param member Member to check roles for
 * @param roles Roles to verify
 */
export function hasAllRoles(member: GuildMember, roles: RoleResolvable[]) {
    let response = true
    roles.forEach((role) => {
        const isId = typeof role === "string"
        const roleId = isId ? <string>role : (<Role>role).id
        const hasRole = member.roles.has(roleId)
        if (!hasRole) response = false
    })
    return response
}
