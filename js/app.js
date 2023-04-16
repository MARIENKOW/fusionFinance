const burger = document.querySelector('.header__burger');
if(burger){
   burger.addEventListener('click',event=>{
      if(!document.body.classList.contains('_burgerOpen')){
         document.body.classList.add('_burgerOpen');
         document.body.style.overflow = 'hidden'
      }else{
         document.body.classList.remove('_burgerOpen');
         document.body.style.overflow = ''
      }
   })
}