# style-collector-loader
Webpack loader to collect your CSS styles when you `React.renderToString(<App />)`.

When doing server-side rendering, your do not want FOUC (flash of unstyled content). However, if you are using the CSS loader, your styles will not be loaded in the browser until your React application is mounted.

To fix this problem, you can use the style-collector-loader to collect the CSS the client will need. Once the React application is loaded, you can remove it from the DOM.

## Install
1. `npm i -S style-collector-loader`
1. Set the style-collector loader on the server config (make sure the css-loader is just after)
1. Reset the values before your renderToString
1. Collect the CSS after renderToString and serve it
1. Don't forgot to remove the style once React is loaded on the client
1. Make sure you `require('./Component.css');` inside `componentWillMount` and not `componentDidMount` or anywhere else

**webpack.config.js**
```javascript
// ...
module.loaders = [
  { test: /\.css$/, loader: 'style-collector!css' },
  { test: /\.scss$/, loader: 'style-collector!css!sass' },
  { test: /\.(png|jpe?g)(\?.*)?$/, loader: 'url?limit=8192'},
  { test: /\.(svg|ttf|woff2?)(\?.*)?$/, loader: 'file'}
];
// ...
```

**server.jsx**
```javascript
// ...
global.__STYLE_COLLECTOR_MODULES__ = [];
global.__STYLE_COLLECTOR__ = '';

var html = React.renderToString(<App />);
var css = global.__STYLE_COLLECTOR__;

data = data.replace('</head>', '<style id="css-style-collector-data">' + css + '</style></head>');
// ...
```

**client.jsx**
```javascript
// ...
React.render(<App />, el);

var styleEl = document.getElementById('css-style-collector-data');
if (styleEl) {
  styleEl.remove();
}
// ...
```
