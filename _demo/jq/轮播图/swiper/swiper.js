var imgWidth = $('.wrapper ul li').width();
var nowIndex = 0;
var lock = false;
var timer = null;
// 人看到的图片个数
var imgNum = $('.wrapper ul li').length - 1;
// 初始化 执行函数
function init() {
    bindEvent();
    autoMove();
    changeIndex();
}

// 所有事件的集合  添加事件
function bindEvent() {
    $('.wrapper').hover(function () {
        $('.wrapper .btn').show();
        clearInterval(timer);
    }, function () {
        $('.wrapper .btn').hide();
        autoMove();
    });
    $('.wrapper').on('click', '.btn', function (e) {
        // console.log(e.target);
        if ($(this).hasClass('left-btn')) {
            move('prev');
        } else if ($(this).hasClass('right-btn')) {
            move('next');
        }
    });
    $('.wrapper > .pointer').on('click', 'div', function (e) {
        console.log($(this).index())
        move($(this).index());
    })
}
// 运动函数  dir 运动方向  prev 向前一张图片  next向后一张图片
function move(dir) {
    if (lock) {
        return false;
    }
    lock = true;
    if (dir == 'prev') {
        if (nowIndex == 0) {
            nowIndex = imgNum;
            $('.wrapper > ul').css('left', -nowIndex * imgWidth);
        }
        nowIndex--;
        $('.wrapper ul').animate({
            'left':-nowIndex * imgWidth
        }, 1000, function () {
            changeIndex();
            lock = false;
        });
    } else if (dir == 'next') {
        if (nowIndex == imgNum) {
            nowIndex = 0;
            $('.wrapper > ul').css('left', -nowIndex * imgWidth);
        }
        nowIndex++;
        $('.wrapper ul').animate({
            'left':-nowIndex * imgWidth
        }, 1000, function () {
            changeIndex();
            lock = false;
        });
    } else if (typeof dir == 'number') {
        // 把当前的图片索引值改变到了新的位置 接下来展示图片的索引值
        nowIndex = dir;
        $('.wrapper ul').animate({
            'left':-nowIndex * imgWidth
        }, 1000, function () {
            changeIndex();
            lock = false;
        });
    }
}
// 小红点展示
function changeIndex() {
    $('.wrapper > .pointer > div').css('background', '#fff');
    if (nowIndex == imgNum) {
        $('.wrapper > .pointer > div').eq(0).css('background', 'red');
    } else {
        $('.wrapper > .pointer > div').eq(nowIndex).css('background', 'red');
    }
}
function autoMove() {
    timer = setInterval(function () {
        move('next');
    }, 2000)
}
init()




// $('.wrapper').swiper({
//     images: ['./img/dog1.jpg', './img/dog1.jpg', './img/dog1.jpg'],
//     timer: 2000,
//     direction: 1/-1,
//     width: 400,
// })