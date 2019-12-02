'use strict';

const {
  Counter,
  Gauge,
  Histogram,
  Summary,
  register,
  collectDefaultMetrics,
} = require('prom-client');

// Symbol
const _prometheus = Symbol.for('EggApplication#prometheus');

module.exports = {
  get prometheus() {
    if (!this[_prometheus]) {
      const { name, exporter } = this.config;
      // set default labels
      register.setDefaultLabels(
        Object.assign(
          {
            app: name,
            pid: process.pid,
            worker: 'app',
          },
          exporter.defaultLabels,
        ),
      );

      let collectInterval = null;
      if (exporter.enableDefaultMetrics) {
        // 每 5 秒探测一次
        collectInterval = collectDefaultMetrics({
          timeout: 5000,
          prefix: exporter.prefix,
        });
        // 任务执行完毕自动退出，不会因为此定时器而挂起
        collectInterval.unref();
      }

      this[_prometheus] = {
        Counter,
        Gauge,
        Histogram,
        Summary,
        register,
        collectInterval,
      };
    }
    return this[_prometheus];
  },
};
