/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const hamburgerMenu = document.getElementsByClassName("toggle-button")[0];
const ulNav = document.getElementsByClassName("navbar__menu")[0];
const list = document.querySelector("ul");
const sections = document.querySelectorAll("section");
const fragment = document.createDocumentFragment();
const button = document.getElementById("scrollButton");

/**
 * End Global Variables
 * Start Functions
 *
 */


// toggeling the hamburger menu

const smallScreen = () => {
  ulNav.classList.toggle("active");
};

//  building the navigation menu
function navBar() {
  // looping on each section
  sections.forEach((section) => {
    // creating a list item and a link and putting a 'href' attribute to the link with a value of the section id and assigning the link text as a data from the 'data nav' attribute of each section
    var listItem = document.createElement("li");
    var links = document.createElement("a");
    links.setAttribute("href", `#${section.id}`);
    links.textContent = section.getAttribute("data-nav");
    
    // adding the class 'menu__link' to each link and firing an event on each click on any link to smoothly scroll to the desired section
    links.classList.add("menu__link");
    links.addEventListener("click", (event) => {
      event.preventDefault();
      section.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    });
    // appending the link to the list item as its child
    listItem.appendChild(links);
    // appending the list items to an empty fragment to lower the repaints and the reflows
    fragment.appendChild(listItem);
  });
  // appending the fragment to the unordered list
  list.appendChild(fragment);
}

function activeSection() {
  //removing the'your-active-class' from its holder section
  const activeSection = document.getElementsByClassName("your-active-class")[0];
  if (activeSection !== undefined) {
    activeSection.classList.remove("your-active-class");
  }

  //removing the'your-active-nav' from its holder section
  const activeLink = document.getElementsByClassName("your-active-nav")[0];
  if (activeLink !== undefined) {
    activeLink.classList.remove("your-active-nav");
  }

  // looping on each section to set the viewport content as the active one
  sections.forEach((section) => {
    // documenting the dimensions of the view port content
    const react = section.getBoundingClientRect();

    //checking its dimensions to make sure it's the current section and  adding the 'your-active-class' class to it
    if (react.top >= -60 && react.top < 300) {
      //
      section.classList.add("your-active-class");
      //getting the related link to the current active section and adding the 'your-active-nav' class to the active link
      const currentActiveLink = document.querySelectorAll(
        `a[href='#${section.id}']`
      )[0].parentElement;
      currentActiveLink.classList.add("your-active-nav");

      // go to top button and checking wheather to show or hide
      if (section.id == "section1") {
        button.style.display = "none";
      } else {
        button.style.display = "block";
      }
    }
  });
}

// go to top function
function goToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
/**
 * End Functions


 * Begin Events
 *
 */

 window.addEventListener("load", navBar)

 window.addEventListener("scroll", activeSection);
 
 button.addEventListener("click", goToTop);
 
 hamburgerMenu.addEventListener("click", smallScreen);