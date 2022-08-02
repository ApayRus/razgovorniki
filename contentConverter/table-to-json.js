// Excel (xls) table to JSON

// translation | dialect1 | dialect2 | ...restOfDialects

const fs = require('fs')

// edit for each lang
const langId = '2'
//	order of dialect column indexes should be the same as in langInfo.dialects, e.g. [0, 4, 2]
// Karelski: const columnIndexes = { translation: 0, dialects: [2, 4], transcriptions: [] } // each dialect can have transcription

const columnIndexes = { translation: 0, dialects: [2], transcriptions: [1] } // each dialect can have transcription

// edit for each chapter
// 	tableText is copied from google spreadsheet
const firstId = 1
const chapterNum = 8
const tableText = `
Ласковые обращения		
мой мальчик	c'oran'ɛz'ə	цёранязе
моя девочка	st'ər'n'ɛz'ə	стирьнязе
внук/внучка	unəkən'ɛz'ə	уноконязе
дитятко	id'n'ɛz'ə	иднязе
милый	kɛl'gəmn'ɛz'ə	кельгомнязе
нежная (о девочке)	l'ɛpən'ɛz'ə	ляпонязе
		
		
		
Поощрение		
умница	jožun'ɛ	ёжуня
хорошая девочка	cebɛr' s't'ər'n'ɛ	цебярь стирня
Хороший мальчик	c'ebɛr' c'oran'ɛ, c'ɛbɛr' stər'n'ɛ	цебярь цёраня
послушный	kul̥cəndi	кулхцонды
самый лучший	in' c'ebɛr's'	инь цебярсь
		
		
Наказание		
поставлю в угол! (и на колени)	putt'ɛ užət'i	пуття ужети
не пущу весь день никуда	af noldat'ɛ kovgə	аф нолдатя ковга
глупый!	af jožu!	аф ёжу
шалун!	pot'iška!	потишка!
зачем ты так делаешь?	mejamə dagə t'ijət'?	меяма дага тиеть?
что ты натворил?	mejamə t'ijat?	меяма тият?
Зачем ты так себя ведешь?	mes t'aftə vɛt'sak pr'ɛc'ɛn'?	мес тяфта вятьсак пряцень?
Почему не слушаешься меня?	mes af kul̥cənsamak mon'?	мес аф кулхцонсамак монь?
Слушайся маму!	kul̥cəntk t'ɛd'ɛc'ən'	кулхцонтк тядяцень
Не шали	t'at azəravanda!	тят азорованда!
		
Доброе утро		
		
Вставай!	p'in'gə st'ams 	пинге стямс
Надо вставать!	st'ama!	стяма
Иди завтракать	sak jar̥camə	сак ярхцама
Мне неохота вставать	af, mon n'ingə aščan madəz'	аф, мон нинге ащан мадозь
Не хочется вставать	mon' af mɛl'əz'ə st'ams	монь аф мелезе стямс, 
Поторопись (в школу)!	er'askətt!	эряскодт!
давай скорее	davaj viškən'astə	давай вишконяста
Мне завтра ко второму уроку	t'ejən t'ɛči ombəc'ə urokt'i	теен тячи омбоце урокти
		
		
		
Утешение		
Почему ты плачешь?	mez'(ənksa) avar'd'at?	мезенкса авардят?
Что случилось?	mejama lis's'? 	меяма лиссь?
Тебя кто-нибудь обидел?	ton' kivək obəžan'z'ə	тонь кивок обжанзе
Я упал и ударился	mon pran' i er̥'t'əvən'	мон прань и эрьхтевонь
Мне больно	mon s'ɛr'ɛd'i pɛkəz'ə	монь сяряди пекозе
Не плачь	t'ɛt avar'd'ə	тят аварьде
Я никому не расскажу	mon t'ɛn' kin'd'in'gə af azsa	мон тянь киндинге аф азса
		
		
		
		
Разговор за едой		
Суп горячий	l'ɛms' ps'i	лямсь пси
Подуй	ufak	уфак
Надо всё доесть	jams' sivəma optəm	ямсь сивома оптом
Не хочешь есть — иди гуляй	af jar̥cat — ar̥t kol'ən't't'	аф ярхцат — архт колентть
		
		
		
Разговор на ночь		
Иди спать	ar̥t matt	архт матт
Уже поздно	pozda n'i	позда ни
Пора спать	madəma n'i	мадома ни
Я расскажу тебе на ночь сказку	azan t'ejən ven'd'i jofks	азан теен венди ёфкс
Добрых снов	cebɛr' ott n'ɛjəms	цебярь отт няемс
		
		
		
		
Игры		
Лапта/игра в мяч	laptusə kol'ən't't'əma	лаптуса коленттяма
Игра в баночки	banəčkasə kol'ən't't'əma (kol'ən'd'əma)	баночкаса коленттяма (колендема)
Ледянка из навоза	gornama	горнама
Догонялки	satn'in'aks	сатнинякс
Снежный дом	lovən' kudn'e	ловонь кудне
Кататься на санках	nurdən'asə arn'əma	нурданяса арнема
Строить снеговика	lovən' baba t'ijən'd'əma	ловонь баба тиендема
		
		
		
		
		
Разговор об играх		
Давай играть!	ad'a kol'ənd'əma	адя колендема
Давай играть в лапту!	ad'a laptusə kol'ən't't'əma	адя лаптуса коленттяма
Давай играть в баночки!	ad'a banəčkəsə kol'ən'd'əma	адя баночкаса колендема
Пойдем играть в прятки	kɛšən'd'in'ɛks kol'ən'd'əma	кяшендинякс колендема
Убери игрушки	ur'adajt' kol'ən'd'əmatn'ən'	урядайть колендематнень
Хватит играть в телефон	sati tel'efonsə kol'ənd'əms	саты телефонса колендемс
		
		
		
Обращения к родственникам		
мама	t'ɛd'ɛj	тядяй
папа	al'aj	аляй
бабушка (по матери)	šavaj	шавай
дедушка (по матери)	šɛt'ɛj	щятяй
бабушка (по отцу)	at'aj	атяй
дедушка (по отцу)	babaj	бабай
пра-(бабушка/дедушка)	s'irɛ-	сире-
тетя (о незнакомых)	akas', avan'ɛj	акась, аваняй
дядя (о незнакомых)	al'n'ɛka, šen'ɛ	альняка, щеня
		
Спросить разрешения		
можно я погуляю с друзьями?	možna mol'an ulc'av	можна молян ульцяв
можно я поиграю с друзьями?	možna kol'ən'd'an jalgan'ən' mar̥tə?	можна колендян ялганень мархта
можно я приглашу друга в гости?	možna mon t'erca jalgaz'en' inžiks?	можна мон терца ялгазень инжикс?
можно я пойду в гости?	možna inžiks?	можна инжикс?
ты сделал уроки?	ton tijət' s'embe urokn'en'?	тон тиить сембе урокнень?
что тебе задали?	mez'ə t'ejət makss't' školəsə?	мезе тейт макссть школаса?
иди играй с друзьями	ar̥t jalgatn'ən'd'i	архт ялгатненди
делай уроки	t'ijit' urokn'ən'	тихть урокнень
Иди домой	ar̥t kudu	архт куду
`
const {
	translation: translationColumnIndex,
	dialects: dialectColumnIndexes,
	transcriptions: transcriptionColumnIndexes
} = columnIndexes

const langInfo = getLangInfo(langId)

const { chapters, dialects: dialectsInfo = [{ id: '1', title: 'standard' }] } =
	langInfo

// console.log(dialectsInfo)

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
	const id = rowIndex + firstId

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
			const transcriptionColumnIndex = transcriptionColumnIndexes[dialectIndex] //each dialect can have its own transcription
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

const { id, title } = chapters[chapterNum - 1]
const result = { id, title, phrases }

fs.writeFileSync(
	`./public/content/text/languages/${langId}/chapters/${id}.json`,
	JSON.stringify(result),
	'utf-8'
)

// utils
function getLangInfo(langId) {
	const langInfoRaw = fs.readFileSync(
		`./public/content/text/languages/${langId}/index.json`
	)
	const langInfo = JSON.parse(langInfoRaw)
	return langInfo
}
