export const CleanToBar = (
	codeLineStartInBar: boolean,
	{
		html = '',
		css = '',
		js = '',
	}: { html?: string; css?: string; js?: string },
) => {
	if (!codeLineStartInBar) return { html, css, js }
	const cleanToBarRegex = /^\s*\|?/gm
	return {
		html: html.replace(cleanToBarRegex, ''),
		css: css.replace(cleanToBarRegex, ''),
		js: js.replace(cleanToBarRegex, ''),
	}
}
