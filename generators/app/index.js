'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    let that = this;
    this.log(
      yosay(`Welcome to the laudable ${chalk.red('generator-aem-generator')} generator!`)
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'newProject',
        message: 'Are you setting up a new project?',
        default: false
      },
      {
        when: function (response) {
          return response.newProject;
      },
        type    : 'input',
        name    : 'groupId',
        message : 'Please enter the project groupId:',
        default : 'com.company.aem'
      },
      {
        when: function (response) {
          return response.newProject;
      },
        type    : 'input',
        name    : 'artifactId',
        message : 'Please enter the project artifactId:',
        default : 'aem-project'
      },
      {
        when: function (response) {
          return response.newProject;
      },
        type    : 'input',
        name    : 'version',
        message : 'Please enter the project version:',
        default : '1.0-SNAPSHOT'
      },
      {
        when: function (response) {
          return response.newProject;
      },
        type    : 'input',
        name    : 'package',
        message : 'Please enter the project package name:',
        default : 'com.company.aem'
      },
      {
        when: function (response) {
          return response.newProject;
      },
        type    : 'input',
        name    : 'appsFolderName',
        message : 'Please enter the project apps folder name:',
        default : 'aem-project'
      },
      {
        when: function (response) {
          return response.newProject;
      },
        type    : 'input',
        name    : 'artifactName',
        message : 'Please enter the project artifact name:',
        default : 'aem-project'
      },
      {
        when: function (response) {
          return response.newProject;
      },
        type    : 'input',
        name    : 'componentGroupName',
        message : 'Please enter the project component group name:',
        default : 'aem-project'
      },
      {
        when: function (response) {
          return response.newProject;
      },
        type    : 'input',
        name    : 'confFolderName',
        message : 'Please enter the project configuration folder name:',
        default : 'aem-project'
      },
      {
        when: function (response) {
          return response.newProject;
      },
        type    : 'input',
        name    : 'contentFolderName',
        message : 'Please enter the project content folder name:',
        default : 'aem-project'
      },
      {
        when: function (response) {
          return response.newProject;
      },
        type    : 'input',
        name    : 'cssId',
        message : 'Please enter the project css id:',
        default : 'aem-project'
      },
      {
        when: function (response) {
          return response.newProject;
      },
        type    : 'input',
        name    : 'packageGroup',
        message : 'Please enter the project package group name:',
        default : 'aem-project'
      },
      {
        when: function (response) {
          return response.newProject;
      },
        type    : 'input',
        name    : 'siteName',
        message : 'Please enter the project site name:',
        default : 'aem-project'
      },
      {
        when: function (response) {
          return !(that.config.get('groupId') && !response.newProject);
      },
        type    : 'input',
        name    : 'groupId',
        message : 'Please enter the project groupId:',
        default : 'com.company.aem'
      },
      {
        when: function (response) {
          return (!that.config.get('artifactId') && !response.newProject);
      },
        type    : 'input',
        name    : 'artifactId',
        message : 'Please enter the project artifactId:',
        default : 'aem-project'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.newProject;
      this.props = props;
      this.config.set('newProject', this.props.newProject);
      if (this.props.newProject || (!this.config.get('groupId') && !this.config.get('artifactId'))) {
        this.config.set('groupId', this.props.groupId);
        this.config.set('artifactId', this.props.artifactId);
      }
      if (this.props.newProject) {
        this.config.set('version', this.props.version);
        this.config.set('package', this.props.package);
        this.config.set('appsFolderName', this.props.appsFolderName);
        this.config.set('artifactName', this.props.artifactName);
        this.config.set('componentGroupName', this.props.componentGroupName);
        this.config.set('confFolderName', this.props.confFolderName);
        this.config.set('contentFolderName', this.props.contentFolderName);
        this.config.set('cssId', this.props.cssId);
        this.config.set('packageGroup', this.props.packageGroup);
        this.config.set('siteName', this.props.siteName);
      }
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.html'),
      this.destinationPath('dummyfile.html')
    );
    this.fs.copyTpl(
      this.templatePath('dummyfile.html'),
      this.destinationPath('dummyfileParsed.html'),
      { title: 'Templating with Yeoman', description: 'Holis' }
    );
  }

  install() {
    if (this.props.newProject){
      const mvn = require('maven').create({
        cwd: this.destinationRoot()
      });
      let that = this;
      this.log('Setting up your project');
      mvn.execute(['org.apache.maven.plugins:maven-archetype-plugin:2.4:generate'], {'interactiveMode' : false, 'archetypeGroupId' : 'com.adobe.granite.archetypes',' archetypeArtifactId' : 'aem-project-archetype','archetypeVersion' : '13', 'archetypeCatalog' : 'https://repo.adobe.com/nexus/content/groups/public/', 'groupId' : this.props.groupId, 'artifactId' : this.props.artifactId, 'version' : this.props.version, 'package' : this.props.package, 'appsFolderName' : this.props.appsFolderName, 'artifactName' : this.props.artifactName, 'componentGroupName' : this.props.componentGroupName, 'confFolderName' : this.props.confFolderName, 'contentFolderName' : this.props.contentFolderName, 'cssId' : this.props.cssId, 'packageGroup' : this.props.packageGroup, 'siteName' : this.props.siteName}).then(() => {
        that.log('Maven done');
        // As mvn.execute(..) returns a promise, you can use this block to continue
        // your stuff, once the execution of the command has been finished successfully.
      });
  } else {
      this.log('Your project is ready!');
  }
      //this.installDependencies();
  }
};
