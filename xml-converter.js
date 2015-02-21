importScripts('lib/xmldoc.build.js');

self.addEventListener('fetch', function(evt){
    evt.respondWith(
        fetch(evt.request.url, {mode: 'cors', method: evt.request.method})
        .then(function(response){ 
            if(response.headers.get('content-type').match(/application\/xml/)){
                return response.text()
                .then(function(body){
                    var document = new self.xmldoc.XmlDocument(body);
                    var root = {}, stack = [[document,root]];
                    while(stack.length){
                        var item = stack.pop(), node = item[0], json = item[1];
                        var token = {
                                val: node.val.trim(),
                                attr: node.attr
                            };
                        json[node.name] = json[node.name] || [];
                        json[node.name].push(token);
                        node.children.forEach(function(child){
                            stack.push([child, token]);
                        });
                    }
                    return new Response( JSON.stringify(root), { 
                        headers: {"Content-Type": "application/json"} 
                    });
                });
            }else{                
                return response;
            }
        })
    );
});