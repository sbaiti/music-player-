import Home from '../containers/home/home'
import SignUp from '../containers/signup'
import Login from '../containers/login'
import PlayerList from '../containers/playerListSpotify/playerList'
import UploadMusic from '../containers/playerListUploaded/uploadMusic'
import Playbar from '../components/music/playBar'

const loadableComponents = [
    {
        component: Home,
        path: '/',
        exact: true,
        name: 'PlayMusic',
    },
    {
        component: SignUp,
        path: '/signup',
        exact: true,
        name: 'Signup',
    },
    {
        component: Login,
        path: '/login',
        exact: true,
        name: 'Login',
    },
    {
        component: PlayerList,
        path: '/listes-musics',
        exact: true,
        name: 'listes music',
    },
    {
        component: UploadMusic,
        path: '/upload-music',
        exact: true,
        name: 'upload Music',
    },
    {
        component: Playbar,
        path: '/player-music',
        exact: true,
        name: 'player Music',
    }
]

export default loadableComponents
