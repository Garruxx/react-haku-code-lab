export class HakuConsole {
    constructor() {
        Object.defineProperty(this, "counter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.counter = 1;
        this.timer = new Map();
    }
    toStringData(data) {
        if (typeof data === 'string')
            return data;
        if (typeof data === 'number')
            return data;
        if (typeof data === 'boolean')
            return data.toString();
        if (data instanceof RegExp)
            return data.toString();
        if (data instanceof Function)
            return data.toString();
        if (data instanceof Array)
            return JSON.stringify(data);
        if (data instanceof Object)
            return JSON.stringify(data);
        if (data instanceof Map)
            return JSON.stringify(Array.from(data));
        if (data instanceof Set)
            return JSON.stringify(Array.from(data));
        if (data instanceof Error)
            return data.toString();
        if (data instanceof Date)
            return data.toString();
        if (data === null)
            return 'null';
        if (data === undefined)
            return 'undefined';
        if ('window' in data)
            return `[window] Press F12 to view the object.`;
        return (data.toString() +
            '\n' +
            '<code style="color: #ff8d55">' +
            'This object does not have a readable format, ' +
            'por favor, presiona F12 para visualizarlo en la consola.' +
            '</code>');
    }
    log(...data) {
        return `<code>
					${data.map((data) => this.toStringData(data)).join(" ")}
				</code>`;
    }
    error(...errors) {
        return `<code style="background: #FF000077">
					${errors.map((error) => this.toStringData(error)).join(" ")} 
				</code>`;
    }
    assert(condition, ...data) {
        if (!condition) {
            const errors = data.map((error) => this.toStringData(error));
            return `<code style="background: #FF000077">Asertion error: ${errors.join(' ')} </code>`;
        }
        return '';
    }
    count(label) {
        return `<code>${label.toString()}: ${this.counter++}</code>`;
    }
    group() {
        return `
            <details open class="group">
                <summary>
                    <code>console.group</code>
                </summary>
        `;
    }
    groupCollapsed() {
        return `
            <details class="group">
                <summary>
                    <code>console.groupCollapsed</code>
                </summary>
        `;
    }
    groupEnd() {
        return `
            </details>
        `;
    }
    info(...data) {
        return `<code>
					${data.map((data) => this.toStringData(data)).join(' ')}
				</code>`;
    }
    time(label = 'default') {
        if (this.timer.get(label)) {
            return `
                <code style="background: #FFB80055">
                     Timer '${label}' already exists
                </code>
            `;
        }
        this.timer.set(label, Date.now());
    }
    timeEnd(label = 'default') {
        const prevTime = this.timer.get(label);
        if (!prevTime) {
            return `
                <code style="background: #FFB80055">
                     Timer '${label}' does not exists
                </code>
            `;
        }
        const time = Date.now() - prevTime;
        return `
            <code style="color: #faffa8">'${label}': ${time} ms </code>
        `;
    }
    trace(...data) {
        const dataStr = data
            .map((data) => `<code>${this.toStringData(data)}</code>`)
            .join(``);
        let result = 'Stack';
        try {
            throw new Error(dataStr);
        }
        catch (error) {
            result = `<code style="font-size: 14px">${error.stack
                .replace('Error', '')
                .replace(/^(\s+)?(\bat HakuConsole\.trace\b)(.*)/gm, '')
                .replace(/\n\n/gm, '\n')
                .replace(/\n/gm, '<br/>')
                .replace('<br/>', '')
                .replace(/\s/gm, '&nbsp')}</code>`;
        }
        return `<details>
			<summary><code>console.trace</code></summary>
			${result}
		</details>`;
    }
    warn(...data) {
        return data
            .map((data) => `<code style="background: #FFB80055">${this.toStringData(data)}</code>`)
            .join(' ');
    }
    clear() { }
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
}`;
//# sourceMappingURL=haku-console.js.map