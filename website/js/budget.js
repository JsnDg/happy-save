$(document).ready(function() {
	setup();
})

function setup(){
	console.log('Running');
    $('#setBudgetRange').click(reviseBudget);
    
}

function reviseBudget(){
    var rawBudget = document.getElementById('budget').value;
    var fromDate = document.getElementById('fromDate').value;
    var toDate = document.getElementById('toDate').value;
    var budget = Number(rawBudget);
    var fromDateNum = Number(fromDate.slice(0, 4)+fromDate.slice(5, 7)+fromDate.slice(8, 10));
    var toDateNum = Number(toDate.slice(0, 4)+toDate.slice(5, 7)+toDate.slice(8, 10));
	console.log('Set budget');
	if (isNaN(rawBudget)){
        window.alert("Please input a number as budget.");
    } else {
    if (fromDateNum>toDateNum){
        window.alert("Please input a valid period.");
    } else {
        $.get('changeBudget/'+fromDate+'/'+toDate+'/'+budget, finishedAdd);
        window.alert("Your budget is reset! Happy save!");
    }
		
	}
	document.getElementById('budget').value = ' ';
    console.log('Finished');
}

function finishedAdd(data) {
    console.log("Your new budget is recorded");
    setTimeout(function(){ window.location.reload(true); }, 500);
}

function checkReceipt() {
    window.open('receipt.html', '_self');
}

function checkTips() {
    window.open('tips.html', '_self');
}

function drawCircle(data, color){  
    var canvas = document.getElementById("circle");  
    var ctx = canvas.getContext("2d");
    var startPoint=0;  
    for(var i=0;i<data.length;i++){  
        ctx.fillStyle = color[i];  
        ctx.beginPath();  
        ctx.moveTo(200,150);  
        ctx.arc(200,150,150,startPoint,startPoint+Math.PI*2*(data[i]/100),false);  
        ctx.fill();  
        startPoint+=Math.PI*2*(data[i]/100);  
    }  
}