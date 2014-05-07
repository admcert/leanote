var LEA={};var Notebook={cache:{}};var Note={cache:{}};var Tag={};var Notebook={};var Share={};var Converter;var MarkdownEditor;var ScrollLink;function trimLeft(str,substr){if(!substr||substr==" "){return $.trim(str)}while(str.indexOf(substr)==0){str=str.substring(substr.length)}return str}function json(str){return eval("("+str+")")}function t(){var args=arguments;if(args.length<=1){return args[0]}var text=args[0];if(!text){return text}var pattern="LEAAEL";text=text.replace(/\?/g,pattern);for(var i=1;i<=args.length;++i){text=text.replace(pattern,args[i])}return text}function arrayEqual(a,b){a=a||[];b=b||[];return a.join(",")==b.join(",")}function isArray(obj){return Object.prototype.toString.call(obj)==="[object Array]"}function isEmpty(obj){if(!obj){return true}if(isArray(obj)){if(obj.length==0){return true}}return false}function getFormJsonData(formId){var data=formArrDataToJson($("#"+formId).serializeArray());return data}function formArrDataToJson(arrData){var datas={};var arrObj={};for(var i in arrData){var attr=arrData[i].name;var value=arrData[i].value;if(attr.substring(attr.length-2,attr.length)=="[]"){attr=attr.substring(0,attr.length-2);if(arrObj[attr]==undefined){arrObj[attr]=[value]}else{arrObj[attr].push(value)}continue}datas[attr]=value}return $.extend(datas,arrObj)}function formSerializeDataToJson(formSerializeData){var arr=formSerializeData.split("&");var datas={};var arrObj={};for(var i=0;i<arr.length;++i){var each=arr[i].split("=");var attr=decodeURI(each[0]);var value=decodeURI(each[1]);if(attr.substring(attr.length-2,attr.length)=="[]"){attr=attr.substring(0,attr.length-2);if(arrObj[attr]==undefined){arrObj[attr]=[value]}else{arrObj[attr].push(value)}continue}datas[attr]=value}return $.extend(datas,arrObj)}function _ajaxCallback(ret,successFunc,failureFunc){if(ret===true||ret=="true"||typeof ret=="object"){if(ret&&typeof ret=="object"){if(ret.Msg=="NOTLOGIN"){alert("你还没有登录, 请先登录!");return}}if(typeof successFunc=="function"){successFunc(ret)}}else{if(typeof failureFunc=="function"){failureFunc(ret)}else{alert("error!")}}}function _ajax(type,url,param,successFunc,failureFunc,async){log("-------------------ajax:");log(url);log(param);if(typeof async=="undefined"){async=true}else{async=false}$.ajax({type:type,url:url,data:param,async:async,success:function(ret){_ajaxCallback(ret,successFunc,failureFunc)},error:function(ret){_ajaxCallback(ret,successFunc,failureFunc)}})}function ajaxGet(url,param,successFunc,failureFunc,async){_ajax("GET",url,param,successFunc,failureFunc,async)}function ajaxPost(url,param,successFunc,failureFunc,async){_ajax("POST",url,param,successFunc,failureFunc,async)}function ajaxPostJson(url,param,successFunc,failureFunc,async){log("-------------------ajaxPostJson:");log(url);log(param);if(typeof async=="undefined"){async=true}else{async=false}$.ajax({url:url,type:"POST",contentType:"application/json; charset=utf-8",datatype:"json",async:async,data:JSON.stringify(param),success:function(ret,stats){_ajaxCallback(ret,successFunc,failureFunc)},error:function(ret){_ajaxCallback(ret,successFunc,failureFunc)}})}function findParents(target,selector){if($(target).is(selector)){return $(target)}var parents=$(target).parents();for(var i=0;i<parents.length;++i){log(parents.eq(i));if(parents.eq(i).is(selector)){return parents.seq(i)}}return null}function switchEditor(isMarkdown){if(!isMarkdown){$("#editor").show();$("#mdEditor").css("z-index",1)}else{$("#mdEditor").css("z-index",3).show()}}var previewToken="<div style='display: none'>FORTOKEN</div>";function setEditorContent(content,isMarkdown,preview){if(!content){content=""}if(!isMarkdown){$("#editorContent").html(content);var editor=tinymce.activeEditor;if(editor){editor.setContent(content);editor.undoManager.clear()}else{setTimeout(function(){setEditorContent(content,false)},100)}}else{$("#wmd-input").val(content);if(!content||preview){$("#wmd-preview").html(preview).css("height","auto");ScrollLink.onPreviewFinished()}else{if(MarkdownEditor){$("#wmd-preview").html(previewToken+"<div style='text-align:center; padding: 10px 0;'><img src='http://leanote.com/images/loading-24.gif' /> 正在转换...</div>");MarkdownEditor.refreshPreview()}else{setTimeout(function(){setEditorContent(content,true,preview)},200)}}}}function previewIsEmpty(preview){if(!preview||preview.substr(0,previewToken.length)==previewToken){return true}return false}function getEditorContent(isMarkdown){if(!isMarkdown){var editor=tinymce.activeEditor;if(editor){var content=$(editor.getBody());content.find("pinit").remove();content.find(".thunderpin").remove();content.find(".pin").parent().remove();content=$(content).html();if(content){while(true){var lastEndScriptPos=content.lastIndexOf("</script>");if(lastEndScriptPos==-1){return content}var length=content.length;if(length-9==lastEndScriptPos){var lastScriptPos=content.lastIndexOf("<script ");if(lastScriptPos==-1){lastScriptPos=content.lastIndexOf("<script>")}if(lastScriptPos!=-1){content=content.substring(0,lastScriptPos)}else{return content}}else{return content}}}return content}}else{return[$("#wmd-input").val(),$("#wmd-preview").html()]}}LEA.editorStatus=true;function disableEditor(){var editor=tinymce.activeEditor;if(editor){editor.hide();LEA.editorStatus=false;$("#mceTollbarMark").show().css("z-index",1e3)}}function enableEditor(){if(LEA.editorStatus){return}$("#mceTollbarMark").css("z-index",-1).hide();var editor=tinymce.activeEditor;if(editor){editor.show()}}$(function(){if($.pnotify){$.pnotify.defaults.delay=1e3}});function notifyInfo(text){$.pnotify({title:"通知",text:text,type:"info",styling:"bootstrap"})}function notifyError(text){$.pnotify.defaults.delay=2e3;$.pnotify({title:"通知",text:text,type:"error",styling:"bootstrap"})}function showDialog(id,options){$("#leanoteDialog #modalTitle").html(options.title);$("#leanoteDialog .modal-body").html($("#"+id+" .modal-body").html());$("#leanoteDialog .modal-footer").html($("#"+id+" .modal-footer").html());delete options.title;options.show=true;$("#leanoteDialog").modal(options)}function hideDialog(timeout){if(!timeout){timeout=0}setTimeout(function(){$("#leanoteDialog").modal("hide")},timeout)}function closeDialog(){$(".modal").modal("hide")}function showDialog2(id,options){options=options||{};options.show=true;$(id).modal(options)}function hideDialog2(id,timeout){if(!timeout){timeout=0}setTimeout(function(){$(id).modal("hide")},timeout)}function showDialogRemote(url,data){data=data||{};url+="?";for(var i in data){url+=i+"="+data[i]+"&"}$("#leanoteDialogRemote").modal({remote:url})}function hideDialogRemote(){$("#leanoteDialogRemote").modal("hide")}$(function(){if($.pnotify){$.pnotify.defaults.delay=1e3}});function notifyInfo(text){$.pnotify({title:"通知",text:text,type:"info",styling:"bootstrap"})}function notifyError(text){$.pnotify.defaults.delay=2e3;$.pnotify({title:"通知",text:text,type:"error",styling:"bootstrap"})}function notifySuccess(text){$.pnotify({title:"通知",text:text,type:"success",styling:"bootstrap"})}Date.prototype.format=function(fmt){var o={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};if(/(y+)/.test(fmt))fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));for(var k in o)if(new RegExp("("+k+")").test(fmt))fmt=fmt.replace(RegExp.$1,RegExp.$1.length==1?o[k]:("00"+o[k]).substr((""+o[k]).length));return fmt};function goNowToDatetime(goNow){if(!goNow){return""}return goNow.substr(0,10)+" "+goNow.substr(11,8)}function getCurDate(){return(new Date).format("yyyy-M-d")}function enter(parent,children,func){if(!parent){parent="body"}$(parent).on("keydown",children,function(e){if(e.keyCode==13){func.call(this)}})}function enterBlur(parent,children){if(!parent){parent="body"}if(!children){children=parent;parent="body"}$(parent).on("keydown",children,function(e){if(e.keyCode==13){$(this).trigger("blur")}})}function getObjectId(){return ObjectId()}function resizeEditor(second){var ifrParent=$("#editorContent_ifr").parent();ifrParent.css("overflow","auto");var height=$("#editorContent").height();ifrParent.height(height);$("#editorContent_ifr").height(height)}function showMsg(msg,timeout){$("#msg").html(msg);if(timeout){setTimeout(function(){$("#msg").html("")},timeout)}}function showMsg2(id,msg,timeout){$(id).html(msg);if(timeout){setTimeout(function(){$(id).html("")},timeout)}}function showAlert(id,msg,type,id2Focus){$(id).html(msg).removeClass("alert-danger").removeClass("alert-success").removeClass("alert-warning").addClass("alert-"+type).show();if(id2Focus){$(id2Focus).focus()}}function hideAlert(id,timeout){if(timeout){setTimeout(function(){$(id).hide()},timeout)}else{$(id).hide()}}function post(url,param,func,btnId){var btnPreText;if(btnId){btnPreText=$(btnId).html();$(btnId).html("正在处理").addClass("disabled")}ajaxPost(url,param,function(ret){if(btnPreText){$(btnId).html(btnPreText).removeClass("disabled")}if(typeof ret=="object"){if(typeof func=="function"){func(ret)}}else{alert("leanote出现了错误!")}})}function isEmail(email){var myreg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[0-9a-zA-Z]{2,3}$/;return myreg.test(email)}function isEmailFromInput(inputId,msgId,selfBlankMsg,selfInvalidMsg){var val=$(inputId).val();var msg=function(){};if(msgId){msg=function(msgId,msg){showAlert(msgId,msg,"danger",inputId)}}if(!val){msg(msgId,selfBlankMsg||"请输入邮箱")}else if(!isEmail(val)){msg(msgId,selfInvalidMsg||"请输入正确的邮箱")}else{return val}}function initCopy(aId,postFunc){var clip=new ZeroClipboard(document.getElementById(aId),{moviePath:"/js/ZeroClipboard/ZeroClipboard.swf"});clip.on("complete",function(client,args){postFunc(args)})}function showLoading(){$("#loading").css("visibility","visible")}function hideLoading(){$("#loading").css("visibility","hidden")}function logout(){$.removeCookie("LEANOTE_SESSION");location.href="/logout?id=1"}function getImageSize(url,callback){var img=document.createElement("img");function done(width,height){img.parentNode.removeChild(img);callback({width:width,height:height})}img.onload=function(){done(img.clientWidth,img.clientHeight)};img.onerror=function(){done()};img.src=url;var style=img.style;style.visibility="hidden";style.position="fixed";style.bottom=style.left=0;style.width=style.height="auto";document.body.appendChild(img)}function hiddenIframeBorder(){$(".mce-window iframe").attr("frameborder","no").attr("scrolling","no")}var email2LoginAddress={"qq.com":"http://mail.qq.com","gmail.com":"http://mail.google.com","sina.com":"http://mail.sina.com.cn","163.com":"http://mail.163.com","126.com":"http://mail.126.com","yeah.net":"http://www.yeah.net/","sohu.com":"http://mail.sohu.com/","tom.com":"http://mail.tom.com/","sogou.com":"http://mail.sogou.com/","139.com":"http://mail.10086.cn/","hotmail.com":"http://www.hotmail.com","live.com":"http://login.live.com/","live.cn":"http://login.live.cn/","live.com.cn":"http://login.live.com.cn","189.com":"http://webmail16.189.cn/webmail/","yahoo.com.cn":"http://mail.cn.yahoo.com/","yahoo.cn":"http://mail.cn.yahoo.com/","eyou.com":"http://www.eyou.com/","21cn.com":"http://mail.21cn.com/","188.com":"http://www.188.com/","foxmail.coom":"http://www.foxmail.com"};function getEmailLoginAddress(email){if(!email){return}var arr=email.split("@");if(!arr||arr.length<2){return}var addr=arr[1];return email2LoginAddress[addr]||"http://mail."+addr}function reIsOk(re){return re&&typeof re=="object"&&re.Ok}LEA.bookmark=null;function saveBookmark(){try{bookmark=tinymce.activeEditor.selection.getBookmark()}catch(e){}}function restoreBookmark(){try{var editor=tinymce.activeEditor;editor.focus();editor.selection.moveToBookmark(LEA.bookmark)}catch(e){}}var u=navigator.userAgent;LEA.isMobile=/Mobile|Android|iPhone/i.test(u);function getMsg(key){return MSG[key]||key}