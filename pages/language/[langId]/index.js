import Link from 'next/link'
import Layout from '../../../components/Layout'
import ChapterList from '../../../components/ChapterList'
import { getLangInfo } from '../../../utils/api'
import styles from '../../../styles/LanguagePage.module.css'
import pageStyles from '../../../styles/Page.module.css'

export default function LanguagePage(props) {
	const { langId, chapters, title, description } = props

	const meta = {
		title,
		description,
		tags: `${chapters.map(elem => elem.title).join(', ')}`
	}

	return (
		<Layout meta={meta}>
			<main>
				{/* breadcrumbs */}
				<div className={pageStyles.breadcrumbs}>
					<Link href={`/`}>
						<div>&larr; Языки</div>
					</Link>
				</div>
				{/* title  */}
				<h1 className={pageStyles.title}>{title}</h1>
				{/* <p>{description}</p> */}
				{/* chapters (list) */}
				<div className={styles.mainContainer}>
					<ChapterList chapters={chapters} langId={langId} />
				</div>
			</main>
		</Layout>
	)
}

export async function getStaticProps(context) {
	const {
		params: { langId }
	} = context
	const langInfo = await getLangInfo(langId)
	const { title, description, chapters } = langInfo
	return {
		props: {
			langId,
			title,
			description,
			chapters
		}
	}
}

export async function getStaticPaths() {
	return {
		paths: [{ params: { langId: '1' } }, { params: { langId: '2' } }],
		fallback: false // can also be true or 'blocking'
	}
}
