'use strict';

exports.exporter = {
  scrapePort: 3000,
  scrapePath: '/metrics',
  prefix: 'egg_',
  aggregatorPort: 6789,
  enableDefaultMetrics: true,
};
