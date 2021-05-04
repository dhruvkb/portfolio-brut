import { bins } from '@/components/bin/registry'

import { specialNames } from '@/models/tree'
import { entityTypes } from '@/models/terminal'

import store from '@/store'

/**
 * Perform autocompletion for binary names. This function is to be invoked when
 * autocompleting the first word of the input.
 *
 * @param {string} bin - the input to autocomplete
 * @returns {Array} the list of autocomplete suggestions
 */
function completeBin(bin) {
  const binNames = Object.keys(bins)
  return binNames
    .filter(name => name.startsWith(bin))
    .map(name => [entityTypes.BIN, name, `${name} `])
}

/**
 * Perform autocompletion for filesystem node names. This function is to be
 * invoked when autocompleting the second or subsequent words of the input.
 *
 * @param {String} path - the input to autocomplete
 * @returns {Array} the list of autocomplete suggestions
 */
function completePath(path) {
  let node = store.state.terminal.currentNode
  const pathParts = path
    .replace(/\/+/g, '/')
    .split(/(?<=\/)/)

  const suggestion = []
  let i = 0
  let isCompleted = true
  for (; i < pathParts.length; i += 1) {
    const pathPart = pathParts[i]
    let suggestionPart = null

    if (i === 0 && store.state.terminal.tree.hasName(pathPart)) {
      suggestionPart = pathPart
      node = store.state.terminal.tree
    } else if (specialNames.CURRENT_DIR.includes(pathPart)) {
      // Do nothing as . refers to current directory
      [, suggestionPart] = specialNames.CURRENT_DIR
    } else if (specialNames.PARENT_DIR.includes(pathPart)) {
      [, suggestionPart] = specialNames.PARENT_DIR
      node = node.parent
    } else {
      const noSlash = pathPart.replace('/', '')
      node = node.children.filter(child => child.hasName(noSlash, true))
      if (node.length === 0) {
        isCompleted = false
        break
      } else if (node.length === 1) {
        [node] = node // Unpack single valued array
      }
    }

    if (Array.isArray(node)) { // Multiple matches, stop gobbling and return choices
      return node.map(item => [
        entityTypes.NODE,
        item,
        [...suggestion, suggestionPart ?? item.autocompleteName].join(''),
      ])
    }

    // Single match found, gobble and continue
    suggestion.push(suggestionPart ?? node.autocompleteName)
  }

  if (!isCompleted) {
    suggestion.push(...pathParts.slice(i))
  }

  if (path === suggestion.join('') && node.isFolder) {
    return node.children.map(item => [
      entityTypes.NODE,
      item,
      [...suggestion, item.autocompleteName].join(''),
    ])
  }

  return [[entityTypes.NODE, node, suggestion.join('')]]
}

export const autocomplete = (rawInput) => {
  const [bin, ...argv] = rawInput.split(/\s+/)

  if (argv.length) {
    const [path] = argv.slice(-1)
    return completePath(path)
  }
  return completeBin(bin)
}
