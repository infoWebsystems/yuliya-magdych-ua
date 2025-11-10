/*
* Broadcast Theme
*
* Use this file to add custom Javascript to Broadcast.  Keeping your custom
* Javascript in this fill will make it easier to update Broadcast. In order
* to use this file you will need to open layout/theme.liquid and uncomment
* the custom.js script import line near the bottom of the file.
*/


(function() {
  // Add custom code below this line

  

  var linkToggle = document.querySelectorAll('.announcement__show');

  for(i = 0; i < linkToggle.length; i++){
  
    linkToggle[i].addEventListener('click', function(event){
  
      event.preventDefault();
  
      var container = document.getElementById(this.dataset.container);
  
      if (!container.classList.contains('active')) {
        
        container.classList.add('active');
        container.style.height = 'auto';
  
        var height = container.clientHeight + 'px';
  
        container.style.height = '0px';
  
        setTimeout(function () {
          container.style.height = height;
        }, 0);
        
      } else {
        
        container.style.height = '0px';
  
        container.addEventListener('transitionend', function () {
          container.classList.remove('active');
        }, {
          once: true
        });
        
      }
      
    });
  
  }

  // ^^ Keep your scripts inside this IIFE function call to 
  // avoid leaking your variables into the global scope.
})();
