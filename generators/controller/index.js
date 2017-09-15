'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var ControllerGenerator = yeoman.generators.NamedBase.extend({
    controllerC: function(){
        
        if (this.name && this.name.toLowerCase() !== 'ctrl' && this.name.substr(-4).toLowerCase() === 'ctrl') {
            this.name = this.name.slice(0, -4);
        }

        this.appname = 'app';

        
        this.fs.copyTpl(
                this.templatePath('controller.js'),
                this.destinationPath('app/js/'+this.name+'Ctrl.js'), {
                    scriptAppName: this.appname,
                    classedName: this.name
                }
        );

    }
});
 
module.exports = ControllerGenerator;

