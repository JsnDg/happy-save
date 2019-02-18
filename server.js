var fs = require('fs');

//var item = require('website/js/data.json');

function readJSONdata(jsonfilename){
    var dataLoad = fs.readFileSync(jsonfilename);
    //change it to json
    var itemHave = JSON.parse(dataLoad);
    return itemHave;
}

itemHave = readJSONdata('website/js/data.json');

var express = require('express');

var app = express();

var server = app.listen(process.env.PORT || 3000, listening);

function listening() {
    console.log("Listening");
}

app.use(express.static('website'));

app.get('/add/:name/:price/:expireDate/:weight/:unit/:type', addNewItem);

function addNewItem(request, response){
    var data = request.params;
    var name = data.name;
    var price = Number(data.price);
    var expireDate = Number(data.expireDate);
    var weight = Number(data.weight);
    var unit = data.unit;
    var type = data.type;
    var reply; 
    if(!name){
        reply = {msg: "The name is required."};
        response.send(reply)
    } else 
    {
    var newItem = {
        "name": name,
        "price": price,
        "expireDate": expireDate,
        "weight": weight,
        "unit": unit,
        "type": type,
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

app.get('/del/:delID', delItem);

function delItem(request, response){
    var data = request.params;
    var delID= data.delID;
    fs.readFile('website/js/data.json',function(err, data){
        if(err){
            return console.error(err);
        }
        var allItem = data.toString();
        allItem = JSON.parse(allItem);
        allItem.item.splice(delID,1);
        var newData = JSON.stringify(allItem, null, 2);
        fs.writeFile('website/js/data.json', newData, finished);
        function finished(err){
            console.log('Done');
        };
        reply = {msg: "Your item is used."};
        response.send(reply);
    })
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