$(document).ready(function() {
    
    console.log("Handlebar running");
    
    var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                      var source = $(".item_rec").html();
                      var template = Handlebars.compile(source);
                      console.log('Loading json from the server');
                      var response = JSON.parse(xhttp.responseText);
                      var context = response.item_receipt;
                      console.log(context);
                      var html = template(context);
                      $(".item_rec").html(html);
                      console.log('Setup done');
                    }
                };
                xhttp.open("GET", "/js/data.json", true);
                xhttp.send();
})