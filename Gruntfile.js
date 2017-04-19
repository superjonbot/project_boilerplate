module.exports = function (grunt) {

    // USER DEFINED VARIABLES *start*

    var projectType = 'web'; //web,chromecast,appletv   <-determines default config
    var localserver = 'http://local-scotchbox.com/chrysalis_dev/projects/';
    var thirdPartyLibraries=[ 'requireLib']//,'jquery', ];
    var requirePATHS = {
        almondLib: 'js_src/libraries/require/almond/almond',
        requireLib: 'js_src/libraries/require/require/require',
        underscore: 'js_src/libraries/utilities/underscore/underscore183',
        qwery: 'js_src/libraries/qwery/qwery',
        jquery : 'js_src/libraries/utilities/jquery1x/jquery-1.10.2',
        modernizr: 'js_src/libraries/utilities/modernizr/modernizr.custom.43687',
        i18n: 'js_src/libraries/require/require/i18n',
        dust: 'js_src/libraries/dust/dist/dust-full-2.0.0.min',
        tweenmax_1_11_8: 'js_src/libraries/utilities/greensocks_1.11.8/TweenMax',
        tweenlite_1_11_8: 'js_src/libraries/utilities/greensocks_1.11.8/TweenLite',
        timelinelite_1_11_8: 'js_src/libraries/utilities/greensocks_1.11.8/TimelineLite',
        timelinemax_1_11_8: 'js_src/libraries/utilities/greensocks_1.11.8/TimelineMax',
        draggable_1_11_8: 'js_src/libraries/utilities/greensocks_1.11.8/utils/Draggable',
        draggable_1_11_8: 'js_src/libraries/utilities/greensocks_1.11.8/plugins/ScrollToPlugin',
        //hammer: 'js_src/libraries/hammer/jquery.hammer',
        oboe: 'js_src/libraries/ajax/oboe-browser'
    };

    // USER DEFINED VARIABLES *end*


    // LEAVE EVERYTHING BELOW ALONE! -JR

    var myTaskList = [];
    var basePath= grunt.option('basePath');
    var projectPath= grunt.option('projectPath');
    var DATE= grunt.option('DATE');
    var TIME= grunt.option('TIME');
    var cachebuster =  grunt.option('cachebuster');

    var projectName = projectPath.split('/')[1];
    var versionnumber = '<%= pkg.version %>.' + (Math.floor(new Date().getTime() / 100000000000) / 10);
    console.log('basePath:'+basePath);
    console.log('projectPath:'+projectPath);
    console.log('DATE:'+DATE);
    console.log('TIME:'+TIME);
    console.log('cachebuster:'+cachebuster);
    console.log('versionnumber:'+versionnumber);
    var projectFolder = basePath+'/'+projectPath;  //DESTINATION FOR FILES
    var masterFiles = ['js_src/libraries/baselibs/required_'+projectType+'.js', projectPath+'/js_src/project.js'];
    var finalNames = ['libraries.js', 'project.js', 'program.js'];   //application.JS is the header and footer combined
    var thirdpartyInc = '/* '+String(thirdPartyLibraries)+' */';

    var localserverMSG = 'development URL: '+localserver+projectName+'/index.html?debug=true';
    requirePATHS.requirejsConfig = projectPath+'/config_grunt';
    myTaskList.push('shell', 'requirejs','concat', 'uglify', 'jsbeautifier', 'usebanner', 'notify:complete');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        returnBanner: function (src, filepath) {
            var complete_src = grunt.file.expand(src);
            var final_name = '';
            for (var i = 0; i < complete_src.length; i++) {
                complete_src[i] = complete_src[i].substring(complete_src[i].lastIndexOf('/') + 1, complete_src[i].length);
            }
            final_name = complete_src.join('-');

            var final_banner = '';
            final_banner += '/*! ' + projectName + ' : ' + final_name + ' */';
            return final_banner;
        },    //This function places the filename at the top of the file

        banner: '/*! codebase: <%= pkg.name %> v' + versionnumber + ' by Jonathan Robles */\n' +
        '/*! built:<%= grunt.template.today("mm-dd-yyyy [h:MM:ssTT]") %> */\n' +
        '/*! -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */\n\n' +
        '/*! Prerequisite Libraries: none */\n\n' +
          '/*! -=-=-=-=-=-=-=-Third Party Includes [start]-=-=-=-=-=-=-=- */\n' + thirdpartyInc +
        '\n/*! -=-=-=-=-=-=-=- Third Party Includes [end] -=-=-=-=-=-=-=- */\n\n',
        shell: {
                erase_project_js: {
                    command: 'rm -rf ' + projectFolder + '/js/project*'
                },
                erase_libraries_js: {
                    command: 'rm -rf ' + projectFolder + '/js/libraries*'
                },
                erase_program_js: {
                    command: 'rm -rf ' + projectFolder + '/js/program*'
                },
                erase_program_css: {
                    command: 'rm -rf ' + projectFolder + '/css/program.css'
                },
                combineCSS: {
                    command: 'cat css_src/global_'+projectType+'.css '+ projectFolder + '/css_src/project.css > '+ projectFolder + '/css/program.css'
                },
                showURL: {
                command: 'printf "\n\n'+localserverMSG+'\n\n"'
                 },
                makeIndex: {
                command: 'cp -f '+projectPath+'/index_src.html '+projectPath+'/index.html'
                },
                makeIndex_title:{
                command: "sed 's/{{title}}/" + projectName + "/g' "+projectPath+"/index.html > "+projectPath+"/index_temp.html; mv "+projectPath+"/index_temp.html "+projectPath+"/index.html"
                },
                 makeIndex_cachebuster:{
                command: "sed 's/{{cachebuster}}/" + cachebuster + "/g' "+projectPath+"/index.html > "+projectPath+"/index_temp.html; mv "+projectPath+"/index_temp.html "+projectPath+"/index.html"
                }
        },
        requirejs: {
            header_file: {   //just a concat of libraries
                options: {
                    baseUrl: basePath,
                    mainConfigFile: requirePATHS.requirejsConfig+'.js',
                    optimize: 'none',
                    preserveLicenseComments: false,
                    name: masterFiles[0],
                    out: projectFolder + '/js/' + finalNames[0],
                    paths: requirePATHS,
                    include: thirdPartyLibraries//['jquery', 'almondLib', 'requirejsConfig' ]
                }
            },
            footer_file: {  //requireJS instance
                options: {
                    baseUrl: basePath,
                    mainConfigFile: requirePATHS.requirejsConfig+'.js',
                    optimize: 'none',
                    preserveLicenseComments: false,
                    name: masterFiles[1],
                    out: projectFolder + '/js/' + finalNames[1],
                    paths: requirePATHS
                }
            }
        },

        concat: {     //make all in one file
                options: {
                    separator: ';',
                },
                dist: {
                    src: [projectFolder + '/js/' + finalNames[0], projectFolder + '/js/' + finalNames[1]],
                    dest: projectFolder + '/js/' + finalNames[2]
                }

        },
        uglify: {
            beautify: {
                options: {
                    banner: '<%= banner %>',
                    beautify: true,
                    mangle: false,
                    compress: false
                },

                src: projectPath + '/js/*',
                dest: projectPath + '/js/',
                expand: true, // allow dynamic building
                flatten: true//, // remove all unnecessary nesting
            },
            minifier: {
                options: {
                    banner: '<%= banner %>',
                    beautify: false,
                    mangle: true,
                    compress: true
                },

                src: projectPath + '/js/*',
                dest: projectPath + '/js/',
                expand: true, // allow dynamic building
                flatten: true, // remove all unnecessary nesting
                ext: '_min.js' // replace .js to .min.js
            }
        },
        jsbeautifier: {
            files: [(projectPath + '/js/*.js'), ('!' + projectPath + '/js/*_min.js')]
        },
        usebanner: {
            taskName: {
                options: {
                    position: 'top',
                    linebreak: true,
                    process: '<%= returnBanner %>'


                },
                files: {
                    src: [(projectPath + '/js/*')]
                }
            }
        },
     /*   copy: {
            main: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        flatten: true,
                        src: ['../exports/' + projectName + '_v' + versionnumber + '/!*'],
                        dest: projectFolder,
                        filter: 'isFile'
                    }
                ],
            },
        },*/
        watch: {
            scripts: {
                files: masterFiles,  //watch these files and GRUNT IT!
                tasks: myTaskList,
                options: {
                    spawn: true,
                    livereload: true
                }
            }


        },
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5, // maximum number of notifications from jshint output
                title: projectName, // defaults to the name in package.json, or will use project directory's name
                success: false, // whether successful grunt executions should be notified automatically
                duration: 3 // the duration of notification in seconds, for `notify-send only
            }
        },
        notify: {
            complete: {
                options: {
                    title: '<%= notify_hooks.options.title %>',  // optional
                    message: 'DONE!'
                }
            }
        }
    });

    // PLUGINS
    grunt.loadNpmTasks('grunt-banner'); //https://github.com/gruntjs/grunt-contrib-concat
    grunt.loadNpmTasks('grunt-contrib-concat'); //https://github.com/gruntjs/grunt-contrib-concat
    grunt.loadNpmTasks('grunt-contrib-copy'); //https://github.com/gruntjs/grunt-contrib-copy
    grunt.loadNpmTasks('grunt-contrib-cssmin'); //https://github.com/gruntjs/grunt-contrib-cssmin
    grunt.loadNpmTasks('grunt-contrib-imagemin'); //https://github.com/gruntjs/grunt-contrib-imagemin
    grunt.loadNpmTasks('grunt-contrib-jasmine');   //https://github.com/gruntjs/grunt-contrib-jasmine
    grunt.loadNpmTasks('grunt-contrib-jshint'); //https://github.com/gruntjs/grunt-contrib-jshint
    grunt.loadNpmTasks('grunt-contrib-qunit'); //https://github.com/gruntjs/grunt-contrib-qunit
    grunt.loadNpmTasks('grunt-contrib-requirejs'); //https://github.com/gruntjs/grunt-contrib-requirejs
    grunt.loadNpmTasks('grunt-contrib-uglify');    //https://github.com/gruntjs/grunt-contrib-uglify
    grunt.loadNpmTasks('grunt-contrib-watch');    //https://github.com/gruntjs/grunt-contrib-watch
    grunt.loadNpmTasks('grunt-jsbeautifier');  //https://github.com/vkadam/grunt-jsbeautifier
    grunt.loadNpmTasks('grunt-notify');   //https://github.com/dylang/grunt-notify
    grunt.loadNpmTasks('grunt-shell');    //https://github.com/sindresorhus/grunt-shell

    // run right away
    grunt.task.run('notify_hooks');

    console.log('Running my Task List: ' + myTaskList);
    grunt.registerTask('default', myTaskList);

};