import styles from './style.module.sass'
import { HeaderProps } from './types/header.props'
import moon from './assets/moon.svg'
import sun from './assets/sun.svg'

export const Header = ({
	showCode,
	setShowCode,
	isNightMode,
	setIsNightMode,
	langs=['html']
}: HeaderProps) => {

	return (
		<div className={styles.header}>
			<nav>
				{langs.map((lang) => (
					<div
						key={lang}
						className={styles.editor_option}
						is-selected={`${lang == showCode}`}
						onClick={() => setShowCode(lang)}
					>
						<span>{lang.toUpperCase()}</span>
					</div>
				))}
			</nav>
			<div
				className={styles.night_mode}
				is-night-mode={`${isNightMode}`}
				onClick={() => setIsNightMode(!isNightMode)}
				style={{ backgroundImage: `url(${isNightMode ? moon : sun})` }}
			/>
		</div>
	)
}
