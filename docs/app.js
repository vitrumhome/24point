/**/

function RPN(array) {
    var i = 0;
    var length = array.length;
    var isBreak = false;
    var value = 0;
    var operatorList = {'+' : '', '-' : '', '*': '', '/':''};
    for (; i < length; i++) {
        if(array[i] in operatorList){
            array.splice(i - 2, 3, eval('' + parseFloat(array[i - 2]) + array[i] + parseFloat(array[i - 1])));
            break;
        }
    }
    console.log('RPN',array);
    if(array.length>1){
        return RPN(array);
    }else{
        return array[0];
    }
}



const opt = ()=>{
    var operatorList = {'+' : '', '-' : '', '*': '', '/':''};


    return []
}

const suffixes = [
        ['A','B','C','D','op3','op2','op1'],
        []
    ]

let workedList = {成功表达式}




