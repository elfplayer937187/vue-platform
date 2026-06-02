// 封装时间判断当前是出于哪个时间段
export function getTime(){
    const time=new Date().getHours()
    let message=''
    if (time<11){
        message='早上好'
    }
    else if(time>=11 && time<=14){
        message='中午好'
    }
    else if(time>14 &&time<=17){
        message='下午好'
    }
    else{
        message='晚上好'
    }
    return message
}
