import Sketch from '@/js/index'
import CustomEventTarget from '@/js/base/Event/CustomEventTarget'
import CustomEvent from '@/js/base/Event/CustomEvent'

const Renderer = class extends CustomEventTarget {
    constructor() {
        super()

        this.sketch = new Sketch()

        const { width, height, dpr } = this.sketch.size
        this.canvas = document.createElement('canvas')
        this.canvas.width = width * dpr
        this.canvas.height = height * dpr
        this.canvas.style.width = `${width}px`
        this.canvas.style.height = `${height}px`
        this.ctx = this.canvas.getContext('2d', { alpha: false })
        this.ctx.scale(dpr, dpr)

        this.sketch.el.appendChild(this.canvas)
    }

    resize() {
        const { width, height, dpr } = this.sketch.size
        this.canvas.width = width * dpr
        this.canvas.height = height * dpr
        this.canvas.style.width = `${width}px`
        this.canvas.style.height = `${height}px`
        this.ctx.scale(dpr, dpr)

        this.dispatchEvent(new CustomEvent('resize', this))
    }

    destroy() {
        super.destroy()

        this.sketch.el.removeChild(this.canvas)
    }
}

export default Renderer
