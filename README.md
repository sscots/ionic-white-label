# ionic-white-label
`npm install -g ionic-white-label`

`ionic-white-label --id=my.app.id.com --name=AppName --icon=resources/client1/icon.png --splash=resources/client1/splash.png`

ARGS:
* config: config.xml file path (DEFAULT: ./confix.xml)
* id: 'id' attribute in config.xml 'widget' tag
* name: config.xml 'name' tag
* icon: file path to app icon image
* splash: file path to app splash image

** icon and splash images specified will be copied to /resources folder