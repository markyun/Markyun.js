/*
 * 机场火车站插件
 * @ time： 2013年9月5日
 * */
(function($) { 
     $.fn.extend({
    	 airport_Rail_Station_box: function(option) {
            var defaults = {
            width: 500,
            bgcolor: "#FFFFFF",
            opacity: "0.97",
            zIndex: 1000,
            content: ""
    };
    var opts = $.extend(defaults, option); //合并参数   
    var boxdiv = $("<div class='box'></div>").css({
        "position": "absolute",
        "align": "center",
        "background": opts.bgcolor,
        "filter": "progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=95,finishOpacity=100)",
        "opacity": opts.opacity,
        "width" : opts.width,
        "z-index": opts.zIndex,
        "display": "block"
    });
   var air_station="<div class=\"air_station\"> <a class=\"heads hon\" value=\"airport\" >机场</a><a class=\"heads\" value=\"station\" >火车站</a> <div class=\"clear\"></div></div> ";
   var boxnav = "<div class=\"boxhead\"><div class='xian'></div><a id='c1' value=\"a,b,c,d,e\"class=\"headnav on \">A B C D E</a>" + "<a id='c2' value=\"f,g,h,i,j\"class=\"headnav\">F G H I J</a>" + "<a id='c3' value=\"k,l,m,n,o\"class=\"headnav\">K L M N O</a>" + "<a id='c4' value=\"p,q,r,s,t\"class=\"headnav\">P Q R S T</a>" + "<a id='c5' value=\"u,v,w,x,y,z\"class=\"headnav\"> U V W X Y Z</a>" + "<!--<em style=\" line-height: 30px;  float: left;\">机场拼音首字母</em>-->" + "<span class=\"close\">&nbsp;关闭</span>" + "<div class=\"clear\">" + "</div>" + "<div class=\"xian\"></div></div>" + "<div class=\"boxError\">错误：获取数据失败，请刷新重试</div>";
   var bigbox = $("<div class=\"bigbox\">" +air_station+ boxnav + "</div>");
   boxdiv.append(bigbox);
    // 初始化
    var init = function(evt, opts) {
        var offset = $(evt.target).offset(); 
        boxdiv.css({
            top: offset.top + 5 + $(evt.target).height() + "px",
            left: offset.left
        });
        boxdiv.click(function(event){
        	event.stopPropagation();
        });
        $(document).click(function(event) {
            $("body").find(".box").remove();
            event.stopPropagation();
        });
        $(".close").click(function(){
        	$("body").find(".box").remove();
        });
       
        airport_station();
        dealcities("a,b,c,d,e",bigbox);
            bindClickNormal(bigbox);
            secEvents($(evt.target),boxdiv);
        };
 // ----------------------------------
     var url1="";
     var url2="";
    //根据拼命首字母获取城市
    function dealcities(val, node) {
     	var airport=$(".hon").attr("value");
     	if (airport=="airport") {
     	  url1="trainstationcities.jsp";
    	} else { 
    	  url1="airstationcities.jsp"; 
    	}  
        $.post(url1, {  "condition": val },function(data) {
//            if (val == 'hot') {
//                hotdatas(data, node);
//             } else {
                normaldatas(data, node);
//            }
        }, "json");
    } 
    //热门
    function hotdatas(datas, node) { 
    var	cityList='';
        var i = 0;
        cityList += "<ul><li class='boxList' ><span>"; 
    	   $.each(datas, function(k, val) {
    	                i++;
    	                cityList += "<a class=\"box_a cityname\" title=" + val.name + " reid='" + val.id + "'><em>" + val.name + "</em></a>";
    	                if (i % 5 === 0 && i != 0) {
    	                    cityList += "</span>" +
    	                    		"<div  class=\"boxlist2\">" +
    	                    		"<ul><li><div class=\"boxlist3\" ></li></ul>" +
    	                    		"</div>" +
    	                    		"<div class=\"clear\">" + "</div></li><li class=\"clear\"> </li>" +
    	                    		"</ul><ul><li class='boxList'><span>";
    	                }
    	            });
    	            cityList += "</span><div  class=\"boxlist2\"><ul><li><div class=\"boxlist3\" ></li></ul></div><div class=\"clear\">" +
    	            		"</div></li><li class=\"clear\"></li></ul> ";
    	        	$("#citylist").remove();
    	            $("<div id=\"citylist\"></div>").html(cityList).appendTo(node);
    } 
    //添加2级
    function normaldatas(datas, node) {
    var	cityList= "<ul class=\"\">"; 
     	if (datas==1||datas==-1) {
     			$(".boxError").attr("style","display:block");
    	}else {
		 $.each(datas, function(key, v1) { 
	                $.each(v1,  function(key, v1) {
	                	 var i = 0;
	                    cityList +="<li class=\"boxL\">" + key + "</li>" +
	                    		   "<li class='boxList' ><span>";
	                    $.each(v1,
	                    function(k, val) {
	                        i++;
	                         cityList += "<a class=\"box_a cityname\" title=" + val.name + " reid='" + val.id + "'><em>" + val.name + "</em></a>";
	                        if (i % 5 === 0 && i != 0) {  
	                            cityList += "</span>" + 
	                            "<div  class=\"boxlist2\">" + 
	                            "<div class=\"boxlist3\" >" +
	                            "</div>" + 
	                            "<div class=\"clear\">" + "</div>" +
	                            "</li><li class=\"clear\"></li>" +
	                            "</ul>" +
	                            "<ul>" +
	                            "<li class=\"boxL\">&nbsp;&nbsp;</li>" +
	                            "<li class='boxList' ><span>";
	                        }
	                    });
	                    cityList += "</span><div class=\"boxlist2\">" + 
	                    		"<div class=\"boxlist3\" >" + 
	                    		"</div>" + 
	                    		"<div class=\"clear\"></div>" +
	                    		"</li>" +
	                    		"<li class=\"clear\"></li>" +
	                    		"</ul> ";
	                	$("#citylist").remove();
	                }); 
	            });
		} 
        $("<div id=\"citylist\"></div>").html(cityList).appendTo(node);
        removeK();   
    }
    //添加 3级
    function addquyu(node) {
        $(".box_a").attr("class", "box_a cityname");
        $(node).attr("class", "box_a cityname boxon");
        var _parent = $(node).parents("span:first").nextAll("div:first");
        var port = _parent.find("div:first");
        $("body").find(".boxlist2").each(function() {
            $(".boxlist2").css("display", "none");
        }); 
        _parent.css("display", "block");
        port.empty(); 
        airport=$(".hon").attr("value");
        if (airport=="airport") { 
    		  url2="trainstation.jsp";
    	} 
    	if (airport=="station") {
     		url2="airstation.jsp";
    	}  
        $.post(url2, {
            "condition": $(node).attr("reid")
        }, 
        function(data) { 
        	var i=0;  
        	var carList =''; 
        	carList +=" <div class='both'>"; 
            $.each(data,  function(key, val) {
            	  i++;  
                 carList += "<a reid='" + val.id + "' value='" + val.id + "' class=\"carName\" title=" + val.name + "><em>" + val.name + "</em></a>";
                   if (i %5=== 0 && i != 0) {
                 /*	carList += "</div>" + 
                    "<div class='Models-c' style='display: block;'>" + 
                    "<span> </span><div class=\"clear\"></div>" +
                    "</div><div class='both'>";*/
                   }   
            });
            carList +="</div><div class='Models-c' style='display: block;'>" + 
                    "<span> </span><div class=\"clear\"></div>" +
                    "</div>";   
            port.removeAttr("display");
            port.append(carList);
        }, "json");
        removeK(); 
    } 
    //添加4级
    function addcarN(node) { 
    	 $(".carName").attr("class", "carName");
    	 $(node).addClass("on-list"); 
    	 $(".Models-c").find("span:first").empty();  
    	 var parnode=$(node).parents("div").nextAll("div:first");
         var port = parnode.find("span:first");
    	$(".Models-c").css("display", "block");
     	$.post("querymodelnames.jsp", {
    		"bid": $(node).attr("reid")
    	},
    	function(data) { 
      		var carList =''; 
    		carList +=" <span>"; 
    		$.each(data,  function(key, val) {
     			carList += "<a reid=\"" + val.id + "\" value=\"" + val.id + "\" class=\"cName\" title=" + val.zh_name + "><em>" + val.zh_name + "</em></a>";
    		});
    		carList +=" <div class='clear'></div></span>";   
    		port.removeAttr("display");
    		port.append(carList);;
    	},"json");
    }
    function bindClickNormal(_node) {
    	$(_node).delegate(".headnav", "click", function() {
    		$(".headnav").removeClass("on");
    		$(this).addClass("on");
    		dealcities($(this).attr('value'), _node);
    	});
    }
    function secEvents(_this,_node) {
    	$(_node).delegate(".box_a", "click", function() {
    		pingpai = $(this).attr("title");
    		shiid = $(this).attr("reid");
    		addquyu($(this));
    		removeK();
    	});
    	$(_node).delegate(".carName", "click", function(event) {
       		chexi=$(this).attr("title");
      		chexinum=$(this).attr("reid");
      		$(_this).val(pingpai + "," + chexi);
//           $(_this).nextAll("input").eq(0).val(shiid);
    		$(_this).nextAll("input").eq(0).val(chexinum);
    		$(_node).remove();  
     	}); 
     } 
    function airport_station(){
    	$(".air_station").delegate("a","click",function(){
     		 $(".heads").attr("class","heads");
    		 $(this).addClass("hon");
    		 if ($(this).attr("value")=="station") {
    				url1="airstationcities.jsp";
    				url2="trainstation.jsp"; 
    				dealcities("a,b,c,d,e",$(".bigbox"));
     		} else  {
    			url1="trainstationcities.jsp";
    			url2="airstation.jsp";
    		  dealcities("a,b,c,d,e",$(".bigbox"));
    		} 
    	});
    };
     //删除下面多的一行空行
    function removeK(){   
    		$(".bigbox").find(".boxL").each(function(){
     			if ($.trim($(this).text())=="") { 
      				if ($(this).next(".boxList").find("span").html()=="") {
     					$(this).parents("ul").remove();
     				}
     			} 
     			if ($.trim($(this).text())=="W") {
     				$(this).css({
     				"padding-right":"3px"
     				}); 
    			}
    		}); 
      	   $(document).find(".both").each(function(){
       			if ($(this).text()=="") {
       				$(this).nextAll(".Models-c").remove();
      				$(this).remove();
				}
      		}) ; 
    }  
//----------------------------------
    return this.each(function() {
        var $this = $(this);
        $this.click(function(evt) {
        	evt.stopPropagation();
        	 x=$("body").find(".box").length;
        	 if(x>0){
        		 $("body").find(".box").remove();
        	 }
        	boxdiv.css("display","block");
            	$this.after(boxdiv);
                init(evt, opts);
                });
            });
        }
    });
})(jQuery);
