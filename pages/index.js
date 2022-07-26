import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getSiteInfo } from '../utils/api'

export default function Home(props) {
	const { langList, teamList, siteTitle, siteDescription } = props
	return (
		<div className={styles.container}>
			<Head>
				<title>Разговорники</title>
				<meta
					name='description'
					content='Нанайский, Карельский, Мокшанский, Хантыйский'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<heading className={styles.heading}>
				<h1 className={styles.title}>{siteTitle}</h1>
				<p className={styles.description}>{siteDescription}</p>
			</heading>

			<main className={styles.main}>
				<section className={styles.langs}>
					<div className={styles.grid}>
						{langList.map(lang => {
							const { title, description, id } = lang
							return (
								<Link href={`/language/${id}`}>
									<div className={styles.card}>
										<h2>{title} &rarr;</h2>
										<p>{description}</p>
									</div>
								</Link>
							)
						})}
					</div>
				</section>
				<section className={styles.team}>
					<h1 className={styles.title}>Команда</h1>
					<div className={styles.grid}>
						{teamList.map(person => {
							const { name, description, image } = person
							return (
								<a href='https://nextjs.org/docs' className={styles.card}>
									<img src={image} className={styles.avatar} />
									<h2>{name}</h2>
									<p>{description}</p>
								</a>
							)
						})}
					</div>
				</section>
			</main>

			<footer className={styles.footer}>(c) 2022</footer>
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
