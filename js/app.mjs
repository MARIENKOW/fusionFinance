// $(document).ready(function () {
// 	$('.destinations__spoiler').slick({
// 		arrows: true,
// 		dots: true,
// 		slidesToShow: 5,
// 		slidesToScroll: 1,
// 		speed: 500,
// 		easing: 'ease-in-out',
// 		infinite: false,
// 		autoplay: true,
// 		autoplaySpeed: 4000,
// 		touchTreshold: 5,
// 		centerMode: false,
// 		focusOnSelect: false,
// 		prevArrow: $('.buy__prevArrow'),
// 		nextArrow: $('.buy__nextArrow'),
// 		responsive: [
// 			{
// 				breakpoint: 956,
// 				settings: {
//                settings:'unslick',
// 				}
// 			},
// 			{
// 				breakpoint: 600,
// 				settings: {
// 					slidesToShow: 2,
// 					slidesToScroll: 1,
// 				}
// 			}
// 		]
// 	});
// });

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