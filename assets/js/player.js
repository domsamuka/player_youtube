
// ----------------------------------------------------------------------------------------------------------------- //

    var vJsonSetup = "https://domsamuka.com/player/new_youtube/assets/json/lead2.json" ;
	
    var vJsVideo   = "https://domsamuka.com/player/new_youtube/assets/js/video.js" ;

// ----------------------------------------------------------------------------------------------------------------- //

	var vVideoID = window.innerHeight > window.innerWidth ? ID_Celular : ID_Computador ;

// ----------------------------------------------------------------------------------------------------------------- //
	
	!(function (e, t) {
		"object" == typeof exports && "undefined" != typeof module ? t() : "function" == typeof define && define.amd ? define(t) : t();
	})(0, function () {
		"use strict";
		function e(e) {
			var t = this.constructor;
			return this.then(
				function (n) {
					return t.resolve(e()).then(function () {
						return n;
					});
				},
				function (n) {
					return t.resolve(e()).then(function () {
						return t.reject(n);
					});
				}
			);
		}
		function t(e) {
			return new this(function (t, n) {
				function o(e, n) {
					if (n && ("object" == typeof n || "function" == typeof n)) {
						var f = n.then;
						if ("function" == typeof f)
							return void f.call(
								n,
								function (t) {
									o(e, t);
								},
								function (n) {
									(r[e] = { status: "rejected", reason: n }), 0 == --i && t(r);
								}
							);
					}
					(r[e] = { status: "fulfilled", value: n }), 0 == --i && t(r);
				}
				if (!e || "undefined" == typeof e.length) return n(new TypeError(typeof e + " " + e + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
				var r = Array.prototype.slice.call(e);
				if (0 === r.length) return t([]);
				for (var i = r.length, f = 0; r.length > f; f++) o(f, r[f]);
			});
		}
		function n(e) {
			return !(!e || "undefined" == typeof e.length);
		}
		function o() {}
		function r(e) {
			if (!(this instanceof r)) throw new TypeError("Promises must be constructed via new");
			if ("function" != typeof e) throw new TypeError("not a function");
			(this._state = 0), (this._handled = !1), (this._value = undefined), (this._deferreds = []), l(e, this);
		}
		function i(e, t) {
			for (; 3 === e._state; ) e = e._value;
			0 !== e._state
				? ((e._handled = !0),
				  r._immediateFn(function () {
					  var n = 1 === e._state ? t.onFulfilled : t.onRejected;
					  if (null !== n) {
						  var o;
						  try {
							  o = n(e._value);
						  } catch (r) {
							  return void u(t.promise, r);
						  }
						  f(t.promise, o);
					  } else (1 === e._state ? f : u)(t.promise, e._value);
				  }))
				: e._deferreds.push(t);
		}
		function f(e, t) {
			try {
				if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
				if (t && ("object" == typeof t || "function" == typeof t)) {
					var n = t.then;
					if (t instanceof r) return (e._state = 3), (e._value = t), void c(e);
					if ("function" == typeof n)
						return void l(
							(function (e, t) {
								return function () {
									e.apply(t, arguments);
								};
							})(n, t),
							e
						);
				}
				(e._state = 1), (e._value = t), c(e);
			} catch (o) {
				u(e, o);
			}
		}
		function u(e, t) {
			(e._state = 2), (e._value = t), c(e);
		}
		function c(e) {
			2 === e._state &&
				0 === e._deferreds.length &&
				r._immediateFn(function () {
					e._handled || r._unhandledRejectionFn(e._value);
				});
			for (var t = 0, n = e._deferreds.length; n > t; t++) i(e, e._deferreds[t]);
			e._deferreds = null;
		}
		function l(e, t) {
			var n = !1;
			try {
				e(
					function (e) {
						n || ((n = !0), f(t, e));
					},
					function (e) {
						n || ((n = !0), u(t, e));
					}
				);
			} catch (o) {
				if (n) return;
				(n = !0), u(t, o);
			}
		}
		var a = setTimeout,
			s = "undefined" != typeof setImmediate ? setImmediate : null;
		(r.prototype["catch"] = function (e) {
			return this.then(null, e);
		}),
			(r.prototype.then = function (e, t) {
				var n = new this.constructor(o);
				return (
					i(
						this,
						new (function (e, t, n) {
							(this.onFulfilled = "function" == typeof e ? e : null), (this.onRejected = "function" == typeof t ? t : null), (this.promise = n);
						})(e, t, n)
					),
					n
				);
			}),
			(r.prototype["finally"] = e),
			(r.all = function (e) {
				return new r(function (t, o) {
					function r(e, n) {
						try {
							if (n && ("object" == typeof n || "function" == typeof n)) {
								var u = n.then;
								if ("function" == typeof u)
									return void u.call(
										n,
										function (t) {
											r(e, t);
										},
										o
									);
							}
							(i[e] = n), 0 == --f && t(i);
						} catch (c) {
							o(c);
						}
					}
					if (!n(e)) return o(new TypeError("Promise.all accepts an array"));
					var i = Array.prototype.slice.call(e);
					if (0 === i.length) return t([]);
					for (var f = i.length, u = 0; i.length > u; u++) r(u, i[u]);
				});
			}),
			(r.allSettled = t),
			(r.resolve = function (e) {
				return e && "object" == typeof e && e.constructor === r
					? e
					: new r(function (t) {
						  t(e);
					  });
			}),
			(r.reject = function (e) {
				return new r(function (t, n) {
					n(e);
				});
			}),
			(r.race = function (e) {
				return new r(function (t, o) {
					if (!n(e)) return o(new TypeError("Promise.race accepts an array"));
					for (var i = 0, f = e.length; f > i; i++) r.resolve(e[i]).then(t, o);
				});
			}),
			(r._immediateFn =
				("function" == typeof s &&
					function (e) {
						s(e);
					}) ||
				function (e) {
					a(e, 0);
				}),
			(r._unhandledRejectionFn = function (e) {
				void 0 !== console && console && console.warn("Possible Unhandled Promise Rejection:", e);
			});
		var d = (function () {
			if ("undefined" != typeof self) return self;
			if ("undefined" != typeof window) return window;
			if ("undefined" != typeof global) return global;
			throw Error("unable to locate global object");
		})();
		"function" != typeof d.Promise ? (d.Promise = r) : (d.Promise.prototype["finally"] || (d.Promise.prototype["finally"] = e), d.Promise.allSettled || (d.Promise.allSettled = t));
	});

	function UPManager( $config )
	{
		var obj = this;
		
		window.UPplayer = this;

		obj.config = $config;
		
		obj.video_type = window.innerHeight > window.innerWidth ? "portrait" : "landscape";
		
		obj.use_videostream = "";
		obj.use_videostream_config = {};
		obj.ajax_response = null;
		obj.return_visit = false;
		obj.playListeners = [];
		obj.pauseListeners = [];
		obj.unMuteListeners = [];
		obj.unmuted = false;
		
		document.getElementById(obj.config.host).player = obj;
		
		obj.init = function () {

			obj.ajax(

// ----------------------------------------------------------------------------------------------------------------- //
							
				vJsonSetup ,

// ----------------------------------------------------------------------------------------------------------------- //
					
				"GET",
				function( xhr ){

					var data = JSON.parse( xhr.responseText );
										
					for (var i in data) {
						obj.config[i] = data[i];
					}
					for (var j in obj.config.videos) {
						if (obj["check" + j]()) {
							obj.use_videostream = j;
							break;
						}
					}
					
					obj.return_visit = obj.getCookie("return_visit") == 1;
					obj.use_videostream_config = obj.getVideoSetup(obj.use_videostream);

// ----------------------------------------------------------------------------------------------------------------- //
					
					// obj.addLink( vCssBootstrap );
					
					// obj.addLink( vCssPlayer );

// ----------------------------------------------------------------------------------------------------------------- //

					obj[obj.use_videostream](obj.use_videostream_config);
					
					if (obj.config.fwdrwd == 1) {
						document.addEventListener("keydown", function (event) {
							if (event.keyCode == 37) {
								var time = obj.player.getCurrentTime() - 10;
								if (time < 0) time = 0;
								obj.player.seekTo(time);
								event.stopPropagation();
							} else if (event.keyCode == 39) {
								obj.player.seekTo(obj.player.getCurrentTime() + 10);
								event.stopPropagation();
							}
							return true;
						});
					}
				},
				function (xhr) {
					console.log("Received ERROR status:" + xhr.status);
				}
			);

		};
		
		obj.getVideoSetup = function ($type) {
			
			var video_id = "";
			
			if (typeof obj.config.videos[$type][obj.video_type] !== "undefined")
			{
				if (obj.config.videos[$type][obj.video_type] > "")
				{
					
					alt_video_id = obj.config.videos[$type][obj.video_type + "_alt"];

// ----------------------------------------------------------------------------------------------------------------- //
					
					video_id = vVideoID ;

// ----------------------------------------------------------------------------------------------------------------- //

				}
			}
			return { timer: obj.config.timer, cta_id: obj.config.cta_id, captions: obj.config.caption, video_id: video_id, video_id_alt: alt_video_id };
		};
		obj.ajax = function ($url, $method, $complete, $error) {
			var p = new Promise(function (resolve, reject) {
				const xhttp = new XMLHttpRequest();
				xhttp.onload = function () {
					if (typeof $complete != "undefined" && this.status < 400) $complete(this);
					else if (typeof $error != "undefined") $error(this);
					resolve(this.status < 400);
				};
				xhttp.open($method, $url, true);
				xhttp.send();
			});
			return p;
		};
		obj.htmlToElement = function (html) {
			var template = document.createElement("template");
			html = html.trim();
			template.innerHTML = html;
			if (typeof template.content != "undefined") {
				return template.content.firstChild;
			} else {
				return template.firstChild;
			}
		};
		obj.addScript = function ($name, $onload) {
			var script = document.createElement("script");
			script.src = $name;
			document.getElementsByTagName("head")[0].appendChild(script);
			script.onload = $onload;
		};
		obj.addLink = function ($name) {
			var link = document.createElement("link");
			link.href = $name;
			link.rel = "stylesheet";
			document.getElementsByTagName("head")[0].appendChild(link);
		};
		obj.createCookie = function (name, value, days) {
			var date, expires;
			if (days) {
				date = new Date();
				date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
				expires = "; expires=" + date.toGMTString();
			} else {
				expires = "";
			}
			document.cookie = name + "=" + value + expires + "; path=/; " + (location.hostname === "localhost" ? "" : "SameSite=None; Secure");
		};
		obj.getCookie = function (name) {
			var dc = document.cookie;
			var prefix = name + "=";
			var begin = dc.indexOf("; " + prefix);
			if (begin == -1) {
				begin = dc.indexOf(prefix);
				if (begin != 0) return null;
			} else {
				begin += 2;
				var end = document.cookie.indexOf(";", begin);
				if (end == -1) {
					end = dc.length;
				}
			}
			return decodeURI(dc.substring(begin + prefix.length, end));
		};
		obj.checkyoutube = function () {
			if( true )
			{

// ----------------------------------------------------------------------------------------------------------------- //

				return obj.ajax("https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=" + vVideoID + "&format=json", "GET");

// ----------------------------------------------------------------------------------------------------------------- //
				
			}
			return false;
		};

		obj.youtubefirsttime = true;
		obj.youtubecurrent = 0;
		obj.youtubemute = true;
		obj.youtubepaused = false;
		obj.laststatus = -2;
		
		obj.youtube = function ($config)
		{
			document
				.getElementById(obj.config.host)
				.appendChild(
					obj.htmlToElement(
						'<div class="player-wrapper"><div id="' +
							obj.config.host +
							'_stream">' +
							"</div>" +
							'<div class="glass" onclick="UPplayer.togglePause()"></div>' +
							'<div class="play" onclick="UPplayer.togglePlay()" style="z-index:3"></div>' +
							'<div class="playpause" onclick="UPplayer.togglePlay()" style="z-index:3"></div>' +
							'<a class="soundButton" id="unmute" onclick="UPplayer.toggleMute()"></a>' +
							"</div>"
					)
				);
			var tag = document.createElement("script");
			tag.src = "https://www.youtube.com/player_api";
			var firstScriptTag = document.getElementsByTagName("script")[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			var isMobile = /Mobi/.test(window.navigator.userAgent);
			var mql = window.matchMedia("(orientation: portrait)");
			var fontsize = 1;
			if (mql.matches && isMobile) {
				fontsize = 3;
			}
			window.onYouTubePlayerAPIReady = function () {
				var player = new YT.Player(obj.config.host + "_stream", {
					videoId: $config.video_id,
					playerVars: {

// ----------------------------------------------------------------------------------------------------------------- //
						
    // MANUAL: https://developers.google.com/youtube/player_parameters?hl=pt-br

// ----------------------------------------------------------------------------------------------------------------- //
	
						autoplay: obj.config.autoplay ? 1 : 0,
						
						cc_lang_pref: "en",
						
						// cc_load_policy: obj.config.hidecc ? 0 : 1,
						cc_load_policy: 0 ,
						
						// controls: obj.config.controlls ? 1 : 0,
						controls: 0,
						
						disablekb: 1,
						fs: 0,
						playsinline: 1,
						rel: 0,
						modestbranding: 1,
						
						iv_load_policy: 3,
						
						showinfo: 0,
						wmode: "transparent",
						mute: 1,

// ----------------------------------------------------------------------------------------------------------------- //

					},
					events: {
						onError: function (e) {},
						onReady: function (e) {
							setInterval(function () {
								obj.youtubecurrent = player.getCurrentTime();
								obj.youtubemute = player.isMuted();
							}, 10);
							var p = e.target;
							if (!obj.config.autoplay || obj.youtubepaused) {
								setTimeout(function () {
									p.pauseVideo();
								}, 100);
							} else if (obj.youtubefirsttime) {
								p.mute();
								obj.youtubefirsttime = false;
							}
							if (obj.youtubemute) {
								p.mute();
							}
							p.seekTo(obj.youtubecurrent);
						},
						onStateChange: function (e) {
							obj.laststatus = e.data;
							var p = e.target;
							if (e.data == 2) obj.youtubepaused = true;
							if (e.data == 1 && obj.unmuted) p.unMute();
							if (!obj.config.hidecc) {
								p.loadModule("captions");
								p.setOption("captions", "fontSize", fontsize);
							}
							p.setPlaybackRate(obj.config.playback_rate);
							p.setOption("captions", "track", { languageCode: "en" });
						},
					},
				});
				if (!obj.config.autoplay) {
					document.querySelector(".up_container .soundButton").style.display = "none";
					document.querySelector(".up_container .play").style.visibility = "visible";
				}
				obj.player = new UPYTPlayer(player, obj);
				obj.startTimer();
			};
		};
		
		obj.toggleMute = function () {
			document.querySelector(".up_container .soundButton").style.display = "none";
			try {
				obj.player.unmute();
				obj.player.seekTo(0);
				for (var k in obj.unMuteListeners) obj.unMuteListeners[k](obj);
			} catch (e) {
				console.log(e);
			}
		};
		obj.togglePause = function () {
			var elm = document.querySelector(".up_container .playpause").style;
			elm.visibility = "visible";
			try {
				obj.player.pause();
				for (var i in obj.pauseListeners) obj.pauseListeners[i](obj);
			} catch (e) {
				console.log(e);
			}
		};
		obj.togglePlay = function () {
			document.querySelector(".up_container .playpause").style.visibility = "hidden";
			document.querySelector(".up_container .play").style.visibility = "hidden";
			try {
				obj.player.unmute();
				obj.player.play();
				for (var i in obj.playListeners) obj.playListeners[i](obj);
				for (var k in obj.unMuteListeners) obj.unMuteListeners[k](obj);
			} catch (e) {
				console.log(e);
			}
		};
		obj.getCurrentTime = function () {
			return obj.player.getCurrentTime();
		};
		obj.startTimer = function () {
			var upt = new UPTimers(obj, obj.player, obj.config.timers);
			setInterval(upt.ping, 1000);
		};
		obj.onPlay = function ($callback) {
			obj.playListeners.push($callback);
		};
		obj.onPause = function ($callback) {
			obj.pauseListeners.push($callback);
		};
		obj.onUnMute = function ($callback) {
			obj.unMuteListeners.push($callback);
		};
		obj.init();
	}
	function UPTimers($manager, $player, $config) {
		var obj = this;
		obj.manager = $manager;
		obj.player = $player;
		obj.config = $config;
		obj.index = 0;
		obj.ping = function () {
			obj.index++;
			var ct = obj.player.getCurrentTime();
			for (var i in obj.config) {
				var evl = new Function("time", "index", isNaN(i) ? "return " + i : "return time>=" + i + " && " + i + " >=time-2");
				if (evl(Math.floor(ct), obj.index)) {
					for (var j = 0; j < obj.config[i].length; j++) {
						for (var k in obj.config[i][j]) {
							obj.config[i][j][k]["timeNow"] = ct;
							obj.config[i][j][k]["indexNow"] = obj.index;
							callImpl(obj, k, obj.config[i][j][k]);
						}
					}
				}
			}
		};
		obj.show = function ($query) {
			var elms = document.querySelectorAll($query);
			for (var i = 0; i < elms.length; i++) {
				elms[i].style.display = "block";
			}
		};
		obj.hide = function ($query) {
			var elms = document.querySelectorAll($query);
			for (var i = 0; i < elms.length; i++) {
				elms[i].style.display = "none";
			}
		};
		obj.checkcookie = function ($setup) {
			if (obj.manager.return_visit) {
				for (var i in $setup) {
					callImpl(obj, i, $setup[i]);
				}
			} else {
				obj.manager.createCookie("return_visit", 1);
			}
		};
	}

	function callImpl($scope, $name, $setup) {
		var getpath = function (base, path) {
			var elm = path.shift();
			return !base[elm] ? null : path.length == 0 ? base[elm] : getpath(base[elm], path);
		};
		var sobj;
		if (typeof $setup !== "array") $setup = [$setup];
		if (typeof (sobj = getpath($scope, $name.split("."))) == "function") {
			return sobj.apply($scope, $setup);
		} else if (typeof (sobj = getpath(window, $name.split("."))) == "function") {
			return sobj.apply(window, $setup);
		} else {
		}
	}

	function UPYTPlayer($player, $UP) {
		var obj = this;
		obj.player = $player;
		obj.ispaused = false;
		obj.unmute = function () {
			$UP.unmuted = true;
			obj.player.unMute();
		};
		obj.play = function () {
			obj.player.playVideo();
			obj.ispaused = false;
		};
		obj.pause = function () {
			obj.player.pauseVideo();
			obj.ispaused = true;
		};
		obj.seekTo = function (seconds) {
			obj.player.seekTo(seconds);
		};
		obj.getCurrentTime = function () {
			if (typeof obj.player.getCurrentTime == "function") {
				return obj.player.getCurrentTime();
			} else {
				return 0;
			}
		};
	}

	function UPVMPlayer($player, $UP) {
		var obj = this;
		obj.player = $player;
		obj.ispaused = false;
		obj.currentTime = 0;
		obj.unmute = function () {
			$UP.unmuted = true;
			obj.player.setMuted(false);
		};
		obj.pause = function () {
			obj.player.pause();
			obj.ispaused = true;
		};
		obj.play = function () {
			obj.player.play();
			obj.ispaused = true;
		};
		obj.seekTo = function (seconds) {
			obj.player.setCurrentTime(seconds);
		};
		obj.setCurrentTime = function ($seconds) {
			obj.currentTime = $seconds;
		};
		obj.getCurrentTime = function () {
			return obj.currentTime;
		};
	}

	function UPCFPlayer($player, $UP) {
		var obj = this;
		obj.player = $player;
		obj.ispaused = false;
		obj.unmute = function () {
			$UP.unmuted = true;
			obj.player.muted = false;
		};
		obj.pause = function () {
			obj.player.pause();
			obj.ispaused = true;
		};
		obj.play = function () {
			obj.player.play();
			obj.ispaused = true;
		};
		obj.seekTo = function (seconds) {
			obj.player.currentTime = seconds;
		};
		obj.getCurrentTime = function () {
			return obj.player.currentTime;
		};
	}

	function UPVJPlayer($player, $UP) {
		var obj = this;
		obj.player = $player;
		obj.ispaused = false;
		obj.unmute = function () {
			$UP.unmuted = true;
			obj.player.muted(false);
		};
		obj.pause = function () {
			obj.player.pause();
			obj.ispaused = true;
		};
		obj.play = function () {
			obj.player.play();
			obj.ispaused = true;
		};
		obj.seekTo = function (seconds) {
			obj.player.currentTime(seconds);
		};
		obj.getCurrentTime = function () {
			return obj.player.currentTime();
		};
	}

	function UPVDLPlayer($player, $UP) {
		var obj = this;
		obj.player = $player;
		obj.ispaused = false;
		obj.unmute = function () {
			$UP.unmuted = true;
			obj.player.embed.player.videoElement.muted = false;
		};
		obj.pause = function () {
			obj.player.pause();
			obj.ispaused = true;
		};
		obj.play = function () {
			obj.player.play();
			obj.ispaused = true;
		};
		obj.seekTo = function (seconds) {
			obj.player.seekTo(seconds);
		};
		obj.getCurrentTime = function () {
			return obj.player.videoTime;
		};
	}

// ----------------------------------------------------------------------------------------------------------------- //

	new UPManager({ "host" : "id_player" , "autoplay" : true });

// ----------------------------------------------------------------------------------------------------------------- //
