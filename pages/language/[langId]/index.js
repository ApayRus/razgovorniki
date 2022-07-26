import Link from 'next/link'
import { getLangChapters, getLangInfo } from '../../../utils/api'

export default function LanguagePage(props) {
	const { langId, chapters, title, description } = props

	return (
		<div>
			<h2>{title}</h2>
			<p>{description}</p>
			{chapters.map(chapter => {
				const { id, title } = chapter
				return (
					<Link href={`${langId}/chapter/${id}`}>
						<div>{title}</div>
					</Link>
				)
			})}
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
