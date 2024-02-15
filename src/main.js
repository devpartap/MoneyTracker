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
    },
    {
      path: '/getCache',
      name: 'getCache',
      component: () => import("./pages/getCache.vue")
    },

  ]
})


// --- App

import { createApp } from 'vue'
import App from './App.vue'

// -- For Testing Purposes --
// import markup from './../ext/currentstoragemarkup';
// console.log(markup)
// localStorage.setItem("_DATA_", JSON.stringify(markup))
// --------------------------

const app = createApp(App)

{

  let globalveriables = {
    "groupBy_opt":1,
    "view_opt":1,
    "catagory_actv":[0,1,1,1]
  }
  app.provide('$globaldata', globalveriables)


  let inStorage = JSON.parse(localStorage.getItem("_DATA_"))

  if(inStorage == null)
  {
    console.log('dataisnull')
    inStorage = {
        "base":{"length":0},
        "required":{"length":0},
        "needs":{"length":0},
        "wants":{"length":0},
        "history":{
          "day":[],
          "devmode":false
        }
      }
  }

  if(inStorage.history.day.length)
  {
    let dte = new Date
    let ondate = inStorage.history.day[inStorage.history.day.length - 1].date.split('-');
  
    if((ondate[0] != dte.getDate()) || (ondate[1] != dte.getMonth() +1) || (ondate[2] != dte.getFullYear()))
    {   
      inStorage.history.day.push({
        "date":`${dte.getDate()}-${dte.getMonth() +1}-${dte.getFullYear()}`,
        "spend":[0,0,0,0,0]
      })
    }
  }

  app.provide('$data', inStorage)
}


app.use(router)
app.mount('#app')

