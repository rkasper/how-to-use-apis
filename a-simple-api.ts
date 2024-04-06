// The URL of the JSONPlaceholder API endpoint for fetching posts
const url = "https://jsonplaceholder.typicode.com/posts";

// Asynchronous function to call the API
async function fetchPosts() {
    try {
        // Use Deno's fetch API to make the HTTP GET request
        const response = await fetch(url);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const posts = await response.json();

        // Log the posts to the console
        console.log(posts);
    } catch (error) {
        // Log any errors to the console
        console.error("Failed to fetch posts:", error.message);
    }
}

// Call the fetchPosts function
await fetchPosts();
