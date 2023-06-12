# Text-to-Speech Translator

The Text-to-Speech Translator is a web application that converts input text into audible speech. The application is built using React.js, Tailwind CSS, Node.js, Express.js, and integrates the Microsoft Text to Speech SDK for the speech synthesis.

## Features

- Text to Speech Conversion
- Responsive Design
- Cross-Browser Support

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14 or newer)
- npm (v6 or newer)

To interact with Microsoft's Text-to-Speech SDK, you need an Azure subscription. Follow this link to [create an Azure account](https://portal.azure.com/#create/Microsoft.AzureCognitiveServicesTextToSpeechF0).

## Getting Started

1. **Clone the repository** 

    Use the following command to clone this repository:
    ```bash
    git clone https://github.com/your-username/text-to-speech-translator.git
    ```
2. **Install Dependencies**

    Change to the project directory and install the dependencies:

    ```bash
    cd text-to-speech-translator
    npm install
    ```
3. **Setup Environment Variables**

    Create a `.env` file in the root directory of your project. Add your Azure credentials and setup your environment variables:

    ```
    AZURE_SUBSCRIPTION_KEY=your_subscription_key
    AZURE_SERVICE_REGION=your_service_region
    ```
4. **Run the Application**

    Start the application by running:

    ```bash
    npm start
    ```
5. **Access the Application**

    Navigate to `http://localhost:3000` in your web browser to use the Text-to-Speech Translator application.

## Usage

1. Enter the text you wish to translate into speech in the provided text box.

2. Select your desired language, speed, and pitch.

3. Click on the "Translate" button to hear the speech output.

## Support

If you encounter any problems or have suggestions, please open an issue.

Enjoy using the Text-to-Speech Translator!