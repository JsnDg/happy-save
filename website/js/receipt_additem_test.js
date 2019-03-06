$(document).ready(function() {
	setup();
})

function setup(){
	console.log('Running');
	$('.newSubmit').click(putNewItem);
}

function putNewItem(){
	ga("send","event","Receipt_test","add");
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
	console.log('Adding to receipt');
	if (isNaN(rawPrice)){
        window.alert("Please input a number as price.");
    } else {
		$.get('add_receipt/'+name+'/'+price+'/'+timeStamp, finishedAdd);
		window.alert("Gotcha! You can check it in Receipt.");
	}
	window.open('receipt_test.html', '_self');
	/*
	document.getElementById('name').value = '';
	document.getElementById('price').value = '';
	console.log('Finished');
	*/
}

function finishedAdd(data) {
	console.log("Your new item is recorded");
}