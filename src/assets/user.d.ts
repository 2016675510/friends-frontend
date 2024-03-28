/**
 * 用户类别
 */
export type userType = {
    id : number,
    username : string;
    userAccount : string;
    avatarUrl ?: string;
    gender : number;
    profile ?: string;
    phone : string;
    planetCode : number;
    email : string;
    userstatus : string;
    userRole : string;
    planetcode : string; 
    tags : string[];
    createTime : Date;
}