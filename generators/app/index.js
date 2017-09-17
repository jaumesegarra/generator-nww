'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'This is the awesome and amazing ' + chalk.red('NWW') + ' generator!'
        ));

        //Get array of inputs from the user
        var prompts = [{
                type: 'input',
                name: 'name',
                message: 'What would you love to name this project?',
                default: this.appname
        },
            {
                type: 'input',
                name: 'description',
                message: 'Please describe the project',
                default: "No description yet"
        },
            {
                type: 'input',
                name: 'repository',
                message: 'What is the project\'s GitHub repository?',
                default: "No repository yet"
        },
            {
                type: 'input',
                name: 'license',
                message: 'How would you love to license the project?',
                default: "MIT"
        },  
            {
                type: 'input',
                name: 'node_version',
                message: 'What is node webview version do you want use?',
                default: "0.20.1"
        },
            {
                type: 'confirm',
                name: 'bc_bootstrap',
                message: 'Do you want use Bootstrap+Jquery?',
                default: true
        }];

        this.prompt(prompts, function (props) {
            props.bower_components = {};
            props.bower_components["angular"] = "1.6.4";
            
            if(props.bc_bootstrap){
                props.bower_components["bootstrap"] = "latest";
                props.bc_bootstrap_css = '<link rel="stylesheet" type="text/css" href="css/_vendor/bootstrap/bootstrap.css">';
                props.bc_bootstrap_js = '<script src="js/_vendor/jquery/jquery.js"></script>\r\n <script src="js/_vendor/bootstrap/bootstrap.min.js"></script>';
            }else{
                props.bc_bootstrap_css = '';
                props.bc_bootstrap_js = '';
            }

            props.bower_components = JSON.stringify(props.bower_components);

            this.props = props;
            // To access props later use this.props.name;

            done();
        }.bind(this));
    },

    writing: {
        //Copy the confuguration files
        config: function () {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'), {
                    name: this.props.name,
                    description: this.props.description,
                    repository: this.props.repository,
                    license: this.props.license,
                    node_version: this.props.node_version,
                }
            );
            this.fs.copyTpl(
                this.templatePath('_bower.json'),
                this.destinationPath('bower.json'), {
                    name: this.props.name,
                    bower_components: this.props.bower_components
                }
            );
            this.fs.copyTpl(
                this.templatePath('_gruntfile.js'),
                this.destinationPath('Gruntfile.js'), {
                    node_version: this.props.node_version,
                }
            );
        },

        //Copy the project files
        projectfiles: function () {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
            this.fs.copy(
                this.templatePath('jshintrc'),
                this.destinationPath('.jshintrc')
            );
            this.fs.copy(
                this.templatePath('bowerrc'),
                this.destinationPath('.bowerrc')
            );
            this.fs.copyTpl(
                this.templatePath('_README.md'),
                this.destinationPath('README.md'), {
                    name: this.props.name,
                    description: this.props.description
                }
            );

            this.fs.copy(
                this.templatePath('_app-icon.icns'),
                this.destinationPath('app-icon.icns')
            );

            this.fs.copy(
                this.templatePath('_app-icon.ico'),
                this.destinationPath('app-icon.ico')
            );
        },

        //Copy the application files
        app: function () {
            // app/
            /////index.html
            this.fs.copyTpl(
                this.templatePath('_app/_index.html'),
                this.destinationPath('app/index.html'), {
                    name: this.props.name,
                    bc_bootstrap_css: this.props.bc_bootstrap_css,
                    bc_bootstrap_js: this.props.bc_bootstrap_js
                }
            );

            /////////////css
            mkdirp.sync('app/css');

            /////////////scss
            /////////////////app.scss
            this.fs.copy(
                this.templatePath('_app/_scss/_app.scss'),
                this.destinationPath('app/scss/app.scss')
            );

            /////////////js
            /////////////////app.js
            this.fs.copy(
                this.templatePath('_app/_js/_app.js'),
                this.destinationPath('app/js/app.js')
            );

            /////////////partials
            /////////////////header.html
            this.fs.copyTpl(
                this.templatePath('_app/_partials/_header.html'),
                this.destinationPath('app/partials/header.html'), {
                    name: this.props.name
                }
            );
        },
    },

    install: function () {
        this.installDependencies();
    }
});