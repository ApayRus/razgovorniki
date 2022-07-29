import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import styles from './Layout.module.css'
import { useAppContext } from '../store/appContext'

export default function Navigation() {
	const { /* appState, */ setAppState } = useAppContext()
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
				<IconButton
					aria-label='menu'
					onClick={() =>
						setAppState(oldState => ({
							...oldState,
							openDrawer: !oldState.openDrawer
						}))
					}
				>
					<MenuIcon color='primary' />
				</IconButton>
			</li>
		</ul>
	)
}
