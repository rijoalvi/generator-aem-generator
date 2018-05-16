'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');
const moment = require('moment');

module.exports = class extends Generator {
  prompting() {
    let artifactId = this.config.get('artifactId');
    let appsFolderName = this.config.get('appsFolderName') ? this.config.get('appsFolderName') : artifactId;
    const componentsFolder = '/' + artifactId + '/ui.apps/src/main/content/jcr_root/apps/' + appsFolderName + '/components/content';
    //List the existing projects
    let foldersArray = [];
    fs.readdirSync(this.destinationRoot() + componentsFolder).forEach(file => {
      foldersArray.push(file);
    });
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the exquisite ${chalk.red('generator-aem-generator')} generator!`)
    );

// https://stackoverflow.com/questions/18688389/how-execute-other-prompt-when-prompt-previous-is-true-on-yeoman
    const prompts = [
      {
        type: 'list',
        name: 'clientlibType',
        message: 'What kind of clientlib are you creating?',
        choices: [
          {
            name: 'A clientlib for a custom component',
            value: 'custom'
          },
          {
            name: 'A global clientlib (for layouts or page-global styles)',
            value: 'global'
          }
        ]
      },
      {
        type: 'checkbox',
        message: 'Select the elements you want in your clientlib:',
        name: 'clientlibElements',
        choices: [
          {
            name: 'CSS',
            value: 'css',
            checked: true
          },
          {
            name: 'Javascript',
            value: 'javascript'
          }
        ],
        validate: function(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one element.';
          }
          return true;
        }
      },
      {
        type    : 'input',
        name    : 'categories',
        message : 'What are the categories for your clientlib? (separate them using a comma if it\'s more than one)',
        validate: function(input) {
           if (input == '') {
               return 'You need to specify the categories for the clientlib'
           }
           return true;
        }
      },
      {
        type    : 'input',
        name    : 'dependencies',
        message : 'What are the dependencies for your clientlib? (separate them using a comma if it\'s more than one)'
      },
      {
        type    : 'input',
        name    : 'embeds',
        message : 'Please type the categories of the clientlibs you want to embed (separate them using a comma if it\'s more than one)'
      },
      {
        when: function (response) {
          return (response.clientlibElements.indexOf('js') > -1);
        },
        type    : 'input',
        name    : 'namespace',
        message : 'Please enter the namespace for your js main file:',
        validate: function(input) {
           if (input == '') {
               return 'You need to specify a namespace';
           }
           if (input.indexOf(' ') > -1) {
               return 'A namespace cannot contain spaces';
           }
           return true;
        }
      },
      {
        when: function (response) {
          return (response.clientlibElements.indexOf('css') > -1);
        },
        type    : 'input',
        name    : 'cssDescription',
        message : 'Please provide a description of the styling done in your CSS file',
        validate: function(input) {
           if (input == '') {
               return 'You need provide a description!'
           }
           return true;
        }
      },
      {
        when: function (response) {
          return (response.clientlibElements.indexOf('javascript') > -1);
        },
        type    : 'input',
        name    : 'jsDescription',
        message : 'Please provide a description of the functionality in your Javascript file',
        validate: function(input) {
           if (input == '') {
               return 'You need provide a description!'
           }
           return true;
        }
      },
      {
        when: function (response) {
          return (response.clientlibType == 'custom');
        },
        type: 'list',
        name: 'componentFolder',
        message: 'Please select the component folder for your clientlib:',
        choices: foldersArray
      },
      {
        when: function (response) {
          return (response.clientlibType == 'global');
        },
        type    : 'input',
        name    : 'folderName',
        message : 'Please provide a clientlib folder name',
        validate: function(input) {
           if (input == '') {
               return 'You need to set a name!'
           }
           return true;
        }
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    let currentDate = moment().format('MM/DD/YYYY');
    let currentYear = moment().format('YYYY');
    let artifactId = this.config.get('artifactId');
    let appsFolderName = this.config.get('appsFolderName') ? this.config.get('appsFolderName') : artifactId;
    let clientLibName = 'clientlib';
    let clientlibDestinationPath = '';
    const customComponentsFolder = '/' + artifactId + '/ui.apps/src/main/content/jcr_root/apps/' + appsFolderName;
    if (this.props.clientlibType == 'global') {
      clientLibName = this.props.folderName;
      clientlibDestinationPath = this.destinationRoot() + customComponentsFolder + '/clientlibs/' + clientLibName + '/';
    } else {
      clientlibDestinationPath = this.destinationRoot() + customComponentsFolder + '/components/content/' + this.props.componentFolder + '/' + clientLibName + '/';
    }



    this.fs.copyTpl(
      this.templatePath('clientlib/.content.xml'),
      this.destinationPath(clientlibDestinationPath + '.content.xml'),
      {
        categories: this.props.categories,
        dependencies: this.props.dependencies,
        embeds: this.props.embeds
      }
    );
    if (this.props.clientlibElements.indexOf('css') > -1 ) {
      this.fs.copy(
        this.templatePath('clientlib/css.txt'),
        this.destinationPath(clientlibDestinationPath + 'css.txt')
      );
      this.fs.copyTpl(
        this.templatePath('clientlib/styles/style.css'),
        this.destinationPath(clientlibDestinationPath + 'styles/style.css'),
        {
          cssDescription: this.props.cssDescription,
          currentDate: currentDate,
          currentYear: currentYear
        }
      );
    }

    if (this.props.clientlibElements.indexOf('javascript') > -1 ) {
      this.fs.copy(
        this.templatePath('clientlib/js.txt'),
        this.destinationPath(clientlibDestinationPath + 'js.txt')
      );
      this.fs.copyTpl(
        this.templatePath('clientlib/scripts/mainScript.js'),
        this.destinationPath(clientlibDestinationPath + 'scripts/mainScript.js'),
        {
          jsDescription: this.props.jsDescription,
          currentDate: currentDate,
          currentYear: currentYear,
          namespace:this.props.namespace
        }
      );
    }
      // this.fs.copyTpl(
      //   this.templatePath(this.props.componentType + '/.content.xml'),
      //   this.destinationPath(this.destinationRoot() + componentsFolder + '/' + this.props.componentFolder + '/' + componentName + '/.content.xml'),
      //   {
      //     componentTitle: this.props.componentTitle,
      //     componentDescription: this.props.componentDescription,
      //     superType: this.props.superType,
      //     componentGroup: this.props.componentGroup
      //    }
      // );
      //
      // this.fs.copyTpl(
      //   this.templatePath(this.props.componentType + '/_cq_htmlTag/.content.xml'),
      //   this.destinationPath(this.destinationRoot() + componentsFolder + '/' + this.props.componentFolder + '/' + componentName + '/_cq_htmlTag/.content.xml'),
      //   {
      //     htmlTag: this.props.htmlTag,
      //     componentClassName: this.props.componentClass
      //    }
      // );
      //
      // this.fs.copyTpl(
      //   this.templatePath(this.props.componentType + '/component.html'),
      //   this.destinationPath(this.destinationRoot() + componentsFolder + '/' + this.props.componentFolder + '/' + componentName + '/' + componentName + '.html'),
      //   {
      //     sampleContent: this.props.sampleContent
      //    }
      // );
      //
      // this.fs.copyTpl(
      //   this.templatePath(this.props.componentType + '/_cq_dialog/.content.xml'),
      //   this.destinationPath(this.destinationRoot() + componentsFolder + '/' + this.props.componentFolder + '/' + componentName + '/_cq_dialog/.content.xml'),
      //   {
      //     componentTitle: this.props.componentTitle,
      //     sampleContent: this.props.sampleContent
      //    }
      // );
  }

  install() {
    // this.installDependencies();
  }
};
