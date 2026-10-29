// Credentials are only available to the API, never to this public configuration.
(function(){
 const host=window.location.hostname;
 window.PORTFOLIO_GUIDE_API=(host==='localhost'||host==='127.0.0.1'||host.endsWith('.vercel.app'))?'':'https://portfolio-chi-three-1xct65oqug.vercel.app';
})();
