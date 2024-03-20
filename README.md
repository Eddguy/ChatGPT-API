# ChatGPT API Calls with Node.js and Swagger UI

This project demonstrates how to make API calls to ChatGPT using Node.js and Swagger UI.

**Note: Initially, max_tokens is set with a limit of 100, which can limit your responses. Increasing the limit can lead to excess API rates. Please use caution.**

## Project Overview

The project aims to showcase the process of interacting with the ChatGPT model through API calls. It provides examples and instructions for making requests and handling responses.

## Usage Instructions

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Configure your ChatGPT API key in the project settings.
4. Start the server using `npm start`.
5. Access the Swagger UI documentation at `http://localhost:PORT/api-docs`.

## Environment Variables

This project uses environment variables to store sensitive information, such as API keys. The environment variables are stored in a `.env` file located at the root of the project directory. This file is not committed to the project repository for security reasons.

To set up the project locally, create a `.env` file in the root directory and add your API key as follows:

`OPENAI_API_KEY=YOUR_API_KEY`

## Security Considerations

- Ensure that your API key is kept secure and not exposed in public repositories.
- Avoid sharing sensitive information or data in requests made to the API.

## Contact Information

**Name:** Eddie C

**Email:** ecubasmarine@fau.edu

## License

This project is licensed under the [MIT License](LICENSE).
