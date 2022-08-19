import CustomEventTarget from '@/js/base/Event/CustomEventTarget'
import EventManager from '@/js/base/Event/EventManager'
import Size from '@/js/base/Size'
import Tick from '@/js/base/Tick'
import Renderer from '@/js/base/Renderer'
import World from '@/js/worlds/World'

let instance = null

const Sketch = class extends CustomEventTarget {
    #options

    #fps

    constructor(el, options = {}) {
        if (instance) {
            return instance
        }

        super()
        instance = this

        this.#options = {
            fps: 60,
            ...options,
        }
        const {
            fps,
        } = this.#options
        this.fps = fps

        this.el = el
        if (!(this.el instanceof HTMLElement)) {
            this.el = document.body
        }
        this.eventManager = new EventManager()
        this.size = new Size()
        this.tick = new Tick()
        this.renderer = new Renderer()
        this.world = new World()
        this.resize = this.resize.bind(this)
        this.update = this.update.bind(this)

        this.eventManager.addEventListener(this.size, 'resize', this.resize)
        this.eventManager.addEventListener(this.tick, 'tick', this.update)
    }

    set fps(value) {
        if (value) {
            if (typeof value === 'number') {
                this.#fps = value
                return
            }
            console.error('CommandNode: typeof \'fps\' must to be number')
        }
    }

    get fps() {
        return this.#fps
    }

    update(e) {
        this.world.draw(this.renderer.ctx, e)
    }

    resize() {
        this.renderer.resize()
    }

    destroy() {
        super.destroy()

        this.eventManager.destroy()
        this.size.destroy()
        this.tick.destroy()
        this.renderer.destroy()
        this.world.destroy()
    }
}

export default Sketch
