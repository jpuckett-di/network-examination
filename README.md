# Network Examination

Given a [HAR export](https://support.google.com/admanager/answer/10358597?hl=en), this script will tell you which file extensions and their respective query string parameters are in use.

```bash
node main.js uat-autopreferred.chase.com.har.json
```

example output:

```javascript
{
  undefined: [ 'vin', 'dealer_ccid', 'dealer_id', 'dealer_name' ],
  js: [ 'ver' ],
  css: [ 'v', 'ver' ],
  php: [ 'action', 'postId', 'nonce', 'count' ],
  woff2: [ 'v' ]
}
```
