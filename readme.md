# Project

## Description
Creation of several musical / visual experiences accessible from a menu whose main theme is the bad guys in the geek culture (lord of the rings, star wars, etc.). The visitor creates each time an item / object in connection with a villain without knowing it, he realizes it during the final exposing the villain and his item.
##### In details
The experiences are interspersed with interactions that allow the visitor to progress.
The goal is to make him guess in what universe he enters by putting clues such as notes of music but also visual.
The overall mood becomes darker as the visitor progresses through the experience. At the end the visitor discovers the item / object related to the universe.

# Static template

Simple static HTML/CSS/JS template

### Features

- Gulp
- ES2015 transpiler
- Sass compiler
- Sourcemaps
- Watchers
- Static server
- Assets syncing
- Errors handling
- Notifications
- Builder

### Usage

- Install [Node.js](https://nodejs.org/en/)
- Open the terminal
- Install [gulp-cli](https://www.npmjs.com/package/gulp-cli) in global using `npm install -g gulp-cli` (You may need to start with `sudo`)
- In the terminal, go to the `builder/` folder
- Install dependencies using `npm install` (You may need to start with `sudo`)
- Start the server with `gulp`
- A page with `It's alive` alert should show up

### Gulp tasks

- `scripts` to transpile javascript and start watching scripts
- `styles` to compile CSS
- `serve` to start the server
- `build-scripts` to compress the scripts
- `build-styles` to compress the styles
- `remove-maps` to remove both scripts and style sourcemaps
- `build` to launch `build-scripts`, `build-styles` and `remove-maps`
- `default` to launch `scripts`, `styles`, watchers and `serve`

### Todo

- [ ] Seperate scripts compiler from script watcher
- [ ] Add params objet in gulpfiles, mostly for pathes