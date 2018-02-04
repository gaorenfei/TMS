/* ================ 校验整数.保留一位小数 ================ */
export const checkDecimal = (num, maxNum, isZero)=>{
    var n = 0;
    var reg = new RegExp("^[0-9]*$");
    for(let i=0 ; i<num.length; i++){
        if(!reg.test(num[0])){
            return true
        }else{
            if(num[i] == '.'){
               n ++ ;
            }
            if(!reg.test(num[i]) && num[i] != '.'){
                 return true
            }
            if(num[i] == '.' && num[i + 3] !== undefined){
                return true
            }
        }
    }
    if(n > 1 || n == 1 && num >= maxNum || num > maxNum){
        return true;
    }else{
        if(isZero && num == 0 && num != ''){
            return true
        }
        return false;
    }
}


/* ================ 浅拷贝 ================ */
export const simpleClone=(initalObj) =>{
    var obj = {}
    for( var i in initalObj) {
       obj[i] = initalObj[i]
    }
    return obj
}

/* ================ 深拷贝 ================ */
export const deepClone=(source) =>{ 
    var result={};
    for (var key in source) {
          result[key] = typeof source[key]==='object'? deepClone(source[key]): source[key];
    } 
    return result; 
}