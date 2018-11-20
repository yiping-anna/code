$('.item').click(function(e){
	$(this).parents().find('.wrapper').addClass('wrapper-active');
	$(this).addClass('active').siblings().removeClass('active');
})

$('.close').click(function(e){
	e.stopPropagation();
	$(this).parents().find('.item').removeClass('active');
	$(this).parents().find('.wrapper-active').removeClass('wrapper-active');

})