import LogoScreen from './pages/logo-screen.vue'
import HomePage from './pages/home.vue'
import HomePageContent from './pages/home-page-content.vue'
import LoginScreen from './pages/login-screen.vue'
import RegisterScreen from './pages/register-screen.vue'
import VerificationScreen from './pages/verification-screen.vue'
import WelcomeScreen from './pages/welcome-screen.vue'
import AboutPage from './pages/about.vue'
import NotFoundPage from './pages/not-found.vue'
import PanelLeftPage from './pages/panel-left.vue'
import AddActivityTab from './pages/add-activity-tab'
import ViewActivityTab from './pages/view-activity-tab'
import ViewRecommendationsTab from './pages/view-recommendations-tab'

import { Auth } from 'aws-amplify'

// Check if current user is authenticated via Cognito
function checkAuth(to, from, resolve, reject) {
  Auth.currentAuthenticatedUser()
  .then(user => {
    resolve() 
  })
  .catch(err => { 
    reject() 
  })
}

export default [
  {
    path: '/',
    component: LogoScreen
  },
  {
    path: '/home/',
    component: HomePage,
    beforeEnter: checkAuth,
    tabs: [
      {
        path: '/',
        id: 'home',
        component: HomePageContent
      },
      {
        path: '/add_activity/',
        id: 'addActivity',
        component: AddActivityTab
      },
      {
        path: '/view_activity',
        id: 'viewActivity',
        component: ViewActivityTab
      },
      {
        path: '/view_recommendations',
        id: 'viewRecommendations',
        component: ViewRecommendationsTab
      }
    ]
  },
  {
    path: '/login/',
    component: LoginScreen
  },
  {
    path: '/register/',
    component: RegisterScreen
  },
  {
    path: '/verify/:email/:username',
    component: VerificationScreen
  },
  {
    path: '/welcome/',
    component: WelcomeScreen
  },
  {
    path: '/panel-left/',
    component: PanelLeftPage,
  },
  {
    path: '/about/',
    component: AboutPage
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  }
]
