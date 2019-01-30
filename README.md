# Quandary
simple secure way to chat anonymously with anyone on the WWW

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)

## Installation

* `git clone <repository-url>` this repository
* `npm install`

## Running / Development

* create a folder name `mongo-data` in your user directory
* run `./mongod --dbpath ~/mongo-data` from the `bin` folder of your mongoDB installation
* to populate the db run `npm run popdb`
* run `npm run build`
* Visit your app at [http://localhost:3000](http://localhost:3000).