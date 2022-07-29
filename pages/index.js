import LangList from '../components/LangList'
import Layout from '../components/Layout'
import TeamList from '../components/TeamList'
import { getSiteInfo } from '../utils/api'
import styles from '../styles/HomePage.module.css'
import { Typography } from '@mui/material'
import pageStyles from '../styles/Page.module.css'
import Drawer from '../components/Drawer'

export default function Home(props) {
	const {
		langList = [],
		teamList = [],
		siteTitle = '',
		siteDescription = ''
	} = props
	const meta = {
		title: siteTitle,
		description: siteDescription,
		tags: `${langList.map(elem => elem.title).join(', ')}`
	}

	return (
		<Layout meta={meta}>
			<main className={pageStyles.mainContainer}>
				<header>
					<h1 className={pageStyles.title}>{siteTitle}</h1>
					<div className={pageStyles.description}>
						<Typography paragraph>{siteDescription}</Typography>
					</div>
				</header>
				<section className={styles.langs}>
					<div className={styles.grid}>
						<LangList langs={langList} />
					</div>
				</section>

				<section className={styles.team}>
					<h1 className={pageStyles.title}>Команда</h1>
					<div className={styles.grid}>
						<TeamList teamList={teamList} />
					</div>
				</section>
			</main>
			<Drawer>
				<div style={{ width: 200, height: 200, backgroundColor: 'red' }}>
					I'm drawer!!!
				</div>
			</Drawer>
		</Layout>
	)
}

export async function getStaticProps(context) {
	const siteInfo = await getSiteInfo()

	const {
		title: siteTitle,
		description: siteDescription,
		team: teamList,
		languages: langList
	} = siteInfo

	return {
		props: {
			langList,
			teamList,
			siteTitle,
			siteDescription
		}
	}
}
