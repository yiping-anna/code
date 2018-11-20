//动态添加img标签 50个固定
var flag = true;
function addImg(){
	for(var i=0;i<50;i++){
		src = Math.floor(Math.random()*10);
		console.log(src);
		$('.imgBox').append('<img src="img/'+src+'.jpg" alt="">')
	}
}

addImg();
addEvent();
//随机延迟 缩小 每一张图片在缩小后立即放大+opacity=0
//所有图片都做完了 转一圈
function addEvent() {
    $('.btn').on('click', function() {
        if (!flag) { return }
        var img = $('img');
    	var endNum = 0;
    	var len = $('img').length;
        for (var i = 0; i < len; i++) {
            (function(i) {
                setTimeout(function() {
                    //缩小运动
                    // 图片 1s(缩小的时间) 缩小运动 放大
                    monition(img[i], '1s', function() {
                        $(this).css({
                            'transform': 'scale(0)'
                        })
                    }, function() {
                        monition(this, '1s', function() {
                        	 $(this).css({
                            'transform': 'scale(1)',
                            'opacity':0,
                       		 })

                           },function(){
                           		endNum++;
                           		if(endNum==len){
                           			show();
                           		}
                           		
                           })
                    });
                }, Math.random() * 1000)
            })(i);
        }
    })
}
//
function monition(dom,time,dofun,cbfun){
	$(dom).css('transition',time);
	dofun.call(dom);

	var called =true;
	$(dom).on('transitionend',function(){
		if(called){
			cbfun && cbfun.call(dom);
		}
		called = false;
	})
}

//
function show(){
	var img = $('img');
	var len = $('img').length;
	var allend=0;
	for(var i=0;i<len;i++){
		$(img[i]).css({
			 'transition': '',
			//把图片向后移一段距离作为旋转半径
			'transform':'rotateY(0deg) translateZ(-'+Math.random()*500+'px)',

		});

		(function(i){setTimeout(function(){
				monition(img[i],'2s',function(){
					$(this).css({
						'transform':'rotateY(-360deg) translateZ(0)',
						'opacity':1,
					})
				},function(){
					allend++;
					if(allend==50){
						allend=true;
					}
				})
			},Math.random()*1000)})(i);
	}
}