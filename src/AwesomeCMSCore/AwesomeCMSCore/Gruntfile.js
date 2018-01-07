/// <binding AfterBuild='clean, copy' />
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-folder-list');
    grunt.initConfig({
        clean: ['./Modules/*'],
        copy: {
            main: {
                expand: true,
                src: ['../Modules/**/Views/**', '../Modules/**/bin/Debug/**/**/*.*', '../Modules/**/wwwroot/**',],
                dest: './Modules/',
            },
        }
    });
    grunt.registerTask('default', ['clean','copy']);
}