import Home from 'views/Home/index.jsx';
import SignIn from 'views/SignIn/index.jsx';
import SignUp from 'views/SignUp/index.jsx';
import Images from 'views/Images/index.jsx';
import AddImage from 'views/Add/index.jsx';

const routes = [
  {
    component: Home,
    path: '/',
    exact: true,
  },
  {
    component: SignUp,
    path: '/sign-up',
    exact: true,
  },
  {
    component: SignIn,
    path: '/sign-in',
    exact: true,
  }, {
    component: Images,
    path: '/images',
    exact: true,
  }, {
    component: AddImage,
    path: '/add',
  },
];

export default routes;
