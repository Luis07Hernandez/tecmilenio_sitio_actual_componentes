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
START - TECMILENIO NAVBAR REGION
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
        let tecmilenio__navbar__top = $(".tecmilenio__navbar__top");

        /**
         * Represents the main navigation bar element in the DOM.
         * @type {jQuery}
         */
        let tecmilenio__navbar__main = $(".tecmilenio__navbar__main");

        /**
         * Intersection observer to control the position of the main navigation bar.
         * @type {IntersectionObserver}
         */
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    // If the element is not intersecting, fix it to the top of the window.
                    tecmilenio__navbar__main.addClass("tecmilenio__nav__sticky");
                } else {
                    // If the element is intersecting, set it back to relative position.
                    tecmilenio__navbar__main.removeClass("tecmilenio__nav__sticky");
                }
            });
        });

        // Observe changes in the intersection of the tecmilenio__navbar__top element.
        observer.observe(tecmilenio__navbar__top[0]);
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
    let tecmilenio__navbar__region = $('.tecmilenio__navbar__region')

    /**
    * @type {JQuery}
    * @description Represents the burger menu button on the Tecmilenio website.
    */
    let tecmilenio__burger = $(".tecmilenio__burger");

    // If the size in which the screen is loaded is mobile, it is loaded
    // the 'siu_mobile' class by default
    if (window.innerWidth < MOBILE_BREAKPOINT) {
        tecmilenio__navbar__region.addClass(mobile_class);
    }

    // We execute the function to make the navigation bar sticky when scrolling.
    tecmilenioNavMainSticky();

    // Function to add "active_class" when the expand menu is clicked. 
    // In case you click again, the classes are eliminated, in this way
    // we control whether to show or hide the menu.
    tecmilenio__burger.click(function () {
        tecmilenio__navbar__region.toggleClass(active_class);
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
            if (!tecmilenio__navbar__region.hasClass(mobile_class)) {
                tecmilenio__navbar__region.addClass(mobile_class);
            }
        } else {
            // Desktop
            if (tecmilenio__navbar__region.hasClass(mobile_class)) {
                tecmilenio__navbar__region.removeClass(mobile_class);
                tecmilenio__navbar__region.removeClass(active_class);
                tecmilenio__burger.removeClass(active_class)
            }
        }
    });
});

/* ==============================
END - TECMILENIO NAVBAR REGION
================================= */

/* ==============================
START - TECMILENIO NAV MAIN MENU
================================= */

