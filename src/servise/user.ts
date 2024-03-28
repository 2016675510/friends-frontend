import myAxios from "../plugins/myAxios.js";
import { setCurrentUserState } from "../states/user";

export const getCurrentUser = async () =>{
    const res=await myAxios.get('/user/current');
    if(res.code === 0){
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}