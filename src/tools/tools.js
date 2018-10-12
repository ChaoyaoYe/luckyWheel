export default {
    // 取随机数，是没增加  抽奖概率之前用到的函数
    randomNum(Min,Max){
        const Range = Max - Min;
        const Rand = Math.random();
        const num = Min + Math.round(Rand * Range);
        return num;
    },
    // 从数组中随机，取一个数，是设置了抽奖概率后，用到的函数
    randomArr(arr){
        const index = Math.floor((Math.random()*arr.length));
        return arr[index];
    }
}