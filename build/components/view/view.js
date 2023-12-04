import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { addHakuToWindow } from './utils/add-haku-to-window';
import styles from './style.module.sass';
import { renderIframeHtml } from './utils/render-iframe-html';
import { darkLegend } from './json/default-dark-legend.json';
export const View = ({ html, css, js, isNightMode, darkLegendDescription = darkLegend.description, darkLegendTitle = darkLegend.title, }) => {
    const iframeRef = useRef(null);
    const consoleRef = useRef(null);
    const [consoleOutput, setConsoleOutput] = useState('');
    const [isConsoleVisible, setIsConsoleVisible] = useState(false);
    const [isCodeVisible, setIsCodeVisible] = useState(false);
    useEffect(() => addHakuToWindow(setConsoleOutput, iframeRef.current?.contentWindow), [isCodeVisible]);
    useEffect(() => {
        consoleRef.current?.scrollTo(0, consoleRef.current.scrollHeight);
        setConsoleOutput('');
    }, [js, html, css]);
    useEffect(() => {
        if (isNightMode)
            setIsCodeVisible(true);
    }, [isNightMode]);
    const handleConsoleVisibility = ({ target }) => {
        if (target === consoleRef.current) {
            setIsConsoleVisible(!isConsoleVisible);
        }
    };
    return (_jsxs("div", { className: styles.view, "is-night-mode": `${isNightMode}`, "is-code-visible": `${isCodeVisible}`, children: [isCodeVisible && (_jsxs(_Fragment, { children: [_jsx("iframe", { ref: iframeRef, srcDoc: renderIframeHtml(html, css, js), title: "haku" }), _jsx("div", { className: styles.console_output, "is-close": `${isConsoleVisible}`, onClick: handleConsoleVisibility, dangerouslySetInnerHTML: { __html: consoleOutput }, ref: consoleRef })] })), !isCodeVisible && (_jsxs("div", { className: styles.empty, onClick: () => setIsCodeVisible(true), children: [_jsx("h2", { children: darkLegendTitle }), _jsx("p", { children: darkLegendDescription })] }))] }));
};
//# sourceMappingURL=view.js.map