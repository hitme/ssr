var prerender = require('prerender');

var server = prerender({
    workers: process.env.PHANTOM_CLUSTER_NUM_WORKERS,
    iterations: process.env.PHANTOM_WORKER_ITERATIONS || 10,
    phantomBasePort: process.env.PHANTOM_CLUSTER_BASE_PORT || 12300,
    messageTimeout: process.env.PHANTOM_CLUSTER_MESSAGE_TIMEOUT,
    pageLoadTimeout: 120 * 1000,
    logRequests: true
});

server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

if ('LOGGER' in process.env) {
    server.use(prerender.logger());
}
if ('BASIC_AUTH_USERNAME' in process.env && 'BASIC_AUTH_PASSWORD' in process.env) {
    server.use(prerender.basicAuth());
}
if ('ALLOWED_DOMAINS' in process.env) {
    server.use(prerender.whitelist());
}
if ('BLACKLISTED_DOMAINS' in process.env) {
    server.use(prerender.blacklist());
}
if ('S3_BUCKET_NAME' in process.env) {
    console.log("Use s3 cache");
    server.use(prerender.s3HtmlCache());
} else if ('REDIS_URL' in process.env) {
    console.log("Use redis cache");
    server.use(require('./prerenderRedisCache.js'));
} else {
    console.log("Use mem cache");
    server.use(require('prerender-memory-cache'));
}

server.start();
