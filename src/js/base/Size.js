import Sketch from '@/js/index'
import CustomEventTarget from '@/js/base/Event/CustomEventTarget'
import CustomEvent from '@/js/base/Event/CustomEvent'

const Size = class extends CustomEventTarget {
    constructor() {
        super()

        this.sketch = new Sketch()

        this.width = this.sketch.el.clientWidth
        this.height = this.sketch.el.clientHeight
        this.aspect = this.width / this.height
        this.dpr = Math.min(window.devicePixelRatio, 1.5)

        this.resize = this.resize.bind(this)
        this.sketch.eventManager.addEventListener(window, 'resize', this.resize)
    }

    resize() {
        this.width = this.sketch.el.clientWidth
        this.height = this.sketch.el.clientHeight
        this.aspect = this.width / this.height
        this.dpr = Math.min(window.devicePixelRatio, 1.5)

        this.dispatchEvent(new CustomEvent('resize', this))
    }
}

export default Size
