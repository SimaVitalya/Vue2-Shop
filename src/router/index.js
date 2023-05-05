// Composables
import {createRouter, createWebHistory} from 'vue-router'
import MainPage from "@/components/MainPage";
import AboutPage from "@/components/AboutPage";
import CategoriesPage from "@/components/CategoriesPage";
import Products from "@/components/Products";
import Form from "@/components/Page";
import OneProduct from "@/components/OneProduct";
import Order from "@/components/Order";
import Kypc from "@/components/Kypc";
import Page from "@/components/Page";
import SortMain from "@/components/SortMain";
import NotFound from "@/Pages/NotFound";
import TestComponent from "@/components/TestComponent";
import PriceFilter from "@/components/PriceFilter";
import FullTest from "@/components/FullTest";
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
    path: '/test',
    component:Kypc,
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
    path: '/fulltest',
    component:FullTest,
  },
  {
    path: '/price',
    component:PriceFilter,
  },
  {
    path: '/tester',
    component:TestComponent,
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
