export default function TeamList(props) {
	const { teamList } = props

	return teamList.map((person, index) => {
		const { name, description, image } = person
		return (
			<div className='card' key={`person-${index}`}>
				<img src={image} className='avatar' />
				<h2>{name}</h2>
				<p>{description}</p>
			</div>
		)
	})
}
