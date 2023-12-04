import { Extension } from '@uiw/react-codemirror'
export type AcceptedLanguages = 'html' | 'css' | 'js'


export interface CodeLabProps {
	langs: Array<AcceptedLanguages>
	readonly?: Array<AcceptedLanguages>
	theme?: Extension
	defaultLangSelected: AcceptedLanguages
	startInDarkTheme?: boolean
	darkLegendTitle?: string
	darkLegendDescription?: string
	codeLineStartInBar?: boolean
	html?: string,
	css?: string,
	js?: string
}
