# egg-prometheus
Prometheus plugin for egg framework

## Install

```bash
$ npm i egg-prometheus --save
```

## Usage

### Enable the plugin

Change `${app_root}/config/plugin.js` to enable Prometheus plugin:

```js
exports.prometheus = {
  enable: true,
  package: 'egg-prometheus',
};
```

### 接口

`/clear-default-collect` 清除采集定时任务。


### Configuration

```js
exports.prometheus = {
  scrapePort: 3000,
  scrapePath: '/metrics',
  defaultLabels: { ... },
};
```

- `scrapePort`: the port to scrape metrics from
- `scrapePath`: the path to scrape metrics from
- `defaultLabels`: static labels may be applied to every metric emitted by a registry

## Default Metrics

- `http_response_time_ms summary`: ms to handle a request
- `http_request_rate counter`: number of requests to a route

while egg-rpc-base is enabled
- `rpc_consumer_response_time_ms summary`: ms of rpc time consuming
- `rpc_consumer_request_rate counter`: number of rpc calls
- `rpc_consumer_fail_response_time_ms summary`: ms of fail rpc time consuming
- `rpc_consumer_request_fail_rate counter`: number of fail rpc calls
- `rpc_consumer_request_size_bytes summary`: rpc request size in bytes
- `rpc_consumer_response_size_bytes summary`: rpc response size in bytes
- `rpc_provider_response_time_ms summary`: ms of request processed time
- `rpc_provider_request_rate counter`: number of rpc calls
- `rpc_provider_fail_response_time_ms summary`: ms of fail request processed time
- `rpc_provider_request_fail_rate counter`: number of fail rpc calls

## Custom Metrics

```js
const counter = new app.prometheus.Counter({
  name: 'xxx_total',
  help: 'custom counter',
  labelNames: [ 'xxx' ],
});

const gauge = new app.prometheus.Gauge({
  name: 'xxx_gauge',
  help: 'custom gauge',
  labelNames: [ 'xxx' ],
});

const histogram = new app.prometheus.Histogram({
  name: 'xxx_histogram',
  help: 'custom histogram',
  labelNames: [ 'xxx' ],
});

const summary = new app.prometheus.Summary({
  name: 'xxx_summary',
  help: 'custom summary',
  labelNames: [ 'xxx' ],
});
```

