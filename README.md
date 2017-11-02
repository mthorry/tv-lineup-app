# My Lineup App 📺
Ruby on Rails backend with React/Redux frontend. Users can save their favorite shows and add episodes to their lineup. They can view their lineup in a calendar format to see when and where their tv shows air. Users can also see trending and most watched shows as well as shows premiering that week. This project was created independently by me, Matthew Thorry, as my final app at Flatiron School.

For a full description of the app, please go [here](https://medium.com/@mthorry/my-first-redux-app-with-a-rails-backend-4cf59332a994) to read about it on my blog.

## Backend
I created the backend of my app using Ruby on Rails. I used two different APIs in order to get the TV data: trakt.tv API and TVmaze API and fetch requests are done from the backend.
The models are `User`, `Show`, `Episode`, `UserShow`, `UserEpisode`. A `User` can have many shows, and many episodes through shows. They can also have many `user_shows` and `user_episodes` (for ratings, etc).
All models required a controller as CRUD actions are available to all models.

## Frontend
The frontend was created using React and Redux. It has over two dozen components with four reducers (shows, episodes, search, extras) which represent the four main containers of the app.

### Shows
Responsible for fetching and displaying show information from the APIs and backend. The Show Redux state includes `myShows` (user's saved shows), `onTonight` (shows on today from API), `premieres` (shows premiering this week from API), and `isFetching` (boolean).
The main Containers for shows are `ShowContainer`, `PremieresContainer` and `ShowCalendar`. 

`ShowContainer`'s children are `ShowList` and `ShowItem` (grandchild); other children are `ShowPage` with sibling `SuggestedList`.

`PremieresContainer` and `ShowCalendar` do not have children but are containers because they are responsible for multiple tasks including fetching shows or episodes and adding/removing a user's saved items.

### Episodes
Responsible for fetching and displaying episode information from the APIs and backend. The Episode Redux state includes `myLineup` (user's saved episodes), `showEpisodes` (episodes for a specific show, pulled from TVmaze API), and `isFetching` (boolean). There is one container, `EpisodeContainer`. `EpisodeContainer`'s children are `EpisodeList` and `EpisodeItem` (grandchild).

Users can view episodes and add specific episodes to their lineup from `EpisodeItem`.

### Search
Responsible for fetching and displaying show information from the TVmaze API based on user input. The Search Redux state includes `results` (results of search) and `isFetching` (boolean). The container is `SearchContainer` which has a child (`SearchResults`) and a grandchild (`SearchItem`).

Users can save shows from the `SearchResults` via a button on the `SearchItem`.

### Extras
Responsible for fetching and displaying extra information from the trakt.tv API. The Extras Redux state includes `trending` (episodes who's popularity has changed in last day), `watching` (shows that have most viewers), `ratings` (array of user's user_shows which include rating) and `isFetching` (boolean). Extras includes three containers: `DashboardContainer`, `TrendingContainer` and `MostWatchedContainer`.

**`DashboardContainer`** manages the landing page after login. It has two children, `DashboardLineupList` and `DashboardOnTonightList`, which each have a child, `DashboardLineupItem` and `DashboardOnTonightItem`. `DashboardLineupList` displays the episodes in a user's lineup that air on the current day. `DashboardOnTonightList` displays episodes that are not on a user's lineup but air today and are highly rated.

**`TrendingContainer`** calls the trakt.tv API to get latest trending shows and is the parent of `TrendingItem` which displays each result of the query. 

**`MostWatchedContainer`** calls the trakt.tv API to get most watched shows and is the parent of `MostWatchedItem` which displays each result of the query. A user can also filter results based on specified times (week, month, year, ever).
