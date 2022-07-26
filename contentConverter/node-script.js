// Excel (xls) table to JSON
const fs = require('fs')

const chapterList = [
	{
		id: '1',
		title: '1. Приветствие и знакомство'
	},
	{
		id: '2',
		title: '2. Разговор, общие фразы'
	},
	{
		id: '3',
		title: '3. Дела, занятия'
	},
	{
		id: '4',
		title: '4. Вопросы'
	},
	{
		id: '5',
		title: '5. Путешествие'
	},
	{
		id: '6',
		title: '6. Приготовление пищи, трапеза'
	},
	{
		id: '7',
		title: '7. Общение с детьми'
	},
	{
		id: '8',
		title: '8. Досуг'
	},
	{
		id: '9',
		title: '9. Общение в интернете'
	},
	{
		id: '10',
		title: '10. В пути'
	}
]

const chapterNum = 10

const tableText = `
В автомобиле	10.0т	mašinašša	сев(0)	 Autošša
ты заедешь за мной?	10.1т	tuletgo/ ajellatgo milma vaš?	сев(1)	Tuletko milma hakemah?
я заеду за тобой	10.2т	mie tulen/ ajellan šilma vaš	сев(2)	Mie tulen šiula
Поедем на моей машине	10.3т	lähemmä ajamah miunomalla mašinalla	сев(3)	Ajamma miun autolla
Поедем на твоей машине	10.4т	lähemmä ajamah šiunomalla mašinalla	сев(4)	Ajamma šiun autolla
Тебе удобно?	10.5т	ongo kaikki hyviin? Ongo šiula skodno?	сев(5)	Onko kaikki hyvin? Onko šiula mukava?
Все хорошо.	10.6т	kaikki on hyviin	сев(6)	Kaikki on hyvin
Включить музыку?	10.7т	panna muuzikkua?	сев(7)	Panenko musiikkie piällä?
Да, включи.	10.8т	da, pane	сев(8)	Pane vain
Кто это исполняет?	10.9т	ken tädä lauluo laulau?	сев(9)	Ken tätä lauluo laulau?
Это группа Sattuma	10.10т	že on Sattuma-gruuppa	сев(10)	Še on Šattuma-ryhmä
Это поет ...	10.11т	Tämä laulau …	сев(11)	Šitä laulau ...
Давай остановимся.	10.12т	davai šeizauvumma	сев(12)	Voimmako šeisautuo? Konša šeisauvumma?
Я хочу в туалет.	10.13т	mie tahon ubornoih	сев(13)	Mie tahon tualettih.
Я хочу поесть.	10.14т	mie tahon šyyvä	сев(14)	Pitäis šyyvvä
Я хочу покурить.	10.15т	mie tahon kurie	сев(15)	Himottais polttua tupakkua
Куда эта дорога ведет?	10.16т	kunne mänöy tämä tie?	сев(16)	Kunne tämä tie on?
Что там за озеро справа/слева виднеется?	10.17т	Mi järvi šielä oigiella / važamella pain nägyy?	сев(17)	Mie järvi šieltä oikielta/vašemelta näkyy?
Сколько нам еще ехать?	10.18т	äijägo meilä vielä ajua?	сев(18)	Kuin äijän meilä vielä ajua?
Еще 2 часа 40 минут.	10.19т	vielä kakši čuasuo da nelläkymmendä minuuttua	сев(19)	Vielä kakši tuntie  nelläkymmentä minuuttie
Не против, если я посплю?	10.20т	etgo šie vaštua, kuin mie maguallan?	сев(20)	Etkö ole vaštah još mie makuan vähäsen?
Налей мне пожалуйста чай.	10.21т	ole hyvä, pane miula čuajuo	сев(21)	Anna/Kua miula čäijyö
Дай воды.	10.22т	ana vettä	сев(22)	Anna vettä
Какая хорошая/красивая/плохая дорога.	10.23т	mittynane on hyvä / šoma / paha tie	сев(23)	Kuin hyvä/kaunis/paha tie on
`

const { id, title } = chapterList[chapterNum - 1]

const table2dArray = tableText
	.split('\n')
	.filter(elem => elem && elem !== '\t\t\t\t')
	.map(row => row.split('\t'))

const phrases = table2dArray.map((row, rowIndex) => {
	const [translation, audio1, original1, audio2, original2] = row
	const object = {
		translation,
		dialects: [
			{
				title: 'тверской',
				audios: [`/content/audio/1/1/${id}/${id}.${rowIndex + 1}t.mp3`],
				text: original1
			},
			{
				title: 'северный',
				audios: [`/content/audio/1/2/${id}/${id}.${rowIndex + 1}s.mp3`],
				text: original2
			}
		]
	}
	return object
})

const result = { id, title, phrases }

fs.writeFileSync(id + '.json', JSON.stringify(result), 'utf-8')
