function bindEvent(){
	$('.sendBtn').on('click',function(){
		var text  = '';
		text = $('.input').val();
		randdom(text,'mine');
		getData(text);
	});
	$('.input').on('keydown',function(e){
		if(e.keyCode === 13){
			$('.sendBtn').trigger('click');
		}
	})
}

function randdom(textContent,type){
	var dom ='';
	if(type=="mine"){
		dom = $('<div class="talk-box mine-box">\
                    <div class="talk-textBox talk-mine">\
                        <span class="talk-text">' + textContent + '</span>\
                        <div class="triger trigerRight"></div>\
                    </div>\
                    <img src="img/mine.jpg" class="logo minelogo" alt="">\
					</div>')
	}else{
		dom = $(' <div class="talk-box robot-box">\
                        <img src="img/robot.jpg" class="logo robotlogo" alt="">\
                        <div class="talk-textBox talk-robot">\
                            <div class="triger trigerLeft"></div>\
                            <span class="talk-text">'+textContent+'</span>\
                        </div>\
                    </div>')
	}
	console.log(dom);
	$('.talk-content').append(dom);
	$('.input').val('');
	justWindow();
}


function getData(text){
	$.ajax({
		type:'GET',
		dataType:'json',
		url:'http://data.duyiedu.com/api/chat',
		data:{
			text:text,
		},
		success:function(data){
			randdom(data.text,'robot')
		}
	})
}


function justWindow(){

	if($('.talk-content').height()>windowHeight-90){
		 var h = $(document).height()-$(window).height();
         $(document).scrollTop(h); 
	}
}


var windowHeight = $(window).height();
bindEvent();