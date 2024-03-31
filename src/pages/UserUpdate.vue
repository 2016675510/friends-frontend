<script setup lang="ts">
import {useRouter } from 'vue-router';
import {onMounted, ref} from "vue";
 import {getCurrentUser} from "../servise/user.ts";
import { showFailToast   } from 'vant';
import myAxios from "../plugins/myAxios.js";
import * as imageConversion from 'image-conversion'
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
        imgSrc.value=user.value.avatarUrl;
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

         //上传图片
    
const fileList = ref([])
const imgSrc = ref('')
const filename = ref('')

const beforeRead = async () => {
  return new Promise((resolve, reject) => {
    console.log('压缩前', fileList.value[0].file)
    imageConversion.compressAccurately(fileList.value[0].file, 400).then(res => {
      fileList.value[0].file = new File([res], fileList.value[0].file.name, { type: res.type, lastModified: Date.now() })
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}



const afterRead =async()  => {
  await beforeRead();
  console.log('压缩后', fileList.value[0].file)
   let formData=new FormData();
  formData.append("file",fileList.value[0].file)
  const res=await myAxios.post("/common/upload",formData,{
    headers:{
      'Content-Type':'multipart/form-data'
    }
  })
   if(res?.data.code===0){
    imgSrc.value=res?.data;
    console.log(res?.data.data)
  }else{
    imgSrc.value=res?.data;
    console.log(res?.data)

  }
  fileList.value = []
}
 
  



</script>

<template>
    <template v-if="user">

      <van-row>
        <van-cell title="头像"   center>
          <van-uploader v-model="fileList" :max-count="1"    :after-read="afterRead" preview-size="60px">
            <img :src="imgSrc" style="width: 68px;height: 68px;border-radius: 50%" alt=""/>
          </van-uploader>
      </van-cell> 
      <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username','昵称',user.username)"/>
      <van-cell title="账户" :value="user.userAccount" />
    
      
      <van-cell title="性别" is-link to="/user/edit" :value="gender" @click="toEdit('gender','性别',gender)" />
      <van-cell title="我的标签" :value="user.tags" is-link to="/user/edit"  @click="toEdit('tags','标签',user.tags)">    </van-cell>
      <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
      <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
      <van-cell title="学号" :value="user.planetCode" />
      <van-cell title="注册时间" :value="user.createTime"  />
      </van-row>
    </template>
  </template>

<style scoped>
 
</style>
