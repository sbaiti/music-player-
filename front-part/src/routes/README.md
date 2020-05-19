## Table of available routes

| Path                     | Container             | Connected |
| ------------------------ | --------------------- | --------- |
| /                        | Home                  | false     |
| /signup                  | Signup                | false     |
| /login                   | Login                 | false     |
| /listes-musics           | playerListSpotify     | false     |
| /upload-music            | playerListUploaded    | true      |
| /player-music            | PlayerBar             | true      |
| \*                       | /NotFoundPage         | false     |

```sh
Warning
notFoundPage should be always the last route any route after notFoundPage will be ignored
```