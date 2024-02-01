// append-only interner
export class Interner {
	#hash: Map<string, number> = new Map()
	#values: Array<string> = []

	insert(key: string, value: string) {
		if (this.#hash.has(key))
			throw new Error(`duplicated key: ${key}`)
		this.#hash.set(key, this.#values.length)
		this.#values.push(value)
	}

	lookup(key: string) {
		return this.#hash.get(key) ?? null
	}

	dumpValues() {
		return this.#values
	}
}
