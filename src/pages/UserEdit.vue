<script  setup  >
import {useRoute, useRouter} from "vue-router";
import { ref } from "vue";
import myAxios from "../plugins/myAxios.js";
import { showSuccessToast ,showFailToast } from "vant";
import {getCurrentUser} from "../servise/user.ts";

const route = useRoute();
const router = useRouter();
const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})

// if(editUser.value.editKey==='gender'){
//     if(editUser.value.currentValue===1 ){
//       editUser.value.currentValue='男';
//     }else if(editUser.value.currentValue===0 )  {
//       editUser.value.currentValue='女';
//     }
//   }
const onSubmit = async () => {
  //获取用户信息
const currentUser = await getCurrentUser();
  if(!currentUser){
    showToast('用户未登录');
    return;
  }
  //前端输入为中文，修改整数进行请求
  if(editUser.value.editKey==='gender'){
    if(editUser.value.currentValue=== '男'){
      editUser.value.currentValue=1;
    }else{
      editUser.value.currentValue=0;
    }
  }

  //如果修改的是tag，转为json
  if(editUser.value.editKey==='tags'){
    const tagsArray = editUser.value.currentValue.split('，');
    editUser.value.currentValue = JSON.stringify(tagsArray);
   }

const res = await myAxios.post('/user/update', {
        'id': currentUser.id,
        [editUser.value.editKey ]:editUser.value.currentValue
    })
    if(res.code === 0 && res.data>0){
            router.back();
            showSuccessToast('修改成功');
        }else{
            showFailToast('修改失败');
        }
  console.log('onSubmit='+values)
}
</script>

<template>
    <van-form @submit="onSubmit">
        <van-field
            v-model="editUser.currentValue"
            :name="editUser.editKey"
            :label="editUser.editName"
            :placeholder="`请输入${editUser.editName}`"
        />
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </template>

<style scoped>
 
</style>
