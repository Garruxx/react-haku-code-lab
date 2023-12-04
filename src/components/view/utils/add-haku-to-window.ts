import { SetStateAction } from 'react'
import { HakuConsole } from './haku-console'


export const addHakuToWindow = (
	callback: (text: string | SetStateAction<string>) => void,
	wind: any,
) => {
	//@ts-ignore
	window.haku = (_wind, name, ...data) => {
		if (wind !== _wind) return
		if (name === 'clear') {
			return callback('<code class="clear">Se borró la consola</code>')
		}
		callback((code) => (code += data.join(`\n`)))
	}
	//@ts-ignore
	window.HakuConsole = HakuConsole

	return () => {
		//@ts-ignore
		delete window.haku
		//@ts-ignore
		delete window.HakuConsole
		callback('')
	}
}
