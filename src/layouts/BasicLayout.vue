
<template>
    <van-nav-bar title="Friens-Match" 
    left-text="返回" 
    left-arrow   
    @click-left="onClickLeft"
    @click-right="onClickRight">
        <template #right>
            <van-icon name="search" size="18" />
        </template>
    </van-nav-bar>
   
    <div id="content">
        <router-view />
    </div>
    <van-tabbar router  @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
    </van-tabbar>
</template>

<script setup >   
import { ref } from 'vue';
import {useRouter } from 'vue-router';
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import User from "../pages/User.vue";
import UserLogin from "../pages/UserLoginPage.vue"

const router = useRouter();
 
  const onClickLeft = () =>  {
    // alert("返回")
    // history.back()
    router.back()

   };
  const onClickRight = () => {
    // history.replaceState({},"","#/search")
     router.push('/search')
    //  location.reload();
    //  router.replace('/search')
    //  window.location.href = "#/search";
    };
  const active = ref("index");
//   const onChange = (index) => alert(` ${index}`);


</script>

<style scoped>
#content{
    padding-bottom: 50px;
}
</style>
