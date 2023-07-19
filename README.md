# klappy/klappy-bible-appy

I have been using a proof-of-concept bible app that I made in ~2018-19 as my daily Bible app. It was built in a few weeks time over Thanksgiving and Christmas break with a few minor updates later in 2019. It was lovingly referred to as [Klappy's Bible App](https://unfoldingword-box3.github.io/translation-helps/). Here's the [Github](https://github.com/unfoldingWord-box3/translation-helps) repo.

## Time for an update after 5.5 years

Over the past few years, I've been wanting to create a new one and use some updated tech and api's from unfoldingWord. The itch became so great that I started one in my spare time, although there isn't much of it.

### Stack

- Javascript (isomorphic)
- React (commonly used)
- Vite (fast and easy)
- MUI Joy (fast and easy)

### Architectural Goals for the App

- Simple to bootstrap
- Maintainable long term
- Extensible for new content sources and formats
- Flexible for swapping around workflows

### Abstracted Layers

- Simple yet flexible UI components
- React hooks to manage most state and lifecycles
- Reusable core functions common to any framework

### Start with Minimal but Functional UI/UX

- Start with off the shelf Joy components
- Start with unfoldingWord CatalogNext API
- Start with USFM, MD, TSV support
- Start with single resource file viewing

### Add Features over Time

- Improve the UI/UX
- Add new resource APIs
- Add new resource file types support
- Add new view to combine resource viewing.
