/*
 * Microsites tools js:
 * Este fichero es una muestra de utilidades propias para los microsites.
 * Se puede personalizar a tu gusto
 *
 */
if(performance && performance.mark){
    performance.mark('micro exec');
}
const MICROSITE_ID = '#anim';
const cssMain = document.querySelector('link[data-ws10-microcss]');
const MICROSITE_SELECTION = closest(document.querySelector(MICROSITE_ID), '[data-ws10-microsite]');
const PATH_MICROSITE = MICROSITE_SELECTION ? MICROSITE_SELECTION.dataset.pathmicrosite : '';
let width = document.documentElement.clientWidth;
let isDesktop = width > 1024;
let isTablet = width <= 1024 && width >= 768;
let isMobile = width < 768;


/*
 * Searches for the parent node closest to the element, which complies with the selector
 * @param {} el - Description
 * @param {} selector - Description
 * @param {} stopSelector - Description
 * */
function closest(el, selector, stopSelector) {
    let retval = null;
    while (el) {
        if (el.matches(selector)) {
            retval = el;
            break;
        } else if (stopSelector && el.matches(stopSelector)) {
            break;
        }
        el = el.parentElement;
    }
    return retval;
}


/*
 * Removes the style attr, once the stylesheet have been loaded
 * return undefined
 * */
function _internalCSSInit() {
    if(!ex.cssLoaded){
        if(document.querySelector(MICROSITE_ID)) {
            document.querySelector(MICROSITE_ID).removeAttribute("style");
        }
        ex.cssLoaded = true;
        ex.onStylesReady();
        if(performance && performance.mark){
            performance.mark('micro css ready');
        }
    }
}


/*
 * Initializes functionality JS, and advices when JS is loaded.
 * return undefined
 * */
function _internalJSInit() {
    document.removeEventListener('ws10:frameworkReady', _internalJSInit);
    window.ws10.utils.init(document.querySelector(MICROSITE_ID));
    ex.onFrameworkReady();
    if(performance && performance.mark){
        performance.mark('micro js ready');
        console.timeEnd("microsite instantiation");
    }
}


/*
 * Check if stylesheet CSS is loaded
 * @return {boolean}
 * */
function isCSSMicroLoaded() {
    const domStyles = document.styleSheets;
    let countCSS = 0;
    [].forEach.call(domStyles, (item) => {
        const href = item.href || '';
        if (href.indexOf(PATH_MICROSITE + 'css/ws10') !== -1) {
            console.log('WS10 CSS Loaded');
            countCSS++;
        }
        if (href.indexOf(PATH_MICROSITE + 'css/styles.css') !== -1) {
            console.log('MICRO CSS Loaded');
            countCSS++
        }
    });
    return (countCSS === 2);
}


function init() {
    // DO SOMETHING
}

/*
 * listen event, once have been loaded the files CSS
 * */
if (!isCSSMicroLoaded()) {
    if(cssMain){
        cssMain.addEventListener('load', _internalCSSInit);
        // Make sure microsite gets visible after 3 secs
        setTimeout(()=>{
            console.warn("Microsite visible by 3s timeout")
            _internalCSSInit();

        }, 3000);
    }
    else{
        setTimeout(_internalCSSInit, 100);
    }
} else if (isCSSMicroLoaded()) {
    setTimeout(_internalCSSInit, 100);
}


/*
 * listen event, once have been loaded the files JS
 * */
if (window.ws10) {
    setTimeout(_internalJSInit, 100)
} else {
    document.addEventListener('ws10:frameworkReady', _internalJSInit);
}

const ex = {
    isDesktop,
    isTablet,
    isMobile,
    micrositeId: MICROSITE_ID,
    micrositePath: PATH_MICROSITE,
    init: init,
    cssLoaded: false,
    onStylesReady: () => null,
    onFrameworkReady: () => null
};

export default ex;
