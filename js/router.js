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
    // Get the path from the query parameter (for redirects) or fallback to window.location.pathname
    const urlParams = new URLSearchParams(window.location.search);
    const currentPath = urlParams.get('path') || window.location.pathname;

    // Find the correct route given the path
    const route = routes.find(r => r.path === currentPath);

    if (route) {
        route.page(); // Render the matched route
    } else {
        pageNotFound(); // Render 404 if page is not found
    }
}

// Call renderPage on initial load
renderPage();

// Listen for popstate (back/forward navigation)
window.addEventListener('popstate', () => {
    renderPage();
});
