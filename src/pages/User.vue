<script setup lang="ts">
import {useRouter } from 'vue-router';
import {onMounted, ref} from "vue";
 import {getCurrentUser} from "../servise/user.ts";
import { showFailToast   } from 'vant';
import myAxios from "../plugins/myAxios.js";
import qs from 'qs'

    // const user = {
    //     id : 9527,
    //     username : 'shayy',
    //     userAccount : '931',
    //     avatarUrl : 'https://xinggiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/shayu931/shayu.png',
    //     gender :'男',
    //     phone :'430821',
    //     email : 'shayu-yusha@qq.com',
    //     planetCode : '931',
    //     createTime : new Date(),
    // }
    const user =ref();
    const router = useRouter();
    let gender=ref("男");
    let tags=ref("");
    //获取当前用户信息
    onMounted(async () =>{
    const res = await getCurrentUser();
      if (res){
          user.value = res;
          //标签
          if (user.value.tags){
            user.tags = JSON.parse(user.value.tags);
            tags = user.tags.join('，');
            user.value.tags = user.tags.join('，');
           }
        } else {
          showFailToast('获取用户信息失败')
      }
    
    })
    const doAddTeam=()=>{
    router.push({
      path:"/team"
    })
  }
  const showLogout=ref(false);
    const doLoginOut=  async () => {
      const res=await myAxios.post("/user/logout");
      console.log(res?.code);
      if (res?.code === 0){
             router.push({
                path:'/user/login',
                replace:true,
            });
      } else {
        showFailToast('退出失败')
    }
    }

    const toEdit = (
        editKey: string,
        editName: string,
        currentValue: string
        ) =>{
            router.push({
            path:'/user/edit',
            query: {
                editKey,
                editName ,
                currentValue,
            }
        })
    }
   

</script>

<template>
    <template v-if="user">
      <van-cell title="头像"   >
        <img style="height: 45px" :src="user.avatarUrl">
      </van-cell>
      <van-cell title="昵称"   :value="user.username"/>
      <van-cell title="账户" :value="user.userAccount" />
       <van-cell title="电话" :value="user.phone" />
      <van-cell title="邮箱" :value="user.email" />
      <van-cell title="我的标签" :value="tags"  >    </van-cell>
      <van-cell title="修改信息" is-link to="/user/update" />
      <van-cell title="我创建的队伍" is-link to="/team/create" />
      <van-cell title="我加入的队伍" is-link to="/team/join" />
      <van-cell title="退       出"  class="louout"  @click="showLogout = true" />
      <van-popup v-model:show="showLogout" center position="bottom">
          <van-cell title="退 出"  class="louout"     height="75px" @click="doLoginOut"   />
          <van-cell title="取 消"   class="louout"   @click="showLogout = false "   />
      </van-popup>
      <div class="container">
        <!-- <van-button @click="doLoginOut" color="#7232dd"    type="success" block>退出登录</van-button> -->
        <!-- <van-button round color="#7232dd"  @click="doLoginOut" type="success">退   出</van-button> -->
      </div>
    </template>
  </template>

<style scoped>
 .container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
 }
 .louout{
  margin-top: 10px;
  text-align: center;
  border: 4px   ;
 }
</style>
