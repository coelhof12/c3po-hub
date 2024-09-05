import { home, authentication, chooseSide, goodSide, badSide, pageNotFound } from './app.js';

// Create routing for pages
const routes = [
    { path: '/', page: home },
    { path: '/authentication', page: authentication },
    { path: '/choose-side', page: chooseSide },
    { path: '/good-side', page: goodSide },
    { path: '/bad-side', page: badSide },
];

// Function to find route and render a page
export function renderPage() {
    // Get the path from the query parameter or fallback to window.location.pathname
    const urlParams = new URLSearchParams(window.location.search);
    const currentPath = urlParams.get('path') || window.location.pathname;

    console.log('Current path:', currentPath); // Ensure the correct path is logged

    // Check if the path exists in the routes
    const route = routes.find(r => r.path === currentPath);

    if (route) {
        route.page(); // Render the page if a matching route is found
    } else {
        console.log('Path not found, rendering 404 page'); // Add a log for debugging
        pageNotFound(); // Render 404 page if no route matches
    }
}


// Call renderPage on initial load
renderPage();

// Listen for popstate (back/forward navigation)
window.addEventListener('popstate', () => {
    renderPage();
});