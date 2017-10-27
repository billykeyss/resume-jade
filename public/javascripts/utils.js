const shouldPrint = !process.env.PRODUCTION;

var log = shouldPrint ? console.log.bind(window.console) : function() {};
