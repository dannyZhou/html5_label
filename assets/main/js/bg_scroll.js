// bg scroll
$(document).ready(function () {
    var _move = false; //移动标记
    var _x, _y; //鼠标离控件左上角的相对位置
    $(".bg_show").mousedown(function (e) {
        _move = true;
        _x = e.pageX - parseInt($(".bg_show").css("left"));
     //   _y = e.pageY - parseInt($(".bg_show").css("top"));
    });
    $(document).mousemove(function (e) {
        if (_move) {
            var x = e.pageX - _x; //移动时根据鼠标位置计算控件左上角的绝对位置
            //var y = e.pageY - _y;
            if(x>0 || x<=-window.innerWidth){
                return;
            }
            $(".bg_show").css({ /*top: y, */ left: x }); //控件新位置
        }
    }).mouseup(function () {
        _move = false;
    });
});