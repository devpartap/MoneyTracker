// ----- CSS
import './assets/global.css'


// ----- Router

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import("./pages/main.vue")
    },
    {
      path: '/spendhistory',
      name: 'spendhistory',
      component: () => import("./pages/spendHistory.vue")
    },
    {
      path: '/addExpense',
      name: 'addExpense',
      component: () => import("./pages/addExpense.vue")
    },
    {
      path: '/spendhistory/:_catagory>:_name',
      name:'itemDetails',
      props:true,
      component: () => import("./pages/itemDetails.vue")
    }

  ]
})


// --- App

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.provide('$data', JSON.parse(localStorage.getItem("_DATA_")))

app.use(router)
app.mount('#app')

