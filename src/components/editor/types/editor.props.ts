import { AcceptedLanguages } from '../../../types/code-lab.props'
import { Extension } from '@uiw/react-codemirror'
import { Dispatch, SetStateAction } from 'react'

export interface EditorProps {
	html: string
	css: string
	js: string
	onHTMLChange: Dispatch<SetStateAction<string>>
	onCSSChange: Dispatch<SetStateAction<string>>
	onJSChange: Dispatch<SetStateAction<string>>
	showCode: AcceptedLanguages
	readonly?: Array<AcceptedLanguages>
	theme?: Extension
}
