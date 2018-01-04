/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'supplychain-1',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.GOURL='http://192.168.0.17:3000';
    ENV['g-map'] = {
      exclude: true,
      libraries: ['places', 'geometry'],
      key: 'AIzaSyCG2bRgDCNZahksdgOykBqjYfihYdd0M1U',
      client: 'gme-your-unique-google-client-id',
      channel: 'my-google-map-api-channel',
      version: '3.26',
      language: 'ru',
      protocol: 'https'
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

   if (environment === 'production') {
    ENV.GOURL='http://119.81.59.59:3008';
    ENV.locationType = 'hash';
     ENV['g-map'] = {
      exclude: true,
      libraries: ['places', 'geometry'],
      key: 'AIzaSyCG2bRgDCNZahksdgOykBqjYfihYdd0M1U',
      client: 'gme-your-unique-google-client-id',
      channel: 'my-google-map-api-channel',
      version: '3.26'
     
    }
  }

  return ENV;
};
