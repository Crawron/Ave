export interface CommandOptions {
    name: string
    description: string
    examples?: string[]
    syntax?: string
}

export interface CommandManagerOptions {
    prefix?: string
    respondMentions?: boolean
}
