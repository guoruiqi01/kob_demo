import { createRouter, createWebHistory } from 'vue-router'

import PkIndexView from '../views/pk/PkIndexView'
import RanklistIndexView from '../views/ranklist/RanklistIndexView'
import RecordIndexView from '../views/record/RecordIndexView'
import UserBotIndexView from '../views/user/bot/UserBotIndexView'
import NotFound from '../views/error/NotFound'

const routes = [
  {
    path: "/",
    redirect: '/pk/',
    name: "home",
  },
  {
    path: "/pk/",
    component: PkIndexView,
    name: "pk_index",
  },
  {
    path: "/ranklist/",
    component: RanklistIndexView,
    name: "ranklist_index",
  },
  {
    path: "/record/",
    component: RecordIndexView,
    name: "record_index",
  },
  {
    path: "/user/bot/",
    component: UserBotIndexView,
    name: "user_bot_index",
  },
  {
    path: "/404/",
    component: NotFound,
    name: "not_found",
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
