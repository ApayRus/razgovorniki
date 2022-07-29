import Head from 'next/head'
import SocialIcons from './SocialIcons'
import styles from './Layout.module.css'
import Navigation from './Navigation'

export default function Layout(props) {
	const { children, meta } = props

	return (
		<>
			<Head>
				<title>{meta.title}</title>
				<meta name='description' content={meta.description} />
				<meta name='tags' content={meta.description} />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={styles.megaContainer}>
				<div className={styles.appContainer}>
					{/* navigation */}
					<nav className={styles.navContainer}>
						<Navigation />
					</nav>
					{/* page content  */}
					<div className={styles.pageContainer}>{children}</div>
					{/* footer  */}
					<footer className={styles.footerContainer}>
						<SocialIcons color='primary' />
					</footer>
				</div>
			</div>
		</>
	)
}
