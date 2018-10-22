generator-aem-generator (Work in progress) [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A generator for creating full projects from scratch, components, clientlibs, dialogs and models.

## Installation

First, install [Yeoman](http://yeoman.io) using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
```

Then navigate to the project root folder, set it up and link it so it can be discovered by yeoman

```bash
npm install
npm link
```

Then generate your new project:

```bash
yo aem-generator
```

to run a subgenerator, just add quotes after the generator command and write the subgenerator you want to run

```bash
yo aem-generator:clientlib
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

 © [Ricardo Alvarado]()


[npm-image]: https://badge.fury.io/js/generator-aem-generator.svg
[npm-url]: https://npmjs.org/package/generator-aem-generator
[travis-image]: https://travis-ci.org/rijoalvi/generator-aem-generator.svg?branch=master
[travis-url]: https://travis-ci.org/rijoalvi/generator-aem-generator
[daviddm-image]: https://david-dm.org/rijoalvi/generator-aem-generator.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/rijoalvi/generator-aem-generator
