module.exports = function(config) {
    config.set({
       basePath: '',
       
       frameworks: ['jspm', 'mocha', 'chai'],
       
       plugins: [
            'karma-chrome-launcher',
            'karma-jspm',
            'karma-mocha',
            'karma-chai'     
       ],
       
       // set this to true if you want to run tests when you make changes
       autowatch: false,

       colors: true,

       // list of files to load in the browser. <script></script>       
       files: [
       ],
       
		jspm: {
			useBundles: true,
			loadFiles: [
				'tests/**/*.js'
			],
			serveFiles: ['src/**/*.js']
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
       
        preprocessors: {
            'src/**/*.js': ['babel'],
            'tests/**/*.js': ['babel']
        },      
        
        babelPreprocessor: {
        options: {
            modules: 'system'
        }
        },         

       browsers: ['Chrome'],
       
       reporters: ['progress'],

       // web server port
       port: 9876,
       
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,              
    });  
};