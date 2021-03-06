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
 * create the nav bar links
 * @param {NodeList} sections 
 * @returns {DocumentFragment}    
 */
const createNavLinks = sections => {
    const navLinks = document.createDocumentFragment();
    for (section of sections) {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.classList.add('menu__link');
        // set href if want to use the anchor functionality
        anchor.href = '#' + section.id;
        // set data-section-id if want to use the click event to scroll 
        //(this is what we will do)
        anchor.dataset.sectionId = section.id;
        anchor.textContent = section.dataset.nav;
        listItem.appendChild(anchor);
        navLinks.appendChild(listItem);
    }
    return navLinks;
};

/**
 * insert the nave links into the DOM
 * @param {Node} navLinks 
 */
const insertNavLinks = navLinks => {
    const navList = document.getElementById('navbar__list');
    navList.appendChild(navLinks);
};

/** 
 * Determine if an element is in the viewport
 * @param  {Node} element
 * @return {Boolean} Returns true if element is in the viewport
 */
const isInViewport = element => {
    const distance = element.getBoundingClientRect();   
	return (
		distance.top >= 0 &&
		distance.left >= 0 &&
		distance.top <= (window.innerHeight || document.documentElement.clientHeight)*0.4 &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const sections = document.querySelectorAll('section');
const navlinks = createNavLinks(sections);
insertNavLinks(navlinks);

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Scroll to section on link click
const navList = document.querySelector('#navbar__list');

navList.addEventListener('click', event => {
    if(event.target.nodeName === 'A') {
        event.preventDefault();
        let targetSection = null;
        for(section of sections) {
            if(event.target.dataset.sectionId === section.id) {
                targetSection = section;
            }
        }
        targetSection.scrollIntoView({top: 0, behavior: 'smooth'});
    }
});

// Set sections as active and its nav link as active
let activeSection = null;
let activeLink = null;
document.addEventListener('scroll', () => {
    for(section of sections) {
        if(isInViewport(section) && section !== activeSection) {
            if(activeSection){
                activeSection.classList.remove('your-active-class');
            }
            section.classList.toggle('your-active-class');
            activeSection = section;

            //set active link 
            if(activeLink) {
                activeLink.classList.remove('active__link');
            }
            activeLink = document.querySelector(`[data-section-id="${activeSection.id}"]`);
            activeLink.classList.add('active__link');
        }
    }
});

//hide nav bar while not scrolling
let timeout = null;
const navbar = document.querySelector('nav ul');
document.addEventListener('scroll', () => {
    if(window.scrollY > 50 && ! mouseOnNav) {
        navbar.style.maxHeight = 'fit-content';
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            navbar.style.maxHeight = 0;
        }, 1000)        
    }
    else {
        clearTimeout(timeout);
    }
});

//show nav bar while hovering on the top of the view port
let mouseOnNav = false;
let hoverTimeout = null;
let height = navbar.scrollHeight; 
document.addEventListener('pointermove', (event) => {
    if(event.clientY <= height) {
        height = navbar.scrollHeight;
        navbar.style.maxHeight = 'fit-content';
        mouseOnNav = true;
    }
    else if(mouseOnNav) {
        if(window.scrollY > 50) {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                navbar.style.maxHeight = 0;
            }, 1000);
        }
        mouseOnNav = false;
    }
});

//show the go to top button when not in the top of the view port
const topButton = document.querySelector('.top__button');
document.addEventListener('scroll', () => {
    if(window.scrollY > window.innerHeight / 2) {
        topButton.style.display = 'block';
    }
    else {
        topButton.style.display = 'none';
    }
});

// go to top when clicking the go to top button
topButton.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    //reset active class on section and navlinks
    activeSection.classList.remove('your-active-class');
    activeLink.classList.remove('active__link');
    activeSection = activeLink = null;
    //show nav bar
    navbar.style.maxHeight = 'fit-content';

});

