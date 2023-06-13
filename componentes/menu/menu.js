let menu_items = [];

/* ==============================
START - REMOVE THIS CODE 
================================= */

const proxyUrl = "https://tecmidrupal.lndo.site/es/api/menu/principal/es"; // Ruta de tu servidor proxy

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
    const active_class = "tn__activo";

    /**
     * Represents the mobile class.
     * @type {string}
     */
    const mobile_class = "siu_mobile";

    /**
     * Represents the main navigation region element in the DOM.
     * @type {jQuery}
     */
    let tecmilenio__navbar__region = $(".tecmilenio__navbar__region");

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
                tecmilenio__burger.removeClass(active_class);
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
    const active_class = "tn__activo";

    /**
     * Represents the mobile class.
     * @type {string}
     */
    const mobile_class = "siu_mobile";

    /**
     * Represents the default image.
     * @type {string}
     */
    const default_image = "";

    /**
     * jQuery element for '.tecmilenio__nav__main__menu__container'.
     */
    let tecmilenio__nav__main__menu__container = $(
        ".tecmilenio__nav__main__menu__container"
    );

    /**
     * jQuery element for '.tecmilenio__nav__main__menu'.
     */
    let tecmilenio__nav__main__menu = $(".tecmilenio__nav__main__menu");

    /**
     * jQuery element for '.tn__menu__submenu__container'.
     */
    let tn__menu__submenu__container = $(".tn__menu__submenu__container");

    /**
     * jQuery element for '.submenu_imagen'.
     */
    let submenu_imagen = $(".submenu_imagen");

    /**
     * jQuery element for '.tn__submenu1' where the first submenu of the selected item will be loaded.
     */
    let tn__submenu1 = $(".tn__submenu1");

    /**
     * jQuery element for '.tn__submenu2'.
     */
    let tn__submenu2 = $(".tn__submenu2");

    /**
     * Create a list item element for the menu.
     * @param {Object} item - The item object containing properties for the link and list item.
     * @returns {jQuery} - The created list item element.
     */
    function createItemMenuLi(item) {
        /**
         * Create the link element.
         */
        let link = $("<a>").addClass(item.a.class).html(item.a.text);

        if (item.a.url) {
            link.attr({
                href: item.a.url,
            });
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

        /**
         * Create the list item element.
         */
        let li = $("<li>").addClass(item.li.class).append(link);

        return li;
    }

    /**
     * Rebuilds the main menu.
     * @returns {jQuery} - The reconstructed main menu as a jQuery element.
     */
    function rebuildMainMenu() {
        /**
         * Create a new unordered list element with the class 'tecmilenio__nav__main__menu'.
         */
        let ul = $("<ul>").addClass("tecmilenio__nav__main__menu");

        /**
         * Rebuilding the main menu.
         */
        menu_items.forEach((item) => {
            if (item.show_item) {
                /**
                 * Create a list item element for each menu item.
                 */
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
                            },
                        ],
                    },
                    li: {
                        class: "tn__menu__item",
                    },
                });

                /**
                 * Append the list item to the unordered list.
                 */
                ul.append(li);
            }
        });

        return ul;
    }

    /**
     * Load the submenu image based on the provided node.
     * @param {jQuery} node - The jQuery node element.
     */
    function loadSubmenu_imagen(node) {
        if (node.data("image")) {
            /**
             * Get the image URL from the 'data-image' attribute of the node.
             */
            const item_image = node.data("image");

            /**
             * Set the background image of the submenu_imagen element with the URL of the current item link.
             */
            submenu_imagen.css("background", 'url("' + item_image + '")');
        }
    }

    /**
     * Check if the provided node has an href attribute.
     * @param {jQuery} node - The jQuery node element.
     * @returns {boolean} - Returns true if the node has an href attribute, otherwise returns false.
     */
    function hasHref(node) {
        return node.attr("href");
    }

    /**
     * Set the mobile listeners for '.tn__menu__item_btn' elements.
     */
    function setMobileListeners() {
        $(".tn__menu__item_btn").on("click", mobileTnMenuItemBtnMouseClickAction);
    }

    /**
     * Clear the mobile listeners for '.tn__menu__item_btn' elements.
     */
    function clearMobileListeners() {
        $(".tn__menu__item_btn").off("click", mobileTnMenuItemBtnMouseClickAction);
    }

    /**
     * Set the desktop listeners for '.tn__menu__item_btn' elements.
     */
    function setDesktopListeners() {
        $(".tn__menu__item_btn").on("mouseover", tnMenuItemBtnMouseOverAction);
        $(".tn__menu__item_btn").on(
            "click",
            stopRedirectionItemBtnMouseClickAction
        );
    }

    /**
     * Clear the desktop listeners for '.tn__menu__item_btn' elements.
     */
    function clearDesktopListeners() {
        $(".tn__menu__item_btn").off("mouseover", tnMenuItemBtnMouseOverAction);
        $(".tn__menu__item_btn").off(
            "click",
            stopRedirectionItemBtnMouseClickAction
        );
    }

    /**
     * Clear the tn__menu__submenu__container by clearing tn__submenu1, tn__submenu2, and resetting the submenu_imagen.
     */
    function clearTnMenuSubmenuContainer() {
        tn__submenu1.html("");
        tn__submenu2.html("");
        submenu_imagen.css("background", "");
    }

    /**
     * Loads the initial configuration based on the window width.
     */
    function loadInitConfig() {
        if (window.innerWidth < MOBILE_BREAKPOINT) {
            setMobileListeners();
            tecmilenio__nav__main__menu__container.addClass(mobile_class);
        } else {
            setDesktopListeners();
        }
    }

    /**
     * Rebuilds and loads the main menu.
     */
    function rebuildAndLoadMainMenu() {
        /**
         * Construct a new element with the '.tecmilenio__nav__main__menu' class.
         */
        let newMainMenu = rebuildMainMenu();

        /**
         * Replace the element with the '.tecmilenio__nav__main__menu' class
         * with the newly constructed element using JavaScript.
         */
        tecmilenio__nav__main__menu.replaceWith(newMainMenu);

        /**
         * Since the element with the '.tecmilenio__nav__main__menu' class
         * that was assigned to the variable when initializing the DOM
         * is replaced with the newly reconstructed element,
         * it is necessary to reassign it to the global variable.
         */
        tecmilenio__nav__main__menu = $(newMainMenu);
    }

    /**
     * This function handles the mouse over action for the item button in tnMenu.
     */
    function tnMenuItemBtnMouseOverAction() {
        /**
         * Assign the current node to the 'currentNode' variable.
         */
        let currentNode = $(this);

        /**
         * Remove the active classes from all elements with the 'tn__menu__item_btn' class.
         */
        $(".tn__menu__item_btn").removeClass(active_class);

        /**
         * If the node has a link (href attribute),
         * remove the active_class to hide the submenu container, as it is not necessary to display it if it's empty.
         */
        if (hasHref(currentNode)) {
            tn__menu__submenu__container.removeClass(active_class);
            return;
        }

        /**
         * Add the active class to the 'tn__menu__item_btn' button.
         */
        currentNode.addClass(active_class);

        /**
         * Get the id of the current node to search for the selected item's data.
         */
        const tn__menu__item_id = currentNode.data("id");

        /**
         * Find the menu item with the matching id from the 'menu_items' array.
         */
        const tn__menu__item = menu_items.find(
            (item) => item.id == tn__menu__item_id
        );

        /**
         * Check if tn__menu__item.enlaces_menu is empty or undefined.
         * If so, return without further action.
         */
        if (
            !tn__menu__item.enlaces_menu ||
            tn__menu__item.enlaces_menu.length === 0
        ) {
            return;
        }

        /**
         * Load the submenu image for the currentNode.
         */
        loadSubmenu_imagen(currentNode);

        /**
         * Create an empty jQuery object to store the elements.
         */
        let liElements = $();

        /**
         * Clear the tn__submenu1.
         */
        tn__submenu1.html("");

        /**
         * Create li elements for submenu1 based on the sublinks in tn__menu__item.
         */
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
                                value: item.imagen_multimedia
                                    ? item.imagen_multimedia.media_image
                                    : default_image,
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
                // Add the generated 'li' element to the jQuery object.
                liElements = liElements.add(li);
            }
        });

        /**
         * Check if there are elements in the jQuery object.
         */
        if (liElements.length > 1) {
            /**
             * Add the created li items to the tn__submenu1 element.
             */
            tn__submenu1.append(liElements);
            /**
             * Add the 'tn__activo' class to the tn__menu__submenu__container element.
             */
            tn__menu__submenu__container.addClass(active_class);
        } else {
            /**
             * Remove the 'tn__activo' class from the tn__menu__submenu__container element.
             */
            tn__menu__submenu__container.removeClass(active_class);
        }
    }

    /**
     * This function handles the mouse over action for the item button in tnSubmenu1.
     */
    function tnSubmenu1ItemBtnMouseOverAction() {
        /**
         * Assign the current node to the 'currentNode' variable.
         */
        let currentNode = $(this);

        /**
         * Remove the active classes from all elements with the 'tn__submenu1__item__btn' class.
         */
        $(".tn__submenu1__item__btn").removeClass(active_class);

        /**
         * Clear the tn__submenu2.
         */
        tn__submenu2.html("");

        /**
         * Load the item image in the submenu_imagen container.
         */
        loadSubmenu_imagen(currentNode);

        /**
         * If the node has a link (href attribute), do nothing.
         */
        if (hasHref(currentNode)) {
            currentNode.on("mouseleave", function () {
                submenu_imagen.css("background", "");
            });
            return;
        }

        /**
         * Add the active class to the currentNode.
         */
        currentNode.addClass(active_class);

        /**
         * Get the JSON object that contains all the information of the item to construct the submenu.
         */
        const tn__submenu1__item = currentNode.data("json");

        /**
         * Check if tn__submenu1__item.subenlaces is empty or undefined.
         * If so, return without further action.
         */
        if (
            !tn__submenu1__item.subenlaces ||
            tn__submenu1__item.subenlaces.length === 0
        ) {
            return;
        }

        /**
         * Create an empty jQuery object to store the elements.
         */
        let liElements = $();

        /**
         * Create li elements for submenu2 based on the sublinks in tn__submenu1__item.
         */
        tn__submenu1__item.subenlaces.forEach((item) => {
            // Check if link is available to show
            if (item.show_link) {
                let li = createItemMenuLi({
                    a: {
                        class: "tn__submenu2__item__btn",
                        url: item.link.url,
                        text: item.link.text,
                    },
                    li: {
                        class: "tn__submenu2__item",
                    },
                });
                // Add the generated li element to the jQuery object.
                liElements = liElements.add(li);
            }
        });

        /**
         * Add the created li items to the tn__submenu2 element.
         */
        tn__submenu2.append(liElements);
    }

    /**
     * This function handles the mouse click action for the item button that stops redirection.
     * @param {Event} event - The mouse click event.
     */
    function stopRedirectionItemBtnMouseClickAction(event) {
        /**
         * Assign the current node to the 'currentNode' variable.
         */
        let currentNode = $(this);

        /**
         * If the <a> node does NOT have a link (href attribute),
         * then stop the click event that redirects to the link.
         */
        if (!hasHref(currentNode)) {
            event.preventDefault();
        }
    }

    /**
     * This function handles the mouse click action on mobile for the '.tn__menu__item_btn' element.
     * @param {Event} event - The mouse click event.
     */
    function mobileTnMenuItemBtnMouseClickAction(event) {
        /**
         * Assign the current node to the 'currentNode' variable.
         */
        let currentNode = $(this);

        /**
         * If the element has a link (href attribute), stop the function and redirect to the link.
         * This is done because menu items that have a URL should function as a direct link.
         * If they don't have a URL, they will act as a submenu container.
         */
        if (hasHref(currentNode)) {
            return;
        }

        /**
         * Prevent the default redirection behavior of the <a> element's click event.
         */
        event.preventDefault();

        /**
         * Get the id of the current node to search for the selected item's data.
         */
        const tn__menu__item_id = currentNode.data("id");

        /**
         * Find the menu item with the matching id from the 'menu_items' array.
         */
        const tn__menu__item = menu_items.find(
            (item) => item.id == tn__menu__item_id
        );

        /**
         * Check if the 'tn__menu__item' has 'enlaces_menu' or a 'link' property.
         * If not, return without further action.
         */
        if (
            !tn__menu__item.enlaces_menu ||
            tn__menu__item.enlaces_menu.length === 0 ||
            !tn__menu__item.link
        ) {
            return;
        }

        /**
         * Create an empty jQuery object to store the elements.
         */
        let liElements = $();

        /**
         * This section of code is responsible for constructing a navigation menu.
         * The structure of the menu is a list (`<ul>`) where each list item (`<li>`) represents a menu item.
         * Each menu item may contain a link (`<a>`) and may act as a parent for nested sub-menu items.
         */

        /**
         * Create the first list item, which acts as a main menu item and parent of subsequent list items.
         */
        let li = createItemMenuLi({
            a: {
                class: "tn__menu__item_btn",
                url: tn__menu__item.link.url,
                text: tn__menu__item.link.text,
                events: [
                    {
                        event: "click",
                        func: MobileTnSubmenu1ParentItemBtnMouseClickAction,
                    },
                ],
            },
            li: {
                class: "tn__submenu1__item",
            },
        });

        /**
         * Add the generated 'li' element to the jQuery object.
         */
        liElements = liElements.add(li);

        /**
         * For each 'enlaces_menu' item, create a corresponding list item and append it to the menu.
         * This loop iterates over each 'enlaces_menu' item.
         * For each item, it checks if the link is available to be shown.
         * If so, a list item is created and added to the 'liElements' jQuery object.
         * If the item has 'subenlaces', they are processed as nested list items and added to the current list item.
         */
        tn__menu__item.enlaces_menu.forEach((item) => {
            // Check if link is available to show
            if (item.show_link) {
                // Create a list item element for each 'enlaces_menu' item.
                let li = createItemMenuLi({
                    a: {
                        class: "tn__submenu1__item__btn",
                        url: item.link.url,
                        text: item.link.text,
                        events: [
                            { event: "click", func: mobileTnSubmenu1ItemBtnMouseClickAction },
                        ],
                    },
                    li: {
                        class: "tn__submenu1__item",
                    },
                });

                // If 'subenlaces' exist, create a nested list for them.
                if (item.subenlaces) {
                    // Create an unordered list element to hold the 'subenlaces' as list items.
                    let ul = $("<ul>").addClass("tn__submenu1");
                    item.subenlaces.forEach((subitem) => {
                        // Check if link is available to show
                        if (subitem.show_link) {
                            // Create a list item element for each 'subenlaces' item.
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

                // Add the generated 'li' element to the jQuery object.
                liElements = liElements.add(li);
            }
        });

        /**
         * Check if there are more than one element in 'liElements'.
         */
        if (liElements.length > 1) {
            /**
             * Remove all child elements from 'tecmilenio__nav__main__menu'.
             */
            tecmilenio__nav__main__menu.empty();

            /**
             * Add the active class to 'tecmilenio__nav__main__menu'.
             */
            tecmilenio__nav__main__menu.addClass(active_class);

            /**
             * Add the 'liElements' to 'tecmilenio__nav__main__menu'.
             */
            tecmilenio__nav__main__menu.append(liElements);
        }
    }

    /**
     * This function handles the mouse click action on mobile for the parent item button of '.tn__submenu1'.
     * @param {Event} event - The mouse click event.
     */
    function MobileTnSubmenu1ParentItemBtnMouseClickAction(event) {
        /**
         * Prevent the default redirection behavior of the <a> element's click event.
         */
        event.preventDefault();

        /**
         * Rebuild and load the main menu.
         */
        rebuildAndLoadMainMenu();

        /**
         * Set the listeners for mobile.
         */
        setMobileListeners();
    }

    /**
     * This function handles the mouse click action on mobile for the '.tn__submenu1__item_btn' element.
     * @param {Event} event - The mouse click event.
     */
    function mobileTnSubmenu1ItemBtnMouseClickAction(event) {
        /**
         * Assign the current node to the 'currentNode' variable.
         */
        let currentNode = $(this);

        /**
         * If the currentNode has an href attribute, return without further action.
         */
        if (hasHref(currentNode)) {
            return;
        }

        /**
         * Prevent the default behavior of the event.
         */
        event.preventDefault();

        /**
         * Toggle the active_class on the parent of the currentNode.
         */
        currentNode.parent().toggleClass(active_class);
    }

    /* ==============================
    START - RUN MAIN FUNCTIONS
    ================================= */

    /**
     * This function adds a mouseleave event to the '.tn__menu__submenu__container' element,
     * which is the submenu container. When the mouse leaves the element, it removes the active class
     * and clears the element.
     */
    tn__menu__submenu__container.on("mouseleave", function () {
        /**
         * Clear the submenu container.
         */
        clearTnMenuSubmenuContainer();

        /**
         * Remove the active class from the 'tn__menu__item_btn' element, which is the parent.
         */
        $(".tn__menu__item_btn").removeClass(active_class);

        /**
         * Remove the active_class class.
         */
        tn__menu__submenu__container.removeClass(active_class);
    });

    /**
     * Initialize the initial configuration.
     */
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
});

/* ==============================
END - TECMILENIO NAV MAIN MENU
================================= */
