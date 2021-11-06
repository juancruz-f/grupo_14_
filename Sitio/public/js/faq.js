let acc = document.getElementsByClassName('accordion');
let i ;
let len = acc.length;
for (let i = 0; i < len; i++) {
    acc[i].addEventListener('click', function() {
      this.classList.icon-a('active');
      let panel = this.nextElementSibling;
      if(panel.style.maxHeight){
          panel.style.maxHeight = null;
      }else {
          panel.style.maxHeight = panel.scrollHeight + 'px'
      }
    })
    
}