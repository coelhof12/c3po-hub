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
    const container = document.querySelector('#page-wrap');
    container.innerHTML = `
        <h1>Welcome to Star Wars Character Explorer</h1>
        <p>This is the homepage where you can begin your journey.</p>
        <div class="c3po-container">
            <img id="cp30-avatar" src="./img/c3po_avatar.png" alt="C-3PO avatar">
            <div class="c3po-feedback">
                <p id="c3po-text">Greetings, I am C-3PO, human-cyborg relations. Welcome to the Star Wars Character Explorer! Here, you can explore detailed profiles of your favorite characters from the galaxy far, far away.</p>
            </div>
        </div>
    `;
}

/* ==========================================================
   ============ Render: Authentication Content ==============
   ========================================================== */
   
export function authentication() {
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
    `;
    // Add form submission handler here
}    

/* ==========================================================
   ============== Render: Choose Side Content ===============
   ========================================================== */
export function chooseSide() {
    container.innerHTML = `
        <h1>Choose Your Side</h1>
        <p>Will you join the Light Side or the Dark Side?</p>
    `;
}

/* ==========================================================
   =============== Render: Good Side Content ================
   ========================================================== */
export function goodSide() {
    container.innerHTML = `
        <h1>The Light Side</h1>
        <p>Welcome to the Light Side. Here are the heroes of the Star Wars universe.</p>
    `;
}

/* ==========================================================
   =============== Render: Bad Side Content =================
   ========================================================== */
export function badSide() {
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
            home(); // Default to home page if path doesn't match
            break;
    }
}

/* ==========================================================
   ====== Set Event Listener for Navigation Anchors =========
   ========================================================== */
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault(); // Prevents browser from triggering GET request

        // Get the path from the anchor
        const path = event.target.getAttribute('href');
        // Change URL using pushState
        window.history.pushState({}, '', path);
        renderPage(path);
    });
});

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
