/**
 * 背景的 移动
 */
$(document).ready(function () {
    // bg scroll
    var _bg_move = false; //移动标记
    var _move_x, _move_y; //鼠标离控件左上角的相对位置
    /*
     如果是 label 的话 我们就直接跳过 上面的
     */
    var _isLabel = false;
    $(".bg_show").mousedown(function (e) {
        if (_isLabel) {
            _bg_move = false;
            return;
        } else {
            _bg_move = true;
        }
        _move_x = e.pageX - parseInt($(".bg_show").css("left"));
        //   _move_y = e.pageY - parseInt($(".bg_show").css("top"));
    });
    $(document).mousemove(function (e) {
        if (_bg_move) {
            var x = e.pageX - _move_x; //移动时根据鼠标位置计算控件左上角的绝对位置
            //var y = e.pageY - _move_y;
            if (x > 0 || x <= -window.innerWidth) {
                return;
            }
            $(".bg_show").css({ /*top: y, */ left: x }); //控件新位置
        }
    }).mouseup(function () {
        _bg_move = false;
    });


    /*
     * 下面是 图标的移动
     */
    var _label_x, _label_y;
    var _label_move = false;
    // 保存 父类 就是整个标签
    var _parent_label;

// 当在 用 标题的时候， 我们不移动
    $("#bgShow")
        .on("mousedown", ".label_button_list", function (e) {
            // 背景 不 移动
            _bg_move = false;

            // 


        })

        //这一行是 为了动态绑定  具体 查看 on 方法
        .on("mousedown", ".label_main", function (e) {
            _isLabel = true;
            _label_move = true;
            _bg_move = false;
            // $(this) 选择的是 点击的那个
            // 这里只让  label_main 来进行移动 ， 这样的话， 我们就 直接
            // 改变 父元素的 class 添加 mouseMove
            _parent_label = $(this).offsetParent();
            _parent_label.addClass("mouseMove");
            _label_x = e.pageX - parseInt(_parent_label.css("left"));
            _label_y = e.pageY - parseInt(_parent_label.css("top"));
        });

    $(document).mousemove(function (e) {
        // 500 是 一个 zindex 的限制 如果说再上面的话, 说明现在 在放大的那个阶段 不应该 更改位置,
        // 应该可以白编辑
        if (_label_move && _parent_label.css("z-index") < 500) {

            _bg_move = false;
            var x = e.pageX - _label_x; //移动时根据鼠标位置计算控件左上角的绝对位置
            var y = e.pageY - _label_y;
            $(".mouseMove")
                //控件新位置
                .css({ top: y, left: x })
                // 去除数据 不让他 平滑
                .removeClass("label_transform");
        }
    }).mouseup(function () {
        _isLabel = false;
        _label_move = false;
        $(".mouseMove")
            .addClass("label_transform")
            //松开鼠标后停止移动
            .removeClass("mouseMove");
    });

});
