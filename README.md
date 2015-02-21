# XML Converter

A small ServiceWorker that transparently converts on-the-fly XML responses to JSON. 

xml-converter inspect all the http traffic that originates from its domain, detect
XML responses and converts them into JSON _before_ they reach the page. This is 
especially useful when working with a framework that does not support XML parsing.

## Install

The best way to install this library is using bower: 
```
bower install 
```

To enable this library this line of code needs to be added to your root 
ServiceWorker, if you don't have one just create an empty sw.js file in the 
root of your project:

```
importScripts();
```

To install the root ServiceWorker (if haven't done it already) you can use this
code snippet from your page:

```
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {scope: '/'});
}
```

## Example 

Before xml-converter

```xml
<eveapi version="2">
    <currentTime>2015-02-21 09:57:30</currentTime>
    <result>
        <serverOpen>True</serverOpen>
        <onlinePlayers>24985</onlinePlayers>
    </result>
    <cachedUntil>2015-02-21 10:00:07</cachedUntil>
</eveapi>
```

After xml-converter

```json
{
    "eveapi": [
        {
            "val": "",
            "attr": {
                "version": "2"
            },
            "cachedUntil": [
                {
                    "val": "2015-02-21 09:36:05",
                    "attr": {}
                }
            ],
            "result": [
                {
                    "val": "",
                    "attr": {},
                    "onlinePlayers": [
                        {
                            "val": "24637",
                            "attr": {}
                        }
                    ],
                    "serverOpen": [
                        {
                            "val": "True",
                            "attr": {}
                        }
                    ]
                }
            ],
            "currentTime": [
                {
                    "val": "2015-02-21 09:35:53",
                    "attr": {}
                }
            ]
        }
    ]
}
```

## Kudos

Nick Farina for xmldoc - https://github.com/nfarina/xmldoc