/// <binding AfterBuild='cleanup' />
module.exports = function(grunt) {
  require("jit-grunt")(grunt);
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
        cwd: "../Modules/AwesomeCMSCore.Modules.Frontend/wwwroot/dist",
        src: ["cmscore.css"],
        dest: "./wwwroot/dist/"
      },
      js: {
        expand: true,
        cwd: "../Modules/AwesomeCMSCore.Modules.Frontend/wwwroot/dist",
        src: ["*.js"],
        dest: "./wwwroot/dist/"
      },
      static: {
        expand: true,
        cwd: "../Modules/AwesomeCMSCore.Modules.Frontend/wwwroot/dist",
        src: ["**"],
        dest: "./wwwroot/dist/"
      }
    },
    watch: {
      css: {
        files: ["../Modules/**/wwwroot/dist/*.css"],
        tasks: ["copy:css"],
        options: {
          reload: true,
          spawn: false
        }
      },
      js: {
        files: ["../Modules/**/wwwroot/dist/*.js"],
        tasks: ["copy:js"],
        options: {
          reload: true,
          spawn: false
        }
      }
    }
  });
  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("cleanup", [
    "clean",
    "copy:main",
    "copy:static"
  ]);
};
