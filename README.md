# Phrasebook

## Preparing

### Audio files

1. Put audio files to folders: `public/content/audio/langId/dialectId/chapterId`

2. convert `.wav` to `.mp3` with:

```bash
for f in *.wav; do ffmpeg -i "${f}" -f mp3 "${f%.*}.mp3"; done
```

Run from each chapter folder.

3. Remove `.wav` files.

4. File name should be either int number or phrase text. Remove all prefixes. You can use node script `contentConverter/rename-files.js`.

### Text

1. Copy/paste all your chapter tables from Excel/GoogleSpreadSheets to `contentConverter/sources/tableText/langId/chapterId.tsv`

2. Fill `contentConverter/sources/settings.json` for the new language.

3. In `public/content/text/languages` add a new folder `langId` with a folder `chapters` and file `index.json`. Fill the file with:

```json
{
	"id": "1",
	"title": "Карельский",
	"description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, ipsa!",
	"chapters": [
		{
			"id": "1",
			"title": "1. Приветствие, знакомство, прощание",
			"dialects": [
				{ "title": "тверской", "text": "Pagautuš. Tuttavuš. Prostiečenda." },
				{ "title": "северный", "text": "Tervehyš Tuttavuštumini Hyväkšymini" }
			]
		}
	],
	"dialects": [
		{ "id": "1", "title": "Тверской" },
		{ "id": "2", "title": "Северный" }
	]
}
```

4. Run

```bash
node contentConverter/table-to-json.js
```

In `langId/chapters/` will be created files `1.json`, `2.json` etc. That is the text content of your site.

## Deploy (on Vercel)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

If your integration with github doesn't work (auto deploy on commit)

You should have installed [Vercel-CLI](https://vercel.com/docs/cli)

Run in 2 separate terminals:

```bash
npm run dev
```

and:

```bash
vercel build --prod
vercel deploy --prod --prebuilt
```

## NextJS autogenerated readme

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
