# **App Name**: PanelPixel

## Core Features:

- Layout Preservation: Maintain existing website layout, moving Manga and Anime tabs to the top right and removing the Favorites, Search, and Settings icons.
- Cinematic Carousel: Implement a cinematic carousel header on both Manga and Anime tabs with full-width banners, title, description, score/status, and trending cover image cards.
- Manga Listings: Display Recently Published Manga and Top Rated Manga sections below the Manga carousel, sorted by START_DATE_DESC and SCORE_DESC respectively, fetched using the AniList GraphQL API.
- Anime Listings: Show Recently Aired Anime and Top Rated Anime sections under the Anime carousel, sorted by START_DATE_DESC and SCORE_DESC, from the AniList API.
- Trailer Integration: Retrieve YouTube trailer links from the AniList API for display in the Anime carousel when available.
- Live Data Fetching: Fetch data from the AniList GraphQL API (https://anilist.co/graphiql) for trending manga/anime, recent releases, top-rated series, and character information, ensuring live production data.

## Style Guidelines:

- Primary color: Dark electric blue (#7DF9FF) to evoke digital displays, reflecting AniList API data.
- Background color: Dark navy (#1A202C) to maintain a modern feel and provide strong contrast, brightness 20%, saturation 20%.
- Accent color: Subtle pastel blue (#B0E2FF) that is 30 degrees to the 'left' of primary, offering highlights and emphasizing key interactions; lighter with low saturation for elegance.
- Body font: 'Inter', a grotesque-style sans-serif for a modern and objective look suitable for both headlines and body text.
- Maintain existing layout structure with enhancements of full-screen carousels and detailed content sections.
- Introduce subtle carousel animations and animated banner backdrops to enhance user engagement.
- Use a consistent set of minimalist icons for actions and categories, providing a sleek and understandable interface.