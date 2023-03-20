
export default class SwitchPages {
   constructor(trigger) {
      this.switcher = document.querySelector(trigger);
      this.path = 'modules.html';
   }

   init() {
      try {
         this.switcher.addEventListener('click', () => {
            const link = document.createElement('a');
            link.setAttribute('href', this.path)
            link.style.display = 'none';
            this.switcher.appendChild(link);
            link.click();
         })
      } catch (error) {

      }
   }
}