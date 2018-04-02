module.exports =  {  
		  options: {
			dest: 'docs',
			startPage: '/api',
			title: "LLL Framework API and Reference Guide",
			imageLink:"http://www.gtechlll.com/images/igt.jpg",
			html5Mode: false,
			  scripts: [
					'dev/jspm_packages/github/angular/bower-angular@1.5.0/angular.js',
                   'dev/jspm_packages/github/angular/bower-angular-animate@1.5.0/angular-animate.js'
               ]
		  },

		api: {
			src: ['dev/components/lll-core/*.js',
					'dev/components/lll-core/components/**/*.js',
					'dev/components/lll-routing/*.js',
					'dev/components/lll-scorm/*.js',
					'dev/components/lll-elements/*.js',
					'dev/components/lll-elements/components/**/*.js'],
			title: 'API Documentation'
		  },
		grunt:{
			src: ['grunt/*.js'],
			title: 'Grunt Tasks'
	
		}
		  
}