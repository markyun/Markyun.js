/**
 * 添加门店
 * 
 * */
var shoplist = "";
// "otms" :id
$.post("qstores.jsp",
function(data) {
	$.each(data,
	function(k, v) {
		if (data == 1 || data == -1) {
		easyDialog.open({
			container: {
				header: '嗨车提醒',
				content: '请先添加门店',
				yesFn: true,
				noFn: true
			}
		});
		// window.location.href="http://shop.haichewang.com/m/company2-add.jsp";
		shoplist += "<li class='boxhead' style='color:red;'>请先添加门店或者修改门店状态为：正常营业</li>";

		} else {
			shoplist += "<li class='boxhead'><a class=\"name_shop\" id='" + v.id + "'>" + v.name + "</a></li>";
 		} 
	});
},
"json");
$(function() {
	$(".name_shop").live("click",
	function() {
		$("#busList").val($(this).html());
		$("#busList").nextAll("input").eq(0).val($(this).attr("id"));
		$("#shoplist").remove();
	});
	$(".shop").click(function() {
		obj = $(this);
		$("#shoplist").remove();
		html = $("<div id=\"shoplist\"><div class=\"shop_t\"><span class=\"scanel\">关闭</span>" + "</div><div class=\"shop_list\"><ul>" + shoplist + "</ul><div class=\"clear\"></div></div></div>");
		html.css({
			position: "absolute",
			left: $(this).offset().left,
			top: $(this).offset().top + $(this).get(0).offsetHeight - 1,
			width: "450px"
		});
		html.find(".scanel").click(function() {
			$("#shoplist").remove();
		});
		html.find(".sselect").click(function() {
			var temp = "";
			temp = temp.substring(0, (temp.length - 1));
			obj.val(temp);
			$("#shoplist").remove();
		});
		html.find(".scanel").click(function() {
			$("#shoplist").remove();
		});
		$("body").append(html);
	});
});
