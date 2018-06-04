let fs = require('fs'),
 xml2js = require('xml2js'),
 util = require('util'),
 commandLineArgs = require('command-line-args');
const { exec } = require('child_process');

let parser = new xml2js.Parser(),
 xmlBuilder = new xml2js.Builder();

const optionDefinitions = [
	{ name: 'config', alias: 'c', type: String, defaultValue: './config.xml' },
	{ name: 'id', type: String },
	{ name: 'name', alias: 'n', type: String },
	{ name: 'version', alias: 'v', type: String },
	{ name: 'icon', alias: 'i', type: String, defaultValue: './resources/icon.png' },
	{ name: 'splash', alias: 's', type: String, defaultValue: './resources/splash.png' }
];
const options = commandLineArgs(optionDefinitions);

fs.readFile(options.config, function(err, data) {
	if(err) console.log(err);
	parser.parseString(data, function (err, result) {
		if(err) console.log(err);
		if(result.widget) {
			if(options.id) {
				result.widget.$.id = options.id;
				console.log('New confix.xml id: '+options.id);
			}
			if(options.name) {
				result.widget.name = options.name;
				console.log('New config.xml name: '+options.name);
			}
			if(options.version) {
				result.widget.$.version = options.version;
				console.log('New config.xml version: '+options.version);
			}
			
			let xml = xmlBuilder.buildObject(result);
			
			fs.writeFile(options.config, xml, () => {
				console.log('config.xml Updated');
				exec('cp '+options.splash+' resources/; cp '+options.icon+' resources/; ionic cordova resources --force --splash; ionic cordova resources --force --icon', (err, stdout, stderr) => {
					if (err) {
						// node couldn't execute the command
						console.log(err);
						return;
					}
					if(stdout) console.log(stdout);
					console.log(stderr);
				});
			});
		} else {
			console.log('Invalid config.xml file');
		}
	});
});
