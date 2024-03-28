<script setup lang="ts">
  import {useRouter} from "vue-router"
  import TeamListCard from "../components/TeamListCard.vue";
  import {onMounted, ref} from "vue";
  import myAxios from "../plugins/myAxios.js";
   import { showSuccessToast ,showFailToast } from "vant";
  const teamListC=ref([]);
  const router=useRouter();
  const loading = ref(false);

  const active=ref('public');
  const searchText=ref('');
  const doAddTeam=()=>{
    router.push({
      path:"/team/add"
    })
  }

  const onSearch=(val)=>{
    searchList(val);
  }
  const onClickButton=()=>{
    searchList(searchText.value);
    showSuccessToast(searchText.value);
    console.log(searchText.value);
  }
  // 切换查询状态
  const onTabChange=(name)=>{
    if(name==='public'){
      //公开
      searchList(searchText.value,0);
    }else{
      //加密
      searchList(searchText.value,2);
    }
  }
    //刷新页面
  const onRefresh=()=>{
    // this.reload;
    // router.go(0);
    searchList(searchText.value,0);

    loading.value = false;
  }
  
  
  const searchList= async (val='',status=0)=>{
    const res=await myAxios.get("/team/list",{
      params:{
        searchText:val,
        pageNum:1,
        status,
      }
    });
    if(res?.code==0){
      teamListC.value=res.data;
 
    } 
  }


  onMounted(async()=>{
    const res=await myAxios.get("/team/list");
    if(res?.code===0){
      teamListC.value=res?.data;
      // showSuccessToast("加载成功");
 
    }else{
      showFailToast("加载队伍失败，请刷新！");
    }
  })

</script>

<template>
    <div id="teamPage">
      <van-search
        v-model="searchText"
        show-action
        placeholder="搜索队伍"
        @search="onSearch"
      >
        <template #action>
          <div @click="onClickButton">确认</div>
        </template>
      </van-search>
      <van-tabs v-model:active="active" @change="onTabChange">
        <van-tab title="公开" name="public"/>
        <van-tab title="加密" name="private"/>
      </van-tabs>
     
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <team-list-card :teamList="teamListC"/>
      </van-pull-refresh>
  
    
      <van-button class="add-button" type="primary"  icon="plus" @click="doAddTeam"/> 
 
    </div>
</template>

<style scoped>
  .add-button{
    position: fixed;
    bottom: 60px;
    width: 50px;
    right: 12px;
    height: 50px;
    border-radius: 50%;
    z-index: 1;
}
</style>
