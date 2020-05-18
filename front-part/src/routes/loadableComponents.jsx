import Home from '../containers/home/home'
import SignUp from '../containers/signup'
import Login from '../containers/login'

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
    }
]

export default loadableComponents
