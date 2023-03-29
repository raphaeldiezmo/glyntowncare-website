// Author: Raphael Diezmo
// Description: This scripts will contain all the functionalities/methods of the
// whole website, this will control some elements of the website, by changing
// values of some element attributes. This will also contain an emailing system.
// as well as sending an auto-response to who ever tries to contact using the form
// that the website contains.

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