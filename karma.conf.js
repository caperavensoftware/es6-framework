module.exports = function(config) {
    config.set({
       basePath: '.',
       
       frameworks: ['jspm', 'mocha', 'chai', 'sinon'],
       
       plugins: [
            'karma-chrome-launcher',
            'karma-jspm',
            'karma-mocha',
            'karma-chai',
            'karma-sinon'  
       ],
       
       // set this to true if you want to run tests when you make changes
       autowatch: false,

       colors: true,

       // list of files to load in the browser. <script></script>       
       files: [
       ],
       
		jspm: {
            config: 'karma.systemjs.js',
            packages: 'jspm_packages',      // folder that contains system.js
			loadFiles: [                    // files to run as tests
                'tests/**/*.js'
            ],
			serveFiles: [                   // files that must be served up as modules
                'src/**/*.js'
            ]
		},
                    
        preprocessors: {
        },                     
        exclude: [],
       
		proxies: {
            '/tests/': '/base/tests/',
            '/src/' : '/base/src/',
            '/jspm_packages/': '/base/jspm_packages/',
            '/node_modules/' : '/base/node_modules/'
		},
       
       // level of logging
       // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG       
       logLevel: config.LOG_INFO,
       
       browsers: ['Chrome'],
       
       reporters: ['progress'],

       // web server port
       port: 9876,
       
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,    
        
        client: {
            mocha: {
                reporter: 'progress',
                ui: 'bdd'
            }
        },            
    });  
};