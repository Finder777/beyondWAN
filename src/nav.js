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
      const hamburgerBtn = this.shadowRoot.getElementById('hamburger');
      const navLinks = this.shadowRoot.querySelector('.nav-links');
      const modal = this.shadowRoot.getElementById('modal');
      const closeBtn = this.shadowRoot.getElementById('close-btn');
      
      if(hamburgerBtn){
        hamburgerBtn.addEventListener('click', ()=>{
          console.log("hamburger was clicked");
          navLinks.classList.toggle('show');
          modal.classList.toggle('modal');
        })};

        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
          modal.classList.remove('modal');
          });}
    }
  }
  
customElements.define('nav-component', NavComponent);


