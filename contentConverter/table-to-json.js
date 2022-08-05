// Excel (xls) table to JSON

// translation | dialect1 | dialect2 | ...restOfDialects

const fs = require('fs')
const Fuse = require('fuse.js')

const sourceContentToJsonFiles = () => {
	const sourceContentInfo = getSourceContentInfo()

	const { parserSettings, langs } = sourceContentInfo

	langs.forEach(lang => {
		const { id: langId, chapters } = lang

		chapters.forEach(chapterFileName => {
			createChapterJson({
				langId,
				chapterFileName,
				parserSettings: parserSettings[langId]
			})
		})
	})
}

function createChapterJson({ langId, chapterFileName, parserSettings }) {
	const langInfo = getLangInfo(langId)

	const chapterId = chapterFileName.replace(/\.[^\.]+$/, '').trim()

	const {
		chapters,
		dialects: dialectsInfo = [{ id: '1', title: 'standard' }]
	} = langInfo

	const tableText = getChapterTableText({ langId, chapterFileName })

	const phrasesWithoutAudio = getTextPhrasesWithSubchapters({
		tableText,
		parserSettings,
		dialectsInfo
	})

	const phrases = fillPhrasesWithAudio({
		phrases: phrasesWithoutAudio,
		langId,
		chapterId
	})

	const { id, title } = chapters.find(elem => elem.id === chapterId)

	const result = { id, title, phrases }

	fs.writeFileSync(
		`./public/content/text/languages/${langId}/chapters/${id}.json`,
		JSON.stringify(result),
		'utf-8'
	)
}

// utils
function getLangInfo(langId) {
	const langInfoRaw = fs.readFileSync(
		`./public/content/text/languages/${langId}/index.json`,
		'utf-8'
	)
	const langInfo = JSON.parse(langInfoRaw)
	return langInfo
}

function getChapterAudios(langId, chapterId) {
	const basicPath = `./public/content/audio`

	const dialects = fs.readdirSync(`${basicPath}/${langId}`)

	const chapters = dialects.map(dialectId => ({
		dialectId,
		chapterPath: `${basicPath}/${langId}/${dialectId}/${chapterId}`
	}))

	const audioFiles = chapters.map(chapter => {
		const { chapterPath, dialectId } = chapter
		return { dialectId, audioFiles: fs.readdirSync(chapterPath) }
	})

	return audioFiles
}

function getFilePhraseDialectMap(langId, chapterId, phrases) {
	// [{dialectId, files: ['1.mp3', '2.mp3']}, ...]
	const files = getChapterAudios(langId, chapterId)

	const fuse = files.reduce((prev, item) => {
		const { dialectId, audioFiles } = item
		return {
			...prev,
			// @ts-ignore
			[dialectId]: new Fuse(audioFiles)
		}
	}, {})

	const dialectNamingType = files.reduce((prev, item) => {
		const { dialectId, audioFiles } = item
		return {
			...prev,
			[dialectId]: getFileNamingType(audioFiles)
		}
	}, {})

	const filePhraseMap = phrases.map(phrase => {
		const { id: phraseId, dialects } = phrase

		// {"phraseId": "5", "dialectId": "1", "filePath": " кельгомнязе.mp3" }

		return dialects.map(dialect => {
			const { id: dialectId, text } = dialect

			const searchFor =
				dialectNamingType[dialectId] === 'numbers'
					? phraseId
					: text.replace('/', '')

			return {
				phraseId,
				dialectId,
				audioFile: fuse[dialectId].search(searchFor, {
					limit: 1
				})[0]['item']
			}
		})
	})

	return filePhraseMap.flat()
}

