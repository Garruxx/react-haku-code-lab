import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import 'normalize.css';
import { useState } from 'react';
import styles from './code-lab.module.sass';
import { CleanToBar } from './utils/clean-code/clean-code';
import { Editor } from './components/editor/editor';
import { Header } from './components/header/header';
import { View } from './components/view/view';
export const CodeLab = ({ codeLineStartInBar = false, startInDarkTheme = false, darkLegendDescription, darkLegendTitle, theme, defaultLangSelected = 'html', readonly, langs, ...props }) => {
    const code = CleanToBar(codeLineStartInBar, props);
    const [html, setHtml] = useState(code.html);
    const [css, setCss] = useState(code.css);
    const [js, setJs] = useState(code.js);
    const [isNightMode, setIsNightMode] = useState(startInDarkTheme);
    const [showCode, setShowCode] = useState(defaultLangSelected);
    return (_jsxs("div", { className: styles.codeLabContainer, children: [_jsxs("div", { className: styles.editor, children: [_jsx(Header, { setShowCode: setShowCode, showCode: showCode, setIsNightMode: setIsNightMode, isNightMode: isNightMode, langs: langs }), _jsx(Editor, { html: html, css: css, js: js, onHTMLChange: setHtml, onCSSChange: setCss, onJSChange: setJs, theme: theme, showCode: showCode, readonly: readonly })] }), _jsx(View, { css: css, js: js, html: html, isNightMode: isNightMode, darkLegendDescription: darkLegendDescription, darkLegendTitle: darkLegendTitle })] }));
};
//# sourceMappingURL=code-lab.js.map