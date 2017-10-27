/**/

    
    
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
                        tempValue = parseFloat(array[i - 2]) + parseFloat(array[i - 1]) ;
                        break;
                    case '-':
                        tempValue = parseFloat(array[i - 2]) - parseFloat(array[i - 1]) ;
                        break;
                    case '*':
                        tempValue = parseFloat(array[i - 2]) * parseFloat(array[i - 1]) ;
                        break;
                    case '/':
                        tempValue = parseFloat(array[i - 2]) / parseFloat(array[i - 1]) ;
                        break;
                    default:
                        break;
                    }
                    // console.log('tempValue',tempValue);
                    // tempValue = (new Function("","return "+tempExpWord))();
                    if(tempValue<1 && hasDot(tempValue)){
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

function addLog(info){
    let infoBox = document.getElementById('console');
    let newWord = document.createElement("div");
    newWord.innerHTML = info;
    infoBox.insertBefore(newWord,infoBox.childNodes[0]);
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
            return false;
        }
        c += 1;
        for (var i = 0; i < golExp[c].length; i++) {
            // console.log(golExp[c][i]);
            tempExp.push(golExp[c][i]);
        }

        // console.log('tempExp',tempExp,c, (new Date()).valueOf());
        if (RPN(tempExp) === 24){
            console.log(backExp[c],c,'get 24');
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


