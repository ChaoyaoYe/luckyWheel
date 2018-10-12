export default {
    randomNum(Min,Max){
        const Range = Max - Min;
        const Rand = Math.random();
        const num = Min + Math.round(Rand * Range);
        return num;
    }
}