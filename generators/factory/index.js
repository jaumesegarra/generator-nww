'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var FactoryGenerator = yeoman.generators.NamedBase.extend({
    factoryC: function(){
        
        if (this.name && this.name.toLowerCase() !== 'fct' && this.name.substr(-4).toLowerCase() === 'fct') {
            this.name = this.name.slice(0, -4);
        }

        this.appname = 'app';

        
        this.fs.copyTpl(
                this.templatePath('factory.js'),
                this.destinationPath('app/js/'+this.name+'Fct.js'), {
                    scriptAppName: this.appname,
                    classedName: this.name
                }
        );

    }
});
 
module.exports = FactoryGenerator;

