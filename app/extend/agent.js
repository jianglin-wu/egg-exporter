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
const _prometheus = Symbol.for('EggAgent#prometheus');

module.exports = {
  get prometheus() {
    if (!this[_prometheus]) {
      const { name, prometheus } = this.config;
      // set default labels
      register.setDefaultLabels(
        Object.assign(
          {
            app: name,
            pid: process.pid,
            worker: 'agent',
          },
          prometheus.defaultLabels
        )
      );

      // 每 5 秒探测一次
      const collectInterval = collectDefaultMetrics({
        timeout: 5000,
        prefix: prometheus.prefix,
      });

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
