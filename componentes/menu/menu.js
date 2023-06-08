/* ==============================
START - REMOVE THIS CODE 
================================= */

const proxyUrl = 'https://tecmidrupal.lndo.site/es/api/menu/principal/es'; // Ruta de tu servidor proxy

$.get(proxyUrl, function (data, status) {
    menu_items = data;
});

/* ==============================
END - REMOVE THIS CODE
================================= */

/**
 * Breakpoint for mobile devices. Used to determine whether the current device
 * is a mobile based on the window width in pixels.
 *
 * @constant
 * @type {number}
 * @default
 */
const MOBILE_BREAKPOINT = 960;

/**
 * Default value for the image.
 *
 * @constant {string}
 * @default 'path/to/image.png'
 */
const DEFAULT_IMAGE =
    "https://2429099.fs1.hubspotusercontent-na1.net/hubfs/2429099/Nuevos%20logotipos%20web%20mailing%20-%202022/WEB_Logotipo_Negativo_RGB-01-1.png";

let menu_items = null;

let tecmilenio__nav__main__menu = document.querySelector('.tecmilenio__nav__main__menu');
let tn__menu__submenu__container = document.querySelector('.tn__menu__submenu__container');

function rebuildMainMenu() {
    let ul = document.createElement("ul");
    ul.className = "tecmilenio__nav__main__menu";

    // Rebuilding main menu.
    menu_items.forEach((item) => {
        let li = createItemMenuLi({
            a: {
                class: "tn__menu__item_btn",
                url: item.link.url,
                text: item.link.text,
                data: [
                    {
                        key: "id",
                        value: item.id,
                    },
                ]
            },
            li: {
                class: "tn__menu__item",
            },
        });

        ul.appendChild(li);
    });

    return ul;
}

/**
 * Makes the main navigation bar sticky based on the intersection with the top navigation bar.
 */
function tecmilenioNavMainSticky() {
    /**
     * Represents the top navigation bar element in the DOM.
     * @type {HTMLElement}
     */
    let tecmilenio__nav__top = document.querySelector(".tecmilenio__nav__top");

    /**
     * Represents the main navigation bar element in the DOM.
     * @type {HTMLElement}
     */
    let tecmilenio__nav__main = document.querySelector(".tecmilenio__nav__main");

    /**
     * Intersection observer to control the position of the main navigation bar.
     * @type {IntersectionObserver}
     */
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                // If the element is not intersecting, fix it to the top of the window.
                tecmilenio__nav__main.classList.add("tecmilenio__nav__sticky");
            } else {
                // If the element is intersecting, set it back to relative position.
                tecmilenio__nav__main.classList.remove("tecmilenio__nav__sticky");
            }
        });
    });

    // Observe changes in the intersection of the tecmilenio__nav__top element.
    observer.observe(tecmilenio__nav__top);
}

/**
 * Creates a menu item as a list item element with a link.
 *
 * @param {object} item - The object containing the link data and list item class.
 * @param {object} item.a - The link data.
 * @param {string} item.a.class - The class of the link.
 * @param {string} item.a.url - The URL of the link.
 * @param {string} item.a.text - The text content of the link.
 * @param {Array} [item.a.data] - Additional data attributes for the link.
 * @param {string} item.a.data.key - The key of the data attribute.
 * @param {string} item.a.data.value - The value of the data attribute.
 * @param {Array} [item.a.events] - Event listeners for the link.
 * @param {string} item.a.events.event - The event name.
 * @param {function} item.a.events.func - The event listener function.
 * @param {object} item.li - The list item class.
 * @param {string} item.li.class - The class of the list item.
 * @returns {HTMLElement} The created list item element.
 */
function createItemMenuLi(item) {
    // Create the link element
    let link = document.createElement("a");
    link.className = item.a.class;
    link.href = item.a.url;
    link.textContent = item.a.text;

    if (item.a.data) {
        item.a.data.forEach((element) => {
            link.setAttribute(`data-${element.key}`, element.value);
        });
    }

    if (item.a.events) {
        item.a.events.forEach((element) => {
            link.addEventListener(element.event, element.func);
        });
    }

    // Create the list item element
    let li = document.createElement("li");
    li.className = item.li.class;
    li.appendChild(link);

    return li;
}

/**
 * Adds the specified event listener to all DOM elements matching the provided selector.
 *
 * @param {string} selector - A string representing the CSS selector of the elements.
 * @param {string} event - The name of the event to listen for (e.g., 'click', 'mouseover').
 * @param {function} func - The function to execute when the event is triggered.
 * @return {void}
 */
