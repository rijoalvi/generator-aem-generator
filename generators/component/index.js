'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    let artifactId = this.config.get('artifactId');
    let appsFolderName = this.config.get('appsFolderName') ? this.config.get('appsFolderName') : artifactId;
    const componentsFolder = '\\' + artifactId + '\\ui.apps\\src\\main\\content\\jcr_root\\apps\\' + appsFolderName + '\\components';
    //List the existing projects
    let foldersArray = [];
    const fs = require('fs');
    fs.readdirSync(this.destinationRoot() + componentsFolder).forEach(file => {
      foldersArray.push(file);
    });
    this.log(foldersArray);
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the exquisite ${chalk.red('generator-aem-generator')} generator!`)
    );

// https://stackoverflow.com/questions/18688389/how-execute-other-prompt-when-prompt-previous-is-true-on-yeoman
    const prompts = [
      {
        type    : 'input',
        name    : 'componentTitle',
        message : 'What is the component name?',
        default : 'customComponent'
      },
      {
        type: 'confirm',
        name: 'newFolder',
        message: 'Are you creating a component for a new project?',
        default: false
      },
      {
        when: function (response) {
          return (response.newFolder);
      },
        type    : 'input',
        name    : 'componentFolder',
        message : 'Please enter the new project folder name:',
        default : 'newProject'
      },
      {
        when: function (response) {
          return (!response.newFolder);
        },
        type: 'list',
        name: 'componentFolder',
        message: 'project folder',
        choices: foldersArray
      }
    ];


//ui.apps\src\main\content\jcr_root\apps\aem-project\components
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
      const camelCase = require('camelcase');
      const componentsFolder = '\\' + artifactId + '\\ui.apps\\src\\main\\content\\jcr_root\\apps\\' + appsFolderName + '\\components';
      let artifactId = this.config.get('artifactId');
      let appsFolderName = this.config.get('appsFolderName') ? this.config.get('appsFolderName') : artifactId;
      let componentName = camelCase(this.props.componentTitle);

      this.fs.copyTpl(
        this.templatePath('component.html'),
        this.destinationPath(this.destinationRoot() + componentsFolder + '\\' + this.props.componentFolder + '\\' + componentName + '\\' + componentName + '.html'),
        {
          componentClassName: this.props.componentClassName
          componentTitle: this.props.componentTitle,
          componentName: componentName,
          componentGroup: this.props.componentGroup,
          componentDescription: this.props.componentDescription,
          htmlTag: this.props.htmlTag

         }
      );
  }

  install() {
    // this.installDependencies();
  }
};
