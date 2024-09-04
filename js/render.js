const container = document.getElementById('header');


export function home() {
    return `
        <h1>Welcome to Star Wars Character Explorer</h1>
        <p>This is the homepage where you can begin your journey.</p>
     `
}

export function authentication() {
    return auth0.createAuth0Client({
        domain: "dev-0lmefgniuw4n2bt6.us.auth0.com",
        clientId: "O7jONYbuErRWnyazVzsPhd7x7BMZp3AG",
        authorizationParams: {
            redirect_uri: "http://localhost:5501"
        }
    }).then(async (auth0Client) => {
        const isAuthenticated = await auth0Client.isAuthenticated();
        const userProfile = isAuthenticated ? await auth0Client.getUser() : null;

        const loginHtml = `<button type="submit" id="login">Login</button>`;
        const logoutHtml = `<button type="submit" id="logout">Log Out</button>`;
        const profileHtml = isAuthenticated 
            ? `<div id="profile" style="display: block;">
                    <p>${userProfile.name}</p>
                    <img src="${userProfile.picture}" alt="Profile Picture" />
               </div>`
            : `<div id="profile" style="display: none;"></div>`;

        // Add event listeners after rendering the HTML
        setTimeout(() => {
            const loginButton = document.getElementById("login");
            if (loginButton) {
                loginButton.addEventListener("click", (e) => {
                    console.log("logging in...");
                    e.preventDefault();
                    auth0Client.loginWithRedirect();
                });
            }

            const logoutButton = document.getElementById("logout");
            if (logoutButton) {
                logoutButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    console.log("logging out...");
                    auth0Client.logout();
                });
            }

            if (location.search.includes("state=") && 
                (location.search.includes("code=") || 
                location.search.includes("error="))) {
                auth0Client.handleRedirectCallback().then(() => {
                    window.history.replaceState({}, document.title, "/");
                });
            }
        }, 0);

        return `
            ${isAuthenticated ? logoutHtml : loginHtml}
            ${profileHtml}
        `;
    });
}

// Usage
authentication().then(html => {
    container.innerHTML = html;
});

export function chooseSide() {
    return `
        <h1>Choose Your Side</h1>
        <p>Will you join the Light Side or the Dark Side?</p>
    `;
}

export function goodSide() {
    return `
        <h1>Light Side</h1>
        <p>Welcome to the Light Side. Here are the heroes of the Star Wars universe.</p>
    `;
}

export function badSide() {
    return `
        <h1>Dark Side</h1>
        <p>Welcome to the Dark Side. Here are the villains of the Star Wars universe.</p>
    `;
}

export function notFound() {
    return `
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
    `;
}