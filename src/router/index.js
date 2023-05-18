// Composables
import {createRouter, createWebHistory} from 'vue-router'
import AboutPage from "@/components/AboutPage";
import CategoriesPage from "@/components/CategoriesPage";
import Products from "@/components/Products";
import Form from "@/components/Page";
import OneProduct from "@/components/OneProduct";
import Order from "@/components/Order";
import Page from "@/components/Page";
import NotFound from "@/Pages/NotFound";
import MyOrder from "@/components/MyOrder";
import Login from "@/components/User/Login";
import Registration from "@/components/User/Registration";
import Personal from "@/components/User/Personal";
import VuetifyTest from "@/components/Master/VuetifyTest";
import HomeMainPage from "@/components/Master/HomeMainPage";
import Document from "@/components/Document";
import StripeComponent from "@/components/User/StripeComponent";
const routes = [
  {
    path: '/',
    name: 'main',
    component:HomeMainPage
  },
  {
    path: '/about',
    name: 'about',
    component:AboutPage
  },
  {
    path: '/products',
    name: 'products',
    component:Products,
  },
  {
    path: '/form',
    name: 'form',
    component:Form,
  },
  {
    path: '/ordering',
    name: 'ordering',
    component:Order,
  },
  {
    path: '/myOrders',
    name: 'myOrders',
    component:MyOrder,
  },
  {
    path: '/users/login',
    name:'user.login',
    component:Login,
  },
  {
    path: '/users/registration',
    name:'user.registration',
    component:Registration,
  },
  {
    path: '/users/personal',
    name:'user.personal',
    component:Personal,
  },

  {
    path: '/categories/:id',
    name: 'category',
    component:CategoriesPage,
    props:true,
  },
  {
    path: '/product/:id',
    name: 'product',
    component:OneProduct,
    props:true,
  },
  {
    path: '/page',
    name: 'page',
    component:Page,
  },
  {
    path: '/stripe',
    name: 'stripe',
    component:StripeComponent,
  },
  {
    path: '/vuetify',
    name: 'vuetify',
    component:VuetifyTest,
  },

  {
    path: '/doc',
    name: 'doc',
    component:Document,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('access_token')
  if (!accessToken) {
    if (to.name === 'user.login' || to.name === 'user.registration') {
      return next()
    } else if (to.name === 'myOrders' || to.name === 'user.personal') {
      return next({
        name: 'user.login'
      })
    } else {
      return next()
    }
  } else if (to.name === 'user.login' || to.name === 'user.registration') {
    return next({
      name: 'user.personal'
    })
  }
  next()

})

export default router;
