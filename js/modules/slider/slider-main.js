import Slider from "./slider";

export default class MainSlider extends Slider {
   constructor(btns) {
      super(btns);
   }

   showSlides(n) {

      if (n > this.slides.length) {
         this.slideIndex = 1;
      }
      if (n < 1) {
         this.slideIndex = this.slides.length;
      }

      try {
         this.hanson.style.opacity = '0';

         if (n === 3) {
            this.hanson.classList.add('animated');
            setTimeout(() => {
               this.hanson.style.opacity = '1'
               this.hanson.classList.add('slideInLeft');
            }, 3000);
         } else {
            this.hanson.firstElementChild.addEventListener('click', () => {
               this.hanson.style.display = 'none';
            })
         }
      } catch (error) { }

      this.slides.forEach(slide => {
         slide.style.display = 'none';
         slide.classList.remove('animated', 'slideInUp');
      });

      this.slides[this.slideIndex - 1].classList.add('animated', 'slideInUp');
      this.slides[this.slideIndex - 1].style.display = 'block';
   }

   plusSlides(n) {
      this.showSlides(this.slideIndex += n);
   }

   moduleTriggers(selectors, counter) {

      document.querySelectorAll(selectors).forEach(item => {
         item.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.plusSlides(counter);
         })
      });
   }

   bindTriggers() {

      this.btns.forEach(btn => {
         btn.addEventListener('click', () => {
            this.plusSlides(1);
         });
         if (!btn.parentNode.previousElementSibling.classList.contains('module__info-book')) {

            btn.parentNode.previousElementSibling.addEventListener('click', e => {

               e.preventDefault();
               this.slideIndex = 1;
               this.showSlides(this.slideIndex);
               this.slides[this.slideIndex - 1].classList.remove('slideInUp');
               this.slides[this.slideIndex - 1].classList.add('slideInDown');
            })
         }
      });

      this.moduleTriggers('.prevmodule', -1);
      this.moduleTriggers('.nextmodule', 1);

   }

   render() {

      if (this.container) {
         try {
            this.hanson = document.querySelector('.hanson');
         } catch (error) { }

         this.bindTriggers();
         this.showSlides(this.slideIndex);
      }
   }
}
