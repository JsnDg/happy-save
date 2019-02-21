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
	console.log('Adding to receipt');
	$.get('add_receipt/'+name+'/'+price, finishedAdd);
	$(this).text("Gotcha! Add one more");
	document.getElementById('name').value = ' ';
    document.getElementById('price').value = ' ';
    console.log('Finished');
}

function finishedAdd(data) {
	console.log("Your new item is recorded");
}