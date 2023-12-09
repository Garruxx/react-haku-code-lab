import { CodeMirror, langs } from '../../utils/code-mirror/code-mirror'
import styles from './style.module.sass'
import { EditorProps } from './types'
import { synthwave84Theme } from '../../utils/code-mirror/theme/syntwave84-theme'
import { AcceptedLanguages } from '../../main'

export const Editor = ({
	showCode,
	theme = synthwave84Theme,
	readonly,
	onHTMLChange,
	onCSSChange,
	onJSChange,
	...codes
}: EditorProps) => {
	const setActions = { html: onHTMLChange, css: onCSSChange, js: onJSChange }
	const handleCodeChange = (code: string) => setActions[showCode](code)

	return (
		<div className={styles.editor}>
			<div className={styles.code}>
				{Object.keys(codes).map((key) => {
					const code = key as AcceptedLanguages
					return (
						<CodeMirror
							key={key}
							className={`
								${styles.code_mirror} 
								${showCode == code ? styles.show : ''}
							`}
							extensions={[langs[code]()]}
							theme={theme}
							basicSetup={{ tabSize: 4 }}
							value={codes[code]}
							readOnly={readonly?.includes(showCode)}
							height="100%"
							onChange={handleCodeChange}
						/>
					)
				})}
			</div>
		</div>
	)
}
