This project is a URL shortener service built with Node.js, Express, and MongoDB. It provides an API for creating short URLs from original URLs and redirecting from the short URLs to the original URLs.

## Features

- URL validation: Only valid URLs can be shortened.
- Custom URL codes: Users can specify a custom code for their short URLs.
- Persistent storage: Shortened URLs are stored in a MongoDB database.
- Error handling: The service handles errors gracefully and returns appropriate HTTP status codes.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Sergius-Nyah/url-shortener.git
   ```
2. Navigate to the project directory:
   ```
   cd url-shortener
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```

## Usage

To shorten a URL, send a POST request to the `/shorten` endpoint with a JSON body containing the `originalUrl` and an optional `urlCode`:

```json
{
  "originalUrl": "https://example.com",
  "urlCode": "customCode"
}
```

The service will return a JSON object with the original URL, the short URL, and the URL code:

```json
{
  "originalUrl": "https://example.com",
  "shortUrl": "http://short.url/customCode",
  "urlCode": "customCode"
}
```

To visit the original URL, simply navigate to the short URL in a web browser.

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. 
