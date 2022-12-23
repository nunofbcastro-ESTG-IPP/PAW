#!/bin/sh
echo install dependencies
yarn install
echo run
yarn start --host=0.0.0.0 --port=4200