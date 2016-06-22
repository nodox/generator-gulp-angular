
> A generator for HapiJS + AngularJS + MongoDB application stacks.

> Lets you quickly set up a project with:
> * your favorite technologies
> * web best pratices.
> * guidelines powered by Google.

> Gulp provide fast workspace with quick feedback.


## Usage

More informations, options, parameters in the [usage documentation page](docs/usage.md)

### Install

##### Install required tools `yo`, `gulp`, `nodemon` and `bower`:
```
npm install -g yo gulp bower
```

##### Install `generator-wave`:
```
npm install -g generator-wave
```

##### Install `mongodb`
* [Visit their website and follow the installation steps](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)


### Run

##### Create a new directory, and go into:
```
mkdir my-new-project && cd $_
```

##### Run `yo wave`, and select desired technologies for the frontend:
```
yo wave
```

### Develop
##### Run the mongod instance:
```
mongod
```

##### Start the Hapi Server using Nodemon:
```
nodemon server.js 8080
```

##### Start the frontend developmen server:
```
gulp serve
```



## Documentation

* [docs/README](docs/README.md)
* More informations about how to use your new project is available in the [docs/user-guide](docs/user-guide.md)
* If you want to know: [docs/how-it-works](docs/how-it-works.md).


## Features

![Logo](docs/assets/gulp.png)
![Logo](docs/assets/angular.png)
![Logo](docs/assets/bootstrap.png)
![Logo](docs/assets/materialdesign.png)
![Logo](docs/assets/foundation.png)
![Logo](docs/assets/bower.png)
![Logo](docs/assets/webpack.png)
![Logo](docs/assets/karma.png)
![Logo](docs/assets/istanbul.png)
![Logo](docs/assets/browsersync.png)
![Logo](docs/assets/jasmine.png)
![Logo](docs/assets/protractor.png)

![Logo](docs/assets/babel.png)
![Logo](docs/assets/coffeescript.png)
![Logo](docs/assets/typescript.png)
![Logo](docs/assets/traceur.png)
![Logo](docs/assets/sass.png)
![Logo](docs/assets/less.png)
![Logo](docs/assets/stylus.png)
![Logo](docs/assets/jade.png)
![Logo](docs/assets/haml.png)
![Logo](docs/assets/handlebars.png)

[List features included](docs/usage.md#features-included-in-the-gulpfile)


## Questions the generator will ask

[Questions the generator will ask](docs/usage.md#questions-the-generator-will-ask)


## Changelog

[All changes listed in the GitHub releases](https://github.com/Swiip/generator-wave/releases)


## Contributing

[Guidelines](CONTRIBUTING.md)


## License

MIT
