import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { useAppContext } from '../store/appContext'

export default function Drawer(props) {
	const { children } = props
	const { appState, setAppState } = useAppContext()
	const drawerWidth = 340

	// const container = window !== undefined ? window.document.body : undefined
	return (
		<SwipeableDrawer
			anchor='right'
			variant='temporary'
			open={appState.openDrawer}
			onOpen={() =>
				setAppState(oldState => ({ ...oldState, openDrawer: true }))
			}
			onClose={() =>
				setAppState(oldState => ({ ...oldState, openDrawer: false }))
			}
			ModalProps={{
				keepMounted: true // Better open performance on mobile.
			}}
		>
			{children}
		</SwipeableDrawer>
	)
}
