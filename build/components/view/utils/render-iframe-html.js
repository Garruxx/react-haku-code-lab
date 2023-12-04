import { iframeScript } from './haku-console';
export const renderIframeHtml = (html, css, js) => {
    /**
     * removes non-closed html tags such as.
     * <element and </element
     */
    const codePurge = (html) => {
        return html
            .replace(/(<\w*\s*?)[^>]</gm, (tag) => {
            const tagName = tag.match(/\w*/g)?.[1];
            return tag.replace(/<$/, `></${tagName}><`);
        })
            .replace(/(<\/\w*\s*?)[^>]</gm, (tag) => {
            return tag.replace(/<$/, `><`);
        });
    };
    const cssPurge = (css) => css.replace(/<\/style>/gm, '');
    return codePurge(`
        <style>${cssPurge(css)}</style>
        <script>${iframeScript}</script>
        ${html}
        <script>
            addEventListener('error', (event) => {
                console.error("⊗",event.error.toString());
            });                
        </script>
        <script>
            ${js}
        </script>
    `);
};
//# sourceMappingURL=render-iframe-html.js.map