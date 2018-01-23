/// <binding AfterBuild='clean, copy:main, copy:static' />
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-folder-list");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.initConfig({
        clean: ["./Modules/*"],
        copy: {
            main: {
                expand: true,
                src: [
                    "../Modules/**/Views/**",
                    "../Modules/**/bin/Debug/**/**/*.*",
                    "../Modules/**/wwwroot/**",
                    "!../Modules/AwesomeCMSCore.Modules.Console/**",
                    "!../Modules/AwesomeCMSCore.Modules.Frontend/**"
                ],
                dest: "./Modules/"
            },
            css: {
                expand: true,
                cwd: '../Modules/AwesomeCMSCore.Modules.Frontend/wwwroot/dist',
                src: [
                    "cmscore.css"
                ],
                dest: "./wwwroot/css/"
            },
            static: {
                expand: true,
                cwd: '../Modules/AwesomeCMSCore.Modules.Frontend/wwwroot/dist',
                src: [
                    "**",
                ],
                dest: "./wwwroot/dist/"
            }
        },
        watch: {
            css: {
                files: ["../Modules/**/wwwroot/dist/*.css"],
                tasks: ["copy:css"],
                options: {
                    reload: true
                }
            }
        }
    });
    grunt.registerTask("default", ["watch"]);
};