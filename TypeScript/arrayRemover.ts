function arrayRemover(name:string, myArr:string[]){

    
        let index = myArr.indexOf(name);
        console.log(index);
        if(index > -1){
            myArr.splice(index, 1);
        }
        //state.currentCoins = state.currentCoins.splice(index, 0);
    


}

let somewords = ['arrays', 'in', 'typescript', 'suck'];
arrayRemover('in', somewords);
console.log(somewords);