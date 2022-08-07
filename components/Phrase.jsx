import React, { useRef } from 'react'
import { IconButton, Typography } from '@mui/material'
import styles from './Phrase.module.css'
import { PlayCircleOutlineOutlined as PlayIcon } from '@mui/icons-material'

export default function Phrase(props) {
	const { index = 0, id = '', translation = '', dialects = [] } = props
	const audioElRefs = useRef(
		dialects.map(dialect => {
			const { audios } = dialect
			return audios.map(audio => null)
		})
	)

	const playAudio = (dialectIndex, audioIndex) => () => {
		const audioEl = audioElRefs.current[dialectIndex][audioIndex]
		audioEl.play()
	}

	return (
		<div className={`${styles.phrase} ${styles.card}`}>
			<div className={styles.num}>{index + 1}</div>
			<div className={styles.translation}>
				<Typography variant='h5'>{translation}</Typography>
			</div>
			<div className={styles.originalPhrase}>
				{dialects.map((elem, dialectIndex) => {
					const { title, text, audios = [] } = elem
					return (
						<div className={styles.original} key={`dialect-${dialectIndex}`}>
							<div className={styles.dialectTitle}>{title}</div>
							<div className={styles.dialect}>
								{audios.map((path, audioIndex) => {
									return (
										<IconButton
											onClick={playAudio(dialectIndex, audioIndex)}
											key={`audio-${dialectIndex}-${audioIndex}`}
										>
											<audio
												ref={el =>
													(audioElRefs.current[dialectIndex][audioIndex] = el)
												}
												src={path}
												controls={false}
												preload='auto'
											/>
											<PlayIcon className={styles.audioIcon} />
										</IconButton>
									)
								})}
								<Typography variant='h6'>{text}</Typography>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
