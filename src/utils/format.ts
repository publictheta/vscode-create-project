const REGEXP = /\{\{|\}\}|\{\s*(\w+)\s*\}/g

/**
 * Format a string with the given context.
 *
 * @param str - The string to format. `{key}` will be replaced with the value of `ctx.key`. Use `{{` and `}}` to escape.
 * @param ctx - The context object. If the value is a function, it will be called and the result will be used.
 */
export function format(
    str: string,
    ctx: Record<string, string | (() => string)>,
): string {
    return str.replace(REGEXP, (match: string, key: string) => {
        switch (match) {
            case "{{":
                return "{"
            case "}}":
                return "}"
            default: {
                const value = ctx[key]

                if (typeof value === "function") {
                    return value()
                }

                return value || ""
            }
        }
    })
}
