import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import CodeMirror from '@uiw/react-codemirror';
declare const langs: {
    js: typeof javascript;
    css: typeof css;
    html: typeof html;
};
export { langs, CodeMirror };
