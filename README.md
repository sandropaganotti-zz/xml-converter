# XML Converter

A small ServiceWorker that transparently converts on-the-fly XML responses to JSON. 

xml-converter inspect all the http traffic that originates from its domain, detect
XML responses and converts them into JSON _before_ they reach the page. This is 
especially useful when working with a framework that does not support XML parsing.

#### Have you seen the GDL video?

I've made a short video that describes what is a ServiceWorker, how it works and how it can be used to create this library. If you have found the contents of the video interesting you might want to spend some time diving a bit deeper into the features of this technology. 

I've wrote a few ideas about how this library could be extended. Want to give it try? Have a look at the [Extending the library](#user-content-extendig-the-library) section!

## Install

The best way to install this library is using bower: 
```
bower install git@github.com:sandropaganotti/xml-converter.git
```

To enable this library this line of code needs to be added to your root 
ServiceWorker, if you don't have one just create an empty sw.js file in the 
root of your project:

```
importScripts('bower_components/xml-converter/xml-converter.js');
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
## Extending this library<a name="extendig-the-library"></a>

Here's a few interesting experiments that can be done using this library as a starting point, to get a better grasp of the power and the features offered by ServiceWorker:

* Instead of converting all the responses with a `Content-Type: application/xml` it would be better to search instead for a specific header in the request, like `X-Convert-To: JSON`.
* Extending the previous idea it would be great to have another custom header `X-JSON-Filter: some.specific.key.path` that instructs the ServiceWorker to return only the JSON subpath specified as the value of the header. 
* As a last step the library could support a 3rd custom header `X-Cache-For: 3600`. If this header is specified then the ServiceWorker can use the built-in cache to store the response, converted to JSON, for the specified amount of seconds. During this period every hit on the original request causes the ServiceWorker to return the cached JSON response.

## Kudos

Nick Farina for xmldoc - https://github.com/nfarina/xmldoc
