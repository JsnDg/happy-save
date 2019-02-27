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
	var timeStamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	console.log('Adding to receipt');
	if (isNaN(rawPrice)){
        window.alert("Please input a number as price.");
    } else {
		$.get('add_receipt/'+name+'/'+price+'/'+timeStamp, finishedAdd);
		$(this).text("Gotcha! Add one more");
	}
	document.getElementById('name').value = ' ';
    document.getElementById('price').value = ' ';
    console.log('Finished');
}

function finishedAdd(data) {
	console.log("Your new item is recorded");
}