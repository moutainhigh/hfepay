$(function(){$("#query").click(function(){toPage(1)});toPage(1)});function toPage(a){var b=$("#form").serialize();$.ajax({type:"POST",url:"platformqrcode/content?pageNo="+a,data:b,success:function(c){$("#tablec").html(c)}})}function updateStatus(b){var d=$(b);var c=d.attr("value");var a=d.attr("status");bootbox.setLocale("zh_CN");bootbox.confirm("确定执行该操作吗?",function(e){if(e){$.ajax({type:"POST",url:"platformqrcode/updateStatus",data:{id:c,qrStatus:a},success:function(f){f=$.parseJSON(f);bootbox.alert(f.message,function(){if(f.status==1){a=a==1?2:1;d.parent().prev().html(d.text());var g=d.text().trim()=="启用"?'<span class="label label-danger">禁用</span>':'<span class="label label-success">启用</span>';d.attr("status",a);d.html(g)}})}})}})};