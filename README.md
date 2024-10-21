# Majus' Resonite STT

This is my take on speech-to-text software for Resonite.

This is losely based on and inspired by [Zetaphor](https://github.com/Zetaphor) and [ShadowX](https://github.com/5H4D0W-X)'s [Resonite Voice Bridge](https://github.com/theneolanders/resonite-voice-bridge)
without all the bells and whistles their speech-to-text program has.

Currently the only supported language is English

Majus' Resonite STT comes preloaded with an already set up config file with word replacements provided by Sloppy McFloppy.

## Config

Zetaphor and ShadowX's Resonite Voice Bridge does word replacement in the browser.

Majus' Resonite STT does it on the server, and uses the provided `config.cfg` file for the word replacement.

The `config.cfg` file is also used for setting the port used for connecting with resonite and for setting the port the server will serve the static file from.

The default port for resonite is `5001` and for statically served files is `5000`

## Requirements

Google Chrome is required for the speech recognition api

## Building the executable yourself or running in the cli
Install Node.js LTS.

To build run ```npm install``` and ```npm run build```
To run in node do ```npm install``` and ```npm run start```