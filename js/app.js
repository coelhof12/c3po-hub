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
    
    // Dynamically add the background image
    document.body.style.backgroundImage = "url('./img/SWSpace_bg.png')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed'; // Ensures the image stays in place
    
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
                <p id="c3po-text">
                    <span>Greetings, I am C-3PO, human-cyborg relations. Welcome to the Star Wars Character Explorer! Here, you can explore detailed profiles of your favorite characters from the galaxy far, far away.</span>
                </p>
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
    document.body.className = ''; // Reset any specific styles
    const container = document.querySelector('#page-wrap');
    container.innerHTML = `
        <button class="back-button" id="backButton">Back</button> <!-- Back button added -->
        <div class="auth-container">
        <!-- Star Wars Logo -->
            <img src="./img/starwarslogo.png" alt="Star Wars Logo">
            <form id="loginForm">
                <input type="text" id="username" name="username" placeholder="Email" required>
                <input type="password" id="password" name="password" placeholder="Password" required>
                <button type="submit" id="loginButton">Log In</button>
            </form>
        </div>
    `;

    // Back button event listener
    document.getElementById('backButton').addEventListener('click', function() {
        window.history.pushState({}, '', '/');
        renderPage('/');
    });

    // Form submission handler for Log In
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log(`Username: ${username}, Password: ${password}`);
        
    });
    
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
    document.body.className = 'good-side-page';
    const container = document.querySelector('#page-wrap');
    container.innerHTML = `
        <h1>The Light Side</h1>
        <p>Welcome to the Light Side. Here are the heroes of the Star Wars universe.</p>

        <div id="spinner" class="spinner"></div>
        
        <div class="image-container">
            <div class="circular-image" data-name="Luke Skywalker">
                <img src="./img/heroes/luke_portrait.png" alt="Luke Skywalker">
            </div>
            <div class="circular-image" data-name="Han Solo">
                <img src="./img/heroes/hanSolo_portrait.png" alt="Han Solo">
            </div>
            <div class="circular-image" data-name="Yoda">
                <img src="./img/heroes/yoda_portrait.png" alt="Yoda">
            </div>
            <div class="circular-image" data-name="Obi-Wan Kenobi">
                <img src="./img/heroes/kenobi_portrait.png" alt="Kenobi">
            </div>
            <div class="circular-image" data-name="Leia Organa">
                <img src="./img/heroes/leia_portrait.png" alt="Leia">
            </div>
        </div>
        
        <!-- Modal to display character info -->
        <div id="character-modal" class="modal">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <h2 id="character-name"></h2>
                <p id="character-info"></p>
            </div>
        </div>
    `;
    
    attachCharacterClickEvents();
}



// Attach event listeners to the character images
function attachCharacterClickEvents() {
    const images = document.querySelectorAll('.circular-image');
    const spinner = document.getElementById('spinner');

    images.forEach(image => {
        image.addEventListener('click', async () => {
            const characterName = image.getAttribute('data-name');

            // Show the spinner by adding the CSS class
            spinner.classList.add('show-spinner');

            try {
                // Fetch the character data
                const characterData = await fetchCharacterByName(characterName);

                // Hide the spinner once data is fetched
                spinner.classList.remove('show-spinner');

                // Show the character data in the modal
                showCharacterModal(characterData);

            } catch (error) {
                // In case of an error, hide the spinner and handle the error
                spinner.classList.remove('show-spinner');
                console.error("Error fetching character data:", error);
            }
        });
    });

    // Close modal on click
    document.querySelector('.close-button').addEventListener('click', closeModal);
}

// Show character data in the modal
function showCharacterModal(character) {
    const modal = document.getElementById('character-modal');
    const characterName = document.getElementById('character-name');
    const characterInfo = document.getElementById('character-info');

    characterName.textContent = character.name;
    characterInfo.innerHTML = `
        <strong>Height:</strong> ${character.height} cm<br>
        <strong>Mass:</strong> ${character.mass} kg<br>
        <strong>Hair Color:</strong> ${character.hair_color}<br>
        <strong>Skin Color:</strong> ${character.skin_color}<br>
        <strong>Birth Year:</strong> ${character.birth_year}<br>
        <strong>Gender:</strong> ${character.gender}
    `;

    // Display the modal
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('character-modal');
    modal.style.display = 'none';
}


/* ==========================================================
   =============== Render: Bad Side Content ================
   ========================================================== */
   export function badSide() {
    document.body.className = 'bad-side-page';
    const container = document.querySelector('#page-wrap');
    container.innerHTML = `
        <h1>The Dark Side</h1>
        <p>Welcome to the Dark Side. Here are the villains of the Star Wars universe.</p>

        <div id="spinner" class="spinner"></div>
        
        <div class="image-container">
            <div class="circular-image" data-name="Darth Vader">
                <img src="./img/villains/vader_portrait.png" alt="Darth Vader">
            </div>
            <div class="circular-image" data-name="Palpatine">
                <img src="./img/villains/sidious_portrait.png" alt="Darth Sidious">
            </div>
            <div class="circular-image" data-name="Darth Maul">
                <img src="./img/villains/maul_portrait.png" alt="Darth Maul">
            </div>
            <div class="circular-image" data-name="Dooku">
                <img src="./img/villains/dooku_portrait.png" alt="Count Dooku">
            </div>
            <div class="circular-image" data-name="Darth Maul">
                <img src="./img/villains/kylo_portrait.png" alt="Kylo Ren">
            </div>
        </div>
        
        <!-- Modal to display character info -->
        <div id="character-modal" class="modal">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <h2 id="character-name"></h2>
                <p id="character-info"></p>
            </div>
        </div>
    `;
    
    attachCharacterClickEvents();
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
    if (path === '/index.html' || path === '/') { // Temporarily added this "if" statement to handle URLs like "/index.html" and not as an error page during development. REMOVE BEFORE DEPLOY or not its the same thing.
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