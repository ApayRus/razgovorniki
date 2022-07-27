import Link from 'next/link'
import Phrase from '../../../../components/Phrase'
import { getChapterContent, getLangInfo } from '../../../../utils/api'
import fs from 'fs'

export default function LanguagePage(props) {
	const {
		langId,
		// chapterId,
		title,
		// description,
		phrases,
		langInfo
	} = props

	return (
		<div>
			<Link href={`/language/${langId}`}>
				<div>&larr; {langInfo.title}</div>
			</Link>
			<h1>{title}</h1>
			{/* <p>{description}</p> */}
			{phrases.map((phrase, index) => {
				const phraseProps = { ...phrase, index }
				return <Phrase {...phraseProps} key={`phrase-${index}`} />
			})}
		</div>
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
