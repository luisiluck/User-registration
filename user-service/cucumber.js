module.exports = {
    default: {
      require: ['test/integration/features/steps/**/*.js'],
      format: ['progress', 'message:reports/report.ndjson'],
      timeout: 120000,
    },
  };