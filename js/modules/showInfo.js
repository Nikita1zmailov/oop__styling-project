export default class ShowInfo {
   constructor(triggers) {
      this.btns = document.querySelectorAll(triggers);
   }

   init() {
      this.btns.forEach(btn => {
         const sibling = btn.closest('.module__info-show').nextElementSibling;
         sibling.classList.add('animated', 'fadeIn');
         btn.addEventListener('click', () => {

            sibling.classList.toggle('msg');

            sibling.style.marginTop = '20px';
         });
      });
   }
}