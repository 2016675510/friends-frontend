<template>
    <div
        id="teamListCard"
    >
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        thumb="https://img1.baidu.com/it/u=467212011,1034521901&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500"
        :title="`${team.name} `"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px" >
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{`队伍人数 ${team.hasJoinNum}/${team.maxNum}`}}
        </div>
        <div>
          {{'过期时间 ' + team.expireTime}}
        </div>
        <div>
          {{'创建时间 ' + team.createTime}}
        </div>
      </template>
      <template #footer>
        <van-button v-if="team.userId!=currentUser?.id && !team.hasJoin" size="mini" plain type="primary" @click="preJoinTeam(team)">加入队伍</van-button>
        <van-button v-if="team.userId==currentUser?.id" size="mini" plain type="primary" @click="doUpdateTeam(team.id)">更新队伍</van-button>
        <van-button  v-if="team.userId==currentUser?.id"  size="mini" plain type="primary" @click="doDeleteTeam(team.id)">解散队伍</van-button>
        <van-button  v-if="team.userId!=currentUser?.id && team.hasJoin" size="mini" plain type="primary" @click="doQuitTeam(team.id)">退出队伍</van-button>
      </template>
    </van-card>
    </div>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam"
              @cancel="doJoinCancel">
    <van-field v-model="password" placeholder="请输入密码"/>
  </van-dialog>
  </template>
  
  <script setup lang="ts">
  import { onMounted,ref } from "vue";
  import {TeamType} from "../assets/team.d.ts";
  import  {teamStatusEnum}   from "../constants/team.ts";
  import myAxios from "../plugins/myAxios.js";
  import { showSuccessToast ,showFailToast, Dialog } from "vant";
  import { getCurrentUser } from "../servise/user";
  import { useRouter } from "vue-router";

  const currentUser =ref({});
  const router=useRouter();
  interface TeamCardListProps{
    teamList: TeamType[];
  }

  const showPasswordDialog=ref(false);
  const password=ref('');
  const joinTeamid=ref(0);
  
  const VanDailog=Dialog.Component;

  const props = withDefaults(defineProps<TeamCardListProps>(),{
    //@ts-ignore
    teamList: [] as TeamType[],
  });
    //获取用户信息
    onMounted(async()=>{
    currentUser.value=await getCurrentUser();
  });
  // 更新队伍
  const doUpdateTeam=(id: number)=>{
    router.push(
      {
        path:"/team/update",
        query:{
          id,
        }
      })
  }
  //刷新页面
  const refreshTeamList=()=>{
    // this.reload;
    router.go(0);
  }
  

  const preJoinTeam =(team:TeamType) =>{
    joinTeamid.value=team.id;
    if(team.status===0){
      doJoinTeam()
    }else{
      showPasswordDialog.value=true;
    }
  }

  const  doJoinCancel=()=>{
    joinTeamid.value=0;
    password.value='';
  }
  //队伍列表加入队伍
  const doJoinTeam = async() =>{
  
    const res = await myAxios.post("/team/join",{
      teamId : joinTeamid.value,
      password:password.value,
    });
    if (res?.code === 0){
        showSuccessToast("加入成功")
        doJoinCancel();
    }else {
        showFailToast("加入失败" + (res.description ? `, ${res.description} `:''));
    }
    // refreshTeamList();
  }        
   //退出队伍
   const doQuitTeam = async(id: number) =>{
    const res = await myAxios.post("/team/quit",{
      teamId : id
    });
    // refreshTeamList();
    if (res?.code === 0){
        showSuccessToast("退出成功")
    }else {
        showFailToast("退出失败" + (res.description ? `, ${res.description} `:''));
    }
  }         
   //解散队伍
   const doDeleteTeam = async(id: number) =>{
    const res = await myAxios.post("/team/delete",{
      id : id
    });
    // refreshTeamList();
    if (res?.code === 0){
        showSuccessToast("解散成功")
    }else {
        showFailToast("解散失败" + (res.description ? `, ${res.description} `:''));
    }
  }                                                     
  </script>
  
  <style scoped>
  #teamListCard :deep(.van-image__img){
    height: 128px;
    object-fit: unset;
  }
  </style>