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
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * get the sections in the page.
 * @returns {Object}
 */
const getSections = () => {
    return document.querySelectorAll('section');
};

/**
 * create the nav bar links
 * @param {Object} sections 
 * @returns {Object}
 */
const createNavLinks = sections => {
    const navLinks = document.createDocumentFragment();
    for (section of sections) {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.classList.add('menu__link');
        anchor.href = '#' + section.id;
        anchor.textContent = section.dataset.nav;
        listItem.appendChild(anchor);
        navLinks.appendChild(listItem);
    }
    return navLinks;
};

/**
 * insert the nave links into the DOM
 * @param {Object} navLinks 
 */
const insertNavLinks = navLinks => {
    const navList = document.getElementById('navbar__list');
    navList.appendChild(navLinks);
    return;
};


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const navlinks = createNavLinks(getSections());
insertNavLinks(navlinks);

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


