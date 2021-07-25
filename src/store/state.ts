import { TerminalState } from 'seeelaye'

import { ResumeState } from '@/store/resume/state'

export interface RootState {
  resume: ResumeState
  terminal: TerminalState
}
