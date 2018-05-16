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
        name    : 'componentTitle',
        message : 'What is the component title?',
        default : 'newComponent'
      },
      {
        type    : 'input',
        name    : 'componentGroup',
        message : 'What is the component group?',
        default : 'newGroup'
      },
      {
        type: 'list',
        name: 'componentType',
        message: 'What type of component are you creating?',
        choices: [
          {
            name: 'Proxy component',
            value: 'proxy'
          },
          {
            name: 'Page component',
            value: 'page'
          },
          {
            name: 'Custom Component',
            value: 'custom'
          }
        ]
      },
      {
        when: function (response) {
          return (response.componentType == 'custom' || response.componentType == 'page');
        },
        type    : 'input',
        name    : 'componentClass',
        message : 'What is the component wrapper class? (if you want one defined):'
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
        message: 'Please select the project folder for your component:',
        choices: foldersArray
      },
      {
        when: function (response) {
          return (response.componentType == 'custom' || response.componentType == 'page');
        },
        type: 'confirm',
        name: 'hasSuperType',
        message: 'Are you inheriting from a component?',
        default: false
      },
      {
      when: function (response) {
          return (response.hasSuperType || response.componentType == 'proxy');
        },
        type    : 'input',
        name    : 'superType',
        message : 'Please type the path of the component you are inheriting from (example: /apps/your-project/components/page):',
        validate: function(input) {
           if (input == '') {
               return 'You need to specify the parent component path';
           }
           return true;
        }
      },
      {
        type    : 'input',
        name    : 'htmlTag',
        message : 'Please specity the component\'s wrapper HTML tag',
        default : 'div'
      },
      {
        type    : 'input',
        name    : 'componentDescription',
        message : 'Please provide a brief description of your component',
        default : 'newGroup'
      },
      {
        type: 'checkbox',
        message: 'Select the sample content you want in your dialog:',
        name: 'sampleContent',
        choices: [
          {
            name: 'Textfield',
            value: 'textfield',
            checked: true
          },
          {
            name: 'Textarea',
            value: 'textarea'
          },
          {
            name: 'Image',
            value: 'image'
          }
        ],
        validate: function(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one sample element.';
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
      let artifactId = this.config.get('artifactId');
      let appsFolderName = this.config.get('appsFolderName') ? this.config.get('appsFolderName') : artifactId;
      let componentName = camelCase(this.props.componentTitle);
      const componentsFolder = '/' + artifactId + '/ui.apps/src/main/content/jcr_root/apps/' + appsFolderName + '/components';
      this.fs.copyTpl(
        this.templatePath(this.props.componentType + '/.content.xml'),
        this.destinationPath(this.destinationRoot() + componentsFolder + '/' + this.props.componentFolder + '/' + componentName + '/.content.xml'),
        {
          componentTitle: this.props.componentTitle,
          componentDescription: this.props.componentDescription,
          superType: this.props.superType,
          componentGroup: this.props.componentGroup
         }
      );

      this.fs.copyTpl(
        this.templatePath(this.props.componentType + '/_cq_htmlTag/.content.xml'),
        this.destinationPath(this.destinationRoot() + componentsFolder + '/' + this.props.componentFolder + '/' + componentName + '/_cq_htmlTag/.content.xml'),
        {
          htmlTag: this.props.htmlTag,
          componentClassName: this.props.componentClass
         }
      );

      this.fs.copyTpl(
        this.templatePath(this.props.componentType + '/component.html'),
        this.destinationPath(this.destinationRoot() + componentsFolder + '/' + this.props.componentFolder + '/' + componentName + '/' + componentName + '.html'),
        {
          sampleContent: this.props.sampleContent
         }
      );

      this.fs.copyTpl(
        this.templatePath(this.props.componentType + '/_cq_dialog/.content.xml'),
        this.destinationPath(this.destinationRoot() + componentsFolder + '/' + this.props.componentFolder + '/' + componentName + '/_cq_dialog/.content.xml'),
        {
          componentTitle: this.props.componentTitle,
          sampleContent: this.props.sampleContent
         }
      );
  }

  install() {
    // this.installDependencies();
  }
};
