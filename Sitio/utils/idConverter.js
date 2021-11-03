const db = require('../database/models');
let category = [];

db.categories.findAll()
.then(categories => categories.forEach(element =>{
 category.push(element.name)
})
    
);


module.exports = 
    function nombre (value) {
      /*   console.log(category); */
       for (let i = 0; i < category.length; i++) {
           if(value == 0){
               return category[0];
           }
           else if(value == 1){
            return category[1];
        } else if(value == 2){
            return category[2];
        } else if(value == 3){
            return category[3];
        } else if(value == 4){
            return category[4];
        } else if(value == 5){
            return category[5];
        }
           
           
       }

    }
