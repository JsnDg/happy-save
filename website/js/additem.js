$(document).ready(function() {
	setup();
})

function setup(){
	console.log('Running');
	$('.newSubmit').click(putNewItem);
}

function putNewItem(){
	var name = document.getElementById('name').value;
	var price = Number(document.getElementById('price').value);
	var today = new Date();
	var timeStamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var expireDate = document.getElementById('expireDate').value;
	var weight = Number(document.getElementById('weight').value);
	var unit = document.getElementById('unit').value;
	var type = document.getElementById('type').value;
	console.log('Adding');
	$.get('add/'+name+'/'+price+'/'+timeStamp+'/'+expireDate+'/'+weight+'/'+unit+'/'+type, finishedAdd);
	$(this).text("Gotcha! Add one more");
	document.getElementById('name').value = ' ';
	document.getElementById('price').value = ' ';
	document.getElementById('expireDate').value = ' ';
	document.getElementById('weight').value = ' ';
}

function itemDetail(){
	var selID = $(this)[0].value;
	if (document.getElementById("recentItem"+selID).className == 0){
		var xhttpitem = new XMLHttpRequest();
			xhttpitem.onreadystatechange = function() {	
				if (this.readyState == 4 && this.status == 200) {
					console.log('Loading json to get item info from the server');
					var response = JSON.parse(xhttpitem.responseText);
					var item = response.item;
					document.getElementById("recentItem"+selID).append(item[selID].timeStamp+" Price: $"+item[selID].price
					+" Size: "+item[selID].weight+" "+item[selID].unit);
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
	$.get('del/'+delID, finishedDel);
}

function finishedAdd(data) {
	console.log("Your new item is recorded");
}

function finishedDel(data) {
	console.log("Your new item is deleted");
	setTimeout(function(){ window.location.reload(true); }, 1000);
}