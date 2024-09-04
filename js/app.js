import {
    displayCharacters,
    displayCharacterBySide,
    fetchCharacterByName,
    displayCharFilms,
    displayStarships,
    displayCharSpecies,
    displayCharVehicles
} from '../services/swapiService.js';

import { renderPage as renderContentPage } from "./router.js";

/* ==========================================================
   =============== Render: Homepage Content =================
   ========================================================== */

   export function home() {
    document.body.className = 'home-page'; // Apply home page styles
    const container = document.querySelector('#page-wrap');
    container.innerHTML = `
        <h1>Welcome to Star Wars Character Explorer</h1>
        <p>This is the homepage where you can begin your journey.</p>
        <div class="button-container">
            <button id="loginButton">Log In</button>
            <button id="beginButton">Begin</button>
        </div>
        <div class="c3po-container">
            <img id="cp30-avatar" src="./img/c3po_avatar.png" alt="C-3PO avatar">
            <div class="c3po-feedback">
                <p id="c3po-text">Greetings, I am C-3PO, human-cyborg relations. Welcome to the Star Wars Character Explorer! Here, you can explore detailed profiles of your favorite characters from the galaxy far, far away.</p>
            </div>
        </div>
    `;

    // Add event listeners to buttons
    document.getElementById('loginButton').addEventListener('click', function() {
        window.history.pushState({}, '', '/authentication');
        renderPage('/authentication');
    });

    document.getElementById('beginButton').addEventListener('click', function() {
        window.history.pushState({}, '', '/choose-side');
        renderPage('/choose-side');
    });
}

/* ==========================================================
   ============ Render: Authentication Content ==============
   ========================================================== */
   
export function authentication() {
    document.body.className = ''; // No specific styles for this page
    const container = document.querySelector('#page-wrap');
    container.innerHTML = `
             <h1>Authentication Page</h1>
        <p>Please log in to continue.</p>
        <form id="loginForm">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required><br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br><br>
            <button type="submit">Login</button>
        </form>
        <button id="backButton">Back</button> <!-- Added Back button -->
    `;
    // Add event listeners to buttons
    document.getElementById('backButton').addEventListener('click', function() {
        window.history.pushState({}, '', '/');
        renderPage('/');
    });
    // Add form submission handler here <----------------------------------------------------------------
}

/* ==========================================================
   ============== Render: Choose Side Content ===============
   ========================================================== */
   export function chooseSide() {
    document.body.className = 'choose-side-page'; // Apply choose side page styles
    const container = document.querySelector('#page-wrap');
    container.innerHTML = `
        <button class="back-button" id="backButton">Back</button> <!-- Back button added -->
        <h1>Choose Your Side</h1>
        <p>Will you join the Light Side or the Dark Side?</p>
        <div class="button-container">
            <button id="goodSideButton">
                <img src="./img/choose_side_jedi.png" alt="Light Side">
            </button>
            <button id="badSideButton">
                <img src="./img/choose_side_sith.png" alt="Dark Side">
            </button>
        </div>
    `;

    // Add event listeners to buttons
    document.getElementById('goodSideButton').addEventListener('click', function() {
        console.log('Good Side Button Clicked');
        window.history.pushState({}, '', '/good-side');
        renderPage('/good-side');
    });

    document.getElementById('badSideButton').addEventListener('click', function() {
        console.log('Bad Side Button Clicked');
        window.history.pushState({}, '', '/bad-side');
        renderPage('/bad-side');
    });

    // Back button event listener
    document.getElementById('backButton').addEventListener('click', function() {
        window.history.pushState({}, '', '/');
        renderPage('/');
    });
}

/* ==========================================================
   =============== Render: Good Side Content ================
   ========================================================== */
export function goodSide() {
    document.body.className = ''; // No specific styles for this page
    const container = document.querySelector('#page-wrap');
    container.innerHTML = `
        <h1>The Light Side</h1>
        <p>Welcome to the Light Side. Here are the heroes of the Star Wars universe.</p>
    `;
}

/* ==========================================================
   =============== Render: Bad Side Content =================
   ========================================================== */
export function badSide() {
    document.body.className = ''; // No specific styles for this page
    const container = document.querySelector('#page-wrap');
    container.innerHTML = `
        <h1>The Dark Side</h1>
        <p>Welcome to the Dark Side. Here are the villains of the Star Wars universe.</p>
    `;
}

/* ==========================================================
   =============== Render: 404 Not Found Page ===============
   ========================================================== */
   export function pageNotFound() {
    document.body.className = 'page-not-found'; // Reset body class
    
    // Dynamically add the background image
    document.body.style.backgroundImage = "url('./img/SWSpace_bg.png')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed'; // Ensures the image stays in place
    
    const container = document.querySelector('#page-wrap');
    container.innerHTML = `
        <div class="not-found-container">
            <img src="./img/cp3o_not_found_404.png" alt="cp3o not found" class="not-found-image">
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <button id="backButton">Go to Homepage</button>
        </div>
    `;

    // Add event listener for the Go to Homepage button
    document.getElementById('backButton').addEventListener('click', function() {
        window.history.pushState({}, '', '/');
        renderPage('/');
    });
}


/* ==========================================================
   ====== Render Appropriate Page Based on the URL ==========
   ========================================================== */
   export function renderPage(path) {
    // Treat /index.html as the homepage
    if (path === '/index.html' || path === '/') { // Temporarily added this "if" statement to handle URLs like "/index.html" and not as an error page during development. REMOVE BEFORE DEPLOY.
        home();
    } else {
        switch (path) {
            case '/authentication':
                authentication();
                break;
            case '/choose-side':
                chooseSide();
                break;
            case '/good-side':
                goodSide();
                break;
            case '/bad-side':
                badSide();
                break;
            default:
                pageNotFound(); // Render 404 page if path doesn't match
                break;
        }
    }
}

/* ==========================================================
   ====== Set Event Listener for Navigation Buttons =========
   ========================================================== */
document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault(); // Prevents any default behavior (not strictly necessary for buttons)

        // Get the path from the button's data attribute
        const path = event.target.getAttribute('data-path');

        // Change URL using pushState
        window.history.pushState({}, '', path);

        // Render the appropriate page
        renderPage(path);
    });
})

/* ==========================================================
   ======= Handle Browser Back and Forward Buttons ==========
   ========================================================== */
window.addEventListener('popstate', () => {
    renderPage(document.location.pathname);
});

/* ==========================================================
   ================== Handle Initial Load ===================
   ========================================================== */
renderPage(document.location.pathname);