"use strict";

var sdk = require("microsoft-cognitiveservices-speech-sdk");

function processAudio (audioFile, text, voiceName = "en-US-RogerNeural") {
    return new Promise((resolve, reject) => {
        // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
        const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
        const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);

        // The language of the voice that speaks.
        speechConfig.speechSynthesisVoiceName = voiceName; 

        // Create the speech synthesizer.
        var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

        // Start the synthesizer and wait for a result.
        synthesizer.speakTextAsync(text,
            function (result) {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    console.log("synthesis finished.");
                    resolve();
                } else {
                    console.error("Speech synthesis canceled, " + result.errorDetails +
                        "\nDid you set the speech resource key and region values?");
                    reject(new Error(result.errorDetails));
                }
                synthesizer.close();
                synthesizer = null;
            },
            function (err) {
                console.trace("err - " + err);
                synthesizer.close();
                synthesizer = null;
                reject(err);
            });
        console.log("Now synthesizing to: " + audioFile);
    })

}

module.exports = processAudio;
