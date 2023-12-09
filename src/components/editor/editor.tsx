import { CodeMirror, langs } from '../../utils/code-mirror/code-mirror'
import styles from './style.module.sass'
import { EditorProps } from './types'
import { synthwave84Theme } from '../../utils/code-mirror/theme/syntwave84-theme'

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
				<CodeMirror
					className={`
						${styles.code_mirror} 
						${showCode == 'html' ? 'show' : ''}
					`}
					extensions={[langs['html']()]}
					theme={theme}
					basicSetup={{ tabSize: 4 }}
					value={codes['html']}
					readOnly={readonly?.includes(showCode)}
					height="100%"
					onChange={handleCodeChange}
				/>
				<CodeMirror
					className={`
						${styles.code_mirror} 
						${showCode == 'css' ? 'show' : ''}
					`}
					extensions={[langs['css']()]}
					theme={theme}
					basicSetup={{ tabSize: 4 }}
					value={codes['css']}
					readOnly={readonly?.includes(showCode)}
					height="100%"
					onChange={handleCodeChange}
				/>
				<CodeMirror
					className={`
						${styles.code_mirror} 
						${showCode == 'js' ? 'show' : ''}
					`}
					extensions={[langs['js']()]}
					theme={theme}
					basicSetup={{ tabSize: 4 }}
					value={codes['js']}
					readOnly={readonly?.includes(showCode)}
					height="100%"
					onChange={handleCodeChange}
				/>
			</div>
		</div>
	)
}
