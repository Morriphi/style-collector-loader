module.exports = function(source) {
	this.cacheable();

  var js = '\n';
  var result = source.match(/exports\.push\(\[module\.id, "(.*)", "(.*)"]\);/);

  js += 'if (global.__STYLE_COLLECTOR_MODULES__.indexOf(module.id) < 0) {\n'

  if (result) {
    js += '  global.__STYLE_COLLECTOR__ += "' + result[1] + '";\n';
  }

  // Make sure we don't collect the same style twice
  js += '  global.__STYLE_COLLECTOR_MODULES__.push(module.id);\n';

  js += '}\n\n';

  // Remove from the cache to keep collecting
  js += 'delete require.cache[module.id];\n';

  return js;
}
