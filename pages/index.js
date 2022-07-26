import Head from 'next/head'
import LangList from '../components/LangList'
import TeamList from '../components/TeamList'
import { getSiteInfo } from '../utils/api'

export default function Home(props) {
	const { langList, teamList, siteTitle, siteDescription } = props
	return (
		<div className='container'>
			<Head>
				<title>Разговорники</title>
				<meta
					name='description'
					content='Нанайский, Карельский, Мокшанский, Хантыйский'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<header className='heading'>
				<h1 className='title'>{siteTitle}</h1>
				<p className='description'>{siteDescription}</p>
			</header>

			<main className='main'>
				<section className='langs'>
					<div className='grid'>
						<LangList langs={langList} />
					</div>
				</section>
				<section className='team'>
					<h1 className='title'>Команда</h1>
					<div className='grid'>
						<TeamList teamList={teamList} />
					</div>
				</section>
			</main>

			<footer className='footer'>(c) 2022</footer>
		</div>
	)
}

export async function getStaticProps(context) {
	const siteInfo = await getSiteInfo()

	const {
		title: siteTitle,
		description: siteDescription,
		team: teamList,
		languages: langList
	} = siteInfo

	return {
		props: {
			langList,
			teamList,
			siteTitle,
			siteDescription
		}
	}
}
