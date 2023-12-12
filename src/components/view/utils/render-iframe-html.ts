import { iframeScript } from './haku-console'

export const renderIframeHtml = (html: string, css: string, js: string) => {
	/**
	 * removes non-closed html tags such as.
	 * <element and </element
	 */
	const htmlPurge = (html: string) => {
		return html
			.replace(/(<[^>]*?)[^>]</gm, (tag) => {
				const tagName = tag.match(/\w*/g)?.[1]
				return tag.replace(/<$/, `></${tagName}><`)
			})
			.replace(/(<\/[^>]*?)[^>]</gm, (tag) => {
				return tag.replace(/<$/, `><`)
			})
	}

	const cssPurge = (css: string) => css.replace(/<\/style>/gm, '')

	return `
        <style>${cssPurge(css)}</style>
        <script>${iframeScript}</script>
        ${htmlPurge(html)}
        <script>
            ${js}
        </script>
    `
}
