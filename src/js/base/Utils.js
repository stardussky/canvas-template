const Utils = class {
    static Map = class extends Map {
        set(key, value) {
            if (this.has(key)) {
                const previousState = this.get(key)

                super.set(key, [previousState, value])
                return
            }
            super.set(key, value)
        }

        delete(key, value) {
            if (!this.has(key)) {
                return
            }
            if (value) {
                let target = this.get(key)
                if (Array.isArray(target)) {
                    const index = target.findIndex((v) => v === value)
                    if (index > -1) {
                        target.splice(index, 1)
                        if (target.length < 2) {
                            [target] = target
                        }
                    }
                    super.set(key, target)
                    return
                }
                super.delete(key)
            }
        }

        getAll() {
            const list = []
            for (const [key, value] of this) {
                if (Array.isArray(value)) {
                    value.forEach((v) => list.push({ key, value: v }))
                } else {
                    list.push({ key, value })
                }
            }
            return list
        }
    }
}

export default Utils
