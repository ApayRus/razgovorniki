import Link from 'next/link'
import Phrase from '../../../../components/Phrase'
import { getChapterContent, getLangInfo } from '../../../../utils/api'
import fs from 'fs'
import Layout from '../../../../components/Layout'
import styles from '../../../../styles/ChapterPage.module.css'
import pageStyles from '../../../../styles/Page.module.css'
import ChapterList from '../../../../components/ChapterList'

export default function LanguagePage(props) {
	const {
		langId,
		chapterId,
		title,
		// description,
		phrases: phrasesList,
		langInfo
	} = props

	const meta = {
		title,
		description: `разговорник ${langInfo.title}`,
		tags: `${phrasesList.map(elem => elem.title).join(', ')}`
	}

	const phrases = phrasesList.map((phrase, index) => {
		const phraseProps = { ...phrase, index }
		return (
			<div className={styles.phraseContainer} key={`phrase-${index}`}>
				<Phrase {...phraseProps} />
			</div>
		)
	})

	return (
		<Layout meta={meta}>
			<main>
				{/* breadcrumbs */}
				<div className={pageStyles.breadcrumbs}>
					<Link href={`/language/${langId}`}>
						<div>&larr; {langInfo.title}</div>
					</Link>
				</div>
				{/* title  */}
				<div className={pageStyles.title}>
					<h1>{title}</h1>
					{/* <p>{description}</p> */}
				</div>
				{/* phrases and chapters -- 2 columns  */}
				<div className={styles.mainContainer}>
					<div className={styles.phrasesContainer}>{phrases}</div>
					<div className={styles.chaptersContainer}>
						<h2>Главы</h2>
						<ChapterList
							langId={langId}
							chapterId={chapterId}
							chapters={langInfo.chapters}
						/>
					</div>
				</div>
			</main>
		</Layout>
	)
}

export async function getStaticProps(context) {
	const {
		params: { langId, chapterId }
	} = context

	const chapterContent = await getChapterContent(langId, chapterId)
	const langInfo = await getLangInfo(langId)

	return {
		props: {
			langId,
			chapterId,
			langInfo,
			...chapterContent
		}
	}
}

export async function getStaticPaths() {
	const basicPath = './public/content/text'
	const langs = fs.readdirSync(`${basicPath}/languages`)
	const contentMap = langs.map(langId => {
		const chapters = fs
			.readdirSync(`${basicPath}/languages/${langId}/chapters`)
			.map(elem => elem.replace(/.json$/, ''))
		return { langId, chapters }
	})

	const paths = contentMap
		.map(lang => {
			const { langId, chapters } = lang
			return chapters.map(chapterId => ({ params: { langId, chapterId } }))
		})
		.flat()

	return {
		paths,
		fallback: false // can also be true or 'blocking'
	}
}
