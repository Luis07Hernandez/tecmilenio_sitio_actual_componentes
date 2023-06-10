let menu_items = [];

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

/* ==============================
START - GLOBAL VARIABLES AND CONST
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

/* ==============================
END - GLOBAL VARIABLES AND CONST
================================= */

/* ==============================
START - TECMILENIO NAV REGION FUNCTIONS
================================= */

$(document).ready(function () {
    /**
    * Makes the main navigation bar sticky based on the intersection with the top navigation bar.
    */
    function tecmilenioNavMainSticky() {

        /**
         * Represents the top navigation bar element in the DOM.
         * @type {jQuery}
         */
        let tecmilenio__nav__top = $(".tecmilenio__nav__top");

        /**
         * Represents the main navigation bar element in the DOM.
         * @type {jQuery}
         */
        let tecmilenio__nav__main = $(".tecmilenio__nav__main");

        /**
         * Intersection observer to control the position of the main navigation bar.
         * @type {IntersectionObserver}
         */
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    // If the element is not intersecting, fix it to the top of the window.
                    tecmilenio__nav__main.addClass("tecmilenio__nav__sticky");
                } else {
                    // If the element is intersecting, set it back to relative position.
                    tecmilenio__nav__main.removeClass("tecmilenio__nav__sticky");
                }
            });
        });

        // Observe changes in the intersection of the tecmilenio__nav__top element.
        observer.observe(tecmilenio__nav__top[0]);
    }

    /* ==============================
    RUN MAIN FUNCTIONS
    ================================= */

    /**
    * Represents the active class.
    * @type {string}
    */
    const active_class = 'tn__activo';

    /**
     * Represents the mobile class.
     * @type {string}
     */
    const mobile_class = 'siu_mobile';

    /**
     * Represents the main navigation region element in the DOM.
     * @type {jQuery}
     */
    let tecmilenio__nav__region = $('.tecmilenio__nav__region')

    /**
    * @type {JQuery}
    * @description Represents the burger menu button on the Tecmilenio website.
    */
    let tecmilenio__burger = $(".tecmilenio__burger");

    // If the size in which the screen is loaded is mobile, it is loaded
    // the 'siu_mobile' class by default
    if (window.innerWidth < MOBILE_BREAKPOINT) {
        tecmilenio__nav__region.addClass(mobile_class);
    }

    // We execute the function to make the navigation bar sticky when scrolling.
    tecmilenioNavMainSticky();

    // Function to add "active_class" when the expand menu is clicked. 
    // In case you click again, the classes are eliminated, in this way
    // we control whether to show or hide the menu.
    tecmilenio__burger.click(function () {
        tecmilenio__nav__region.toggleClass(active_class);
        $(this).toggleClass(active_class);
    });

    // In this function we handle an important behavior. When the user changes 
    // the width of the browser and the width is less than the breakpoint, the 
    // "mobile_class" class is added to have a flag and know that we are in 
    // mobile size. If the user opens the menu in mobile size and changes the 
    // width of the screen with the menu open, it will close, since the classes 
    // are eliminated, returning it to its natural state (desktop).
    $(window).on("resize", function () {
        let isMobile = window.innerWidth < MOBILE_BREAKPOINT;

        if (isMobile) {
            // Mobile
            if (!tecmilenio__nav__region.hasClass(mobile_class)) {
                tecmilenio__nav__region.addClass(mobile_class);
            }
        } else {
            // Desktop
            if (tecmilenio__nav__region.hasClass(mobile_class)) {
                tecmilenio__nav__region.removeClass(mobile_class);
                tecmilenio__nav__region.removeClass(active_class);
                tecmilenio__burger.removeClass(active_class)
            }
        }
    });
});

/* ==============================
END - TECMILENIO NAV REGION FUNCTIONS
================================= */

/* ==============================
START - TECMILENIO NAV MAIN MENU
================================= */

