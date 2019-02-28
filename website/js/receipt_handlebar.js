$(document).ready(function() {
    
    console.log("Handlebar running");
    
    var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                      var source = $(".item_rec").html();
                      var template = Handlebars.compile(source);
                      console.log('Loading json from the server');
                      var response = JSON.parse(xhttp.responseText);
                      var fromDate = response.budget[0].fromDate;
                      var toDate = response.budget[0].toDate;
                      var context = $.grep(response.item_receipt, function (n, i){
                        return (Number(n.timeStamp.slice(0, 4)+n.timeStamp.slice(5, 7)+n.timeStamp.slice(8, 10))>=Number(fromDate.slice(0, 4)+fromDate.slice(5, 7)+fromDate.slice(8, 10)))
                                    && (Number(n.timeStamp.slice(0, 4)+n.timeStamp.slice(5, 7)+n.timeStamp.slice(8, 10))<=Number(toDate.slice(0, 4)+toDate.slice(5, 7)+toDate.slice(8, 10)))});
                      var html = template(context);
                      $(".item_rec").html(html);
                      var output = '';
                      output += '<center><h3>From '+fromDate+' to '+toDate+'</h3></center>';
                      console.log('Setup done');
                    }
                    document.getElementById('date4Receipt').innerHTML = output;
                };
                xhttp.open("GET", "/js/data.json", true);
                xhttp.send();
})