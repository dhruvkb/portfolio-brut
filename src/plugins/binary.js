export const argRepr = (arg) => {
  let repr = `--${arg.name}`
  if (arg.aliases) {
    arg.aliases.forEach((alias) => {
      repr = `${repr}/-${alias}`
    })
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
  return [...kwArgs, ...posArgs]
}
