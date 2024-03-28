<script setup lang="ts">
import {useRouter } from 'vue-router';
import {onMounted, ref} from "vue";
 import {getCurrentUser} from "../servise/user.ts";
import { showFailToast   } from 'vant';

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
        if(user.value.gender === 0){
          gender=ref("女");
        }else{
          gender=ref("男");
        }
        if (user.value.tags){
            user.tags = JSON.parse(user.value.tags);
            tags = user.tags.join('，');
            user.value.tags = user.tags.join('，');
           }
      } else {
        showFailToast('获取用户信息失败')
    }
    })

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
      <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username','昵称',user.username)"/>
      <van-cell title="账户" :value="user.userAccount" />
      <van-cell title="头像" is-link to="/user/edit"  @click="toEdit('avatarUrl','头像',user.avatarUrl)">
        <img style="height: 48px" :src="user.avatarUrl">
      </van-cell>
      <van-cell title="性别" is-link to="/user/edit" :value="gender" @click="toEdit('gender','性别',gender)" />
      <van-cell title="我的标签" :value="user.tags" is-link to="/user/edit"  @click="toEdit('tags','标签',user.tags)">    </van-cell>
      <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
      <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
      <van-cell title="星球编号" :value="user.planetCode" />
      <van-cell title="注册时间" :value="user.createTime"  />
    </template>
  </template>

<style scoped>
 
</style>
