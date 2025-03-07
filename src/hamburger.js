const hamburgerBtn = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const modal = document.getElementById('modal'); 

hamburgerBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show'); 
  modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
});

const closeBtn = document.getElementById('close-btn');

closeBtn.addEventListener('click', ()=>{
    modal.style.display = 'none';
    navLinks.classList.remove('show');
});