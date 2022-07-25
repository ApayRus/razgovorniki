# Data model

- Language
  - Chapter
    - Phrase (translation)
      - Dialect
        - Original text
        - Audios[]
        - transliterations ({name, text})
        - tags[]

/audios/langId/dialectId/chapterId/phraseId

## Layout

AppBar

- Logo
- Menu
- Auth

SideBar(lang, page, cat)

- for each page different

MainContent

Footer

## MainPage

ProjectDescription

LanguageList

Team

## LanguagePage

Title

Info

Search
for each page different:
langs, cats, phrases

CategoryList

## CategoryPage

Search

Phrases

## Phrase

Translation

Original

Transliteration

Audios

(Dialects)

## params

targetLang, localeLang, pageType (main, lang, cat)

```js
const category =
```
