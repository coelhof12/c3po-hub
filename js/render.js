const container = document.getElementById('header');

export function home() {
    container.innerHTML = `
        <h1>Welcome to Star Wars Character Explorer</h1>
        <p>This is the homepage where you can begin your journey.</p>
     `
}

export function authentication() {
    // container.innerHTML = `
    //     <h1>Authentication Page</h1>
    //     <p>Please log in to continue</p>
    //     <form id="loginForm">
    //         <label for="username">Username:</label>
    //         <input type="text" id="username" name="username" required><br><br>
    //         <label for="password">Password:</label>
    //         <input type="password" id="password" name="password" required><br><br>
    //         <button type="submit" id="login">Login</button>
    //     </form>
    //     <div id="profile" style="display: none;"></div>
    //     <button id="logout" style="display: none;">Logout</button>
    // `;
    container.innerHTML = `
        <button type="submit" id="login">Login</button>
        <button type="submit" id="logout">Log Out</button>
    `;

    auth0.createAuth0Client({
        domain: "dev-0lmefgniuw4n2bt6.us.auth0.com",
        clientId: "O7jONYbuErRWnyazVzsPhd7x7BMZp3AG",
        authorizationParams: {
            redirect_uri: "http://localhost:5501"
        }
        }).then(async (auth0Client) => {
          // Assumes a button with id "login" in the DOM
          const loginButton = document.getElementById("login");
          loginButton.addEventListener("click", (e) => {
            console.log("logging in...")
            e.preventDefault();
            auth0Client.loginWithRedirect();
          });
        
          if (location.search.includes("state=") && 
              (location.search.includes("code=") || 
              location.search.includes("error="))) {
            await auth0Client.handleRedirectCallback();
            window.history.replaceState({}, document.title, "/");
          }
        
          // Assumes a button with id "logout" in the DOM
          const logoutButton = document.getElementById("logout");
          logoutButton.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("logging out...")
            auth0Client.logout();
          });
        
          const isAuthenticated = await auth0Client.isAuthenticated();
          const userProfile = await auth0Client.getUser();
        
          // Assumes an element with id "profile" in the DOM
          const profileElement = document.getElementById("profile");
        
          if (isAuthenticated) {
            profileElement.style.display = "block";
            profileElement.innerHTML = `
                    <p>${userProfile.name}</p>
                    <img src="${userProfile.picture}" />
                  `;
          } else {
            profileElement.style.display = "none";
          }
    });
}


export function chooseSide() {
    container.innerHTML = `
        <h1>Choose Your Side</h1>
        <p>Will you join the Light Side or the Dark Side?</p>
     `
}

export function goodSide() {
    container.innerHTML = `
        <h1>The Light Side</h1>
        <p>Welcome to the Light Side. Here are the heroes of the Star Wars universe.</p>
    `
}

export function badSide() {
    container.innerHTML = `
        <h1>The Dark Side</h1>
        <p>Welcome to the Dark Side. Here are the villains of the Star Wars universe.</p>
    `
}

export function notFound() {
    document.getElementById('app').innerHTML = `
        <h1>404 Not Found</h1>
        <p>The page you are looking for does not exist.</p>
    `;
}
