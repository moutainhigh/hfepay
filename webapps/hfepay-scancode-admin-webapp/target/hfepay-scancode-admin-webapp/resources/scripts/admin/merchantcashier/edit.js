$(function(){Metronic.init();Layout.init();QuickSidebar.init();Demo.init();$(".date-picker").datepicker({rtl:Metronic.isRTL(),orientation:"left",autoclose:true});$("#cancle").click(function(){history.go(-1)});$.validator.addMethod("isMobile",function(l,j){var k=l.length;var i=/^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;return this.optional(j)||(k==11&&i.test(l))},"请正确填写您的手机号码");$.validator.addMethod("isLegalCard",function(k,j){var i=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;return this.optional(j)||(i.test(k))},"身份证格式错误");$.validator.addMethod("isIllegalString",function(k,j){var i=/[@#\$%\^&\*]+/g;return this.optional(j)||(!i.test(k))},"不能使用非法字符");$.validator.addMethod("isBlank",function(j,i){return $.trim(j)!=""},"不能为空");$("#form").validate({event:"blur",rules:{cashierNo:{required:true,maxlength:25},storeNo:{required:true,maxlength:25},merchantNo:{required:true,maxlength:25},userName:{required:true,maxlength:25,isIllegalString:true,isBlank:true},idCard:{required:true,maxlength:18,isIllegalString:true,isBlank:true,isLegalCard:true},mobile:{required:true,maxlength:11,isMobile:true},openId:{required:true,maxlength:50}},messages:{cashierNo:{required:"请输入【收银员编号】",maxlength:"长度不能超过25"},storeNo:{required:"请输入【门店编号】",maxlength:"长度不能超过25"},merchantNo:{required:"请输入【商户编号】",maxlength:"长度不能超过25"},userName:{required:"请输入【姓名】",maxlength:"长度不能超过25"},idCard:{required:"请输入【身份证号】",maxlength:"长度不能超过18"},mobile:{required:"请输入【手机号码】",maxlength:"长度不能超过11"},openId:{required:"请输入【收银员微信OPENID】",maxlength:"长度不能超过50"}},submitHandler:function(m){var i=0;var l="";if(i==0){$("#save").attr("disabled","disabled");var k=$("#baseUrl").text().trim();var j=$("#form").serialize();$.ajax({url:k+"/adminManage/merchantcashier/save",data:j,type:"POST",success:function(n){n=$.parseJSON(n);bootbox.alert(n.values,function(){if(n.executeStatus=="0"){location.href=k+n.url}})}})}else{bootbox.alert(l,function(){})}return false},errorPlacement:function(i,j){i.appendTo(j.parent().parent())}});var g=$("select.form-control");for(var b=0;b<g.size();b++){var d=$(g[b]);var h=d.attr("id");var f=$("."+h).val();var c=d.find("option");for(var a=0;a<c.size();a++){var e=$(c[a]).val();if(e==f){$(c[a]).attr("selected","selected")}else{$(c[a]).removeClass("selected")}}}});