$(document).ready(function () {
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

    const default_image = '';

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
            .html(item.a.text);

        if (item.a.url){
            link.attr({
                href: item.a.url
            })
        }

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

        return li;
    }

    function rebuildMainMenu() {
        let ul = $("<ul>").addClass("tecmilenio__nav__main__menu");

        // Rebuilding main menu.
        menu_items.forEach((item) => {

            if (item.show_item){
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
                            {
                                key: "image",
                                value: item.imagen ? item.imagen.media_image : default_image,
                            }
                        ],
                    },
                    li: {
                        class: "tn__menu__item",
                    },
                });
    
                ul.append(li);
            }
        });

        return ul;
    }

    function loadSubmenu_imagen(node) {
        if (node.data('image')){
            // Get the image URL from the 'data-image' attribute of the node
            const item_image = node.data('image');

            // Set the background image of the submenu_imagen element with the URL of the current item link.
            submenu_imagen.css('background', 'url("' + item_image + '")');
        }                
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

        // Eliminamos las clases activas de todos los elementos con la clase 'tn__menu__item_btn'
        $('.tn__menu__item_btn').removeClass(active_class);

        // Si el nodo tiene un link (atributo href) 
        if (hasHref(currentNode)) {
            //Se elimina la clase active_class, de esta manera ocultamos el contenedor de submenus, ya que no es necesario mostrarlo si esta vacio.
            tn__menu__submenu__container.removeClass(active_class);
            return;
        }

        // Agregamos la clase activa al boton 'tn__menu__item_btn'
        currentNode.addClass(active_class)

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
                                value: item.imagen_multimedia ? item.imagen_multimedia.media_image : default_image,
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
        if (liElements.length > 1) {
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

        // Eliminamos las clases activas de todos los elementos con la clase 'tn__submenu1__item__btn'
        $('.tn__submenu1__item__btn').removeClass(active_class);

        // Clear the tn__submenu2
        tn__submenu2.html('');
        
        // Load the item image in submenu_imagen container       
        loadSubmenu_imagen(currentNode);

        // Si el nodo tiene un link (atributo href), no hacemos nada.
        if (hasHref(currentNode)) {
            return;
        }

        currentNode.addClass(active_class)

        // Obtenemos el objeto json que contiene toda la informacion del item con la cual
        // se construye el submenu.    
        const tn__submenu1__item = currentNode.data('json');

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
                        text: item.link.text
                    },
                    li: {
                        class: "tn__submenu2__item",
                    },
                });

                // Agregar el elemento li generado al objeto jQuery
                liElements = liElements.add(li);
            }
        });

        // Agregamos los item li creados al elemento tn__submenu2
        tn__submenu2.append(liElements);
    }

    function stopRedirectionItemBtnMouseClickAction(event) {
        // Asignamos el nodo actual a la variable currentNode
        let currentNode = $(this);

        // Si el nodo <a> NO tiene un link (atributo href), entonces deten el evento click que redirige al link
        if (!hasHref(currentNode)) {
            event.preventDefault();
        }
    }

    function mobileTnMenuItemBtnMouseClickAction(event) {
    
        // Asignamos el nodo actual a la variable currentNode
        let currentNode = $(this);
    
        // Si el elemento tiene un link (atributo href), entonces deten la funcion y
        // redirige al link. Esto se hace por que los items del menu que contienen
        // una URL deben de funcionar como enlace directo, en caso de que no tengan
        // una URL funcionara como un contenedor de submenu.
        if (hasHref(currentNode)) {
            return;
        }
    
        // Detenemos la redireccion del evento click del elemento <a>
        event.preventDefault()
    
        // Obtenemos el id del nodo actual para hacer la busqueda para obtener los datos del item seleccionado
        const tn__menu__item_id = currentNode.data("id");

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
    
        // Crear un objeto jQuery vacío para almacenar los elementos
        let liElements = $();
    
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
    
        // Agregar el elemento li generado al objeto jQuery
        liElements = liElements.add(li);
    
        // For each 'enlaces_menu' item, a corresponding list item is created and appended to the menu.
        // This loop iterates over each 'enlaces_menu' item.
        // For each item, it checks if the link is available to be shown.
        // If so, a list item is created and added to the liElements jQuery object.
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
                            { event: 'click', func: mobileTnSubmenu1ItemBtnMouseClickAction }
                        ]
                    },
                    li: {
                        class: "tn__submenu1__item",
                    },
                });
    
                // If 'subenlaces' exist, create a nested list for them.
                if (item.subenlaces) {
                    // An unordered list element that holds the 'subenlaces' as list items.
                    let ul = $("<ul>").addClass("tn__submenu1");
                        
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
    
                            ul.append(li);
                        }
                    });
    
                    li.append(ul);
                }
    
                // Agregar el elemento li generado al objeto jQuery
                liElements = liElements.add(li);
            }
        });
    
        // Verificar si hay más de un elemento en liElements

        if (liElements.length > 1) {            
            // Remover todos los elementos hijos de tecmilenio__nav__main__menu
            tecmilenio__nav__main__menu.empty();
            
            // Agregamos la clase activa
            tecmilenio__nav__main__menu.addClass(active_class)

            // Agregar los elementos de liElements a tecmilenio__nav__main__menu
            tecmilenio__nav__main__menu.append(liElements);
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
    
    function mobileTnSubmenu1ItemBtnMouseClickAction(event) {
        
        // Asignamos el nodo actual a la variable currentNode
        let currentNode = $(this);

        if (hasHref(currentNode)) {
            return;
        }
    
        event.preventDefault();
    
        currentNode.parent().toggleClass(active_class);
    }

    /* ==============================
    START - RUN MAIN FUNCTIONS
    ================================= */

    // Esta funcion agrega un evento mouseleave al elemento '.tn__menu__submenu__container' que es el contenedor de submenu, lo que hara que cuando el mouse salga del elemento, eliminara la clase activa y se limpiara el elemento.
    tn__menu__submenu__container.on("mouseleave", function () {
        // Limpiamos el contenedor de submenu
        clearTnMenuSubmenuContainer();

        // Eliminamos la clase activa del elemento 'tn__menu__item_btn' que es el padre 
        $('.tn__menu__item_btn').removeClass(active_class);

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
                clearMobileListeners();
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
