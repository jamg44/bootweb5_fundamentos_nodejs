'use strict';

module.exports.isAPI = function(req) {
  return req.originalUrl.indexOf('/apiv') === 0;
}
