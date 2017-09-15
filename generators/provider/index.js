'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var ProviderGenerator = yeoman.generators.NamedBase.extend({
    providerC: function(){
        
        if (this.name && this.name.toLowerCase() !== 'prv' && this.name.substr(-4).toLowerCase() === 'prv') {
            this.name = this.name.slice(0, -4);
        }

        this.appname = 'app';

        
        this.fs.copyTpl(
                this.templatePath('provider.js'),
                this.destinationPath('app/js/'+this.name+'Prv.js'), {
                    scriptAppName: this.appname,
                    classedName: this.name
                }
        );

    }
});
 
module.exports = ProviderGenerator;

