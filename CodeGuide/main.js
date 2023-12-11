// Get HTML elements
const htmlButton = document.getElementById("html-button");
const cssButton = document.getElementById("css-button");
const jsButton = document.getElementById("js-button");
const pythonButton = document.getElementById("python-button");
const cPlusButton = document.getElementById("c++-button");

// Setting values
let { html, css, js, python, cPlus } = { html: false, css: false, js: false, python: false, cPlus: false };



//! Functions
function toggleSubNav(type) {
    // Get HTML sub nav
    const htmlNav = document.getElementById("html-sub-nav");
    const cssNav = document.getElementById("css-sub-nav");
    const jsNav = document.getElementById("js-sub-nav");
    const pythonNav = document.getElementById("python-sub-nav");
    const cPlusNav = document.getElementById("c++-sub-nav");

    // Get HTML arrow
    const htmlArrow = document.getElementById("html-arrow");
    const cssArrow = document.getElementById("css-arrow");
    const jsArrow = document.getElementById("js-arrow");
    const pythonArrow = document.getElementById("python-arrow");
    const cPlusArrow = document.getElementById("c++-arrow");

    // Check what type
    switch (type) {
        case 'html':
            htmlNav.classList.toggle("show");
            
            // Turn arrow
            switch (html) {
                case false:
                    htmlArrow.style.transform = "rotate(0deg)";
                    html = true;
                    break
                case true:
                    htmlArrow.style.transform = "rotate(90deg)";
                    html = false;
                    break
            }
            break;

        case 'css':
            //TODO cssNav.classList.toggle("show");

            // Turn arrow
            switch (css) {
                case false:
                    cssArrow.style.transform = "rotate(0deg)";
                    css = true;
                    break
                case true:
                    cssArrow.style.transform = "rotate(90deg)";
                    css = false;
                    break
            }
            break;

        case 'js':
            //TODO jsNav.classList.toggle("show");

            // Turn arrow
            switch (js) {
                case false:
                    jsArrow.style.transform = "rotate(0deg)";
                    js = true;
                    break
                case true:
                    jsArrow.style.transform = "rotate(90deg)";
                    js = false;
                    break
            }
            break;

        case 'python':
            //TODO pythonNav.classList.toggle("show");
                        
            // Turn arrow
            switch (python) {
                case false:
                    pythonArrow.style.transform = "rotate(0deg)";
                    python = true;
                    break
                case true:
                    pythonArrow.style.transform = "rotate(90deg)";
                    python = false;
                    break
            }
            break;

        case 'c++':
            //TODO cPlusNav.classList.toggle("show");
            
            // Turn arrow
            switch (cPlus) {
                case false:
                    cPlusArrow.style.transform = "rotate(0deg)";
                    cPlus = true;
                    break
                case true:
                    cPlusArrow.style.transform = "rotate(90deg)";
                    cPlus = false;
                    break
            }
            break;
    }
    
    // function toggleSubNav(nav, arrow, flag) {
    //     // Toggle the "show" class to trigger the specified transition
    //     nav.classList.toggle("show");
    
    //     // Turn the arrow
    //     if (!flag) {
    //         arrow.style.transform = "rotate(0deg)";
    //         flag = true;
    //         console.log(css)
    //     } else {
    //         arrow.style.transform = "rotate(90deg)";
    //         flag = false;
    //         console.log('no')
    //     }
    // }
}

//! Events
htmlButton.addEventListener('click', function() {
    toggleSubNav('html');
});

cssButton.addEventListener('click', function() {
    toggleSubNav('css');
});

jsButton.addEventListener('click', function() {
    toggleSubNav('js');
});

pythonButton.addEventListener('click', function() {
    toggleSubNav('python');
});

cPlusButton.addEventListener('click', function() {
    toggleSubNav('c++');
});

// Ensures that page start at the top
window.onload = function() {
    window.scrollTo(0, 0);
}