var path = require('path');

module.exports = function(source) {
  this.cacheable();

  var js = '\n';
  var filename = path.parse(this.resource).base;
  var result = source.match(/exports\.push\(\[module\.id, "(.*)", "(.*)"]\);/);

  js += 'if (global.__STYLE_COLLECTOR_MODULES__.indexOf(module.id) < 0) {\n'

  if (result) {
    js += '  global.__STYLE_COLLECTOR__ += "' + result[1] + '";\n';
  }

  // Make sure we don't collect the same style twice
  js += '  global.__STYLE_COLLECTOR_MODULES__.push(module.id);\n';

  // Collect each file individually so we can use with components
  js += '  global.__STYLE_COLLECTOR_FILES__["' +  filename + '"] = "' + result[1] + '";\n';

  js += '}\n\n';

  // Remove from the cache to keep collecting
  js += 'delete require.cache[module.id];\n';

  return js;
}

