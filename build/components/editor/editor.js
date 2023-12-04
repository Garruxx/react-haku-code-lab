import { jsx as _jsx } from "react/jsx-runtime";
import { CodeMirror, langs } from '../../utils/code-mirror/code-mirror';
import styles from './style.module.sass';
import { synthwave84Theme } from '../../utils/code-mirror/theme/syntwave84-theme';
export const Editor = ({ showCode, theme = synthwave84Theme, readonly, onHTMLChange, onCSSChange, onJSChange, ...codes }) => {
    const setActions = { html: onHTMLChange, css: onCSSChange, js: onJSChange };
    const handleCodeChange = (code) => setActions[showCode](code);
    return (_jsx("div", { className: styles.editor, children: _jsx("div", { className: styles.code, children: _jsx(CodeMirror, { className: styles.code_mirror, extensions: [langs[showCode]()], theme: theme, basicSetup: { tabSize: 4 }, value: codes[showCode], readOnly: readonly?.includes(showCode), height: "100%", onChange: handleCodeChange }) }) }));
};
//# sourceMappingURL=editor.js.map