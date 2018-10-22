'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const camelCase = require('camelcase');
const fs = require('fs');

module.exports = class extends Generator {
  prompting() {
    let artifactId = this.config.get('artifactId');
    let appsFolderName = this.config.get('appsFolderName') ? this.config.get('appsFolderName') : artifactId;
    const componentsFolder = '/' + artifactId + '/ui.apps/src/main/content/jcr_root/apps/' + appsFolderName + '/components';
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
        type    : 'input',
        name    : 'className',
        message : 'What is the class name?',
        default : 'customClass'
      },
	  {
        type: 'confirm',
        name: 'showText',
        message: 'Do you want to show some text?',
        default: false
      },
	  {
        when: function (response) {
          return (response.showText);
        },
        type    : 'input',
        name    : 'text',
        message : 'Please enter the text:'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
      let artifactId = this.config.get('artifactId');
      let appsFolderName = this.config.get('appsFolderName') ? this.config.get('appsFolderName') : artifactId;
      const componentsFolder = '/' + artifactId + '/ui.apps/src/main/content/jcr_root/apps/' + appsFolderName + '/components';
      this.fs.copyTpl(
        this.templatePath('template.java'),
        this.destinationPath(this.destinationRoot() + componentsFolder + '/' + 'myFolder' + '/index.java'),
        {
          className: this.props.className,
          showText: this.props.showText,
          text: this.props.text
         }
      );
  }

  install() {
    // this.installDependencies();
  }
};
