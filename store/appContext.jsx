import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppContextWrapper({ children }) {
	const [appState, setAppState] = useState({ openDrawer: false })

	return (
		<AppContext.Provider value={{ appState, setAppState }}>
			{children}
		</AppContext.Provider>
	)
}

export function useAppContext() {
	return useContext(AppContext)
}
