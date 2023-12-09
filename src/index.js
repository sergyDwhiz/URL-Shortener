/**
 * index.js
 * Entry point of the URL Shortener application.
 * Imports the shortening function from url_shortener.js and uses it.
 * Copyright (C) 2023 Sergius Nyah
 **/

// Import the shortening function from shortener.js
import { shorten } from './shortener'; 

// Sample URL to shorten
const longUrl = 'https://www.google.com/search?q=shorten+url&oq=shorten+url&aqs=chrome..69i57j0l7.2959j0j7&sourceid=chrome&ie=UTF-8';

// Custom URL code
const customUrlCode = 'customCode';

// Use the shortening function to shorten the URL
const shortUrl = shorten(longUrl, customUrlCode);

// Finally, print the shortened URL
console.log(`Shortened URL: ${shortUrl}`);

