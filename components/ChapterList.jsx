import { List, ListItem, ListItemText, ListItemButton } from '@mui/material'
import Link from 'next/link'

export default function ChapterList(props) {
	const { chapters, langId } = props

	return (
		<List>
			{chapters.map((chapter, index) => {
				const { id, title } = chapter
				return (
					<Link href={`${langId}/chapter/${id}`} key={`chapter-${index}`}>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText>{title}</ListItemText>
							</ListItemButton>
						</ListItem>
					</Link>
				)
			})}
		</List>
	)
}
