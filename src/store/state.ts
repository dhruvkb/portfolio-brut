import { TerminalState } from 'seeelaye'

import { UiState } from '@/store/ui/state'
import { ResumeState } from '@/store/resume/state'

export interface RootState {
  ui: UiState
  resume: ResumeState
  terminal: TerminalState
}
