// chatGPTConnect.js
// Eddie C <ecubasmarine2019@fau.edu>
// This is a sample of how to do API calls to chatGPT using node.js and swagger

const { config } = require("dotenv");
config();
const { Configuration, OpenAI } = require("openai");
const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Initialize OpenAI with your API key
// NOTE: this fetches a .env file for your api key for security reasons
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Function to get response from OpenAI
async function getResponse(prompt) {
    const completion = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt, 
        max_tokens: 100, //change to limit length of response
        temperature: 0,
    });

    return completion;
}


// Endpoint to send requests
app.get('/get-response', async (req, res) => {
    const { prompt } = req.query; // Extract 'prompt' from query parameters
    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const response = await getResponse(prompt);
        const responseText = response.choices[0].text;  //this filters the data returned from chatGPT to only the text response
        res.status(200).json({ responseText }); 
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Set up Swagger documentation
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'ChatGPT API',
            description: 'API to interact with OpenAI\'s ChatGPT model',
            contact: {
                name: 'Your Name',
            },
            servers: ['http://localhost:3000'],
        },
    },
    apis: ['chatGPTConnect.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Swagger documentation to set up API docs get request
/**
 * @swagger
 * /get-response:
 *   get:
 *     summary: Get response from ChatGPT
 *     description: Get a response from OpenAI's ChatGPT model based on the provided prompt
 *     parameters:
 *       - in: query
 *         name: prompt
 *         description: The prompt to generate the response
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                   description: The response text from ChatGPT
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

// Start the server
const PORT = process.env.PORT || 3000;
const listener = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API Docs: http://localhost:${PORT}/api-docs`);
});
