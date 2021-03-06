/**
 * Created by danny on 9/6/14.
 */
$(document).ready(function () {
    var _isClick = false;
    // 记录原来的 z-index 的值
    var _origin_z_index;
    // 记录原本的 高度和宽度 还有位置
    var _width, _height, _top, _left;
    // 记录原来的旋转的角度
    var _rorate;
    // 标签 和 fadeBG 的限制
    var _limit = 500;

    // 存放 父类的元素 也就是整个标签
    var _label_parent;

    // 为了防止在 拖动时 也会打开
    $("#labelList")
        .on("mousedown", ".label_main", function () {
            _isClick = true;
        })
        // 绑定 click
        .on("click", ".label_main", function () {


            // 创建 父类元素
            _label_parent = $(this).offsetParent();
            // 判断的时候 判断是不是 z-index 在下面
            if (_isClick && (_label_parent.css("z-index") < _limit)) {

                /**
                 * 添加一个标志 class
                 * // 主要是 在 label chagne 中使用
                 *
                 */
                _label_parent.addClass("labelBig");

                /**
                 * 保存
                 */
                    // 保留原来的 z-index
                _origin_z_index = _label_parent.css("z-index");
                // 他的 父类  标签 直接提高等级
                //  然后 由这个标签判断 是不是 需要进行 点击放大
                // z-index = 1000
                _label_parent.css("z-index", _limit * 2);
                // 保存 width 和 height
                _width = _label_parent.width();
                _height = _label_parent.height();
                _top = _label_parent.css("top");
                _left = _label_parent.css("left");
                // 保存 旋转的角度
                _rorate = _label_parent.css("transform");


                /**
                 * 设置
                 */
                $(this)
                    .css("overflow", "auto")
                    // 滚动条
                    .css("word-wrap", "break-word");

                _label_parent
                    // 设置 width 和 height
                    .width(_width * 2.5)
                    .height(_height * 3)
                    .css("top", "80px")
                    .css("left", 400 - $(".bg_show").offset().left)
                    // 设置旋转的角度
                    .css("transform", "rotate(0deg)");
                _label_parent
                    //设置子类 .label_main 可编辑
                    .children(".label_main").attr("contentEditAble", "true");
                _label_parent
                    // 显示按钮 和 取消 按钮
                    .find(".save_button").css("display", "inline");
                _label_parent
                    .find(".rotate_button").css("display", "none");

                // 设置背景颜色
                // z-index   --------> 500
                // 如果 多余 500 张的话, 就改这个地方的值
                $("#fadeBG").css("z-index", "500")
                    .css("opacity", "0.7");

                // 添加保存按钮

            }
            // 初始化 下一次的值
            _isClick = true;
        });

    // 如果移动的话 就更改这里的值  这样 click 就不能运行了
    $(document).mousemove(function (e) {
        if (_isClick) {
            _bg_move = false;
        }
        _isClick = false;
    });

    /// 别忘了用 on
    // 当点击时 就会保存
    $("#labelList").on("click", ".save_button", function () {

        // 改回原来图层的  z-index 和 背景颜色
        $("#fadeBG").css("z-index", "-1")
            .css("opacity", "0");
        // 改回原来的位置
        _label_parent.width(_width)
            .height(_height)
            .css("top", _top)
            .css("left", _left)
            .css("z-index", _origin_z_index)
            // 改回原来的角度
            .css("transform", _rorate)
            // 删除 class  标志
            .removeClass("labelBig")
            // 不可改写文件
            .children(".label_main").attr("contentEditAble", null);
        _label_parent
            // 滚动条
            .children(".label_main")
            // 滚动条
            .css("word-wrap", null)
            .css("overflow", "hidden");
        // 按钮的更改
        _label_parent
            // 显示按钮 和 取消 按钮
            .find(".save_button").css("display", "none");
        _label_parent
            .find(".rotate_button").css("display", "inline");
    });

});