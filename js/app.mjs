function scrollElement(element,position,speed = 0){
   const whereToScroll = toScroll(element,position);
   if(whereToScroll>window.scrollY){
         const scrolll = setInterval(()=>{
               window.scrollTo(0,window.scrollY+30);
               if(window.scrollY>=whereToScroll) clearInterval(scrolll)
         },speed)
   }else if(whereToScroll<window.scrollY){
         const scrolll = setInterval(()=>{
               window.scrollTo(0,window.scrollY-30);
               if(window.scrollY<=whereToScroll) clearInterval(scrolll)
         },speed)
   }

}

function toScroll(element,position){
   let elementPosition
   if(element === 'top'){
         elementPosition = 0
   }else if(element === 'bottom'){
         elementPosition = document.body.clientHeight  - window.innerHeight
   }else{
         const elementInfo = document.querySelector(element).getBoundingClientRect()
         if(position === 'top'){
               elementPosition = window.scrollY + elementInfo.top
         }else if(position ==='bottom'){
               elementPosition = window.scrollY + elementInfo.bottom - window.innerHeight;
         }else{
               elementPosition = window.scrollY + elementInfo.top + elementInfo.height/2 -(window.innerHeight/2)
         }
   }
   return elementPosition;
}

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
window.addEventListener('resize',event=>{
   if(document.body.classList.contains('_burgerOpen')){
      document.body.classList.remove('_burgerOpen')
      document.body.style.overflow='';
   }
})
const footer = document.querySelector('footer');
const header = document.querySelector('header');
window.addEventListener('scroll',event=>{
   const footerTop = footer.getBoundingClientRect().top;
   const windowHeight = window.innerHeight
   if(footerTop - windowHeight < 0){
      header.style.cssText = `
      transition:.3s;
      transform:translateY(-120%);
      `
   }else{
      header.style.cssText = `
      transition:.3s;
      transform:translateY(0);
      `
   }
})

const contactsScroll = document.querySelectorAll('[data-contacts]');
if(contactsScroll.length != 0){
   for(let i =0; i < contactsScroll.length;i++){
      contactsScroll[i].addEventListener('click',event=>{
         event.preventDefault();
         scrollElement('#contacts','top')
      })
   }
}

document.addEventListener('click',event=>{
   if(event.target.dataset.scroll){
      event.preventDefault();
      if(document.body.classList.contains('_burgerOpen')){
         document.body.classList.remove('_burgerOpen');
         document.body.style.overflow = ''
      }
      scrollElement(`#${event.target.dataset.scroll}`,'top')
   }
})
