import { bins } from '@/components/bin/registry'

/**
 * A class that implements one interaction of the CLI. Each interaction consists
 * of the context, an input and the output generated based on the input and the
 * context.
 */
export default class Interaction {
  /**
   * Create a new object of class Interaction.
   *
   * @constructor
   * @constructs {Interaction}
   *
   * @param {Object} context - the current terminal context
   * @param {string} rawInput - the raw input issued to the CLI
   */
  constructor(context, rawInput) {
    this.context = context

    this.rawInput = rawInput

    this.input = null
    this.output = null

    this.isVisible = true
  }

  /**
   * Process the input and then the output.
   */
  process() {
    this.processInput()
    this.processOutput()
  }

  /**
   * Hide this interaction from the terminal screen.
   */
  hide() {
    this.isVisible = false
  }

  /**
   * Split the given raw input string into executable binary and arguments to
   * said binary. It handles quotes and escaping.
   */
  processInput() {
    const [bin, ...argv] = this.rawInput.split(' ')
    this.input = {
      bin,
      argv,
    }
  }

  /**
   * Map the binary name from the input to a component name by looking it up in
   * the registry. If no matching command is found, the `Bad` component will be
   * rendered with the binary name passed to it as the argument.
   */
  processOutput() {
    const output = {}
    if (Object.prototype.hasOwnProperty.call(bins, this.input.bin)) {
      output.component = bins[this.input.bin].name
      output.argv = this.input.argv
    } else {
      output.component = 'Bad'
      output.argv = ['--bin', this.input.bin]
    }
    this.output = output
  }
}
