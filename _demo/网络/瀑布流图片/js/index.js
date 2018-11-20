
var oLi = $("li");
var page = 1;
var flag = false;

function getMni(){
	var index = 0;
	var minH = $(oLi[0]).height();
	for(var i=0;i<oLi.length;i++){
		if($(oLi[i]).height()<minH){
			index = i;
			minH = $(oLi[i]).height();
		}
	}	
	return {
			index:index,
			minH:minH
			};
}
//flag == true 图片正在请求中，不允许继续发送请求
function getData(){
	 if(flag){
	 	return;
	 }
	 flag = true;
	 $(".loading").show();
	$.ajax({
		type:'GET',
		url:"php/getPics.php",
		data:{
			cpage:page
		},
		success:function(data){
			
			var dataList = JSON.parse(data);
			console.log(dataList);
			if(dataList.length<1){
				flag = true;
				$(".loading").text("加载到底了。。。。。")
				return;
			}
			dataList.forEach(function(item,index){
				renderDom(item);
			})
			$(".loading").hide();

			page++;
			flag = false;

		}

	})
}

function renderDom(item){
	var oDiv =$('<div class="item-content"></div>');
	var img = new Image();
	img.src = item.preview;
	var p = $('<p></p>');
	p.text(item.title);
	img.onload = function(){
		oDiv.append(img).append(p);
		var index = getMni().index;
		$(oLi[index]).append(oDiv);
	}
}

getData();
$(window).scroll(function(){
	var scrollHeight = $(window).scrollTop();
	var winH = $(window).height();
	var minH = getMni().minH;
	if(scrollHeight+winH>minH){
		getData();
	}
})
