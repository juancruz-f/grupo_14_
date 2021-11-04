const db = require('../database/models');
let category = [];

db.categories.findAll()
.then(categories => categories.forEach(element =>{
 category.push(element.name)
})
    
);
let section = [];

db.sections.findAll()
.then(sections => sections.forEach(element =>{
 section.push(element.name)
})
    
);
let origen = [];
db.origenes.findAll()
.then(origenes => origenes.forEach(element =>{
 origen.push(element.name)
})

);



module.exports = {
   idCategory: (value)=> {
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

    },
    idSection : (value)=> {
        for (let i = 0; i < section.length; i++) {
            if(value == 0){
                return section[0];
            }
            else if(value == 1){
             return section[1];
         } else if(value == 2){
             return section[2];
         }
            
            
        }

    },
    idOrigen: (value)=>{
        for (let i = 0; i < origen.length; i++) {
            if(value == 0){
                return origen[0];
            }
            else if(value == 1){
             return origen[1];

    
} console.log(origen);
console.log(section);
console.log(category);
        }}}