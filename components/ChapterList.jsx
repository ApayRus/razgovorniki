import { List, ListItem, ListItemText, ListItemButton } from '@mui/material'
import Link from 'next/link'

export default function ChapterList(props) {
	const { chapters = [], langId = '', chapterId = '' } = props

	return (
		<List>
			{chapters.map((chapter, index) => {
				const { id, title } = chapter
				return (
					<Link
						href={`/language/${langId}/chapter/${id}`}
						key={`chapter-${index}`}
					>
						<ListItem disablePadding selected={chapterId === id ? true : false}>
							<ListItemButton color='primary'>
								<ListItemText primary={title} />
							</ListItemButton>
						</ListItem>
					</Link>
				)
			})}
		</List>
	)
}
