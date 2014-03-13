/*!
 *-------------------------------------------------------
 * MarkYun JavaScript Library v1.0.1(dev)
 * 
 * 使用原生JavaScript实现的一些常用功能，类似Jquery语法和结构，待完善
 * 
 * @author: Mygood@126.com || majinyun0802.mark@gmail.com
 * @Weibo ：  马云云_理想青年
 * @date  : 2014-02-10 
 * @Github: https://github.com/markyun
 * -----------------------------------------------------
 */

;(function() {
	
	// 缓存原始值
	_$ = window.$; 
	
	// 注册到window对象和$
	var markyun = window.markyun = window.$ = function(selector) {
		return new markyun.fn.init(selector);
	}; 
	
	// 版本
	markyun.VERSION = '1.0.1(dev)';
	//		isIE = !-[1,],	// 判断IE6|7|8 [ 不能判断IE9 ]
	//		isIE6 = isIE && /msie 6/.test( navigator.userAgent.toLowerCase() ), // 判断IE6

	// 创建fn的命名空间,该内容为框架基础功能
	markyun.fn = markyun.prototype = {

	    constructor: markyun,
		// initialize [初始化]
		init : function(selector) { 

//			  "" ,  null ,  undefined 
            if (!selector) {
                selector=document;
            }
			selector = selector || document;
			if (selector.nodeType) {
				this[0] = selector;
				return this;
			}
			 if (typeof selector === "string")
	                this[0] = document.getElementById(selector);
	         return this;
		},
		// 页面加载完成后
		ready : function(node) {
			markyun.Event.readyEvent(node);
			return this;
		},
		// 读写HTML
		html : function(node) {
			if (typeof node != 'undefined') {
				this[0].innerHTML = node;
			}
			return this[0].innerHTML;
		},
		// 读写样式
		style : function(prop, value) {
			if (typeof value != 'undefined') {
				this[0].style[prop] = value;
				return this;
			} else {
				return markyun.dom.getStyle(this[0], prop);
			}
		},
		// 判断样式是否存在
		hasClass : function(selector) {
			return markyun.dom.hasClass(this[0], selector);
		},
		// 添加样式
		addClass : function(selector) {
			markyun.dom.addClass(this[0], selector);
			return this;
		},
		// 移除样式
		removeClass : function(selector) {
			markyun.dom.removeClass(this[0], selector);
			return this;
		},
		// 事件绑定
		bind : function(type, handler) {
			markyun.Event.addEvent(this[0], type, handler);
			return this;
		},
		// 移除事件
		unbind : function(type, handler) {
			markyun.Event.removeEvent(this[0], type, handler);
			return this;
		},
		// 显示元素
		show : function() {
			this.style("display", "block");
			return this;
		},
		// 隐藏元素
		hide : function() {
			this.style("display", "none");
			return this;
		},

		// 元素拖动
		drag : function(node) {
			new markyun.drag.init(this[0], node);
			return this;
		},
		// 设置透明度
		setOpacity : function(number) {
			if (this[0].filters) {
				this[0].style.filter = "alpha(opacity=" + number + ")";
			} else {
				this[0].style.opacity = number / 100;
			}
			return this;
		},
		// 动画效果
		slide : function(options) {
			var fps = 30, step = 0;
			var opt = {
				from : 0,
				prop : "height",
				duration : 1000
			};
			var val = parseInt(markyun.dom.getStyle(this[0], opt.prop));
			if (val != 0) {
				opt.to = 0;
				opt.from = val;
			}

			if (typeof options != "undefined") {
				for ( var key in options) {

					opt[key] = options[key];
				}
			}
			if (opt.from == opt.to) {
				return this;

			}
			this.show();
			this[0].style[opt.prop] = opt.from + "px";
			var numsteps = opt.duration / 1000 * fps;
			var interval = (opt.from - opt.to) / numsteps;
			(function(el) {

				var intervalID = setInterval(fn, 1000 / fps);// 周期性任务

				function fn() {
					var newval = opt.from - (step * interval);
					if (step++ < numsteps) {
						el[0].style[opt.prop] = Math.ceil(newval) + "px";
					} else {
						el[0].style[opt.prop] = opt.to + "px";
						clearInterval(intervalID);
						if (newval == 0) {
							el.hide();
							el[0].propVal = val;
						}
					}
				}

			})(this);
			return this;
		},

		slideUp : function(speed) {
			var w = parseInt(this.style("height"));
			var d = 1000;
			if (typeof speed != 'undefined') {
				if (speed == 'fast') {
					d = 600;
				} else if (speed == 'slow') {
					d = 3000;
				} else {
					d = parseInt(speed);
				}
			}
			var opt = {
				from : w,
				tp : 0,
				prop : 'height',
				duration : d
			};
			return this.slide(opt);
		},
		slideDown : function(speed, to) {
			var v = this[0].propVal;
			var d = 1000;
			if (typeof speed != 'undefined') {
				if (speed == "fast")
					d = 500;
				else if (speed == "slow")
					d = 2500;
				else
					d = parseInt(speed);
			}
			var opt = {
				from : 0,
				to : to || v || parseInt(this.style("height")),
				prop : "height",
				duration : d
			};
			this.show();
			return this.slide(opt);
		},

		fadeOut : function() {
			this.setOpacity(0);
			for (var i = 0; i <= 100; i += 4) {
				(function(el) {
					var pos = i;
					setTimeout(function() {
						el.setOpacity(pos);
					}, (pos + 1) * 10);

				})(this);
			}
			return this;
		},

		fadeIn : function() {
			this.setOpacity(100);
			for (var i = 100; i >= 0; i -= 4) {
				(function(el) {
					var pos = i;
					setTimeout(function() {
						el.setOpacity(pos);
					}, (99 - pos) * 10);

				})(this);
			}
			return this;
		},
		// 鼠标位置
		getMousePos : function(e) {
			return markyun.Event.getMousePos(e);
		},

		pageXY : function(pos) {
			if (typeof pos != 'undefined') {
				markyun.dom.setPageXY(this[0], pos);
				return this;
			} else {
				return markyun.dom.getPageXY(this[0]);
			}
		}
	};

	// Give the init function the markyun prototype for later instantiation
	markyun.fn.init.prototype = markyun.fn;

	// 扩展markyun.js对象。用来在fn命名空间上增加新函数
	markyun.extend = markyun.fn.extend = function(obj, property) {
		if (!property) {
			property = obj;
			obj = this;
		}
		// obj用以扩展的对象，prop为扩展的函数集,如果参数只有一个，则扩展新函数到markyun对象上
		for ( var i in property) {
			obj[i] = property[i]; 
		}  
		return obj;
	};

	// 给fn添加的功能，需要先选择节点，然后才能操作
	// 调用方式： [$("id").val();]
	markyun.extend(markyun.prototype,{ 

		get : function(name) {
			return this[0][name];
		},
		val : function(val) {
			if (typeof val != "undefined") {
				this[0].value = "" + val;
				return this;
			} else {
				return this[0].value;
			}
		}		
	});
	// 给markyun对象添加的功能（静态方法），可以直接点方法名 ，进行操作
	// 调用方式： [$.getCookie("cookie名");]
	
	markyun.extend({

		//放弃对$的控制权
		noConflict: function (){
			//注意别动了其他绑定$的库
			if(window.$ === markyun){
				window.$=_$; 
			} 
			//闭包里面的东西除非被window等宿主对象引用，否则是不可见的
			//window.markyun = markyun; 
			  return markyun;
		} ,
		//返回一个本地格式的时间值:"2014年3月4日 13:43:54"
		now: function() {
			var today= new Date().toLocaleString();
			return today;
		},
//		获取当前日期:201403041343
		getTime:function() {
		        var now = new Date();
		        var year = now.getFullYear(); //年
		        var month = now.getMonth() + 1; //月
		        var day = now.getDate(); //日 
	            var hh = now.getHours();            //时
	            var mm = now.getMinutes();          //分
		        var clock = year + "";
		        if (month < 10) clock += "0";
		        clock += month + "";
		        if (day < 10) clock += "0";
		        clock += day;
		        clock += hh;
		        clock += mm;
		        return (clock);
		},

		isString:function (value){
			return typeof value == 'string';
		},
		isNumber: function (value){
			return typeof value == 'number';
		},
		isFunction:	function (value){
			return typeof value == 'function';
		},
		isBoolean:function (value) {
		  return typeof value == 'boolean';
		},
		isNaN:function (obj) {
		    return obj !== obj;
		},
		isNull:	function (obj) {
		    return obj === null;
		},
		isChinese:function(value){
			return markyun.regExp.isChinese(value);
		},
		setCookie : function(options) {
			markyun.cookie.setCookie(options);
			return this;
		},
		getCookie : function(cookie) {
			return markyun.cookie.getCookie(cookie);
		},
		delectCookie : function(cookie) {
			markyun.cookie.delectCookie(cookie);
			return this;
		},
		create : function() {
			return markyun.ajax.createXHR();
		},
		ajax : function(url, opt) {
			markyun.ajax.send(url, opt);
			return this;
		}
	});
		
	markyun.drag = {
		init : function(o, oRoot) {
			markyun.drag.obj = o;
			if (typeof oRoot == "string")
				oRoot = document.getElementById(oRoot);
			o.root = oRoot && oRoot != null ? oRoot : o;
			markyun.dom.setStyle(o.root, "position", "absolute");
			markyun.dom.setStyle(o, "cursor", "move");

			o.onmousedown = markyun.drag.start;
		},
		start : function(e) {
			var o = markyun.drag.obj = this;

			o.root.oldIndex = parseInt(markyun.dom.getStyle(o.root, 'zIndex'));
			markyun.dom.setStyle(o.root, 'zIndex', 999);
			var m = markyun.Event.getMousePos(e);

			o.lastMouseX = m[0];
			o.lastMouseY = m[1];

			document.onmousemove = markyun.drag.drag;
			document.onmouseup = markyun.drag.end;
			return this;
		},

		drag : function(e) {
			var o = markyun.drag.obj, nx, ny;
			var m = markyun.Event.getMousePos(e);
			var ex = m[0], ey = m[1], xy = markyun.dom.getPageXY(o.root), x = xy[0], y = xy[1];
			nx = x + (ex - o.lastMouseX);
			ny = y + (ey - o.lastMouseY);
			o.root.style.left = nx + "px";
			o.root.style.top = ny + "px";
			o.lastMouseX = ex;
			o.lastMouseY = ey;
			return false;
		},
		end : function() {
			var o = markyun.drag.obj;
			markyun.dom.setStyle(o.root, 'zIndex', o.root.oldIndex || 0);
			document.onmousemove = null;
			document.onmousrup = null;
		}
	};
	// event(事件)工具集
	markyun.Event = {
		// 页面加载完成后
		readyEvent : function(fn) {
			if (fn==null) {
				fn=document;
			}
			var oldonload = window.onload;
			if (typeof window.onload != 'function') {
				window.onload = fn;
			} else {
				window.onload = function() {
					oldonload();
					fn();
				};
			}
		},
		// 视能力分别使用dom0||dom2||IE方式 来绑定事件
		// 参数： 操作的元素,事件名称 ,事件处理程序
		addEvent : function(element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent('on' + type, function() {
					handler.call(element);
				});
			} else {
				element['on' + type] = handler;
			}
		},
		// 移除事件
		removeEvent : function(element, type, handler) {
			if (element.removeEnentListener) {
				element.removeEnentListener(type, handler, false);
			} else if (element.datachEvent) {
				element.detachEvent('on' + type, handler);
			} else {
				element['on' + type] = null;
			}
		},
		// 阻止事件流
		stopEvent : function(ev) {
			this.stopPropagation(ev);
			this.preventDefault(ev);
		},

		// 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
		stopPropagation : function(ev) {
			if (ev.stopPropagation) {
				ev.stopPropagation();
			} else {
				ev.cancelBubble = true;
			}
		},
		// 取消事件的默认行为
		preventDefault : function(event) {
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		},
		// 获取事件目标
		getTarget : function(event) {
			return event.target || event.srcElement;
		},
		// 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
		getEvent : function(e) {
			var ev = e || window.event;
			if (!ev) {
				var c = this.getEvent.caller;
				while (c) {
					ev = c.arguments[0];
					if (ev && Event == ev.constructor) {
						break;
					}
					c = c.caller;
				}
			}
			return ev;
		},
		// ---------------未添加到fn中------------------------//
		// 取得事件触发时的相关元素
		getRelatedTarget : function(event) {
			if (event.relatedTarget) {
				return event.relatedTarget;
			} else if (event.toElement) {
				return event.toElement;
			} else if (event.fromElement) {
				return event.fromElement;
			} else {
				return null;
			}
		},
		// 鼠标滚轮事件时，滚动的值，让各个浏览器表现一致
		getWheelDelta : function(event) {
			if (event.wheelDelta) {
				return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta: event.wheelDelta);
			} else {
				return -event.detail * 40;
			}
		},

		// 取得Keypress事件时，获取按下键的ASCII编码
		getCharCode : function(event) {
			if (typeof event.charCode == "number") {
				return event.charCode;
			} else {
				return event.keyCode;
			}
		},

		// 鼠标按键被按下事件捕获
		getButton : function(event) {
			if (document.implementation.hasFeature("MouseEvent", "2.0")) {
				return event.button;
			} else {
				// 针对变态的IE
				switch (event.button) {
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
				}
			}
		},
		// 获取剪贴板内容
		getClipboardText : function(event) {
			var clipboardData = (event.clipboardData || window.clipboardData);
			return clipboardData.getData("text");
		},

		// 设置剪贴板内容
		setClipboardText : function(event, value) {
			if (event.clipboardData) {
				return event.clipboardData.setData("text/plain", value);
			} else if (window.clipboardData) {
				return window.clipboardData.setData("text", value);
			}
		},

		// 获取当前鼠标的位置
		getMousePos : function(e) {
			var ev = this.getEvent(e);
			if (ev.pageX || ev.pageY) {
				return [ ev.pageX, ev.pageY ];
			}
			return [
					ev.clientX + document.body.scrollLeft
							- document.body.clientLeft,
					ev.clientY + document.body.scrollTop
							- document.body.clientTop ];
		}
	};

	//各种对DOM节点操作都在这
	markyun.dom = {
			
		id : function(node) {
			return document.getElementById(node);
		},

		tag : function(node, el) {
			return (el || document).getElementsByTagName(node);
		},

		className : function(node, className, tag) {
			if (!node) {
				return [];
			}
			if (tag == null)
				tag = '*';
			var nodes = new Array(), elements = node.getElementsByTagName(tag);

			for (var i = 0, len = elements.length; i < len; i++) {
				if (this.hasClass(elements[i], className)) {

					nodes[nodes, length] = elements[i];
				}
			}
			return nodes;
		},

		getStyle : function(el, prop) {
			if (el.style[prop]) {
				return el.style[prop];
			} else if (el.currentStyle) {
				return el.currentStyle[prop];
			} else if (document.defaultView
					&& document.defaultView.getComputedStyle) {
				prop = prop.replace(/([A-Z])/g, "-$1");
				prop = prop.toLowerCase();
				var s = document.defaultView.getComputedStyle(el, "");
				return s && s.getPropertyValue(prop);
			} else
				return null;
		},

		setStyle : function(el, prop, val) {
			el.style[prop] = val;
		},

		getPageXY : function(el) {
			return [
					el.offsetParent ? el.offsetLeft
							+ markyun.dom.getPageXY(el.offsetParent)[0]
							: el.offsetLeft,
					el.offsetParent ? el.offsetTop
							+ markyun.dom.getPageXY(el.offsetParent)[1]
							: el.offsetTop ];
		},

		setPageXY : function(el, pos) {
			var style_pos = markyun.dom.getStyle(el, 'position');
			if (style_pos == 'static') {
				markyun.dom.setStyle(el, 'position', 'relative');
				style_pos = 'relative';
			}
			var pageXY = markyun.dom.getPageXY(el);
			var delta = [ parseInt(markyun.dom.getStyle(el, 'left'), 10),
					parseInt(markyun.dom.getStyle(el, 'top'), 10) ];
			if (isNaN(delta[0])) {
				delta[0] = (style_pos == 'relative') ? 0 : el.offsetLeft;
			}
			if (isNaN(delta[1])) {
				delta[1] = (style_pos == 'relative') ? 0 : el.offsetTop;
			}
			if (pos[0] !== null) {
				el.style.left = pos[0] - pageXY[0] + delta[0] + 'px';
			}
			if (pos[1] !== null) {
				el.style.top = pos[1] - pageXY[1] + delta[1] + 'px';
			}
			var newXY = markyun.dom.getPageXY(el);
			if ((pos[0] !== null && newXY[0] != pos[0])
					|| (pos[1] !== null && newXY[1] != pos[1])) {
				markyun.dom.setPageXY(el, pos);
			}
		},
		hasClass : function(el, className) {
			if (className
					&& (' ' + el.className + ' ')
							.indexOf(' ' + className + ' ') > -1)
				return true;
			else
				return false;
		},

		addClass : function(el, className) {
			if (el.className === '') {
				el.className = className;
			} else if (el.className !== ''
					&& !markyun.dom.hasClass(el, className)) {
				el.className = el.className + ' ' + className;
			}
		},
		removeClass : function(el, className) {
			if (markyun.dom.hasClass(el, className)) {
				el.className = (' ' + el.className + ' ').replace(
						' ' + className + ' ', ' ').replace(/^ | $/g, '');
			}
		},
		// 去除2端空格
		trim : function(str) {
			return str.replace(/^\s+|\s+$/g, '');
		} 
	};
	// cooki工具集
	markyun.cookie = {
		setCookie : function(opt) {
			var str = opt.name + "=" + escape(opt.value) + ";";
			if (opt.days)
				str += "expires="
						+ new Date(new Date().getTime() + opt.days * 86400000)
								.toGMTString() + "; ";
			if (opt.domain)
				str += "domain=" + opt.domain + "; ";
			if (opt.path)
				str += "path=" + opt.path + "; ";
			if (opt.secure)
				str += "secure;";
			document.cookie = str;
		},

		getCookie : function(name) {
			var value;
			var arr = document.cookie.match(new RegExp("(^| )" + name
					+ "=([^;]*)(;|$)"));
			if (arr != null) {
				value = unescape(arr[2]);
			} else {
				value = "没有发现cookie";
			}
			return value;
		},

		delectCookie : function(name) {
			var exp = new Date();
			exp.setTime(exp.getTime() - 100000);
			var cval = markyun.cookie.getCookie(name);
			if (cval != null)
				document.cookie = name + "=;expires=" + exp.toGMTString();
		}

	};

	markyun.ajax = {

		// 对原生的XHR（IE的早些版本）的支持
		createXHR : function() {
			// IE7以及更高版本的浏览器 支持就直接返回
			if (typeof XMLHttpRequest != "undefined") {
				return new XMLHttpRequest();
			} else if (typeof ActiveXObject != "undefined") { // 对原生的XHR（IE的早些版本）的支持
				if (typeof arguments.callee.activeXString != "string") {
					var versions = [ 
					'MSXML2.XMLHttp.6.0', 
					'MSXML2.XMLHttp.3.0',
					'MSXML2.XMLHttp' 
					], i, len;
					for (i = 0, len = versions.length; i < len; i++) {
						try {
							new ActiveXObject(versions[i]);
							arguments.callee.activeXString = versions[i];
							break;
						} catch (e) {
							// M_TODO......
						}
					}
				} else {
					throw new Error("您的浏览器不支持XHR");
				}
			}
		},
		// 版本1
		createXHR1 : function() {
			var xhr = null;
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else {
				try {
					xhr = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					try {
						xhr = new ActiveXObject("Microsoft.XMLHTTP");
					} catch (e) {
						xhr = null;
					}
				}
			}
			if (!xhr)
				return;

			return xhr;
		},
		/*-------------2014-02-25------------------*/

		send : function(url, options) {
			if (!markyun.ajax.createXHR())
				return;
			var xhr = markyun.ajax.createXHR();
			var _options = {
				method : 'GET',
				querystring : '',
				onerror : function() {
				},
				onsuccess : function() {
				}
			};

			for ( var key in options) {
				_options[key] = options[key];
			}

			function onreadystateCallback() {
				if (xhr.readyState == 4) {
					if (xhr.status >= 200 && xhr.status < 300) {
						_options.onsuccess(xhr);
					} else {
						_options.onerror(xhr);
					}
				}
			}

			xhr.open(_options.method, url, true);
			xhr.onreadystatechange = onreadystateCallback;
			xhr.send(_options.querystring);
		}

	};
	// canvas工具，只包含2d部分，3d暂未实现
	markyun.canvas = {
		// 画一个针式时钟，调用此方法时，只需在页面添加： 
		// <canvas id="time" width="200px;" height="200px"></canvas>
		time : function() {
			var canvas, context;
			canvas = markyun.dom.id("time");//画布ID
			context = canvas.getContext('2d');//指定canvas类型为2d

			window.onload = (function() {
				//周期性任务。每秒来一次;
				setInterval(gettime, 1000);
			})();

			function gettime() {
				var radius = Math.min(canvas.width / 2, canvas.height / 2) - 25; // 设置表盘半径 
				// 矩形取短的边
				// -25
				var centerX = canvas.width / 2;
				var centerY = canvas.height / 2; // 设置圆心坐标
				context.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
				context.save();

				context.fillStyle = '#fff'; // 画表盘  指定为白色
				context.strokeStyle = '#000';
				context.beginPath();
				context.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
				context.fill();
				context.stroke();

				var r = radius - 10;
				drawText('1', centerX + (0.5 * r), centerY - (0.88 * r));
				drawText('2', centerX + (0.866 * r), centerY - (0.5 * r));
				drawText('3', centerX + radius - 10, centerY);
				drawText('4', centerX + (0.866 * r), centerY + (0.5 * r));
				drawText('5', centerX + (0.5 * r), centerY + (0.866 * r));
				drawText('6', centerX, centerY + r);
				drawText('7', centerX - (0.5 * r), centerY + (0.866 * r));
				drawText('8', centerX - (0.866 * r), centerY + (0.5 * r));
				drawText('9', centerX - radius + 10, centerY);
				drawText('10', centerX - (0.866 * r), centerY - (0.5 * r));
				drawText('11', centerX - (0.51 * r), centerY - (0.88 * r));
				drawText('MA', centerX, 35);

				var data = new Date();  //获取时间
				var h = data.getHours();
				var m = data.getMinutes();
				var s = data.getSeconds();
				var a = ((h / 12) * Math.PI * 2 - 1.57 + (m / 60 * 0.524));

				context.save();
				context.fillStyle = '#000';
				context.beginPath();
				context.arc(centerX, centerY, 3, 0, Math.PI * 2, false);
				context.closePath();
				context.fill();

				context.lineWidth = 3;
				context.fillStyle = 'red';
				context.strokeStyle = 'red';
				context.beginPath();
				context.arc(centerX, centerY, radius - 45, a + 0.01, a, true);
				context.lineTo(centerX, centerY);
				context
						.arc(centerX, centerY, radius - 30,
								(m / 60) * 6.27 - 1.57,
								((m / 60) * 6.28 - 1.57), false);
				context.lineTo(canvas.width / 2, canvas.height / 2);
				context.arc(centerX, centerY, radius - 20,
								(s / 60) * 6.27 - 1.57,
								((s / 60) * 6.28 - 1.57), false);
				context.lineTo(centerX, centerY);
				context.closePath();
				context.fill();
				context.stroke();
				context.restore();
				var hours = String(h);
				var minutes = String(m);
				var seconds = String(s);
				if (hours.length == 1) {
					h = "0" + h
				}
				if (minutes.length == 1) {
					m = "0" + m
				}
				if (seconds.length == 1) {
					s = "0" + s
				}
				var str = h + ":" + m + ":" + s;
				drawText(str, centerX, centerY + radius + 12);
				function drawText(text, x, y) {
					context.save();
					context.fillStyle = 'red';
					context.font = 'bold  16px 宋体'; //12px/1.5 Verdana,'宋体',sans-serif
					x -= (context.measureText(text).width / 2);
					y += 9;
					context.beginPath();
					context.translate(x, y);
					context.fillText(text, 0, 0);
					context.restore();
				}
			}

		}
	};

	// 正则工具
	markyun.regExp = {
		// 判断是否是中文
		isChinese : function(word) {
			return /[\u4E00-\uFA29]+|[\uE7C7-\uE7F3]+/.test(word);
		}
	};

	// json工具
	markyun.json = {};

	// 浏览器对象
	markyun.bom = {};
			
 
})();