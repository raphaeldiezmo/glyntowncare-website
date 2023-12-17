// Author: Raphael Diezmo
// Description: This scripts will contain all the functionalities/methods of the
// whole website, this will control some elements of the website, by changing
// values of some element attributes. This will also contain an emailing system.
// as well as sending an auto-response to who ever tries to contact using the form
// that the website contains.



// ========================================
//                OBSERVERS
// ========================================

const fader = document.querySelectorAll('.fade-in');
const slider = document.querySelectorAll('.slider');
const appearOptions = {
  threshold: 0, rootMargin: "0px 0px -250px 0px"
};


// Usage of Intersection Observer
const appearOnScroll = new IntersectionObserver(
  // contains function that has an entries and
  // appearOnScroll parameter
  function(
    entries, appearOnScroll
  ){
    // running to every each entry
    entries.forEach(entry => {
      if(!entry.isIntersecting){
        return;
      }
      // if an entry doesn't intersect, it'll
      // add the appear class in the entry
      else{
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
      }
    })
  }, appearOptions
);

fader.forEach(fader=>{
  appearOnScroll.observe(fader);
})

slider.forEach(slider=>{
  appearOnScroll.observe(slider);
})

// Making the navbar appear and disappear function
// keep track of previous scroll position
let prevScrollpos = window.pageYOffset;

        window.onscroll = function() {
            let currentScrollPos = window.pageYOffset;
            let navs = document.querySelector('.nav-link');
           

            // if (currentScrollPos <= 100){
            //   document.querySelector('header').classList.remove('hidden');
   

            // }
            // else{
            //   if (prevScrollpos > currentScrollPos) {
            //     document.querySelector('header').classList.remove('hidden');
            // } else {
            //     document.querySelector('header').classList.add('hidden');
            // }
            // }
            

            prevScrollpos = currentScrollPos;
        }
// Variable Declarations
const burgerMenu = document.querySelector(".burger-menu");
const navMenu = document.querySelector(".nav");



// Burger menu functionality 
// This function makes the element active, by clicking the burger menu class
// it will activate the burger-menu and contain a customized attributes 
// as well as the .nav class
burgerMenu.addEventListener("click", ()=> 
{
    burgerMenu.classList.toggle("active"); // adding .active to .burger-menu class
    navMenu.classList.toggle("active");// adding .active to .nav class
})

// This function takes out the .active attributes. The following elements are 
// .burger-menu and .nav 
document.querySelectorAll(".nav-link").forEach(n=>n.addEventListener("click"), ()=>
    {
    burgerMenu.classList.remove("active");
    navMenu.classList.remove("active");
    })

