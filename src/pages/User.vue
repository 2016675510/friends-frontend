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
            tags = tags.split('，');
            // user.tags = JSON.stringify(user.tags);
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

  //退出登录
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
 
      <van-row class="sendInfo">
        <van-col   class="flex   topInfo  ">
          <!--左边头像部分-->
 
               <van-image    :src=" user.avatarUrl"  round  style="width: 78px; height: 78px; border-radius: 50%" />
          <!--右边部分-->
          <van-space direction="vertical"    size="1" >
            <van-cell  :title="user.username"  class="flex"  />
            <van-cell     icon="edit">
            <van-space direction="horizontal"    size="3" style="margin-left: 3px; " >
                <van-tag plain type="danger" v-for="tag in tags " style="margin-right: 6px; ">
                    {{ tag }}
                </van-tag> 
            </van-space>
            </van-cell>
          </van-space>
          <van-space direction="vertical"    size="1" >
          </van-space>
        </van-col>
        
</van-row>

    
      <van-row>
          <!-- <van-cell icon="photo-o" title="头像" is-link center>
          <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" preview-size="60px">
            <img :src="imgSrc" style="width: 48px;height: 48px;border-radius: 50%" alt=""/>
          </van-uploader>
      </van-cell> -->
      <!-- <van-cell title="昵称"   :value="user.username"/> -->
      <!-- <van-cell title="账户" :value="user.userAccount" /> -->
     
      <van-cell title="电话" :value="user.phone" />
      <van-cell title="邮箱" :value="user.email" />   
       <van-cell title="修改信息" is-link to="/user/update" />
      <van-cell title="我创建的队伍" is-link to="/team/create" />
      <van-cell title="我加入的队伍" is-link to="/team/join" />
      <van-cell title="退       出"  class="louout"  @click="showLogout = true" />
      <van-popup v-model:show="showLogout" center position="bottom">
          <van-cell title="退 出"  class="louout"     height="75px" @click="doLoginOut"   />
          <van-cell title="取 消"   class="louout"   @click="showLogout = false "   />
      </van-popup>
 
      </van-row>
       
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
 :deep(.van-uploader__upload) {
  border-radius: 50%;
}

:deep(.van-uploader__preview-image) {
  border-radius: 50%;
}

:deep(.van-cell) {
  padding-left: 23px;
  padding-right: 16px;
}
 /* ///////////////// */
 .flex {
   display: flex;
   top: 15px;
  float: left;
   background-color: transparent;
}
.flexB{
  left:17px;
  background-color: transparent;
}
.sendInfo{
  margin-left: 10px;
  height: 100px;
}
.topInfo {
  align-items: center;
  background-color: transparent;
   border-radius: 24px;
}
.arrart {
  left: 10px;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  
}
.personCompany {
  position: absolute;
  top: 60px;
  left: px;
  font-size: 0.7rem;
  width: 65px;
  height:25px;
  text-align: center;
  background: #333440;
  border-radius: 50px;
  color: #ffdd99;
 
  line-height: 25px;
}
.rightVip {
  width: 552px;
  align-items: center;
}
</style>
