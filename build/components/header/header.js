import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './style.module.sass';
import moon from './assets/moon.svg';
import sun from './assets/sun.svg';
export const Header = ({ showCode, setShowCode, isNightMode, setIsNightMode, langs = ['html'] }) => {
    return (_jsxs("div", { className: styles.header, children: [_jsx("nav", { children: langs.map((lang) => (_jsx("div", { className: styles.editor_option, "is-selected": `${lang == showCode}`, onClick: () => setShowCode(lang), children: _jsx("span", { children: lang.toUpperCase() }) }, lang))) }), _jsx("div", { className: styles.night_mode, "is-night-mode": `${isNightMode}`, onClick: () => setIsNightMode(!isNightMode), style: { backgroundImage: `url(${isNightMode ? moon : sun})` } })] }));
};
//# sourceMappingURL=header.js.map