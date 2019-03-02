$(document).ready(function() {
	setup();
})

function setup(){
	console.log('Running');
	$('.newSubmit').click(putNewItem);
}

function putNewItem(){
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
    var wastePer = document.getElementById('wastePer').value;
    console.log('Adding');
    if (isNaN(rawPrice)){
        window.alert("Please input a number as price.");
    } else {
        if (today.getFullYear()>Number(expireDate.slice(0, 4)) 
        || (today.getFullYear()==Number(expireDate.slice(0, 4)) && (today.getMonth()+1)>Number(expireDate.slice(5, 7)))
        || (today.getFullYear()==Number(expireDate.slice(0, 4)) && (today.getMonth()+1)==Number(expireDate.slice(5, 7)) && today.getDate()>Number(expireDate.slice(8, 10))))
        {
            $.get('addwaste/'+name+'/'+price+'/'+timeStamp+'/'+expireDate+'/'+weight+'/'+unit+'/'+type+'/'+wastePer, finishedAdd);
			window.alert("Recorded! Please reduce your waste!");
        } else {
            window.alert("Please input a expired date no later than today.");
        }
	}
	window.open('waste_test.html', '_self');
	/*
	document.getElementById('name').value = '';
	document.getElementById('price').value = '';
	document.getElementById('expireDate').value = '';
	document.getElementById('weight').value = '';
	*/
}

function finishedAdd(data) {
	console.log("Your new item is recorded");
}