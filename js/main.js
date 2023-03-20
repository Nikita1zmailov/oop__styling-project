import Difference from "./modules/difference";
import Download from "./modules/download";
import Form from "./modules/form";
import ShowInfo from "./modules/showInfo";
import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import SwitchPages from "./modules/switchPages";
import VideoPlayer from "./modules/video";

window.addEventListener('DOMContentLoaded', () => {

   const slider = new MainSlider({ btns: '.next', container: '.page' });

   const modulePageSlider = new MainSlider({ container: '.moduleapp', btns: '.next' });


   const showUpSlider = new MiniSlider({
      container: '.showup__content-slider',
      next: '.showup__next',
      prev: '.showup__prev',
      activeClass: 'card-active',
      animate: true,
   });
   const modulesSlider = new MiniSlider({
      container: '.modules__content-slider',
      next: '.modules__info-btns .slick-next',
      prev: '.modules__info-btns .slick-prev',
      activeClass: 'card-active',
      animate: true,
      autoplay: true,
   });
   const feedSlider = new MiniSlider({
      container: '.feed__slider',
      next: '.feed__slider .slick-next',
      prev: '.feed__slider .slick-prev',
      activeClass: 'feed__item-active',
   });

   new Difference('.officerold', '.officernew', '.officer__card-item').init();

   new Form('.form').init();

   new VideoPlayer('.showup .play', '.overlay').init();
   new VideoPlayer('.module__video-item .play', '.overlay').init();

   new ShowInfo('.module__info-show .plus').init();

   new Download('.download').init();

   new SwitchPages('.showup__content-explore .plus').init();

   slider.render();
   modulePageSlider.render();
   showUpSlider.init();
   modulesSlider.init();
   feedSlider.init();
})