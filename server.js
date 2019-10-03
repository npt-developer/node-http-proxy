const AnyProxy = require('anyproxy');
const options = {
  port: 8080,
  rule: {
    *beforeSendRequest(requestDetail) {
      // proxy from http://1.2.3.4 to http://localhost:8089
      if (requestDetail.url.startsWith('http://1.2.3.4/')) {
        let newRequestOptions = requestDetail.requestOptions;
        requestDetail.protocol = 'http';
        newRequestOptions.hostname = 'localhost'
        newRequestOptions.port = '8089';
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