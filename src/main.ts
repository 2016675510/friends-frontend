import { createApp } from 'vue'
import  App from './App.vue'
import {Icon,Popup,Toast,Button,DatePicker , NavBar,Tabbar, TabbarItem , Search, Tag,Card,Image as VanImage  } from 'vant';
import * as VueRouter from 'vue-router';
import routes from "./config/router";
 import Vant from 'vant';
import 'vant/lib/index.css'
import './global.css'

const app = createApp(App);
app.use(Vant);
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
  })
app.use(Search);
app.use(VanImage);
app.use(Popup);
app.use(DatePicker);
app.use(Card);
app.use(Tag);
app.use(router);
app.use(Button);
app.use(NavBar);
app.use(Toast);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.mount('#app')