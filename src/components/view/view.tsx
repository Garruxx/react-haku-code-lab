import { useEffect, useRef, useState } from 'react'
import { ViewProps } from './types/view.props'
import { addHakuToWindow } from './utils/add-haku-to-window'
import styles from './style.module.sass'
import { renderIframeHtml } from './utils/render-iframe-html'
import { darkLegend } from './json/default-dark-legend.json'

export const View = ({
	html,
	css,
	js,
	isNightMode,
	darkLegendDescription = darkLegend.description,
	darkLegendTitle = darkLegend.title,
}: ViewProps) => {
	const iframeRef = useRef<HTMLIFrameElement>(null)
	const consoleRef = useRef<HTMLDivElement>(null)
	const [consoleOutput, setConsoleOutput] = useState('')
	const [isConsoleVisible, setIsConsoleVisible] = useState(false)
	const [isCodeVisible, setIsCodeVisible] = useState(false)

	useEffect(
		() =>
			addHakuToWindow(setConsoleOutput, iframeRef.current?.contentWindow),
		[isCodeVisible],
	)
	useEffect(() => {
		consoleRef.current?.scrollTo(0, consoleRef.current.scrollHeight)
		setConsoleOutput('')
	}, [js, html, css])

	useEffect(() => {
		if (isNightMode) setIsCodeVisible(true)
	}, [isNightMode])

	const handleConsoleVisibility = ({ target }: any) => {
		if (target === consoleRef.current) {
			setIsConsoleVisible(!isConsoleVisible)
		}
	}

	return (
		<div
			className={styles.view}
			is-night-mode={`${isNightMode}`}
			is-code-visible={`${isCodeVisible}`}
		>
			{isCodeVisible && (
				<>
					<iframe
						ref={iframeRef}
						srcDoc={renderIframeHtml(html, css, js)}
						title="haku"
					/>
					<div
						className={styles.console_output}
						is-close={`${isConsoleVisible}`}
						onClick={handleConsoleVisibility}
						dangerouslySetInnerHTML={{ __html: consoleOutput }}
						ref={consoleRef}
					/>
				</>
			)}
			{!isCodeVisible && (
				<div
					className={styles.empty}
					onClick={() => setIsCodeVisible(true)}
				>
					<h2>{darkLegendTitle}</h2>
					<p>{darkLegendDescription}</p>
				</div>
			)}
		</div>
	)
}
