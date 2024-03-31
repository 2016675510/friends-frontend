import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import User from "../pages/User.vue";
import SeacherPage from "../pages/SearchPage.vue";
import UserEdit from "../pages/UserEdit.vue";
import SearchResult from "../pages/SearchResultPage.vue"
import UserLogin from "../pages/UserLoginPage.vue"
import UserRegister from "../pages/UserRegisterPage.vue"

import UserUpdate from "../pages/UserUpdate.vue"
import TeamAdd from "../pages/TeamAddPage.vue"

import TeamUpdate from "../pages/TeamUpdatePage.vue"
import TeamCreate from "../pages/TeamCreatePage.vue"
import TeamJoin from "../pages/TeamJoinPage.vue"
import UserUploadAvartor from "../pages/UserUploadAvartor.vue"

// 定义一些路由
const routes =[
{ path:'/', component: Index },
{ path: '/team', component: Team },
{ path: '/user', component: User },
{ path: '/search', component: SeacherPage },
{ path: '/user/edit', component: UserEdit },
{ path: '/user/list', component: SearchResult },
{ path: '/user/login', component: UserLogin },
{ path: '/user/register', component: UserRegister },
{ path: '/user/edit/upload', component: UserUploadAvartor },


{ path: '/team/add', component: TeamAdd },
{ path: '/team/update', component: TeamUpdate },
{ path: '/team/join', component: TeamJoin },
{ path: '/team/create', component: TeamCreate },
{ path: '/user/update', component: UserUpdate },
]
export default routes;