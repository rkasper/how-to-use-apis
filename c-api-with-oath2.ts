// Step 1: Register Your Application with Reddit
// - Log into your Reddit account.
// - Go to https://www.reddit.com/prefs/apps.
// - Click on the "create an app" or "create another app" button.
// - Fill out the form:
// - Name your script.
// - Select the "script" option.
// - Description and about URL are optional.
// - For the redirect URI, you can use http://localhost:8080 if you're just testing.
// - Note your client ID (under the "web app" title) and your client secret.
//
// Step 2: Securely Store Your Credentials
// - Store your client ID, client secret, and Reddit username and password in environment variables.
// export REDDIT_CLIENT_ID=yourClientId
// export REDDIT_CLIENT_SECRET=yourClientSecret
// export REDDIT_USERNAME=yourRedditUsername
// export REDDIT_PASSWORD=yourRedditPassword

// Import required modules from Deno
import { encodeBase64 } from "https://deno.land/std/encoding/base64.ts";

const subreddit = "boston"; // Example subreddit

// Function to obtain an OAuth2 token
async function getRedditOAuthToken(): Promise<string> {
    // Reddit API credentials from environment variables
    const clientId = Deno.env.get("REDDIT_CLIENT_ID");
    const clientSecret = Deno.env.get("REDDIT_CLIENT_SECRET");
    const username = Deno.env.get("REDDIT_USERNAME"); // The user's Reddit username
    const password = Deno.env.get("REDDIT_PASSWORD"); // The user's Reddit password

    if (!clientId || !clientSecret || !username || !password) {
        console.error("One or more necessary environment variables are not set.");
        Deno.exit(1);
    }

    // Encode clientId and clientSecret for Basic Auth using Deno's encodeBase64
    const credentials = encodeBase64(`${clientId}:${clientSecret}`);

    const response = await fetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        headers: {
            "Authorization": `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `grant_type=password&username=${username}&password=${password}&scope=read`
    });

    if (!response.ok) {
        throw new Error(`Failed to get OAuth token: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data.access_token;
}

interface RedditPost {
    data: {
        title: string;
        // Add other fields as needed, e.g., url, score, etc.
    };
}

// Function to fetch top posts from a subreddit
async function fetchTopPostsFromSubreddit(accessToken: string) {
    const response = await fetch(`https://oauth.reddit.com/r/${subreddit}/top?limit=5`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch top posts: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Top posts from subreddit /r/" + subreddit + ":");
    data.data.children.forEach((post: RedditPost, index: number) => {
        console.log(`${index + 1}: ${post.data.title}`);
    });
}

// Main function to orchestrate the OAuth flow and data fetching
async function main() {
    try {
        const accessToken = await getRedditOAuthToken();
        await fetchTopPostsFromSubreddit(accessToken);
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

// Execute the script
await main();
