import { createRouter, createWebHashHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import RegisterForm from '../views/RegisterForm.vue';
import DashboardPage from '../views/DashboardPage.vue';
import WelcomePage from '../components/WelcomePage.vue';
import AddManager from '../components/AddManager.vue';
import ShowManager from '../components/ShowManager.vue';
import StudentQuiz from '../components/StudentQuiz.vue';
import ShowStudent from '../components/ShowStudents.vue';
import StudentRequest from '../components/StudentRequest.vue';
import MyQuiz from '@/components/MyQuiz.vue';
import AttemptedQuiz from '@/components/AttemptedQuiz.vue';
import QuizResult from '@/components/QuizResult.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',   // Redirects "/" to "/login"
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      // Clear localStorage when navigating to the login page
      localStorage.clear();
      next();
    },
  },
  {
    path: '/form',
    name: 'form',
    component: RegisterForm,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
    children: [
      {
        path: '/dashboard',
        name: 'default',
        component: WelcomePage,
      },
      {
        path: '/dashboard/addmanager',
        name: 'addmanager',
        component: AddManager,
      },
      {
        path: '/dashboard/showmanager',
        name: 'showmanager',
        component: ShowManager,
      },
      {
        path: '/dashboard/studentquiz',
        name: 'studentquiz',
        component: StudentQuiz,
      },
      {
        path: '/dashboard/showstudent',
        name: 'showstudent',
        component: ShowStudent,
      },
      {
        path: '/dashboard/studentrequest',
        name: 'studentrequest',
        component: StudentRequest,
      },
      {
        path: '/dashboard/myquiz',
        name: 'myquiz',
        component: MyQuiz,
      },
      {
        path: '/dashboard/attemptedquiz',
        name: 'attemptedquiz',
        component: AttemptedQuiz,
      },
      {
        path: '/dashboard/quizresult',
        name: 'quizresult',
        component: QuizResult,
      },
    ],
    meta: { requiresAuth: true },  // Add this meta field to indicate auth is required
  },
];

// Create the router
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Check if localStorage has user info (you can use token or role as the check)
  const isAuthenticated = localStorage.getItem('token');  // Assuming token is stored

  // If the route requires auth and there's no user info, redirect to login
  if (requiresAuth && !isAuthenticated) {
    next('/login');  // Redirect to login page
  } else {
    next();  // Allow navigation
  }
});

export default router;
