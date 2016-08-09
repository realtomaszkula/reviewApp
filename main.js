require.config({
  baseUrl: 'scripts/js/',
  paths: {
    'jquery' : '../../node_modules/jquery/dist/jquery.min',
    'jasmine': ['../../tests/lib/jasmine-2.4.1/jasmine'],
    'jasmine-html': ['../../tests/lib/jasmine-2.4.1/jasmine-html'],
    'jasmine-boot': ['../../tests/lib/jasmine-2.4.1/boot']
  },
  shim: {
    jquery: {
      exports: '$'
    },
    'jasmine-html': {
      deps : ['jasmine']
    },
    'jasmine-boot': {
      deps : ['jasmine', 'jasmine-html']
    }
}
});

require(['jasmine-boot'], function () {
  require(['tests/app_spec'], function(){
    //trigger Jasmine
    window.onload();
  })
});