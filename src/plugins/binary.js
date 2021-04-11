const argType = Object.freeze({
  KEYWORD: 'keyword',
  POSITIONAL: 'positional',
})

export const argRepr = (arg) => {
  let repr = arg.name
  if (arg.type === argType.KEYWORD) {
    repr = `--${repr}`
  }
  if (arg.aliases) {
    arg.aliases.forEach((alias) => {
      repr = `${repr}/-${alias}`
    })
  }
  if (arg.catchAll) {
    repr = `${repr}...`
  }
  if (!arg.required) {
    repr = `[${repr}]`
  }

  return repr
}

export const allArgs = (binary) => {
  const { argSpec } = binary
  if (!argSpec) {
    return []
  }

  const kwArgs = argSpec.kwArgs ?? [] // Keyword arguments
  const posArgs = argSpec.posArgs ?? [] // Positional arguments
  return [
    ...kwArgs
      .map(arg => ({
        ...arg,
        type: argType.KEYWORD,
      })),
    ...posArgs
      .map(arg => ({
        ...arg,
        type: argType.POSITIONAL,
      })),
  ]
}
