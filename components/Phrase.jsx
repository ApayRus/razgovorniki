import { IconButton, Typography } from '@mui/material'
import styles from './Phrase.module.css'
import { PlayCircleOutlineOutlined as PlayIcon } from '@mui/icons-material'

export default function Phrase(props) {
	const { index, id, translation, dialects } = props

	const playAudio = path => () => {
		const audio = new Audio(path)
		audio.play()
	}

	return (
		<div className={`${styles.phrase} ${styles.card}`}>
			<div className={styles.translation}>
				<Typography variant='h5'>{`${index + 1}. ${translation}`}</Typography>
			</div>
			<div className={styles.originalPhrase}>
				{dialects.map((elem, dialectIndex) => {
					const { title, text, audios } = elem
					return (
						<div className={styles.original} key={`dialect-${dialectIndex}`}>
							<div className={styles.dialectTitle}>{title}</div>
							<div className={styles.dialect}>
								{audios.map((path, audioIndex) => {
									return (
										<IconButton
											onClick={playAudio(path)}
											key={`audio-${dialectIndex}-${audioIndex}`}
										>
											<PlayIcon />
										</IconButton>
									)
								})}
								<Typography variant='body2'>{text}</Typography>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
