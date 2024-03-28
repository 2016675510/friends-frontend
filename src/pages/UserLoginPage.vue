<template>
    <van-form @submit="onSubmit">
  <van-cell-group inset>
    <div class="body" >
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
  </van-cell-group>
  
   
    <van-button  block    plain type="primary" native-type="submit">
      登录
    </van-button>
   <van-cell title="注册" class="login" is-link  @click="doRegister" />
  
  
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

const doRegister=()=>{
  router.push({path:'/user/register'});
}
const onSubmit = async () => {
  const res = await myAxios.post('/user/login',{
    userAccount: userAccout.value,
    userPassword: userPassword.value,
  })
  console.log(res,'用户登录');
  if (res.code == 0 && res.data){
    // router.push({path:'/'});
    const redirectUrl=route.query?.redirect as string ?? '/';
    window.location.href=redirectUrl;
    showSuccessToast('登录成功');
  } else {
    showFailToast('登录失败')
  }
};

</script>

<style scoped>
 .login{
  margin-top: 10px;
  text-align: center;
  border: 4px   ;
 }
 .body{
  margin-top:30px;
  text-align: center;
  border: 4px   ;
 }
</style>