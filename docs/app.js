/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accAdd(arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}
 
//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg) {
    return accAdd(arg, this);
};
/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
 
// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.sub = function (arg) {
    return accMul(arg, this);
};
/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
 
// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg) {
    return accMul(arg, this);
};
/** 
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}
 
//给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg) {
    return accDiv(this, arg);
};

    
    
let operatorList = {'+' : '', '-' : '', '*': '', '/':''};
function hasDot(num){
    if(!isNaN(num)){
        return ( (num + '').indexOf('.') != -1 ) ? num: num.toFixed(2);   
    }
}

function RPN(array) {

    let i = 0;
    let length = array.length;
    let isBreak = false;
    let value = 0;
    try {
        let tempValue = 0;
        let tempExpWord ='';
        for (; i < length; i++) {
            if(array[i] in operatorList){
                // console.log('1',array[i],i)
                if( (parseFloat(array[i - 2]) && parseFloat(array[i - 1]) ) ){
                    // console.log('2',array,i);
                    // tempValue = 9;
                    // tempValue = eval('' + parseFloat(array[i - 2]) + ' ' + array[i]+ ' ' + parseFloat(array[i - 1]));
                    
                    switch(array[i])
                    {
                    case '+':
                        tempValue = accAdd( parseFloat(array[i - 2]) , parseFloat(array[i - 1]) );
                        // tempValue = parseFloat(array[i - 2]) + parseFloat(array[i - 1]) ;
                        break;
                    case '-':
                        tempValue = accSub( parseFloat(array[i - 2]) , parseFloat(array[i - 1]) );
                        // tempValue = parseFloat(array[i - 2]) - parseFloat(array[i - 1]) ;
                        break;
                    case '*':
                        tempValue = accMul( parseFloat(array[i - 2]) , parseFloat(array[i - 1]) );
                        // tempValue = parseFloat(array[i - 2]) * parseFloat(array[i - 1]) ;
                        break;
                    case '/':
                        tempValue = accDiv( parseFloat(array[i - 2]) , parseFloat(array[i - 1]) );
                        // tempValue = parseFloat(array[i - 2]) / parseFloat(array[i - 1]) ;
                        break;
                    default:
                        break;
                    }
                    // console.log('tempValue',tempValue);
                    // tempValue = (new Function("","return "+tempExpWord))();
                    if( !Number.isInteger(tempValue) ) {
                        // console.log('hasDot(tempValue)',tempValue,hasDot(tempValue))
                        return false;
                    }else {
                        array.splice(i - 2, 3, tempValue);
                    }
                    
                }
                break;
            }
        }
    } catch (error) {
        console.log('error');
        return false;
    }
    

    if(array.length>1){
        // console.log(array);
        return RPN(array);
    }else{
        if(array[0] === 24){
            // console.log('RPN',backExp[c]);
            return array[0];
        }else{
            return false;
        }
    }
}


function getOpt(optList){
    // console.log('opt')
    // let optList = ['+' , '-' , '*', '/'];
    let tempArr = [];
    for (var i = 0; i < optList.length; i++) {
        for (var j = 0; j < optList.length; j++) {
            for (var h = 0; h < optList.length; h++) {
                tempArr.push( { 
                    op1 :  optList[i],
                    op2 :  optList[j],
                    op3 :  optList[h]
                 } );
            }
        }
    }
    // console.log("tempArr",tempArr)
    return tempArr;
}
let tranfromWord;
function rRNP(array){
    let tempValue = 0;
    for (let i = 0; i < array.length; i++) {
        if(array[i] in operatorList){
            if( (parseFloat(array[i - 2]) && parseFloat(array[i - 1]) ) ){
                tranfromWord =  tranfromWord + ', ' + array[i - 2] + ' ' + array[i] + ' ' + array[i - 1];
                tempValue = eval('' + parseFloat(array[i - 2]) + ' ' + array[i]+ ' ' + parseFloat(array[i - 1]));
            }
            array.splice(i - 2, 3, tempValue);
        }
    }
    if(array.length>1){
        // console.log(array);
        return rRNP(array);
    }else{
        return array[0];
    }
}
function tranfrom(info){
    
    
    tranfromWord = info;
    rRNP(info);
    return tranfromWord;
}
function addLog(info){
    let infoBox = document.getElementById('console');
    let newWord = document.createElement("div");
    
    // console.log(typeof info,'info', info);
    if((typeof info) === 'object'){
        console.log('info',info.length,info);
        newWord.innerHTML = tranfrom(info);
    }else{
        newWord.innerHTML = info;
    }
    infoBox.insertBefore(newWord,infoBox.childNodes[0]);
}
function upStatus(){
    let infoBox = document.getElementById('status');
    infoBox.innerHTML = (c / golExp.length * 100).toFixed(2) + '%';
}

let t,c=0;
function timedCount(){   
    
    // console.log(exp);
    // if(c < golExp.length){
    //     let tempExp = golExp[c];
    //     console.log('tempExp',tempExp,c, (new Date()).valueOf() );
    //     // if (RPN(tempExp) === 24){
    //     //     console.log(golExp[c],'get 24');
    //     //     addLog(golExp[c]);
    //     // };
    //     t=setTimeout(timedCount(),3000);
    // }else{
    //     clearTimeout(t);
    // }
    let tempExp =[];
    var iCount = setInterval(function(){
        
        if(c === golExp.length - 1 ){
            clearInterval(iCount);
            addLog('完成计算！');
            let infoBox = document.getElementById('status');
            infoBox.innerHTML =  '100%';
            return false;
        }
        if(Number.isInteger(c/10)){
            upStatus();
        }
        c += 1;
        for (var i = 0; i < golExp[c].length; i++) {
            // console.log(golExp[c][i]);
            tempExp.push(golExp[c][i]);
        }

        // console.log('tempExp',tempExp,c, (new Date()).valueOf());
        if (RPN(tempExp) === 24){
            // console.log(backExp[c],c,'get 24');
            addLog(backExp[c]);
        }else{
            tempExp = []; 
        };
        // console.log('tempExp',tempExp,c, (new Date()).valueOf());
    }, 1);

    

}
let golExp ;
function callWorker(exp){
    golExp = exp;
    timedCount();
}

const opt = getOpt(['+' , '-' , '*', '/']);

/*
* (A(B(CD))) => A B C D op3 op2 op1
* (A((BC)D)) => A B C op2 D op3 op1
* ((AB)(CD)) => A B op1 C D op3 op2
* ((A(BC))D) => A B C op2 op1 D op3
* (((AB)C)D) => A B op1 C op2 D op3
*/ 
const suffixes = [
        ['fa','fb','fc','fd','op3','op2','op1'],
        ['fa','fb','fc','op2','fd','op3','op1'],
        ['fa','fb','op1','fc','fd','op3','op2'],
        ['fa','fb','fc','fd','op3','op2','op1'],
        ['fa','fb','fc','fd','op3','op2','op1'],
    ]

