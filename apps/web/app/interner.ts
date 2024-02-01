// append-only interner
export class Interner {
	#hash: Map<string, number> = new Map()
	#values: Array<string> = []

	insert(key: string, value: string) {
		if (this.#hash.has(key))
			throw new Error(`duplicated key: ${key}`)
		this.#hash.set(key, this.#values.length)
		this.#values.push(value)
		console.log(value)
	}

	bulkInsert(kvset: Record<string, string>) {
		Object.entries(kvset).forEach(([k, v]) =>
			this.insert(k, v),
		)
	}

	lookup(key: string) {
		return this.#hash.get(key) ?? null
	}

	dumpValues() {
		return this.#values
	}
}
