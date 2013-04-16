/* 
	 JSName: 收集常用的js操作小技巧
	 Description:   我常用的js操作技巧。来源于网络中的技术文章和自己工作需要写到的。不断更新中,是帮助我快速和高效开发前端效率的利器。
	 Author: markyun
	 Email：markyun0802@gmail.com  
	 Author URL: http://weibo.com/920802999  github：https://github.com/markyun
	 Version: 1.0
	 UpdateTime:2013-4-15
*/
/*JS是“由对象创建对象，由对象定义对象”，而不是“由类创建对象，由类型定义对象”。*/

//0、JavaScript：window.onload操作
	{
	 //SyntaxHighlighter: （原名：dp.SyntaxHighlighter）是一套在浏览器上对各种代码进行语法着色的独立 JavaScript库，增加js在HTMl上显示效果。
		syntaxhighlighter brush: js
	}

	function first() {
		alert('first');
	}

	function second() {
		alert('second');
	}
	window.onload = first;
	window.onload = second;
	//只会执行第二个window.onload；不过可以通过以下方法来进行改进： 
	window.onload = function(){
	 first(); 
	 second();
	 } 

// 1、JQuery： $(document).ready()

$(document).ready() {
	function first() {
		alert('first');
	}

	function second() {
		alert('second');
	}
	$(document).ready(function() {
		first();
	}
	$(document).ready(function() {
		second();
	} //两条均会执行 } {/syntaxhighlighter}



//2、获取ID

	//JavaScript：

	document.getElementById('idName')
	//JQuery：

	$('#idName')
//3、获取Class

	//JavaScript：

	//JavaScript没有默认的获取class的方法

	//JQuery：

	$('.className')
//4、获取TagName

	//JavaScript：

	document.getElementsByTagName('tagName')
	//JQuery：

	$('tagName')
//5、创建对象并加入文档中

	//JavaScript：

	var para = document.createElement('p'); //创建一个p元素 document.body.appendElement(para); //将p元素追加为body的lastchild子节点，如果想将新创建的p元素插入到已存在的某个元素之前，可以使用insertBefore()方法 {/syntaxhighlighter}

	//JQuery： 
	//JQuery提供了4种将新元素插入到已有元素（内部）之前或者之后的方法：append()、appendTo()、prepend()、prependTo()。
	//格式：$( html );

	//html代码：

	//html World!


	$('p').append('Hello!'); //输出：

	//World!Hello!

	$('Hello!').appendTo('p'); //输出：同上 $('p').prepend('Hello!'); //输出：
	//Hello!World!

	$('Hello!').prependTo('p'); //输出：同上 {/syntaxhighlighter}
//6、插入新元素

	//JavaScript： 
	insertBefore();
	parentElement.insertBefore(newElement, targetElement)
	//将一个img元素插入一个段落之前。

	//html代码：

	/*html  
   这是一段文字*/
	/
	//JavaScript代码：

	var imgs = document.getElementById('imgs');
	var para = document.getElementsByTag('p'); para.parenetNode.insertBefore(imgs, para);
	//JQuery：

	//JQuery提供了4种将新元素插入到已有元素（外部）之前或者之后的方法：after()、insertAfter()、before()、insertBefore()。
	//格式：$( html );

	//html代码：

	//html}World!

	//JQuery代码

	$('p').after('Hello!'); //输出：World!

	Hello!$('Hello!').insertAfter('p'); //输出：同上 $('p').before('Hello!'); //输出：Hello!


	$('Hello!').insertBefore('p'); //输出：同上 
//7、复制节点

	//JavaScript： 
	reference = node.cloneNode(deep)
	//这个方法只有一个布尔型的参数，它的可取值只能是true或者false。该参数决定是否把被复制节点的子节点也一同复制到新建节点里去。
	//JQuery： 
	.clone() //复制节点后，被复制的新元素并不具有任何行为
	.clone(true) //复制节点内容及其绑定的事件
	//备注：该方法通常与appendTo()、prependTo()等方法结合使用。
//8、删除节点

	//JavaScript：

	reference = element.removeChild(node)
	//removeChild()方法将一个给定元素里删除一个子节点

	//JQuery：
	remove();
	//remove()方法作用就是从DOM中删除所有匹配的元素，remove()方法还可以与其他的过滤选择器结合使用，非常方便。
	//eg，将ul li下的title不是"Hello"的li移除：
	$('ul li').remove(li[title != 'Hello']);
	empty();
	//empty()方法作用是清空节点。
//9、包裹节点

	//JavaScript暂无

	//JQuery：

	wrap() //将匹配元素用其他元素的结构化标记单独包裹起来
	wrapAll() //将所有匹配的元素用一个元素包裹起来
	wrapInner() //将匹配元素的子内容用其他结构化的标记包裹起来
	//10、属性操作：设置属性节点、查找属性节点

	//JavaScript：
	document.getElementsByTagName('tagName')
	//JQuery：
	//JQuery中设置和查找属性节点都是：attr() 。
	$('p').attr('title');
	//获取p元素的title属性； $('p').attr('title','My title'); //设置p元素的title属性 $('p').attr('title':'My title','class':'myClass'); //当需要添加多个属性时，可以用"名：值"对的形式，中间用逗号隔开。 {/syntaxhighlighter}


//11、替换节点
	//JavaScript：
	reference = element.replaceChild(newChild, oldChild)
	//该方法是将一个给定父元素里的一个子节点替换为另外一个节点。

	//JQuery：
	replaceWith();
	replaceAll();
	//html}hello想替换为： html}Hi

	//JQuery代码：
	$('p').replaceWith('Hi');
	//或者： 
	$('Hi').replaceAll('p');



//12、CSS-DOM操作

	//JavaScript：
	element.style.property
	/*
	CSS-DOM能够读取和设置style对象的属性，其不足之处是无法通过它来提取外部CSS设置的样式信息，而JQuery的.css()方法是可以的。
	注意点：CSS中的如"font-size"这样有"-"的，要使用首字母小写的驼峰式表示，如fontSize。*/
	//JQuery： 
	$(selector).css()
	/*.css()方法获取元素的样式属性
	此外，JQuery还提供了height()和width()分别用来获取元素的高度和宽度（均不带单位），而css(height)、css(width)返回高宽，且带单位。/**/

//13、javascript:;与javascript:void(0)	
	
	/*
	href=”#”,包含了一个位置信息.默认的锚是#top,也就是网页的上端，当连续快速点击此链接时会导致浏览器巨慢甚至崩溃
	javascript中void是一个操作符，该操作符指定要计算一个表达式但是不返回值。
	javascript:;好些，javascript:void(0);据说某些情况下有浏览器兼容bug。
	*/

//14、 页面加载完成之后延迟2秒执行某个js
	 window.onload=show; 

	 function show() {
	 setTimeout("Js().start()",2000);
	 }


//15、encodeURIComponent内容显示完全显示内容

	/*最多使用的应为encodeURIComponent，它是将中文、韩文等特殊字符转换成utf-8格式的url编码，所以如果给后台传递参数需要使用encodeURIComponent时需要后台解码对utf-8支持*/
	//（form中的编码方式和当前页面编码方式相同）
	//escape不编码字符有69个：*，+，-，.，/，@，_，0-9，a-z，A-Z
	//encodeURI不编码字符有82个：!，#，$，&，'，(，)，*，+，,，-，.，/，:，;，=，?，@，_，~，0-9，a-z，A-Z
	//encodeURIComponent不编码字符有71个：!， '，(，)，*，-，.，_，~，0-9，a-z，A-Z	

 
//16、.Jquery遇到动态生成的DOM对象无法绑定事件的问题，使用live解决了问题  
	 $("#aaa").append($("<divid='ccc'>cccc</div>"));
	 $("#ccc").live("click",function()
	   {   
	    alert("ccc");    
	  }	

//17、最简方法,js得到标准时间格式 
	function getDatetime(){
	    var dt = new Date();
	    return (dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+' '+dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds()).replace(/([\-\: ])(\d{1})(?!\d)/g,'$10$2');
	}
	// 计算系统当前是星期几var str = "今天是星期" + "日一二三四五六".charat(new date().getday());


//18、产生3万内的随机数     
	 var Rand =21904;       
	 var rand1=parseInt(9999*Math.random());      
	 Rand+=rand1;       
	 $(".fred").text(Rand); 
	//19、去掉元
	var s="900元";
	s=s.replace("元",""); 
	alert(s+"处理后的结果");
 


//19、 jquery radio取值，checkbox取值，select取值，radio选中，checkbox选中，select选中，
  //select 取值： 
 	var t = document.getElementById("gettime"); 
    var t_s=t.options[t.selectedIndex].value;
 //获  取一组radio被选中项的值
	var item = $('input[@name=items][@checked]').val();

 //获取select被选中项的文本
	var item = $("select[@name=items] option[@selected]").text();

 //select下拉框的第二个元素为当前选中值
	$('#select_id')[0].selectedIndex = 1;

 //radio单选组的第二个元素为当前选中值
	$('input[@name=items]').get(1).checked = true; 
 
	//文本框，文本区域：$("#txt").attr("value")；
	//多选框checkbox：$("#checkbox_id").attr("value")；
	//单选组radio：   $("input[@type=radio][@checked]").val();
	//下拉框select： $('#sel').val();
	/*控制表单元素：
	文本框，文本区域：$("#txt").attr("value",'');//清空内容
	                 $("#txt").attr("value",'11');//填充内容
	多选框checkbox： $("#chk1").attr("checked",'');//不打勾
	                 $("#chk2").attr("checked",true);//打勾
	                 if($("#chk1").attr('checked')==undefined) //判断是否已经打勾
	 */
	//单选组radio：    $("input[@type=radio]").attr("checked",'2');//设置value=2的项目为当前选中项

//下拉框select：   $("#sel").attr("value",'-sel3');//设置value=-sel3的项目为当前选中项

  $("<option value='1'>1111</option><option value='2'>2222</option>").appendTo("#sel")//添加下拉框的option
  $("#sel").empty()；//清空下拉框


//20、ajax获取城市列表
  $.ajax({
   url : "carsAction!queryDistrict.actionx",
   data : {cityID:2}, //动态传给服务器的参数
   type : "post",
   dataType:'json',
   success : function(data) {
    $.each(data.dist,function(i,n){
    	//返回数据之后。对页面的操作
     var str='<li class=""><a myflgclass="'+i+'">'+n+'</a></li>';
     $('#menulist-0').append(str); 
     //   alert(i+":"+n);
    });
    x();//动态添加后到页面之后，。重新绑定事件。否则只有页面会绑定。
   } });

//21、IE6著名的双边距BUG：当连续的block元素浮动时，margin左右会产生双倍的边距，解决方式是将元素设置为内联元素，
   //通常做法是display:inline; 无须写_hack，对其他浏览器没有影响

//22、判断手机平板等移动端适配跳转URL 
	if(/AppleWebKit.*mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
	    if(window.location.href.indexOf("?mobile")<0){
	        try{
	            if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
	                window.location.href="手机页";
	            }else if(/iPad/i.test(navigator.userAgent)){
	                window.location.href="平板页";
	            }else{
	                window.location.href="其他移动端页"
	            }
	        }catch(e){}
	    }
	}

//23、操作Cookie 
	function setCookie(NameOfCookie, value, expiredays) 
	{ 
	//@参数:三个变量用来设置新的cookie: 
	//cookie的名称,存储的Cookie值, 
	// 以及Cookie过期的时间. 
	// 这几行是把天数转换为合法的日期 

	var ExpireDate = new Date (); 
	ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000)); 

	// 下面这行是用来存储cookie的,只需简单的为"document.cookie"赋值即可. 
	// 注意日期通过toGMTstring()函数被转换成了GMT时间。 

	document.cookie = NameOfCookie + "=" + escape(value) + 
	  ((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString()); 
	} 

	//获取cookie值 
	function getCookie(NameOfCookie) 
	{ 

	// 首先我们检查下cookie是否存在. 
	// 如果不存在则document.cookie的长度为0 

	if (document.cookie.length > 0) 
	{ 

	// 接着我们检查下cookie的名字是否存在于document.cookie 

	// 因为不止一个cookie值存储,所以即使document.cookie的长度不为0也不能保证我们想要的名字的cookie存在 
	//所以我们需要这一步看看是否有我们想要的cookie 
	//如果begin的变量值得到的是-1那么说明不存在 

	begin = document.cookie.indexOf(NameOfCookie+"="); 
	if (begin != -1)    
	{ 

	// 说明存在我们的cookie. 

	begin += NameOfCookie.length+1;//cookie值的初始位置 
	end = document.cookie.indexOf(";", begin);//结束位置 
	if (end == -1) end = document.cookie.length;//没有;则end为字符串结束位置 
	return unescape(document.cookie.substring(begin, end)); } 
	} 

	return null; 

	// cookie不存在返回null 
	} 

	//删除cookie 
	function delCookie (NameOfCookie) 
	{ 
	// 该函数检查下cookie是否设置，如果设置了则将过期时间调到过去的时间; 
	//剩下就交给操作系统适当时间清理cookie啦 

	if (getCookie(NameOfCookie)) { 
	document.cookie = NameOfCookie + "=" + 
	"; expires=Thu, 01-Jan-70 00:00:01 GMT"; 
	} 
	}

//24、//获取Url传过来的值
	function Request(name)
	{
	     new RegExp("(^|&)"+name+"=([^&]*)").exec(window.location.search.substr(1));
	     return RegExp.$2
	}
//25、 * 定义验证各种格式类型的正则表达式对象  
            var Regexs = {  
                email: (/^[0-9a-z][0-9a-z\-\_\.]+@([0-9a-z][0-9a-z\-]*\.)+[a-z]{2,}$/i),//邮箱  
                phone: (/^0[0-9]{2,3}[2-9][0-9]{6,7}$/),//座机手机号码  
                ydphpne: (/^((13[4-9])|(15[012789])|147|182|187|188)[0-9]{8}$/),//移动手机号码  
                allphpne: (/^((13[0-9])|(15[0-9])|(18[0-9]))[0-9]{8}$/),//所有手机号码  
                ltphpne: (/^((13[0-2])|(15[56])|(186)|(145))[0-9]{8}$/),//联通手机号码  
                dxphpne: (/^((133)|(153)|(180)|(189))[0-9]{8}$/),//电信手机号码  
                url: (/^http:\/\/([0-9a-z][0-9a-z\-]*\.)+[a-z]{2,}(:\d+)?\/[0-9a-z%\-_\/\.]+/i),//网址  
                num: (/[^0-9]/),//数字  
                cnum: (/[^0-9a-zA-Z_.-]/),  
                photo: (/\.jpg$|\.jpeg$|\.gif$/i),//图片格式  
                row: (/\n/ig)  
            };  
            /** 
            * @return 若符合对应的格式，返回true，否则返回false 
            */  
            function chkFormat(str, ftype) {  
                var nReg = Regexs[ftype];  
                if (str == null || str == "") return false; //输入为空，认为是验证通过  
                if (ftype == 'num') {  
                    if (!nReg.test(str) && !chkChinese(str)) {//10.23 tenfy 必须为数字且不能有中文  
                        return true;  
                    } else {  
                        return false;  
                    }  
                }  
                if (!nReg.test(str)) {  
                    return true;  
                } else {  
                    return false;  
      
                }  
            };  
            function chkChinese(s) {  
                for (var i = 0; i < s.length; i++) {  
                    if (s.charCodeAt(i) > 255) return true;  
                }  
                return false;  
            };  
//26、不能点右键、不用CTRL+A、不能复制

	<body oncontextmenu="window.event.returnValue=false" 
	onkeypress="window.event.returnValue=false" 
	onkeydown="window.event.returnValue=false" 
	onkeyup="window.event.returnValue=false" 
	ondragstart="window.event.returnValue=false" 
	onselectstart="event.returnValue=false"> 
	</body> 
//27、禁用按钮： 
	$("#somebutton").attr("disabled", true);
	//启动按钮： 
	$("#submit-button").removeAttr("disabled");
	//输入内容后启用递交按钮 
	$('#username').keyup(function() {
	    $('#submit').attr('disabled', !$('#username').val()); 
	});
	//禁止多次递交表单
	$(document).ready(function() {
	  $('form').submit(function() {
	    if(typeof jQuery.data(this, "disabledOnSubmit") == 'undefined') {
	      jQuery.data(this, "disabledOnSubmit", { submited: true });
	      $('input[type=submit], input[type=button]', this).each(function() {
	        $(this).attr("disabled", "disabled");
	      });
	      return true;
	    }
	    else
	    {
	      return false;
	    }
	  });
	});
//28、jQuery对象可以当成数组来使用
  //选择器运行后获得的结果就是jQuery对象。然后，jQuery库使得jQuery对象可以当成数组来使用，你可以使用下标来获取元素，还可以获取数组长度。
	var buttons = $('#navigation a.button');  
	 // We can loop though the collection: 
	 for(var i=0;i<buttons.length;i++) { 
	   console.log(buttons[i]); // A DOM element, not a jQuery object 
	 }
//29、 如何修改jQuery默认编码（例如默认UTF-8改成改GB2312）：
	$.ajaxSetup({ajaxSettings:{ contentType:"application/x-www-form-urlencoded;chartset=GB2312"} });

//30、 追加或是添加html到元素中：
	$('#lal').append('sometext'); 

//31、 检测各种浏览器：

	//检测Safari (if( $.browser.safari)),  
	//检测IE6及之后版本 (if ($.browser.msie && $.browser.version > 6 )),  
	//检测IE6及之前版本 (if ($.browser.msie && $.browser.version <= 6 )),  
	//检测FireFox 2及之后版本 (if ($.browser.mozilla && $.browser.version >= '1.8' ))

//32、 写jQuery插件：
	(function($) {
		$.fn.extend({
			pluginOne: function() {
				return this.each(function() { 
				//  code          
				});
			},        
			pluginTwo: function(){           
			      return this.each(function(){              
			        //  code           
			      });        
			}    
		});

	})(jQuery);


//32、更新中.........