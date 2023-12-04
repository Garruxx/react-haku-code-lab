export class HakuConsole {
	counter: number
	timer: Map<string, number>

	constructor() {
		this.counter = 1
		this.timer = new Map()
	}

	private toStringData(data: any) {
		if (typeof data === 'string') return data
		if (typeof data === 'number') return data
		if (typeof data === 'boolean') return data.toString()
		if (data instanceof RegExp) return data.toString()
		if (data instanceof Function) return data.toString()
		if (data instanceof Array) return JSON.stringify(data)
		if (data instanceof Object) return JSON.stringify(data)
		if (data instanceof Map) return JSON.stringify(Array.from(data))
		if (data instanceof Set) return JSON.stringify(Array.from(data))
		if (data instanceof Error) return data.toString()
		if (data instanceof Date) return data.toString()
		if (data === null) return 'null'
		if (data === undefined) return 'undefined'
		if ('window' in data) return `[window] Press F12 to view the object.`

		return (
			data.toString() +
			'\n' +
			'<code style="color: #ff8d55">' +
			'This object does not have a readable format, ' +
			'por favor, presiona F12 para visualizarlo en la consola.' +
			'</code>'
		)
	}

	log(...data: any) {
		return `<code>
					${data.map((data: any) => this.toStringData(data)).join(" ")}
				</code>`
	}

	error(...errors: any) {
		return `<code style="background: #FF000077">
					${errors.map((error: any) => this.toStringData(error)).join(" ")} 
				</code>`
	}

	assert(condition: boolean, ...data: any) {
		if (!condition) {
			const errors = data.map((error: any) => this.toStringData(error))
			return `<code style="background: #FF000077">Asertion error: ${errors.join(
				' ',
			)} </code>`
		}
		return ''
	}

	count(label: string) {
		return `<code>${label.toString()}: ${this.counter++}</code>`
	}

	group() {
		return `
            <details open class="group">
                <summary>
                    <code>console.group</code>
                </summary>
        `
	}

	groupCollapsed() {
		return `
            <details class="group">
                <summary>
                    <code>console.groupCollapsed</code>
                </summary>
        `
	}

	groupEnd() {
		return `
            </details>
        `
	}

	info(...data: any) {
		return `<code>
					${data.map((data: any) => this.toStringData(data)).join(' ')}
				</code>`
	}

	time(label = 'default') {
		if (this.timer.get(label)) {
			return `
                <code style="background: #FFB80055">
                     Timer '${label}' already exists
                </code>
            `
		}
		this.timer.set(label, Date.now())
	}

	timeEnd(label = 'default') {
		const prevTime = this.timer.get(label)
		if (!prevTime) {
			return `
                <code style="background: #FFB80055">
                     Timer '${label}' does not exists
                </code>
            `
		}
		const time = Date.now() - prevTime
		return `
            <code style="color: #faffa8">'${label}': ${time} ms </code>
        `
	}

	trace(...data: any) {
		const dataStr = data
			.map((data: any) => `<code>${this.toStringData(data)}</code>`)
			.join(``)
		let result = 'Stack'
		try {
			throw new Error(dataStr)
		} catch (error: any) {
			result = `<code style="font-size: 14px">${error.stack
				.replace('Error', '')
				.replace(/^(\s+)?(\bat HakuConsole\.trace\b)(.*)/gm, '')
				.replace(/\n\n/gm, '\n')
				.replace(/\n/gm, '<br/>')
				.replace('<br/>', '')
				.replace(/\s/gm, '&nbsp')}</code>`
		}
		return `<details>
			<summary><code>console.trace</code></summary>
			${result}
		</details>`
	}

	warn(...data: any) {
		return data
			.map(
				(data: any) =>
					`<code style="background: #FFB80055">${this.toStringData(
						data,
					)}</code>`,
			)
			.join(' ')
	}

	clear() {}
}

export const iframeScript = `
const bsConsole = {...console};
const hakuConsole = new window.parent.HakuConsole();
for (const key in console) {
	if (key in hakuConsole) {
		console[key] = (...data) => {
            bsConsole[key](...data);
			window.parent.haku(window, key, hakuConsole[key](...data));
		}
	}
}`