function addEvents(selector, event, func) {
    let elements = document.querySelectorAll(selector);

    elements.forEach(function (element) {
        element.addEventListener(event, func);
    });
}

/**
 * Removes an event listener from all elements matching the provided selector.
 *
 * @param {string} selector - The CSS selector for the elements to remove the event from.
 * @param {string} event - The type of the event to remove.
 * @param {function} func - The event handler function.
 */
function removeEvents(selector, event, func) {
    let elements = document.querySelectorAll(selector);

    elements.forEach(function (element) {
        element.removeEventListener(event, func);
    });
}

function stopRedirectionItemBtnMouseClickAction(event) {
    if (!hasHref(event.target)) {
        event.preventDefault();
    }
}

function mobileTnMenuItemBtnMouseClickAction(event) {
    event.stopPropagation();

    // Si el elemento tiene un link (atributo href), entonces deten la funcion y
    // redirige al link. Esto se hace por que los items del menu que contienen
    // una URL deben de funcionar como enlace directo, en caso de que no tengan
    // una URL funcionara como un contenedor de submenu.
    if (hasHref(this)) {
        return;
    }
    
    // Detenemos la redireccion del evento click del elemento <a>
    event.preventDefault()

    const tn__menu__item_id = event.target.getAttribute("data-id");
    const tn__menu__item = menu_items.find(
        (item) => item.id == tn__menu__item_id
    );

    if (
        !tn__menu__item.enlaces_menu ||
        tn__menu__item.enlaces_menu.length === 0 ||
        !tn__menu__item.link
    ) {
        return;
    }

    // Create a document fragment to hold the list items
    const fragment = document.createDocumentFragment();

    // This section of code is responsible for constructing a navigation menu.
    // The structure of the menu is a list (`<ul>`) where each list item (`<li>`) represents a menu item.
    // Each menu item may contain a link (`<a>`) and may act as a parent for nested sub-menu items.

    // The first list item is created, which acts as a main menu item and parent of subsequent list items.
    let li = createItemMenuLi({
        a: {
            class: "tn__menu__item_btn",
            url: tn__menu__item.link.url,
            text: tn__menu__item.link.text,
            events: [
                {
                    event: "click",
                    func: MobileTnSubmenu1ParentItemBtnMouseClickAction,
                }
            ],
        },
        li: {
            class: "tn__submenu1__item",
        },
    });

    // The created list item is appended to the fragment.
    fragment.appendChild(li);

    // For each 'enlaces_menu' item, a corresponding list item is created and appended to the menu.
    // This loop iterates over each 'enlaces_menu' item.
    // For each item, it checks if the link is available to be shown.
    // If so, a list item is created and added to the fragment.
    // If the item has 'subenlaces', these are processed as nested list items and added to the current list item.
    tn__menu__item.enlaces_menu.forEach((item) => {
        // Check if link is available to show
        if (item.show_link) {
            // A list item element created for each 'enlaces_menu' item.
            let li = createItemMenuLi({
                a: {
                    class: "tn__submenu1__item__btn",
                    url: item.link.url,
                    text: item.link.text,
                    events: [
                        { event: 'click', func: mobileTnSubmenu1ItemBtnMouseClickAction}
                    ]
                },
                li: {
                    class: "tn__submenu1__item",
                },
            });

            // If 'subenlaces' exist, create a nested list for them.
            if (item.subenlaces) {
                // An unordered list element that holds the 'subenlaces' as list items.
                let ul = document.createElement("ul");
                ul.className = "tn__submenu1"

                item.subenlaces.forEach((subitem) => {
                    // Check if link is available to show
                    if (subitem.show_link) {
                        // A list item element created for each 'subenlaces' item.
                        let li = createItemMenuLi({
                            a: {
                                class: "tn__submenu2__item__btn",
                                url: subitem.link.url,
                                text: subitem.link.text,
                            },
                            li: {
                                class: "tn__submenu2__item",
                            },
                        });

                        ul.appendChild(li);
                    }
                });

                li.appendChild(ul);
            }

            // Append the li element to the fragment
            fragment.appendChild(li);
        }
    });

    if (fragment.childNodes.length > 1) {
        while (tecmilenio__nav__main__menu.firstChild) {
            tecmilenio__nav__main__menu.removeChild(
                tecmilenio__nav__main__menu.firstChild
            );
        }

        tecmilenio__nav__main__menu.appendChild(fragment);
    }
}

