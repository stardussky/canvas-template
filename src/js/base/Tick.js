import Sketch from '@/js/index'
import CustomEventTarget from '@/js/base/Event/CustomEventTarget'
import CustomEvent from '@/js/base/Event/CustomEvent'

const Tick = class extends CustomEventTarget {
    #reqId

    #now

    #then

    #interval

    constructor() {
        super()

        this.#reqId = null
        this.#now = null
        this.#then = Date.now()

        this.sketch = new Sketch()

        this.update = this.update.bind(this)
        this.#interval = 1000 / this.sketch.fps
        this.delta = null
        this.timeElapsed = 0

        this.update()
    }

    stop() {
        window.cancelAnimationFrame(this.#reqId)
    }

    update() {
        this.#reqId = window.requestAnimationFrame(this.update)

        this.#now = Date.now()
        this.delta = this.#now - this.#then

        if (this.delta > this.#interval) {
            this.#then = this.#now - (this.delta % this.#interval)

            this.timeElapsed += this.delta / 1000

            this.dispatchEvent(new CustomEvent('tick', {
                delta: this.delta,
                timeElapsed: this.timeElapsed,
            }))
        }
    }

    destroy() {
        super.destroy()

        this.stop()
    }
}

export default Tick
