$(document).ready(function() {
	setup();
})

function setup(){
	console.log('Running');
	$('#newSubmit').click(putNewItem);
}

function putNewItem(){
	var name = document.getElementById('name').value;
	var price = Number(document.getElementById('price').value);
	console.log('Adding');
	$.get('add/'+name+'/'+price, finished);
}

function finished(data) {
	console.log(data);
}