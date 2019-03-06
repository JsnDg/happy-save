$(document).ready(function() {
	setup();
})

function setup(){
	console.log('Running');
	checkExpire();
	$('.newSubmit').click(putNewItem);
}

function putNewItem(){
	ga("send","event","Food","add");
	var name = document.getElementById('name').value;
	var rawPrice = document.getElementById('price').value;
	var price = Number(rawPrice);
	var today = new Date();
	if (String(today.getMonth()+1).length==2){
		var month = String(today.getMonth()+1);
	 } else {
		var month = "0"+String(today.getMonth()+1);
	 }
	 if (String(today.getDate()).length==2){
		 var date = String(today.getDate());
	  } else {
		 var date = "0"+String(today.getDate());
	  }
	var timeStamp = today.getFullYear()+'-'+month+'-'+date;
	var expireDate = document.getElementById('expireDate').value;
	var weight = Number(document.getElementById('weight').value);
	var unit = document.getElementById('unit').value;
	var type = document.getElementById('type').value;
	console.log('Adding');
	if (isNaN(rawPrice)){
        window.alert("Please input a number as price.");
    } else {
        if (today.getFullYear()>Number(expireDate.slice(0, 4)) 
        || (today.getFullYear()==Number(expireDate.slice(0, 4)) && (today.getMonth()+1)>Number(expireDate.slice(5, 7)))
        || (today.getFullYear()==Number(expireDate.slice(0, 4)) && (today.getMonth()+1)==Number(expireDate.slice(5, 7)) && today.getDate()>Number(expireDate.slice(8, 10))))
        {
			window.alert("Please input a expire date not before today.");
        } else {
            $.get('add/'+name+'/'+price+'/'+timeStamp+'/'+expireDate+'/'+weight+'/'+unit+'/'+type, finishedAdd);
			window.alert("Gotcha! You can check it in Food.");
        }
	}
	window.open('food.html', '_self');
	/*
	document.getElementById('name').value = '';
	document.getElementById('price').value = '';
	document.getElementById('expireDate').value = '';
	document.getElementById('weight').value = '';
	*/
}

function itemDetail(){
	ga("send","event","Food","detail");
	var selID = $(this)[0].value;
	if (document.getElementById("recentItem"+selID).className == 0){
		var xhttpitem = new XMLHttpRequest();
			xhttpitem.onreadystatechange = function() {	
				if (this.readyState == 4 && this.status == 200) {
					console.log('Loading json to get item info from the server');
					var response = JSON.parse(xhttpitem.responseText);
					var item = response.item;
					document.getElementById("recentItem"+selID).append("Price: $"+item[selID].price
					+" Size: "+item[selID].weight+" "+item[selID].unit+" Expire date: "+item[selID].expireDate);
				}
			};
		xhttpitem.open("GET", "/js/data.json", true);
		xhttpitem.send();
		document.getElementById("recentItem"+selID).className = 1;
	} else {
		$("#recentItem"+selID).fadeToggle();
	}
}

function delItem(){
	var delID = $(this)[0].value;
	console.log(delID);
	ga("send","event","Food","delete");
	$.get('del/'+delID, finishedDel);
}

function finishedAdd(data) {
	console.log("Your new item is recorded");
}

function finishedDel(data) {
	console.log("Your item is deleted");
	setTimeout(function(){ window.location.reload(true); }, 1000);
}

function checkExpire() {
	$.get('checkExpire', finishedCheck);
}

function finishedCheck(data) {
	console.log("Check the expire date food list");
}