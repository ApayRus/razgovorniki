import axios from 'axios'

export const getSiteInfo = async () => {
	const path = 'http://localhost:3000/content/text/siteInfo.json'
	const { data } = await axios(path)
	return data
}

export const getLangInfo = async langId => {
	const path = `http://localhost:3000/content/text/languages/${langId}/index.json`
	const { data } = await axios(path)
	return data
}

export const getChapterContent = async (langId, chapterId) => {
	const path = `http://localhost:3000/content/text/languages/${langId}/chapters/${chapterId}.json`
	const { data } = await axios(path)

	return data
}
