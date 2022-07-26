import ChapterList from '../../../components/ChapterList'
import { getLangChapters, getLangInfo } from '../../../utils/api'

export default function LanguagePage(props) {
	const { langId, chapters, title, description } = props

	return (
		<div>
			<h2>{title}</h2>
			<p>{description}</p>
			<ChapterList chapters={chapters} langId={langId} />
		</div>
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
