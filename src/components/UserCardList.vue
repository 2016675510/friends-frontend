<script setup lang="ts">
   import{ userType } from "../assets/user"
   interface UserCardListProps{
    loading:boolean;
    userList:userType[];
   }
   const props=withDefaults(defineProps<UserCardListProps>(),{
    loading: true,
    userList:[] as userType[],
   });
</script>

<template>
<van-skeleton title avatar :row="3" :loading="props.loading"  >
  <van-card v-for="user in props.userList" 
        :desc="user.profile" 
        :title="`${user.username} (${user.planetCode})`"
        :thumb="user.avatarUrl">

        <template #tags>
            <span v-for="tag in user.tags" :key="tag" style="margin-right: 4px; margin-top: 18px">
                <van-tag plain type="danger" style="margin-right: 4px; margin-top: 15px">{{ tag }}</van-tag>
            </span>
            <!-- <van-tag plain type="danger" v-for="user
                 in userList " style="margin-right: 8px; margin-top: 8px">
                {{ user.tags }}
            </van-tag> -->
        </template>
        <template #footer>
            <van-button style="width: 75px; margin-right: 10px; margin-bottom: 10px;" plain type="primary"    size="mini">联系</van-button>
        </template>
    </van-card>
    <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</van-skeleton>
</template>

<style scoped>
 
</style>
