import Link from 'next/link'
import Phrase from '../../../../components/Phrase'
import { getChapterContent, getLangInfo } from '../../../../utils/api'

export default function LanguagePage(props) {
	const {
		langId,
		chapterId,
		title,
		// description,
		phrases,
		langInfo
	} = props

	return (
		<div>
			<h1>
				{title} ({langInfo.title})
			</h1>
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
	return {
		paths: [
			{ params: { langId: '1', chapterId: '1' } },
			{ params: { langId: '1', chapterId: '2' } }
		],
		fallback: false // can also be true or 'blocking'
	}
}
