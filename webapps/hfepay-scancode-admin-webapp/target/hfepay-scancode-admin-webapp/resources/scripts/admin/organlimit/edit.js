$(function(){Metronic.init();Layout.init();QuickSidebar.init();Demo.init();$(".date-picker").datetimepicker({format:"yyyy-mm-dd hh:ii",weekStart:0,autoclose:true,todayHighlight:true,defaultDate:new Date(),startDate:new Date(),keyboardNavigation:true,todayBtn:"linked",clearBtn:"linked",language:"zh-CN"});$("#form").find("#cancle").click(function(){var i=$("#baseUrl").text().trim();window.location.href=i+"/adminManage/organlimit"});$("#organNo").selectpicker({noneSelectedText:"  --  请选择  --  ",noneResultsText:"查无数据！ {0}",style:"btn-select"}).init(function(){$("#organNo").next().find("input").on("input",function(p){$("#organNo").empty();$("#organNo").append("<option value='0'>  --  不限  --  </option>");var i=$("#organNo").next().find("input").val().trim();var j=$("#baseUrl").text().trim();if(i!=""){$.ajax({url:j+"/adminManage/adviertisementinfo/getorganlist",data:{organName:i},async:false,type:"POST",success:function(s){var s=JSON.parse(s);var t=s.objList;for(var q in t){var r="<option value='"+t[q].organNo+"'>"+t[q].organName+"</option>";$("#organNo").append(r)}}})}$("#organNo").selectpicker("refresh")});$("#organNo").selectpicker("val",$(".organNo").val())});function g(){var i=$("#limitType").val();if(i=="0"){$(".maxLimitDiv").hide();$("#maxLimit").val("")}else{$(".maxLimitDiv").show()}}$("#limitType").change(function(){g()});function a(){g()}var o=$("select.form-control");for(var l=0;l<o.size();l++){var n=$(o[l]);var c=n.attr("id");var e=$("."+c).val();var d=n.find("option");for(var k=0;k<d.size();k++){var f=$(d[k]).val();if(f==e){$(d[k]).attr("selected","selected")}else{$(d[k]).removeClass("selected")}}}$.validator.addMethod("isAmount",function(q,i){var p=q.length;var j=/^[0-9]+(\.[0-9]{1,2})?$/;return this.optional(i)||(j.test(q))},"请输入有效金额,最多两位小数");a();function m(){var p=$("#limitType").val();if(p!="0"){var i=$("#minLimit").val();var j=$("#maxLimit").val();if(Number(i)>Number(j)){return false}}return true}function h(){var p=$("#id").val();var i=false;var j=$("#baseUrl").text().trim();$.ajax({url:j+"/adminManage/organlimit/list",data:{organNo:$("#organNo").val(),limitType:$("#limitType").val(),limitPayCode:$("#limitPayCode").val(),limitMode:$("#limitMode").val()},type:"POST",async:false,success:function(r){var r=$.parseJSON(r);var q=r.objList;if(q.length==0){i=true}else{if(q.length==1){if(p==""){i=false}else{if(p!=q[0].id){i=false}else{i=true}}}}}});return i}function b(){var j=false;var r=$("#limitType").val();if(r!="1"){j=true;return j}var i=$("#organNo").val();if(i=="0"){j=true;return j}var q=$("#baseUrl").text().trim();var p=$("#form").serialize();$.ajax({url:q+"/adminManage/organlimit/checkLimit",data:p,type:"POST",async:false,success:function(s){s=$.parseJSON(s);if(s.executeStatus=="1"){j=false;bootbox.alert(s.values)}else{j=true}}});return j}$("#form").validate({event:"submit",rules:{limitType:{required:true},limitPayCode:{required:true},limitMode:{required:true},minLimit:{required:true,isAmount:true},maxLimit:{required:true,isAmount:true}},messages:{limitType:{required:"请选择【限额类型】",},limitPayCode:{required:"请选择【限额通道】",},limitMode:{required:"请选择【限制方式】"},minLimit:{required:"请输入【最低限额】"},maxLimit:{required:"请输入【最高限额】"}},submitHandler:function(t){var j=0;var s="";var q=true;var i=$("#organNo").val();if(i==""){$("#organNo").parent().parent().append('<label class="control-label error">请选择【机构名称】</label>');q=false}if(!q){return}if(!m()){j++;s+="最低限额不能比最高限额大<br>"}if(!h()){j++;s+="已存在该机构限额数据<br>"}if(!b()){q=false}if(!q){return}if(j==0){var r=$("#baseUrl").text().trim();var p=$("#form").serialize();$.ajax({url:r+"/adminManage/organlimit/save",data:p,type:"POST",success:function(u){u=$.parseJSON(u);bootbox.alert(u.values,function(){if(u.executeStatus=="0"){location.href=r+u.url}})}})}else{bootbox.alert(s,function(){})}return false},errorPlacement:function(i,j){i.appendTo(j.parent().parent())}})});