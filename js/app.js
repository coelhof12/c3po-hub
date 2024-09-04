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
    document.body.className = 'good-side-page'; // No specific styles for this page
    const container = document.querySelector('#page-wrap');
    container.innerHTML = `
        <h1>The Light Side</h1>
        <p>Welcome to the Light Side. Here are the heroes of the Star Wars universe.</p>
        
        <div class="image-container">
    <div class="circular-image">
        <a href="???">
            <img src="./img/heroes/luke_portrait.png" alt="Luke Skywalker">
        </a>
    </div>

    <div class="circular-image">
        <a href="???">
            <img src="./img/heroes/hanSolo_portrait.png" alt="Solo">
        </a>
    </div>

    <div id="yoda" class="circular-image">
        <a href="???">
        <img src="./img/heroes/yoda_portrait.png" alt="Yoda">
        </a>
    </div>

    <div id="kenobi" class="circular-image">
        <a href="???">
        <img src="./img/heroes/kenobi_portrait.png" alt="Kenobi">
        </a>
    </div>

    <div id="leia" class="circular-image">
        <a href="???">
        <img src="./img/heroes/leia_portrait.png" alt="Leia">
        </a>
    </div>
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
   ====== Render Appropriate Page Based on the URL ==========
   ========================================================== */
export function renderPage(path) {
    switch (path) {
        case '/':
            home();
            break;
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
            home(); // Default to home page if path doesn't match - WE COULD DO A 404 PAGE HERE INSTEAD
            break;
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