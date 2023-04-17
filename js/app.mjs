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

const send = document.querySelector('._ajaxFormSend');

send.addEventListener('click',event=>{
   event.preventDefault();

   const block = document.querySelector('.contacts__main');

   if(!validateForm(block) || send.classList.contains('_formSended')) return

   send.classList.add('_formSended');

   const img = document.createElement('img');
   img.src = 'img/contacts/load.gif';
   img.style.cssText = `
   width:30px;
   height:30px;
   margin: 0 0 0 10px;
   position:relative;
   z-index:2;
   `
   send.appendChild(img);

   const formData  = new FormData();

   formData.append('name',block.querySelector('input[data-type="name"]').value)
   formData.append('surname',block.querySelector('input[data-type="surname"]').value)
   formData.append('mail',block.querySelector('input[data-type="mail"]').value)
   formData.append('phone',block.querySelector('input[data-type="phone"]').value)
   formData.append('question',block.querySelector('input[data-type="question"]').value)

   const xhr = new XMLHttpRequest();
   xhr.open('POST', '../php/send.php');
   xhr.send(formData);
   xhr.onload = function() {
      if (xhr.status != 200) {
         send.removeChild(img);
         alert("something went wrong please try again later"); 
         send.classList.remove('_formSended');

      } else { 
         if(xhr.response === 'true'){
            send.innerHTML=`
            <svg class='_goodSend' style='width:30px;height:25px;fill:green;position:relative;z-index:2'>
               <use xlink:href="#arrow2"></use>
            </svg>`;
         }else{
            send.removeChild(img);
            alert("something went wrong please try again later");
            send.classList.remove('_formSended');
         }
      }
   };
   xhr.onerror = function() {
      send.removeChild(img);
      alert("something went wrong please try again later");
      send.classList.remove('_formSended');
   };
})

function validateForm(form){
   const inputs = [...form.querySelectorAll('input')];
   const badInputs = inputs.filter(input=>checkInput(input))
   console.log(badInputs);
   if(badInputs.length > 0 ){
      badInputs.forEach(input=>{
         input.parentElement.classList.add('_badInput');
         input.addEventListener('input',deleteCheck)
      })
      return false
   }
   return true
}

function deleteCheck(event){
   event.target.parentElement.classList.remove('_badInput');
   event.target.removeEventListener('input',deleteCheck);
}

function checkInput(input){
   if(input.dataset.type === 'name'){
      if(input.value.length <= 2)return true
   }
   if(input.dataset.type === 'surname'){
      if(input.value.length <= 2)return true
   }
   if(input.dataset.type === 'phone'){
      if(input.value.length <= 10)return true
   }
   if(input.dataset.type === 'mail'){
      return !String(input.value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
   }
   if(input.dataset.type === 'question'){
      if(input.value.length < 15)return true
   }
   return false
}
