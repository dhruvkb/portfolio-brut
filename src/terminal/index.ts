import { Seeelaye } from 'seeelaye'

import { binaryFn as catBinaryFn } from '@/terminal/bin/Concatenate.vue'
import { binaryFn as introBinaryFn } from '@/terminal/bin/Intro.vue'
import { binaryFn as tipBinaryFn } from '@/terminal/bin/Tip.vue'
import { binaryFn as exitBinaryFn } from '@/terminal/bin/Exit.vue'

import store from '@/store'

const catBinary = catBinaryFn()
const introBinary = introBinaryFn()
const tipBinary = tipBinaryFn()
const exitBinary = exitBinaryFn()

const seeelaye = new Seeelaye(
  store,
  'terminal',
  ['hello'],
  {
    [catBinary.command]: catBinary,
    [introBinary.command]: introBinary,
    [tipBinary.command]: tipBinary,
    [exitBinary.command]: exitBinary,
  },
)

export default seeelaye
