$(document).ready(function() {
    console.log("Waste set up done");
    detailCount = 0;
})

function deleteWasteItem() {
    console.log("Start to delete");
    var delID = $(this)[0].value;
    console.log(delID);
    $.get('delWaste/'+delID, finishedDel);
}

function finishedDel(data) {
	console.log("Your waste is deleted");
	setTimeout(function(){ window.location.reload(true); }, 1000);
}

function changeWastePortion() {
  var selID = $(this)[0].value;
	if (document.getElementById("recentItem"+selID).className == 0){
    $("#recentItem"+selID).append("Set waste percentage:<select style='border-color:#7EDAD4;background-color:#FFFFFF;border-radius:8px;' id='waste_percent"+selID+"'><option>10</option><option>25</option><option>50</option><option>75</option><option>90</option><option>100</option></select>%<button style='background-color:#7EDAD4;border-radius:8px;color:white;' class='confirmChange' value='"+selID+"'>Confirm</button>");
    console.log('Append options of change the portion');
    document.getElementById("recentItem"+selID).className = 1;
    $(".confirmChange").click(changePortion);
	} else {
		$("#recentItem"+selID).fadeToggle();
	}
}

function changePortion() {
  var selID = $(this)[0].value;
  var newPortion = document.getElementById("waste_percent"+selID).value;
  $.get('changeWastePercent/'+selID+'/'+newPortion, finishedChangePercent);
}

function finishedChangePercent(data) {
	console.log("Your waste percentage is changed");
	setTimeout(function(){ window.location.reload(true); }, 1000);
}

function showDetail() {
  if (document.getElementById("details").className == 0){
    var xhttpdetail = new XMLHttpRequest();
    xhttpdetail.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var response = JSON.parse(xhttpdetail.responseText);
          var item = response.waste;
          var sumGrains = 0;
          var sumFruits = 0;
          var sumVegetables = 0;
          var sumDairy = 0;
          var sumProtein = 0;
          var sumOils = 0;
          var sumOther = 0;
          for(var i=0;i<item.length;i++){
              moneyWaste = item[i].price*item[i].wastePer/100;
              switch (item[i].type) {
                  case "Grains":
                        sumGrains += moneyWaste;
                        break;
                  case "Fruits":
                        sumFruits += moneyWaste;
                        break;
                  case "Vegetables":
                        sumVegetables += moneyWaste;
                        break;
                  case "Dairy":
                        sumDairy += moneyWaste;
                        break;
                  case "Protein":
                        sumProtein += moneyWaste;
                        break;
                  case "Oils":
                        sumOils += moneyWaste;
                        break;
                  case "Other":
                        sumOther += moneyWaste;
                        break;
            }        
          }
          output = '<p></p><h4>Waste of Grains: $'+sumGrains.toFixed(2)+'';
          output += '</h4><h4>Waste of Fruits: $'+sumFruits.toFixed(2)+'';
          output += '</h4><h4>Waste of Vegetables: $'+sumVegetables.toFixed(2)+'';
          output += '</h4><h4>Waste of Dairy: $'+sumDairy.toFixed(2)+'';
          output += '</h4><h4>Waste of Protein: $'+sumProtein.toFixed(2)+'';
          output += '</h4><h4>Waste of Oils: $'+sumOils.toFixed(2)+'';
          output += '</h4><h4>Waste of Other: $'+sumOther.toFixed(2)+'<p></p>';
          document.getElementById('details').innerHTML = output;
          console.log('Have shown detail');
        }
    };
    xhttpdetail.open("GET", "/js/data.json", true);
    xhttpdetail.send();
    document.getElementById("details").className = 1;
  } else {
		$('#details').fadeToggle();
	}
}