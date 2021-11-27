const AnyProxy = require('anyproxy');
const options = {
  port: 8080,
  rule: {
    *beforeSendRequest(requestDetail) {
      // proxy from http://1.2.3.4 to http://localhost:8089
      const proxyFrom = 'http://127.0.0.1:8222';
      console.log('url------',requestDetail.url);
      if (requestDetail.url.startsWith(proxyFrom)) {
        let newRequestOptions = requestDetail.requestOptions;
        requestDetail.protocol = 'http';
        newRequestOptions.hostname = 'wordpress-demo.com'
        newRequestOptions.port = '80';
        return requestDetail;
      }
      return requestDetail;
    },
  },
  webInterface: {
    enable: false,
    // webPort: 8002
  },
  throttle: 10000,
  forceProxyHttps: false, // need not https
  wsIntercept: false,
  silent: false
};
const proxyServer = new AnyProxy.ProxyServer(options);

proxyServer.on('ready', () => { 
console.log('ready')
 });
proxyServer.on('error', (e) => {
  console.log('error', e)
 });
proxyServer.start();

//when finished
// proxyServer.close();