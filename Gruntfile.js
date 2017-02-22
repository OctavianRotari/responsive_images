/*
 After you have changed the settings under responsive_images
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var config = grunt.file.readYAML('Gruntconfig.yml');

  grunt.initConfig({
    sass: {
      dist: {
        expand: true,
        cwd: config.scssDir,
        src: ['*.scss'],
        dest: config.cssDir,
        ext: '.css'
      }
    },
    watch: {
      sass: {
        files: config.scssDir+'**/*.scss',
        tasks: ['sass']
      }
    },
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            width: 1140,
            quality: 30
          },{
            width: 570,
            quality: 30
          },{
            width: 1200,
            quality: 30
          },{
            width: 600,
            quality: 30
          }]
        },
        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images_src/',
          dest: 'images/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    },

  });

  grunt.registerTask('default', ['sass', 'clean', 'mkdir', 'responsive_images', 'watch']);

};
