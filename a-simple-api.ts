// The URL of the REST Countries API endpoint for fetching data about Japan
const url = "https://restcountries.com/v3.1/name/japan";

interface Country {
    name: {
        common: string;
    };
    capital: string[];
    region: string;
    subregion: string;
    population: number;
    languages: Record<string, string>;
    currencies: Record<string, { name: string }>;
}

// Asynchronous function to call the API
async function fetchCountryData() {
    try {
        // Use Deno's fetch API to make the HTTP GET request
        const response = await fetch(url);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const countryData = await response.json();

        // Assuming there's always at least one result
        const country = countryData[0] as Country;

        // Log details about the country to the console
        console.log(`Country: ${country.name.common}`);
        console.log(`Capital: ${country.capital[0]}`);
        console.log(`Region: ${country.region}`);
        console.log(`Subregion: ${country.subregion}`);
        console.log(`Population: ${country.population}`);
        console.log(`Languages: ${Object.values(country.languages).join(', ')}`);
        console.log(`Currencies: ${Object.values(country.currencies).map((currency) => currency.name).join(', ')}`);
    } catch (error) {
        // Log any errors to the console
        console.error("Failed to fetch country data:", error.message);
    }
}

// Call the fetchCountryData function
await fetchCountryData();
