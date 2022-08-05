const fs = require('fs')

const langId = '2'

const basicPath = `./public/content/audio/${langId}`

// remove prefix, affix etc
const renameFiles = () =>
	fs.readdirSync(basicPath).map(dialectId =>
		fs.readdirSync(`${basicPath}/${dialectId}`).map(chapterId =>
			fs
				.readdirSync(`${basicPath}/${dialectId}/${chapterId}`)
				.map(oldFileName => {
					/* 
				// 2 sev(12).mp3 --> 12.mp3
					const newFileName = oldFileName
						.replace(/.+?\((\d+?)\).*(\.mp3)/, '$1$2')
						.trim() 
				*/
					/*
				// 1.13t.mp3 --> 13.mp3
				const newFileName = oldFileName.replace(
					/.+?\.(\d+)\D+?(\.mp3)/,
					'$1$2'
				) 
				*/
					const [, fileName, ext] = oldFileName.match(/(.+?)(\.[^\.]+)$/, '')
					// remove punctuation from the end of filename
					const newFileName = fileName.replace(/[\.…,!\?]+$/, '').trim() + ext

					fs.renameSync(
						`${basicPath}/${dialectId}/${chapterId}/${oldFileName}`,
						`${basicPath}/${dialectId}/${chapterId}/${newFileName}`
					)
				})
		)
	)

const renameFolders = () =>
	fs.readdirSync(basicPath).map(dialectId =>
		fs.readdirSync(`${basicPath}/${dialectId}`).map(oldChapterName => {
			const newChapterName = oldChapterName.replace(/.+?(\d+)/, '$1')
			fs.renameSync(
				`${basicPath}/${dialectId}/${oldChapterName}`,
				`${basicPath}/${dialectId}/${newChapterName}`
			)
		})
	)

// renameFolders()
renameFiles()