function getTextPhrasesWithSubchapters({
	tableText,
	parserSettings,
	dialectsInfo
}) {
	const { columnIndexes, firstPhraseId } = parserSettings

	const {
		translation: translationColumnIndex,
		dialects: dialectColumnIndexes,
		transcriptions: transcriptionColumnIndexes
	} = columnIndexes

	const table2dArray = tableText
		.split('\n')
		.filter(elem => Boolean(elem.trim()))
		.map(row => row.split('\t'))

	let rowIndex = 0
	let subchapterIndex = 0
	//phrases and subchapters
	const phrases = table2dArray.map(row => {
		const isRowSubchapter = row => {
			const columnContentLengthArray = row.map(col => col.trim().length)
			const filledColumnsCount = columnContentLengthArray.filter(
				contentLength => contentLength > 0
			).length
			return filledColumnsCount === 1
		}

		if (isRowSubchapter(row)) {
			const title = row.join('')
			const id = subchapterIndex + 1
			subchapterIndex++
			return { type: 'subchapter', id, title }
		}
		const id = rowIndex + firstPhraseId + ''

		const translation = row[translationColumnIndex]
		if (!translation.trim()) {
			console.log(`row ${rowIndex} hasn't translation`)
		}

		const dialects = dialectColumnIndexes.map((columnIndex, dialectIndex) => {
			const { id, title } = dialectsInfo[dialectIndex]
			const text = row[columnIndex]

			if (!text.trim()) {
				console.log(`row ${rowIndex} hasn't dialect ${dialectIndex}`)
			}

			const dialect = { id, title, text }

			//add transcription
			if (transcriptionColumnIndexes.length) {
				const transcriptionColumnIndex =
					transcriptionColumnIndexes[dialectIndex] //each dialect can have its own transcription
				const transcription = row[transcriptionColumnIndex]
				if (transcription) {
					dialect.transcription = transcription
				} else {
					console.log(
						`Missing transctription for row: ${rowIndex} in column: ${transcriptionColumnIndex}`
					)
				}
			}

			return dialect
		})

		const phrase = {
			id,
			translation,
			dialects
		}

		rowIndex++

		return phrase
	})
	return phrases
}

function fillPhrasesWithAudio({ phrases, langId, chapterId }) {
	const filePhraseDialectMap = getFilePhraseDialectMap(
		langId,
		chapterId,
		phrases.filter(elem => elem.type !== 'subchapter')
	)

	return phrases.map(phrase => {
		if (phrase.type === 'subchapter') {
			return phrase
		}

		const { id: phraseId, dialects } = phrase
		const dialectsWithAudio = dialects.map(dialect => {
			const { id: dialectId } = dialect
			const { audioFile } = filePhraseDialectMap.find(
				elem => elem.phraseId === phraseId && elem.dialectId === dialectId
			)
			const audioPath = `/content/audio/${langId}/${dialectId}/${chapterId}/${encodeURIComponent(
				audioFile
			)}`

			return { ...dialect, audios: [audioPath] }
		})
		return { ...phrase, dialects: dialectsWithAudio }
	})
}

function getChapterTableText({ langId, chapterFileName }) {
	const basicFolder = `./contentConverter/sources/`

	const tableText = fs
		.readFileSync(
			`${basicFolder}/tableText/${langId}/${chapterFileName}`,
			'utf-8'
		)
		.replace(/^\s*\/\/.+$/gm, '') // remove comments

	return tableText
}

function getSourceContentInfo() {
	const parserSettings = getParserSettings()

	const langs = getLangs()

	return { parserSettings, langs }
}

function getParserSettings() {
	const basicFolder = `./contentConverter/sources/`

	const parserSettingsRaw = fs
		.readFileSync(`${basicFolder}/settings.json`, 'utf-8')
		.replace(/^\s*\/\/.+$/gm, '') // remove comments

	const parserSettings = JSON.parse(parserSettingsRaw)

	return parserSettings
}

function getLangs() {
	const basicFolder = `./contentConverter/sources/`

	const langs = fs.readdirSync(`${basicFolder}/tableText`)

	const langsWithChapters = langs.map(langId => {
		const chapters = fs.readdirSync(`${basicFolder}/tableText/${langId}`)
		return { id: langId, chapters }
	})

	return langsWithChapters
}

function getFileNamingType(fileNames = []) {
	const isNumeric = fileNames.every(
		fileName => Number.isInteger(+fileName.replace(/\.[^.]+$/, '')) //remove .ext
	)
	return isNumeric ? 'numbers' : 'text'
}

// console.log(
// 	JSON.stringify(
// 		getChapterTableText({ langId: '1', chapterFileName: '2.tsv' }),
// 		null,
// 		2
// 	)
// )

sourceContentToJsonFiles()
