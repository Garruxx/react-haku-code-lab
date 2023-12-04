export const CleanToBar = (codeLineStartInBar, { html = '', css = '', js = '', }) => {
    if (!codeLineStartInBar)
        return { html, css, js };
    const cleanToBarRegex = /^\s*\|?/gm;
    return {
        html: html.replace(cleanToBarRegex, ''),
        css: css.replace(cleanToBarRegex, ''),
        js: js.replace(cleanToBarRegex, ''),
    };
};
//# sourceMappingURL=clean-code.js.map