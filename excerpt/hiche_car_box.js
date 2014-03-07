/*
 *汽车车型选择插件
 * */
(function($) {
    $.fn.extend({
        plug_pop_layer: function(option) {
            var defaults = { 
            width: 500,
            bgcolor: "#FFFFFF",
            opacity: "0.95",
            zIndex: 1000,
            content: ""
        };
        var opts = $.extend(defaults, option); //合并传入的参数   
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
       var boxnav = "<div class=\"boxhead\">" +
//          "<a id='hot' value=\"hot\"class=\"headnav on\">热门品牌</a>" +
       		"<a id='c1' value=\"a,b,c,d,e\"class=\"headnav on\">A B C D E</a>" + "<a id='c2' value=\"f,g,h,i,j\"class=\"headnav\">F G H I J</a>" + "<a id='c3' value=\"k,l,m,n,o\"class=\"headnav\">K L M N O</a>" + "<a id='c4' value=\"p,q,r,s,t\"class=\"headnav\">P Q R S T</a>" + "<a id='c5' value=\"u,v,w,x,y,z\"class=\"headnav\"> U V W X Y Z</a>" + "<!--<em style=\" line-height: 30px;  float: left;\">机场拼音首字母</em>-->" + "<span class=\"close\">&nbsp;关闭</span>" + "<div class=\"clear\">" + "</div>" + "<div class=\"xian\"></div></div>" + "<div class=\"boxError\">错误：获取数据失败，请刷新重试</div>";
       var bigbox = $("<div class=\"bigbox\">" + boxnav + "</div>");
       boxdiv.append(bigbox);
        // 初始化 
        var init = function(evt, opts) {
        	  $("body").find(".headnav").each(function() {
          	    $(".headnav").removeClass("on");
          	});
          	$(".headnav").eq(0).addClass("on");
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
            dealcities("a,b,c,d,e",bigbox); //默认第一次加载热门 
            bindClickNormal(bigbox);
            secEvents($(evt.target),boxdiv);
        };
        // -------------------------------------
        function dealcities(val, node) {
            $.post("querybrands.jsp", {   "condition": val 
            },   function(data) {
                if (val == 'hot') {
                    hotdatas(data, $(node));
                } else {
                
                    normaldatas(data, $(node));
                    removeK(); 
                }
            }, "json");
        } 
        function hotdatas(datas, node) {
        	
        	if (data==1) {
    			carList += "<em>暂时没有此车系</em>";
     		}else { 
        	cityList='';
            var i = 0;
            cityList += "<ul><li class='boxList' ><span id='city'>"; 
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
        	            $("<div id=\"citylist\"></div></span ></ul>").html(cityList).appendTo(node);
     		} 
       	} 
        //添加品牌
        function normaldatas(datas, node) { 	
        	cityList=''; 
            $.each(datas, function(key, v1) { 
            	if (datas==1) {
        			carList += "<em>暂时没有此车系</em>";
         		}else { 
                $.each(v1,  function(key, v1) {
                	 var i = 0;
                    cityList += "<ul class=\"\">" +
                    		"<li class=\"boxL\">" + key + "</li>" +
                    		"<li class='boxList' ><span id='city'>";
                    $.each(v1,  function(k, val) {
                        i++;
                         cityList += "<a class=\"box_a cityname\" title=" + val.name + " reid='" + val.id + "'><em>" + val.name + "</em></a>";
                        if (i % 5 === 0 && i != 0) {  
                            cityList += "</span>" + 
                            "<div  class=\"boxlist2\">" +
	//                            "<ul>" +
	//                            "<li>" +
                            "<div class=\"boxlist3\" >" +
                            "</div>" +
	//                            "</li>" +
	//                            "</ul>" +  
                            "<div class=\"clear\">" + "</div>" +
                            "</li><li class=\"clear\"></li>" +
                            "</ul>" +
                            "<ul>" +
                            "<li class=\"boxL\">&nbsp;&nbsp;</li>" +
                            "<li class='boxList' ><span>";
                        }
                    });
                    cityList += "</span><div class=\"boxlist2\">" +
	//                    		"<ul>" +
	//                    		"<li>" +
                    		"<div class=\"boxlist3\" >" + 
                    		"</div>" +
 	//	                    		"</li></ul>" +
                    		"<div class=\"clear\"></div>" +
                    		"</li>" +
                    		"<li class=\"clear\"></li>" +
                    		"</ul> ";
                	$("#citylist").remove();
                }); 
                $(node).append($("<div id=\"citylist\"></div>").html(cityList));
         		}
            }); 
        	}
        //添加车系
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
            $.post("querymodels.jsp", {
                "bid": $(node).attr("reid")
            },
            function(data) { 
            	var i=0;  
            	var carList =''; 
            	carList +=" <div class='both'>"; 
            	if (data==1) {
        			carList += "<em>此车系下暂时没有具体车型</em>";
         		}else{
         		      $.each(data,  function(key, val) {  
          	        	  i++;  
         	              carList += "<a reid='" + val.id + "' value='" + val.id + "' class=\"carName\" title=" + val.name + "><em>" + val.name + "</em></a>";
         	               if (i %5=== 0 && i != 0) {
          	             carList += "</div>" + 
         	                "<div class='Models-c' style='display: block;'>" + 
         	                "<span> </span><div class=\"clear\"></div>" +
         	                "</div><div class='both'>"; 
         	               }   
         	        });
         		} 
                carList +="</div><div class='Models-c' style='display: block;'>" + 
                        "<span> </span><div class=\"clear\"></div>" +
                        "</div>";   
                port.removeAttr("display");
                port.append(carList);
                removeK();
            },
            "json"); 
        } 
        //添加具体车型
        function addcarN(node) { 
        	 $(".carName").attr("class", "carName");
        	 $(node).addClass("on-list"); 
        	 $(".Models-c").find("span:first").empty();  
        	 var parnode=$(node).parents("div").nextAll("div:first");
             var port = parnode.find("span:first");
        	$(".Models-c").css("display", "block");
         	$.post("querymodelnames.jsp", {
        		"bid": $(node).attr("reid")
        	}, function(data) {  
         		var carList =''; 
        		carList +=" <span>"; 
        		if (data==1) {
        			carList += "<em>此车系下暂时没有具体车型</em>";
         		}
        		else{
        			$.each(data,  function(key, val) {
        				carList += "<a reid=\"" + val.id + "\" value=\"" + val.id + "\" class=\"cName\" xs="+ val.xs +"  ctype="+ val.ctype +"  title=" + val.zh_name + "><em>" + val.zh_name + "</em></a>";
        			});
        		} 
        		carList +=" <div class='clear'></div></span>";   
        		port.removeAttr("display");
        		port.append(carList);
        	}, "json");
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
        	});
        	$(_node).delegate(".carName", "click", function(event) {
          		addcarN($(this)); 
          		chexi=$(this).attr("title");
          		chexinum=$(this).attr("reid");
        	});
        	$(_node).delegate(".cName", "click", function(event) {
        		$(_this).val(pingpai + "," + chexi+","+$(this).find("em").html());
          		$(_this).nextAll("input").eq(0).val(shiid);
        		$(_this).nextAll("input").eq(1).val(chexinum);
        		$(_this).nextAll("input").eq(2).val($(this).attr("reid"));
        		$(_this).nextAll("input").eq(3).val($(this).attr("ctype")); 
        		$(_this).nextAll("input").eq(4).val($(this).attr("xs")); 
        		if ($("#chexi").val()!="") {
        			getcar($(this).attr("reid"));//获取车型默认图片
        		} 
        		$(_node).remove();  
        	});
         }
         //删除下面多的一行空行
        function removeK(){   
        		$(".bigbox").find(".boxL").each(function(){
         			if ($.trim($(this).text())=="K") {
         				$(this).parents("ul").nextAll("ul:first").remove();
         			}
         			if ($.trim($(this).text())=="W") {
         				$(this).css({
         				"padding-right":"3px"
         				}); 
        			}
        		}); 
           		$(".both").each(function(){
          			if ($(this).html()=="") {
          				$(this).nextAll(".Models-c").remove();
          				$(this).remove();
    				}
          		}) ;
        }   
        //获取默认车型图片
        function getcar(obj){
        	var i=0;   
        	$.post("querymodelimgs.jsp",{"bid": obj},function(data){ 
        		if (data==1) {  
                	 $(".imagelist").each(function(){
                		 	$(".tips").attr("style","display:inline-block;color: red;");
                		 $(this).find("img").attr("src","http://style.haichewang.com/201308/shop/images/no_pic.jpg").attr("title","默认图片"); 
                	 });
				} else {
        		 	$(".tips").attr("style","display:none;color: red;"); 
	           		 $.each(data,function(k,val){  
	                    	$(".imagelist").find("img").eq(i).attr("src",val.url).attr("title",val.dsc); 
	                 	 i++;
	           		});  
				} 
        	},"json");
        }
        // ------------------------------------
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
