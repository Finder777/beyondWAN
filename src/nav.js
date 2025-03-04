class NavComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }); // Create Shadow DOM
    }
  
    connectedCallback() {
      fetch('nav.html')
        .then(response => response.text())
        .then(html => {
          this.shadowRoot.innerHTML = html; // Insert the fetched HTML
          // Add event listeners for hamburger menu, etc., here
          this.addEventListeners();
        })
        .catch(error => {
          console.error('Error loading navigation: check the JS to debug', error);
        });
    }
  
    addEventListeners(){
      //Add your event listeners here. Example.
      const hamburger = this.shadowRoot.getElementById('hamburger');
      if(hamburger){
        hamburger.addEventListener('click', ()=>{
          console.log("hamburger was clicked");
        })
      }
    }
  }
  
  customElements.define('nav-component', NavComponent);