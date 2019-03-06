$(document).ready(function() {
    
    console.log("Handlebar running");
    $('.newSubmit').click(putNewItem);
    var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                      var source = $(".shop_list").html();
                      var template = Handlebars.compile(source);
                      console.log('Loading json from the server');
                      var response = JSON.parse(xhttp.responseText);
                      var context = response.shop_list;
                      console.log(context);
                      var html = template(context);
                      $(".shop_list").html(html);
                      console.log('Setup done');
                      $('.item4shop').click(deleteShopList);
                    }
                };
                xhttp.open("GET", "/js/data.json", true);
                xhttp.send();
})

function deleteShopList() {
    ga("send","event","Shoplist_test","delete");
    console.log("Start to delete");
    var delName = $(this)[0].value;
    console.log(delName);
    $.get('delShopList/'+delName, finishedDel);
}

function finishedDel(data) {
	console.log("Your item on shop list is deleted");
	setTimeout(function(){ window.location.reload(true); }, 1000);
}

function putNewItem(){
    ga("send","event","Shoplist_test","add");
	var name = document.getElementById('name').value;
	console.log('Adding');
	if (!name){
        window.alert("Please input a name.");
    } else {
        $.get('add2ShopList/'+name, finishedAdd);
    }
	document.getElementById('name').value = ' ';
}

function finishedAdd(data) {
    console.log("Your new item is recorded");
    setTimeout(function(){ window.location.reload(true); }, 1000);
}