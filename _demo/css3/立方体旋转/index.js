bindEvent();
function bindEvent(){
	var box = document.getElementsByClassName('box');
	for(var i=0;i<box.length;i++){
		box[i].onmouseenter = function(e){
			console.log(e);
			addClass(this,e,'in');
		}
		box[i].onmouseleave = function(e){
			addClass(this,e,'out');
		}
	}
}
function getDirection(dom,e){
	var x = e.offsetX - dom.offsetWidth/2;
	 var y = e.offsetY - dom.offsetHeight / 2;
	return (Math.round(((Math.atan2(y,x) * (180/Math.PI)) + 180)/90)+3)%4;
	
}

function addClass(dom,e,state){
	var d= getDirection(dom,e);
		 console.log(d);
	var direction = '';
	switch(d){
		case 0:{
			direction='-top';
			break;
		}
		case 1:{
			direction='-right';
			break;
		}
		case 2:{
			direction='-bottom';
			break;
		}
		case 3:{
			direction='-left';
			break;
		}
		default:
			break;
	}
	dom.className ='box '+ state+direction;
}



