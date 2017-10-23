module.exports = function(grunt) {

  const GITHUB_TOKEN_VAR = 'GH_TOKEN';

  grunt.initConfig({
    gitAuthToken: process.env[GITHUB_TOKEN_VAR],
    shell: {
      gitSetOrigin: {
        command: 'git remote set-url --push origin https://<%= gitAuthToken %>@github.com/elenadotedu/test.git'
      }
    },
    release: {
      options: {
        additionalFiles: ['app/package.json'],
        commitMessage: '[skip ci] release <%= version %>',
        tagName: 'v<%= version %>',
        draft: true,
        npm: false, //default: true
        github: {
          repo: 'elenadotedu/test',
          accessTokenVar: GITHUB_TOKEN_VAR
        }
      }
    }
  });

  grunt.task.registerTask('gitRelease', ['shell:gitSetOrigin', 'release']);

  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-shell');
}
