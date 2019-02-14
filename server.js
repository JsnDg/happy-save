var fs = require('fs');

var dataLoad = fs.readFileSync('website/js/data.json');

//change it to json
var itemHave = JSON.parse(dataLoad);

console.log(itemHave);

var express = require('express');

var app = express();

var server = app.listen(3000, listening);

function listening() {
    console.log("Listening");
}

app.use(express.static('website'));

app.get('/add/:name/:price', addNewItem);

function addNewItem(request, response){
    var data = request.params;
    var name = data.name;
    var price = Number(data.price);
    var reply;
    
    if(!price){
        reply = {msg: "The price is required."};
        response.send(reply)
    } else 
    {
    
    var newItem = {
        "name": name,
        "price": price
    }
        fs.readFile('website/js/data.json',function(err, data){
            if(err){
                return console.error(err);
            }
            var allItem = data.toString();
            allItem = JSON.parse(allItem);
            allItem.item.push(newItem);
            var newData = JSON.stringify(allItem, null, 2);
            fs.writeFile('website/js/data.json', newData, finished);
            function finished(err){
                console.log('Done');
            };
            reply = {msg: "Your new item is recorded."};
            response.send(reply)
    })
    }
}

app.get('/all', sendAll);

function sendAll(request, response){
    response.send(itemHave);
}

app.get('/search/:item', searchItem);

function searchItem(request, response){
    var item = request.params.item;
    var reply;
    if (itemHave[item]) {
        reply = {
           status: "found",
           name: item,
           price: itemHave[item]
       }
    } else {
        reply = {
            status: "not found"
    }}
    response.send(reply);
}