function tnMenuItemBtnMouseOverAction(event) {
    event.stopPropagation();

    if (hasHref(event.target)) {
        removeActiveClass(tn__menu__submenu__container);
        return;
    }

    const tn__menu__item_id = event.target.getAttribute("data-id");
    const tn__menu__item = menu_items.find(
        (item) => item.id == tn__menu__item_id
    );

    // Check if tn__menu__item.enlaces_menu is empty or undefined
    if (
        !tn__menu__item.enlaces_menu ||
        tn__menu__item.enlaces_menu.length === 0
    ) {
        return;
    }

    setDefaultSubmenuImagen();

    // Create a document fragment to hold the list items
    const fragment = document.createDocumentFragment();

    const tn__submenu1 = document.querySelector(".tn__submenu1");

    // Clear tn__submenu1 
    tn__submenu1.innerHTML = "";

    // Create li elements for submenu1 based on the sublinks in tn__menu__item
    tn__menu__item.enlaces_menu.forEach((item) => {
        // Check if link is available to show
        if (item.show_link) {
            let li = createItemMenuLi({
                a: {
                    class: "tn__submenu1__item__btn",
                    url: item.link.url,
                    text: item.link.text,
                    data: [
                        {
                            key: "id",
                            value: item.id,
                        },
                        {
                            key: "json",
                            value: JSON.stringify(item),
                        },
                        {
                            key: "image",
                            value: item.imagen ? item.imagen : DEFAULT_IMAGE,
                        },
                    ],
                    events: [
                        {
                            event: "mouseover",
                            func: tnSubmenu1ItemBtnMouseOverAction,
                        },
                        {
                            event: "click",
                            func: stopRedirectionItemBtnMouseClickAction,
                        },
                    ],
                },
                li: {
                    class: "tn__submenu1__item",
                },
            });

            // Append the li element to the fragment
            fragment.appendChild(li);
        }
    });

    if (fragment.firstChild) {
        // Append the fragment to the tn__submenu1 element
        tn__submenu1.appendChild(fragment);

        // Add the 'tn__activo' class to the element
        addActiveClass(tn__menu__submenu__container)
    } else {
        // Remove the 'tn__activo' class to the element        
        removeActiveClass(tn__menu__submenu__container)
    }
}

/**
 * Action triggered when the mouse hovers over the button of submenu1 item.
 * @param {Event} event - The mouse event.
 */
function tnSubmenu1ItemBtnMouseOverAction(event) {
    // Parse the JSON data from the 'data-json' attribute of the event target
    const tn__submenu1__item = JSON.parse(event.target.getAttribute("data-json"));

    // Load the item image in submenu_imagen container
    loadSubmenu_imagen(event.target);

    // Get the element with the class 'tn__submenu2'
    const tn__submenu2 = document.querySelector(".tn__submenu2");

    // Clear the tn__submenu2
    tn__submenu2.innerHTML = "";

    if (hasHref(this)) {
        return;
    }

    // Check if tn__menu__item.enlaces_menu is empty or undefined
    if (
        !tn__submenu1__item.subenlaces ||
        tn__submenu1__item.subenlaces.length === 0
    ) {
        return;
    }

    // Create a document fragment to hold the list items
    const fragment = document.createDocumentFragment();

    // Create li elements for submenu2 based on the sublinks in tn__submenu1__item
    tn__submenu1__item.subenlaces.forEach((item) => {
        // Check if link is available to show
        if (item.show_link) {
            let li = createItemMenuLi({
                a: {
                    class: "tn__submenu2__item__btn",
                    url: item.link.url,
                    text: item.link.text,
                    data: [
                        {
                            key: "image",
                            value: item.imagen ? item.imagen : DEFAULT_IMAGE,
                        },
                    ],
                    events: [
                        {
                            event: "mouseover",
                            func: tnSubmenu2ItemBtnMouseOverAction,
                        },
                    ],
                },
                li: {
                    class: "tn__submenu2__item",
                },
            });

            // Append the li element to the fragment
            fragment.appendChild(li);
        }
    });

    // Append the fragment to the tn__submenu2 element
    tn__submenu2.appendChild(fragment);
}

/**
 * Action triggered when the mouse hovers over the button of submenu2 item.
 * @param {Event} event - The mouse event.
 */
function tnSubmenu2ItemBtnMouseOverAction(event) {
    loadSubmenu_imagen(event.target);
}

/* ==============================
START - RUN MAIN FUNCTIONS
================================= */

// Add sticky behaviour
tecmilenioNavMainSticky();

// Load listeners
loadInitConfig();

/* ==============================
END - RUN MAIN FUNCTIONS
================================= */

//convertir javascript vanilla

$(".tn__menu__submenu__container").on("mouseleave", function () {
    clearTnMenuSubmenuContainer();
});

$(".tecmilenio__burger").on("click", function () {
    $(this).toggleClass("tn__activo");
    $(".tecmilenio__nav__top").toggleClass("tn__activo");
    $(".tecmilenio__nav__main").toggleClass("tn__activo");
});

