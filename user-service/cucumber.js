module.exports = {
    default: {
      require: ['test/integration/features/steps/**/*.js'],
      format: ['json:reports/report.json'],
      timeout: 120000,
    },
  };