import requst from "@/utils/requst";


//登录方法
export function getAccountById(accountId){

    return requst({
        url:'/account/account/' + accountId,
        method: 'get',
    });

}
