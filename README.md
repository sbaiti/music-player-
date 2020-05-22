# music-player-


### `npm run dev `

Pour lancer le projet : 

1/ npm install 
2/ cd front-part
4/npm install
3/ cd..
5/ npm run dev 

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Repository description 

In this repository i combine the repository front (front-part) with the repository back (back-part) in the same root project and i use the concurrently library to run multiple commands concurrently and i config it in the package.json

* "front-part-install": "npm install --prefix front-part",
* "start": "node index.js",
* "server": "nodemon index.js",
* "front-part": "npm start --prefix front-part",
* "dev": "concurrently \"npm run server\" \"npm run front-part\""

so to run this project just install the dependencies for the two part back and front and tape npm run dev .

### Features
* Upload and view tracks using the RESTful API
* Create and add songs to playlists
* Continuous track playback
* View play counts for each track
* Search for users, tracks and playlists
* See all of a user's tracks and playlists on their page
* Secure account creation and login
* See waveform visualizations for each song

### Technologies used
* React.js
* Redux 
* Redux saga
* Nodejs 
* BCrypt (for user authorization)
* Mlab Mongo DB Cloud 

## Features & Implementation

### Music Playback

```javascript
<audio id='audio' autoPlay preload="auto" type="audio/mpeg"
  src={ yrlTrack }
  ref={ tag => this.audioTag = tag }
  onTimeUpdate={ this.updateProgress }
  onEnded={ this.playNextTrack } />
```

