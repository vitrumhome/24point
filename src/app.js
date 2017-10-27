/**/

let operatorList = {'+' : '', '-' : '', '*': '', '/':''};

function RPN(array) {

    let tempArray = array;
    let i = 0;
    let length = array.length;
    let isBreak = false;
    let value = 0;
    try {
        let tempValue = 0;
        for (; i < length; i++) {
            if(array[i] in operatorList){
                // console.log('1',array[i],i)
                if( (parseFloat(array[i - 2]) && parseFloat(array[i - 1]) ) ){
                    // console.log('2',array,i);
                    tempValue = eval('' + parseFloat(array[i - 2]) + ' ' + array[i]+ ' ' + parseFloat(array[i - 1]));
                    array.splice(i - 2, 3, tempValue);
                }
                
                break;
            }
        }
    } catch (error) {
        console.log('error');
        return false;
    }
    

    if(array.length>1){
        return RPN(array);
    }else{
        // console.log(tempArray);
        return array[0];
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
function getNumber(tempArray){
    console.log('tempArray',tempArray);
    let tempArr = [];
    for (var i = 0; i < tempArray.length; i++) {
        for (var j = 1; j < tempArray.length; j++) {
            for (var h = 2; h < tempArray.length; h++) {
                for (var k = 3; k < tempArray.length; k++) {
                    tempArr.push([tempArray[i],tempArray[j],tempArray[h],tempArray[k]]);
                }
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
    infoBox.appendChild(newWord);
}

function callWorker(){
    
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

let handleSubmit = () =>{
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
    let count = 0;
    suffixes.forEach(function(suffElement) {
        
        allNumberList.forEach(function(numElement) {
            // console.log(suffElement);
            opt.forEach(function(optElement) {
                arrList = {'fa' : numElement[0], 'fb' : numElement[1], 'fc': numElement[2], 'fd':numElement[3]};
                // console.log('optElement',optElement,optElement.op1);
                tempList = [];
                myExp = [];
                for (var i = 0; i < suffElement.length; i++) {
                    if(suffElement[i].includes('op')){
                        // console.log(suffElement[i],optElement[suffElement[i]]);
                        tempList.push(optElement[suffElement[i]]);
                        myExp.push(optElement[suffElement[i]]);
                    }else{
                        // console.log(suffElement[i],arrList[suffElement[i]]);
                        tempList.push(arrList[suffElement[i]]);
                        myExp.push(arrList[suffElement[i]]);
                    }
                }
                count++
                console.log('No',count,myExp);
                // let myExp = tempList;
                // myExp = RPN(myExp);
                // if (myExp === 24){
                //     console.log(tempList,'get 24');
                //     addLog(tempList);
                // };
            }, this);
        }, this);
    }, this);
    // document.getElementById('console').innerText = RPN(arrList);
}