function restoreNavToDesktop() {
    $(".tecmilenio__nav__top").removeClass("tn__activo");
    $(".tecmilenio__nav__main").removeClass("tn__activo");
    $(".tecmilenio__burger").removeClass("tn__activo");
}

window.addEventListener("resize", function() {
    // Si la pantalla es más grande que el punto de quiebre
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      // Desktop
      if (tecmilenio__nav__main__menu.classList.contains("siu_mobile")) {
        tecmilenio__nav__main__menu.classList.remove("siu_mobile");
        restoreNavToDesktop();
        rebuildAndLoadMainMenu();
        setDesktopListeners();
      }
    } else {
      // Mobile
      if (!tecmilenio__nav__main__menu.classList.contains("siu_mobile")) {
        tecmilenio__nav__main__menu.classList.add("siu_mobile");
        clearDesktopListeners();
        setMobileListeners();
      }
    }
  });
  

function rebuildAndLoadMainMenu() {     
    // Construimos un nuevo elemento con la clase '.tecmilenio__nav__main__menu'
    let newMainMenu = rebuildMainMenu()
    
    // Remplazamos el elemento con la clase '.tecmilenio__nav__main__menu', 
    // por el mismo elemento reconstruido via javascript.    
    tecmilenio__nav__main__menu.parentNode.replaceChild(newMainMenu,tecmilenio__nav__main__menu);

    // Dado a que el elemento con la clase '.tecmilenio__nav__main__menu' que 
    // se asigno a la variable al inicializar el DOM quedo reemplazado con el
    // nuevo elemento reconstruido, es necesario reasignarlo a la variable 
    // global.
    tecmilenio__nav__main__menu = newMainMenu;

    if (window.innerWidth < MOBILE_BREAKPOINT){
        addMobileClass();
    }
}

function MobileTnSubmenu1ParentItemBtnMouseClickAction(event) {
    // Detenemos la redireccion del evento click del elemento <a>
    event.preventDefault();
    // Reconstruimos el menu principal
    rebuildAndLoadMainMenu();
    // Establecemos los eventos para movil
    setMobileListeners();
}

function mobileTnSubmenu1ItemBtnMouseClickAction(event){
    if (hasHref(this)){
        return;
    }

    event.preventDefault();

    event.target.nextElementSibling.classList.toggle('tn__activo');
}

function loadSubmenu_imagen(node) {
    // Get the image URL from the 'data-image' attribute of the node
    const item_image = node.getAttribute("data-image");

    // Get the element with the class 'submenu_imagen'
    const submenu_imagen = document.querySelector(".submenu_imagen");

    // Set the background image of the submenu_imagen element with the URL of the current item link.
    submenu_imagen.style.background = `url("${item_image}")`;
}

function clearTnMenuSubmenuContainer() {
    $(".tn__submenu1").html("");
    $(".tn__submenu2").html("");
    setDefaultSubmenuImagen();
    removeActiveClass(tn__menu__submenu__container);
}

function setDefaultSubmenuImagen() {
    document.querySelector('.submenu_imagen').style.backgroundImage = `url("${DEFAULT_IMAGE}")`;
}

function loadInitConfig() {
    if (window.innerWidth < MOBILE_BREAKPOINT) {
        setMobileListeners(); 
        addMobileClass();       
    } else {
        setDesktopListeners();
    }
}

function setMobileListeners() {
    addEvents(
        ".tn__menu__item_btn",
        "click",
        mobileTnMenuItemBtnMouseClickAction
    );    
}

function clearMobileListeners() {
    removeEvents(
        ".tn__menu__item_btn",
        "click",
        mobileTnMenuItemBtnMouseClickAction
    );
}

function setDesktopListeners() {
    addEvents(
        ".tn__menu__item_btn",
        "mouseover",
        tnMenuItemBtnMouseOverAction
    );    

    addEvents(
        ".tn__menu__item_btn",
        "click",
        stopRedirectionItemBtnMouseClickAction
    );
}

function clearDesktopListeners() {
    removeEvents(
        ".tn__menu__item_btn",
        "mouseover",
        tnMenuItemBtnMouseOverAction
    );

    removeEvents(
        ".tn__menu__item_btn",
        "click",
        stopRedirectionItemBtnMouseClickAction
    );
}

function hasHref(node) {
    return node.getAttribute('href');
}

function addActiveClass(node) {
    node.classList.add('tn__activo');
}

function removeActiveClass(node) {
    node.classList.remove('tn__activo');
}

function addMobileClass() {
    tecmilenio__nav__main__menu.classList.add('siu_mobile');
}