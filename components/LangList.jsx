import Link from 'next/link'
import styles from '../styles/HomePage.module.css'

export default function LangList(props) {
	const { langs = '' } = props

	return langs.map((lang, index) => {
		const { title, description, id } = lang
		return (
			<Link href={`/language/${id}`} key={`lang-${index}`}>
				<div className={styles.card}>
					<h2>{title} &rarr;</h2>
					{/* <p>{description}</p> */}
				</div>
			</Link>
		)
	})
}
