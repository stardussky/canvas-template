import Sketch from '@/js/index'
import CustomEventTarget from '@/js/base/Event/CustomEventTarget'

const World = class extends CustomEventTarget {
    constructor() {
        super()

        this.sketch = new Sketch()
    }

    draw(ctx, e) {
        const { width, height } = this.sketch.size
        ctx.clearRect(0, 0, width, height)

        ctx.save()
        ctx.translate(width / 2, height / 2)

        ctx.restore()
    }
}

export default World
