import { AppContextWrapper } from '../store/appContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return (
		<AppContextWrapper>
			<Component {...pageProps} />
		</AppContextWrapper>
	)
}

export default MyApp