$(document).ready(function () {
    const DEFAULT_IMAGE =
        "https://2429099.fs1.hubspotusercontent-na1.net/hubfs/2429099/Nuevos%20logotipos%20web%20mailing%20-%202022/WEB_Logotipo_Negativo_RGB-01-1.png";

    /**
    * Represents the active class.
    * @type {string}
    */
    const active_class = 'tn__activo';

    /**
    * Represents the mobile class.
    * @type {string}
    */
    const mobile_class = 'siu_mobile';

    let tecmilenio__nav__main__menu__container = $('.tecmilenio__nav__main__menu__container');
    let tecmilenio__nav__main__menu = $('.tecmilenio__nav__main__menu');
    let tn__menu__submenu__container = $('.tn__menu__submenu__container');
    // Get the element with the class 'submenu_imagen'
    let submenu_imagen = $(".submenu_imagen");
    // Obtenemos el nodo con la clase 'tn__submenu1' que es en donde se cargara el primer submenu del item seleccionado.
    let tn__submenu1 = $(".tn__submenu1");
    // Get the element with the class 'tn__submenu2'
    let tn__submenu2 = $('.tn__submenu2');

    function createItemMenuLi(item) {
        // Create the link element
        let link = $("<a>")
            .addClass(item.a.class)
            .attr({
                href: item.a.url
            })
            .html(item.a.text);

        if (item.a.data) {
            item.a.data.forEach((element) => {
                link.attr(`data-${element.key}`, element.value);
            });
        }

        if (item.a.events) {
            item.a.events.forEach((element) => {
                link.on(element.event, element.func);
            });
        }

        // Create the list item element
        let li = $("<li>").addClass(item.li.class).append(link);

        return li[0];
    }

    function rebuildMainMenu() {
        let ul = $("<ul>").addClass("tecmilenio__nav__main__menu");

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
                    ],
                },
                li: {
                    class: "tn__menu__item",
                },
            });

            ul.append(li);
        });

        return ul[0];
    }

    function loadSubmenu_imagen(node) {
        // Get the image URL from the 'data-image' attribute of the node
        const item_image = node.data('image') ? node.data('image') : DEFAULT_IMAGE;

        // Set the background image of the submenu_imagen element with the URL of the current item link.
        submenu_imagen.css('background', 'url("' + item_image + '")');
    }

    function hasHref(node) {
        return node.attr('href');
    }

    function setMobileListeners() {
        $('.tn__menu__item_btn').on('click', mobileTnMenuItemBtnMouseClickAction);
    }

    function clearMobileListeners() {
        $('.tn__menu__item_btn').off('click', mobileTnMenuItemBtnMouseClickAction);
    }

    function setDesktopListeners() {
        $('.tn__menu__item_btn').on('mouseover', tnMenuItemBtnMouseOverAction);
        $('.tn__menu__item_btn').on('click', stopRedirectionItemBtnMouseClickAction);
    }

    function clearDesktopListeners() {
        $('.tn__menu__item_btn').off('mouseover', tnMenuItemBtnMouseOverAction);
        $('.tn__menu__item_btn').off('click', stopRedirectionItemBtnMouseClickAction);
    }

    function clearTnMenuSubmenuContainer() {
        tn__submenu1.html("");
        tn__submenu2.html("");
        submenu_imagen.css('background', '');
    }

    function loadInitConfig() {
        if (window.innerWidth < MOBILE_BREAKPOINT) {
            setMobileListeners();
            tecmilenio__nav__main__menu__container.addClass(mobile_class);
        } else {
            setDesktopListeners();
        }
    }

    function rebuildAndLoadMainMenu() {
        // Construimos un nuevo elemento con la clase '.tecmilenio__nav__main__menu'
        let newMainMenu = rebuildMainMenu()

        // Remplazamos el elemento con la clase '.tecmilenio__nav__main__menu', 
        // por el mismo elemento reconstruido via javascript.    
        tecmilenio__nav__main__menu.replaceWith(newMainMenu);

        // Dado a que el elemento con la clase '.tecmilenio__nav__main__menu' que 
        // se asigno a la variable al inicializar el DOM quedo reemplazado con el
        // nuevo elemento reconstruido, es necesario reasignarlo a la variable 
        // global.
        tecmilenio__nav__main__menu = $(newMainMenu);
    }

    function tnMenuItemBtnMouseOverAction() {

        // Asignamos el nodo actual a la variable currentNode
        let currentNode = $(this);

        // Si el nodo tiene un link (atributo href) 
        if (hasHref(currentNode)) {
            //Se elimina la clase active_class, de esta manera ocultamos el contenedor de submenus, ya que no es necesario mostrarlo si esta vacio.
            tn__menu__submenu__container.removeClass(active_class);
            return;
        }

        // Obtenemos el id del nodo actual para hacer la busqueda para obtener los datos del item seleccionado
        const tn__menu__item_id = currentNode.data("id");

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

        loadSubmenu_imagen(currentNode);

        // Crear un objeto jQuery vacío para almacenar los elementos
        let liElements = $();

        // Clear tn__submenu1 
        tn__submenu1.html("");

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

                // Agregar el elemnto li generado al objeto jQuery
                liElements = liElements.add(li);
            }
        });

        // Verificamos si existen elementos en el objeto jQuery
        if (liElements.first().length) {
            // Agregamos los item li creados al elemento tn__submenu1
            tn__submenu1.append(liElements);

            // Add the 'tn__activo' class to the element
            tn__menu__submenu__container.addClass(active_class);
        } else {
            // Remove the 'tn__activo' class to the element
            tn__menu__submenu__container.removeClass(active_class);
        }

    }

    function tnSubmenu1ItemBtnMouseOverAction() {

        // Asignamos el nodo actual a la variable currentNode
        let currentNode = $(this);

        // Obtenemos el objeto json que contiene toda la informacion del item con la cual
        // se construye el submenu.    
        const tn__submenu1__item = currentNode.data('json');

        // Load the item image in submenu_imagen container       
        loadSubmenu_imagen(currentNode);

        // Clear the tn__submenu2
        tn__submenu2.html('');

        // Si el nodo tiene un link (atributo href), no hacemos nada.
        if (hasHref(currentNode)) {
            return;
        }

        // Check if tn__menu__item.enlaces_menu is empty or undefined
        if (
            !tn__submenu1__item.subenlaces ||
            tn__submenu1__item.subenlaces.length === 0
        ) {
            return;
        }

        // Crear un objeto jQuery vacío para almacenar los elementos
        let liElements = $();

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
                        ]
                    },
                    li: {
                        class: "tn__submenu2__item",
                    },
                });

                // Agregar el elemnto li generado al objeto jQuery
                liElements = liElements.add(li);
            }
        });

        // Agregamos los item li creados al elemento tn__submenu2
        tn__submenu2.append(liElements);
    }

    function stopRedirectionItemBtnMouseClickAction(event) {
        let currentNode = $(this);
        if (!hasHref(currentNode)) {
            event.preventDefault();
        }
    }

    /* ==============================
    START - RUN MAIN FUNCTIONS
    ================================= */

    // Esta funcion agrega un evento mouseleave al elemento '.tn__menu__submenu__container' que es el contenedor de submenu, lo que hara que cuando el mouse salga del elemento, eliminara la clase activa y se limpiara el elemento.
    tn__menu__submenu__container.on("mouseleave", function () {
        // Limpiamos el contenedor de submenu
        clearTnMenuSubmenuContainer();

        // Eliminamos la clase active_class
        tn__menu__submenu__container.removeClass(active_class);
    });

    // Inicializamos la configuración inicial.
    loadInitConfig();

    // In this function we handle an important behavior. When the user changes 
    // the width of the browser and the width is less than the breakpoint, the 
    // "mobile_class" class is added to have a flag and know that we are in 
    // mobile size. If the user opens the menu in mobile size and changes the 
    // width of the screen with the menu open, it will close, since the classes 
    // are eliminated, returning it to its natural state (desktop).
    $(window).on("resize", function () {
        let isMobile = window.innerWidth < MOBILE_BREAKPOINT;

        if (isMobile) {
            // Mobile
            if (!tecmilenio__nav__main__menu__container.hasClass(mobile_class)) {
                tecmilenio__nav__main__menu__container.addClass(mobile_class);
                clearDesktopListeners();
                setMobileListeners();
            }
        } else {
            // Desktop
            if (tecmilenio__nav__main__menu__container.hasClass(mobile_class)) {
                tecmilenio__nav__main__menu__container.removeClass(mobile_class);
                rebuildAndLoadMainMenu();
                setDesktopListeners();
            }
        }
    });

    /* ==============================
    END - RUN MAIN FUNCTIONS
    ================================= */
})

/* ==============================
END - TECMILENIO NAV MAIN MENU
================================= */

