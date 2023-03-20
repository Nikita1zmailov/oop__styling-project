
export default class Form {
   constructor(form) {
      this.forms = document.querySelectorAll(form);
      this.inputs = document.querySelectorAll('input');
      this.message = {
         loading: 'Download...',
         success: 'Thanks, We call you soon!',
         failure: 'Something wrong...'
      }
      this.path = 'assets/question.php';
   }

   clearInputs() {
      this.inputs.forEach(input => input.value = '')
   }

   checkMailInputs() {
      const emailInputs = document.querySelectorAll('[type="email"]');
      emailInputs.forEach(input => {
         input.addEventListener('keypress', e => {
            if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
               e.preventDefault();
            }
         });
      });
   }

   initMask() {

      let setCursorPosition = (position, element) => {
         element.focus();

         if (element.setSelectionRange) {
            element.setSelectionRange(position, position);
         } else if (element.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', position);
            range.moveStart('character', position);
            range.select();
         }
      };

      function createMask(e) {
         let matrix = '+1 (___) ___-____',
            iterator = 0,
            def = matrix.replace(/\D/g, ''),
            value = this.value.replace(/\D/g, '');

         if (def.length >= value.length) {
            value = def;
         }

         this.value = matrix.replace(/./g, (a) => {
            return /[_\d]/.test(a)
               && iterator < value.length
               ? value.charAt(iterator++)
               : iterator >= value.length
                  ? ''
                  : a;
         });

         if (e.type === 'blur') {
            if (this.value.length === 2) {
               this.value = '';
            }
         } else {
            setCursorPosition(this.value.length, this)
         }
      }

      let inputs = document.querySelectorAll('[name="phone"]');

      inputs.forEach(input => {
         input.addEventListener('input', createMask);
         input.addEventListener('focus', createMask);
         input.addEventListener('blur', createMask);
      });
   }

   async postData(url, data) {
      let res = await fetch(url, {
         method: 'POST',
         body: data,
      })

      return await res.text();
   }

   init() {

      this.checkMailInputs();
      this.initMask();

      this.forms.forEach(form => {
         form.addEventListener('submit', e => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.style.cssText = `
               margin-top: 15px;
               font-size: 18px;
               color: grey;
            `;

            form.parentNode.appendChild(statusMessage);

            statusMessage.textContent = this.message.loading;

            const formData = new FormData(form);

            this.postData(this.path, formData)
               .then(res => {
                  console.log(res);
                  statusMessage.textContent = this.message.success;
               })
               .catch(() => {
                  statusMessage.textContent = this.message.failure;
               })
               .finally(() => {
                  this.clearInputs();
                  setTimeout(() => {
                     statusMessage.remove();
                  }, 3000);
               })
         });
      });
   }
}