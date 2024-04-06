// First, create a Personal Access Token (PAT) on GitHub
// - Go to your GitHub settings.
// - Click on "Developer settings."
// - Select "Personal access tokens", then "Tokens (classic)".
// - Click on "Generate new token."
// - Give your token a name, select the scopes or permissions you'd like to grant this token, and then generate it.
// - Copy the token to your clipboard. Note: Once you navigate away from this page, GitHub will not show the token again for security reasons, so make sure you save it somewhere safe.
// - Store the token in environment variable GITHUB_PAT.

// URL of the GitHub API endpoint for fetching the user profile
const url = "https://api.github.com/user";

// Access the GitHub Personal Access Token (PAT) from environment variables
const personalAccessToken = Deno.env.get("GITHUB_PAT");

if (!personalAccessToken) {
    console.error("GitHub Personal Access Token is not set in environment variables.");
    Deno.exit(1);
}

// Asynchronous function to call the GitHub API
async function fetchGitHubProfile() {
    try {
        // Use the fetch API to make the HTTP GET request with Authorization header
        const response = await fetch(url, {
            headers: {
                "Authorization": `token ${personalAccessToken}`
            }
        });

        // Check if the request was successful
        if (!response.ok) {
            // Log the error and possibly return or handle it differently
            console.error(`HTTP error! Status: ${response.status}`);
            return; // Early return or set an error state
        }

        // Parse the JSON response
        const userProfile = await response.json();

        // Log the user profile to the console
        console.log(userProfile);
    } catch (error) {
        // Log any errors to the console
        console.error("Failed to fetch GitHub profile:", error.message);
    }
}

// Call the fetchGitHubProfile function
await fetchGitHubProfile();
