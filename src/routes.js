import Home from 'views/HomeView.jsx';
import SignIn from 'views/SignInView.jsx';
import SignUp from 'views/SignUpView.jsx';
import Images from 'views/ImagesView.jsx';
import AddImage from 'views/AddImageView.jsx';

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
