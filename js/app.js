window.addEventListener('load', function(){
    var container = document.querySelector('pre');
    var message = document.querySelector('#message');
    var request = new XMLHttpRequest();
    request.open('get', 'https://api.eveonline.com/Server/ServerStatus.xml.aspx');
    request.onload = function(){
        container.textContent = request.responseText;
        try { 
            var eveStats = JSON.parse(request.responseText);
            message.innerHTML = "currently " + eveStats.eveapi[0].result[0].onlinePlayers[0].val + " players online"
        } catch (notJson) {
            message.innerHTML = "response is not JSON!"
        }
    };
    request.send();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./xml-converter.js', {scope: './'});
    }
});