function Calendar(id){
	this.calcontent=document.getElementById(id);
}

function isleapyear(year){
	return (year%400==0||(year%4==0&&year%100!=0));
}
Calendar.DAYS=['Su ', 'Mo ', 'Tu ', 'We ', 'Th ', 'Fr ', 'Sa '];
Calendar.MONTHS=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
Calendar.prototype.updateCalendar=function(plus){
	var obj=this;
	var calcontent=this.calcontent;
	this.date=new Date(this.date.getFullYear(),this.date.getMonth()+plus,1);
	var date=this.date;
	var newcaption=calcontent.getElementsByTagName("caption")[0];
	newcaption.removeChild(newcaption.childNodes[1]);
	newcaption.insertBefore(document.createTextNode(Calendar.MONTHS[this.date.getMonth()]+","+this.date.getFullYear()),newcaption.lastChild);
	var numberrows=6;
	var lastmlastday=new Date(date.getFullYear(),date.getMonth(),0);
	var currdate;
	if(lastmlastday.getDay()==6){
		currdate=new Date(date.getFullYear(),date.getMonth(),1)
	}
	else{
		currdate=new Date(date.getFullYear(),date.getMonth(),0);
		currdate.setDate(lastmlastday.getDate()-lastmlastday.getDay());
	}
	console.log(currdate);
	var newtable=calcontent.getElementsByTagName("table")[0];
	for(var j=0;j<numberrows;j++){
		var tr=calcontent.getElementsByTagName("tr")[j+1];
		for(var k=0;k<7;k++){
			var td=tr.getElementsByTagName("td")[k];
			if(currdate.getMonth()!=date.getMonth()){
				td.setAttribute("class","dim");
			}
			else{
				td.setAttribute("class","");
			}
			var tdvalue=document.createTextNode(currdate.getDate());
			td.innerHTML=currdate.getDate();
			currdate.setDate(currdate.getDate()+1);
		}
	}
}


Calendar.prototype.render=function(date){
	var obj=this;
	this.date=date;
	var daysinmonth=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if(isleapyear(date.getFullYear())) daysinmonth[1]=29;
	var newtable=document.createElement("table");
	this.calcontent.appendChild(newtable);
	var caption=document.createElement("caption");
	var captionname=document.createTextNode(Calendar.MONTHS[date.getMonth()]+","+date.getFullYear());
	var prevmonth=document.createElement("a");
	prevmonth.appendChild(document.createTextNode("<"));
	prevmonth.setAttribute("href", "#");
	prevmonth.setAttribute("class","prev");
	prevmonth.onclick=function(){
		console.log(obj.date);
		obj.updateCalendar(-1);
	}
	var nextmonth=document.createElement("a")
	nextmonth.appendChild(document.createTextNode(">"));
	nextmonth.setAttribute("href", "#");
	nextmonth.setAttribute("class","next");
	nextmonth.onclick=function(){
		console.log(obj.date);
		obj.updateCalendar(1);
	}
	caption.appendChild(prevmonth);
	caption.appendChild(captionname);
	caption.appendChild(nextmonth);
	newtable.appendChild(caption);
	var row=document.createElement("tr");
	newtable.appendChild(row);
	for (var i=0;i<Calendar.DAYS.length;i++){
		var th=document.createElement("th");
		var day=document.createTextNode(Calendar.DAYS[i]);
		th.appendChild(day);
		row.appendChild(th);
	}
	var numberrows=6;
	var lastmlastday=new Date(date.getFullYear(),date.getMonth(),0);
	var currdate;
	if(lastmlastday.getDay()==6){
		currdate=new Date(date.getFullYear(),date.getMonth(),1)
	}
	else{
		currdate=new Date(date.getFullYear(),date.getMonth(),0);
		currdate.setDate(lastmlastday.getDate()-lastmlastday.getDay());
	}
	console.log(currdate);
	for(var j=0;j<numberrows;j++){
		var tr=document.createElement("tr");
		for(var k=0;k<7;k++){
			var td=document.createElement("td");
			if(currdate.getMonth()!=date.getMonth()){
				td.setAttribute("class","dim");
			}
			var tdvalue=document.createTextNode(currdate.getDate());
			td.appendChild(tdvalue);
			tr.appendChild(td);
			currdate.setDate(currdate.getDate()+1);
		}
		newtable.appendChild(tr);
	}
}


var calendar1=new Calendar("cal1");
calendar1.render(new Date(Date.now()));
var calendar2=new Calendar("cal2");
calendar2.render(new Date("January 4, 2009"))