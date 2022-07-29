import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import styles from './Layout.module.css'

export default function Navigation() {
	return (
		<ul>
			<li className={styles.homeLink}>
				<Link href='/'>
					<IconButton aria-label='menu'>
						<HomeIcon color='primary' />
					</IconButton>
				</Link>
			</li>
			<li className={styles.menuButton}>
				<IconButton aria-label='menu'>
					<MenuIcon color='primary' />
				</IconButton>
			</li>
		</ul>
	)
}
