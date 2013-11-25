module.exports = (grunt) ->
  grunt.initConfig
    concat:
      dist:
        dest: "assets/js/main.js"
        src: [
          "built/src/js/core/*.js",
          "built/src/js/main.js"
        ]
    jshint:
      options:
        jshintrc: "./.jshintrc"
      all: ["src/js/**/*.js"]
    traceur:
      options:
        experimental: true,
      build:
        files:
          "built/": ["src/js/**/*.js"]
    sass:
      dist:
        files:
          'assets/css/screen.css': 'src/sass/screen.scss'
    watch:
      scripts:
        files: "src/js/**/*.js"
        tasks: ["jshint", "traceur", "concat"]
      css:
        files: "src/sass/**/*.scss"
        tasks: ["sass"]
        options:
          livereload: true

  # Custom Tasks
  require(__dirname + "/tasks/traceur")(grunt)

  # npm Tasks
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-sass"
  grunt.loadNpmTasks "grunt-contrib-jshint"
  grunt.loadNpmTasks "grunt-contrib-watch"

  grunt.registerTask "default", ["jshint", "traceur", "concat", "sass"]
