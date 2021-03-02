$(function () {
    $.cookie("jumpurl", window.location.href, 30);
    $("#headlinetitle").html("文章详情");

    $("#foot_line_btn_2").addClass("on");
});

$(function () {
    var shareId = window.location.search.substring(1);

    $.ajax({
        url: "http://119.23.29.186:8096/visitor/getInfo?shareId=" + shareId,
        type: "GET",
        success: function (result) {
            if (result.code == 0) {
                $(".articleinfo-title").append($("<span>" + result.data.articleTitle + "</span>"));
                $(".articleinfo-content").append($("<span>" + result.data.articleContent +
                    "</span>"));
                $(".articleinfo-date").append($("<span>" + result.data.createDate + "</span>"));
            } else if (result.code == 2) {
                window.location.href = "404.html";
            }
        }
    });
});
