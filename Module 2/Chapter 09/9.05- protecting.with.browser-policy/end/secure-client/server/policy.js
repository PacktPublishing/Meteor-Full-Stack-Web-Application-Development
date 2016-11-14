BrowserPolicy.content.allowStyleOrigin(
  'https://maxcdn.bootstrapcdn.com/');
BrowserPolicy.content.allowScriptOrigin(
  'https://maxcdn.bootstrapcdn.com/');

BrowserPolicy.content.disallowInlineScripts();
BrowserPolicy.content.disallowConnect();

var rootUrl = __meteor_runtime_config__.ROOT_URL;
BrowserPolicy.content.allowConnectOrigin(rootUrl);
BrowserPolicy.content.allowConnectOrigin
(rootUrl.replace('http', 'ws'));