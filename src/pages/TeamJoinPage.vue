<script setup>
  import {useRouter} from "vue-router"
  import TeamListCard from "../components/TeamListCard.vue";
  import {onMounted, ref} from "vue";
  import myAxios from "../plugins/myAxios.js";
   import { showSuccessToast ,showFailToast } from "vant";
  const teamListC=ref([]);
  const router=useRouter();
  const value = ref('');
  const doAddTeam=()=>{
    router.push({
      path:"/team"
    })
  }

  const onSearch=(val)=>{
    searchList(val);
  }
  const onClickButton=()=>{
    searchList(value.value);
    showSuccessToast(value.value);
    console.log(value.value);
  }
  
  const searchList= async (val='')=>{
    const res=await myAxios.get("/team/list/my/join",{
      params:{
        searchText:val,
        pageNum:1,
      }});
    if(res?.code==0){
      teamListC.value=res.data;
    } 
}


  onMounted(async()=>{
    const res=await myAxios.get("/team/list/my/join")
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
  
      <team-list-card :teamList="teamListC"/>
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
