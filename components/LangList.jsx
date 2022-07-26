import Link from 'next/link'

export default function LangList(props) {
	const { langs } = props

	return langs.map((lang, index) => {
		const { title, description, id } = lang
		return (
			<Link href={`/language/${id}`} key={`lang-${index}`}>
				<div className='card'>
					<h2>{title} &rarr;</h2>
					<p>{description}</p>
				</div>
			</Link>
		)
	})
}
