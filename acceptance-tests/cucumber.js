module.exports = {
    default: {
      require: ['features/steps/**/*.js'],
      format: ['progress', 'html:reports/cucumber-report.html'],
      timeout: 120000,
    },
  };