// let workedList = {成功表达式}
let backExp = [];
let handleSubmit = () =>{
    backExp = [];
    c=0;
    addLog('开始计算！');
    let fa = document.getElementById('fa').value ,
        fb = document.getElementById('fb').value ,
        fc = document.getElementById('fc').value ,
        fd = document.getElementById('fd').value ;
    // let allNumberList = getNumber([fa , fb , fc , fd ]);
    let allNumber = Combinatorics.permutation([fa , fb , fc , fd]);
    let allNumberList = allNumber.toArray();
    let arrList = {};

    console.log(suffixes,allNumberList,opt);
    let tempList = [];
    let myExp = [];
    suffixes.forEach(function(suffElement) {
        allNumberList.forEach(function(numElement) {
            // console.log(suffElement);
            opt.forEach(function(optElement) {
                arrList = {'fa' : numElement[0], 'fb' : numElement[1], 'fc': numElement[2], 'fd':numElement[3]};
                // console.log('optElement',optElement,optElement.op1);
                tempList = [];
                for (var i = 0; i < suffElement.length; i++) {
                    if(suffElement[i].includes('op')){
                        // console.log(suffElement[i],optElement[suffElement[i]]);
                        tempList.push(optElement[suffElement[i]]);
                    }else{
                        // console.log(suffElement[i],arrList[suffElement[i]]);
                        tempList.push(arrList[suffElement[i]]);
                    }
                }
                myExp.push(tempList);
                backExp.push(tempList);
            }, this);
        }, this);
    }, this);
    console.log('myExp',myExp);
    callWorker(myExp);

}


