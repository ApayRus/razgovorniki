import styles from '../styles/HomePage.module.css'

export default function TeamList(props) {
	const { teamList = [] } = props

	return teamList.map((person, index) => {
		const { name, description, image } = person
		return (
			<div className={styles.card} key={`person-${index}`}>
				<img alt={name} src={image} className={styles.avatar} />
				<h2>{name}</h2>
				<p>{description}</p>
			</div>
		)
	})
}
