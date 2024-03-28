<template>
    <van-form @submit="onSubmit">
  <van-cell-group inset>
    <div class="login">
      <van-image
      width="100"
      height="100"
      src="https://img1.baidu.com/it/u=467212011,1034521901&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500"
    />
    </div>
  
    <van-field
      v-model="userAccout"
      name="userAccout"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="userPassword"
      type="password"
      name="userPassword"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <van-field
      v-model="checkPassword"
      type="password"
      name="checkPassword"
      label="验证"
      placeholder="确认密码"
      :rules="[{ required: true, message: '确认密码' }]"
    />
    <van-field
      v-model="userPlanetCode"
       name="userPlanetCode"
      label="学号"
      placeholder="学号"
      :rules="[{ required: true, message: '请填写学号' }]"
    />
  </van-cell-group>
  <div style="margin: 16px;"  class="login">
    <van-button     plain type="success" native-type="submit">
      注册
    </van-button>
  </div>
  
  
  </van-form>
</template>

<script setup lang="ts">
import {useRouter,useRoute} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import { showSuccessToast, showFailToast } from 'vant';
const router = useRouter();
const route = useRoute();
const userAccout = ref('');
const userPassword = ref('');
const  userPlanetCode=ref('');
const checkPassword=ref('');

 
const onSubmit = async () => {
    if(checkPassword.value===userPassword.value){
      const res = await myAxios.post('/user/register',{
      userAccount: userAccout.value,
      userPassword: userPassword.value,
      planetCode: userPlanetCode.value,
      checkPassword: checkPassword.value,
      })
      if (res.code == 0 && res.data){
        router.push({path:'/user/login'});
    
        showSuccessToast('注册成功');
      } else {
        showFailToast('注册失败');
      }
    }else{
      showFailToast('密码验证失败');
      userPassword.value='';
      checkPassword.value='';
    }
  
};

</script>

<style scoped>
 .login{
  margin-top: 10px;
  text-align: center;
  border: 4px   ;
 }
</style>