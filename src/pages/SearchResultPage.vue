<script setup >
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import myAxios from "../plugins/myAxios.js"
import { Toast } from "vant";
import qs from 'qs'

const route = useRoute();
const { tags } = route.query;

const userList = ref([]);
onMounted(async () => {
    // 为给定 ID 的 user 创建请求
    const userListData = await myAxios.get('/user/search/tags', {
        withCredentials: false,
        params: {
            tagNameList: tags
        },
        //序列化为字符串
        paramsSerializer: {
            serialize: params => qs.stringify(params, { indices: false }),
        }
    })
        .then(function (response) {
            console.log('/user/search/tags succed', response);
            // Toast.success('请求成功');
            const result = response?.data;
            // console.log("测试数据", result)
            if (result) {
                result.forEach(user => {
                    if (user.tags) {
                        user.tags = JSON.parse(user.tags);
                    }
                })
              
                userList.value = result;
            }
            return response.data?.data;
        })
        .catch(function (error) {
            console.log('/user/search/tags error', error);
            // Toast.success('请求失败');
        });

})


const mockUser = ref({
    id: 931,
    username: '沙鱼',
    userAccount: 'shayu',
    profile: '一条咸鱼',
    gender: 0,
    phone: '123456789101',
    email: 'shayu-yusha@qq.com',
    planetCode: '931',
    avatarUrl: 'https://img1.baidu.com/it/u=467212011,1034521901&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
    tags: ['java', 'emo', '打工中', 'emo', '打工中'],
    createTime: new Date(),
})




</script>

<template>
    <van-card v-for="user in userList" :desc="user.profile" :title="`${user.username} (${user.planetCode})`"
        :thumb="user.avatarUrl">
        <template #tags>
            <span v-for="tag in user.tags" :key="tag" style="margin-right: 8px; margin-top: 8px">
                <van-tag plain type="danger">{{ tag }}</van-tag>
            </span>
            <!-- <van-tag plain type="danger" v-for="user
                 in userList " style="margin-right: 8px; margin-top: 8px">
                {{ user.tags }}
            </van-tag> -->
        </template>
        <template #footer>
            <van-button size="mini">联系</van-button>
        </template>
    </van-card>
    <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<style scoped></style>
