'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var ServiceGenerator = yeoman.generators.NamedBase.extend({
    serviceC: function(){
        
        if (this.name && this.name.toLowerCase() !== 'srv' && this.name.substr(-4).toLowerCase() === 'srv') {
            this.name = this.name.slice(0, -4);
        }

        this.appname = 'app';

        
        this.fs.copyTpl(
                this.templatePath('service.js'),
                this.destinationPath('app/js/'+this.name+'.js'), {
                    scriptAppName: this.appname,
                    classedName: this.name
                }
        );

    }
});
 
module.exports = ServiceGenerator;

