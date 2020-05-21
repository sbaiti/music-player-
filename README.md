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

