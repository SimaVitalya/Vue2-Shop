// Composables
import {createRouter, createWebHistory} from 'vue-router'
import MainPage from "@/components/MainPage";
import AboutPage from "@/components/AboutPage";
import CategoriesPage from "@/components/CategoriesPage";
import Products from "@/components/Products";
import Form from "@/components/Page";
import OneProduct from "@/components/OneProduct";
import Order from "@/components/Order";
import Page from "@/components/Page";
import SortMain from "@/components/SortMain";
import NotFound from "@/Pages/NotFound";
import MyOrder from "@/components/MyOrder";
const routes = [
  {
    path: '/',
    component:MainPage
  },
  {
    path: '/about',
    component:AboutPage
  },
  {
    path: '/products',
    component:Products,
  },
  {
    path: '/form',
    component:Form,
  },
  {
    path: '/ordering',
    component:Order,
  },
  {
    path: '/myOrders',
    component:MyOrder,
  },

  {
    path: '/categories/:id',
    component:CategoriesPage,
    props:true,
  },
  {
    path: '/product/:id',
    component:OneProduct,
    props:true,
  },
  {
    path: '/page',
    component:Page,
  },
  {
    path: '/sort',
    component:SortMain,
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

export default router
