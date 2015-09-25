# style-collector-loader
Webpack loader to collect your CSS styles when doing server-rendering

## Install
1. `npm install style-collector-loader`
2. Set the loader for the server version: `{ test: /\.scss(\?.*)?$/, loader: 'style-collector!css!sass' },` (make sure the css-loader is just after)
3. Reset the values before your renderToString:
```javascript
global.__STYLE_COLLECTOR_MODULES__ = [];
global.__STYLE_COLLECTOR__ = '';
```
4. Collect the CSS after renderToString and serve it:
```javascript
var css = global.__STYLE_COLLECTOR_MODULES__;
data = data.replace('</head>', '<style id="css-style-collector-data">' + css + '</style></head>');
```
5. Don't forgot to remote the style once React is loaded on the client
```javascript
React.render(<App />, el);

var styleEl = document.getElementById('css-style-collector-data');
if (styleEl) {
  styleEl.remove();
}
```
6. Make sure you `require('./Component.css');` inside `componentWillMount`
