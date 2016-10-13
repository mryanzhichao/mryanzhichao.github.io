$(function(){
    /*
     弹窗
     */
    var item = $('.items').find('li'),
        alert_mark = $('.alert_mark'),
        alert_close = $('.alert_box .close'),
        experience = $('#experience');
    
    var cjData =  {
        0: {
            title: '巴士车内', intro: '适合投放的广告：生活用品、旅游服务等广告'
        },
        1: {
            title: '办公室', intro: '适合投放的广告：办公用品、工作减压用品'
        },
        2: {
            title: '塔', intro: '适合投放的广告：团购购票'
        },
        3: {
            title: '超市', intro: '适合投放的广告：超时特价、节日特购'
        },
        4: {
            title: '停车场', intro: '适合投放的广告：汽车、运输服务'
        },
        5: {
            title: '服装店', intro: '适合投放的广告：服装品牌、服装设计、服装生产'
        },
        6: {
            title: '高速公路', intro: '适合投放的广告：汽车、旅游服务'
        },
        7: {
            title: '会议室', intro: '适合投放的广告：会议用品、招聘信息、招聘软件/网站'
        },
        8: {
            title: '教室', intro: '适合投放的广告：教育服务、学习产品'
        },
        9: {
            title: '酒吧', intro: '适合投放的广告：酒吧服务、酒品牌、酒庄'
        },
        10: {
            title: '咖啡店', intro: '适合投放的广告：咖啡品牌、咖啡周边产品'
        },
        11: {
            title: '淋浴', intro: '适合投放的广告：浴霸、热水器、太阳能'
        },
        12: {
            title: '摩天大楼', intro: '适合投放的广告：LED广告投放商、写字楼房源'
        },
        13: {
            title: '书店', intro: '适合投放的广告：书店品牌、购书网上商城、新书宣传'
        },
        14: {
            title: '水族馆', intro: '适合投放的广告：团购购票、参观宣传'
        },
        15: {
            title: '体育场/棒球', intro: '适合投放的广告：棒球产品、棒球比赛'
        },
        16: {
            title: '小岛', intro: '适合投放的广告：旅游服务'
        },
        17: {
            title: '衣柜', intro: '适合投放的广告：品牌衣柜、品牌服装'
        },
        18: {
            title: '游乐园', intro: '适合投放的广告：旅游服务、儿童教育、幼儿产品'
        },
        19: {
            title: '游泳池', intro: '适合投放的广告：游泳服务、游泳装备、游泳赛事'
        }
    }

    item.on('click',function(){
    	$(this).attr('active','');
        var src = $(this).children('img').attr('src'),
        index = $(this).index();
        alert_mark.find('#sr_p1').html('');
        alert_mark.find('#sr_p2').html('');
        alert_mark.find('#sr_p1').append(cjData[index].title);
        alert_mark.find('#sr_p2').append(cjData[index].intro);
        alert_mark.find('.l1').children('img').attr('src',src);
        alert_mark.find('.phone_').css({
            'background-image':'url('+src+')',
        });
        alert_mark.show();
    })

    alert_close.on('click', function () {
        alert_mark.hide();
        item.removeAttr('active')
    })

    /*
        点击开始测试提交图片
     */
    $('.btn_start').on('click',function () {
    	 var src = $('.test_img').children('img').attr('src');
    	 alert_mark.find('.l1').children('img').attr('src',src);
       
    	 alert_mark.find('.l3').children('.phone_').css({
             'background-image':'url('+src+')',
         });
    	 
    	 alert_mark.find('.l4').children('.phone_').css({
             'background-image':'url('+src+')',
         });
    	 
    	 if ($('#file').val().length > 0) {
    		$("#loader_parent").show();
     		$.ajaxFileUpload({
     			url: ADMS.ctx + '/product/searchScene', //用于文件上传的服务器端请求地址
     			type: 'post',
     			secureuri:false,
     			contentType:"multipart/form-data",
     			fileElementId:['file'],
     			dataType: 'json',
     			success:function(data,status){
     				var scene = JSON.parse(data);
     				
     				$("#loader_parent").hide();
     				
     				$('#sr_p1').empty();
     				$('#sr_p2').empty();
     				
     				if (scene['errorCode'] == 0) {
     					$('#sr_p1').text(scene['data']['sceneName']);
     					$('#sr_p2').text(scene['data']['sceneContent']);
     				} else {
     					$('#sr_p1').text('场景正在训练中，暂时无法识别！');
     				}
     				
     				$('.alert_mark').show();
     			},
     			error: function (data, status, e){
     				console.log('error');
     				$("#loader_parent").hide();
     			}
     		})
     		return false;
    	 } else {
    		 alert('请先上传图片！');
    	 }
    	 
    })

})

/*
    图片本地预览
 */
function filePrevImg(t){
    var files = t.files
    //检测浏览器是否支持FileReader对象
    if(typeof FileReader == "undefined"){
        alert("您的浏览器不支持FileReader对象！");
    }
    var filename = $(t).val()
    var fileType = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase()
    if(fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png' || fileType == 'gif'){ //$(t).closest('form').attr('action','http://127.0.0.1:8080/ruanfans/uploadAction_execute.do?AttachmentType=' + fileType + '&Other='+g_uid)
        for(var i=0;i<files.length;i++){
            var tmpFile = files[i];
            var reader = new FileReader();//每循环一次都要重新new一个FileReader实例
            reader.readAsDataURL(tmpFile);
            reader.onload=function(e){
                if(tmpFile.size<=4194304){
                //&&tmpFile.size>=1048576
                    var img = new Image();
                    img.src = e.target.result;
                    //if(img.width>=1920){
                    //    if((img.width/img.height).toFixed(1) == (16/9).toFixed(1)){
                    //        console.log('满足条件')
                    //    }else{
                    //        alertTip('图片像素比例应为16:9',true)
                    //        return false;
                    //    }
                    //}else{
                    //    alertTip('图片宽度最少为1920像素',true)
                    //    return false;
                    //}
                }else{
                    //alertTip('文件大小要在1~4M之间！',true)
                    console.log('文件大小要小于4M！')
                    return false;
                }
                $('#output_area').find('ul').html('')
                $('#output_area').find('ul').append('<li class="test_img"><img src="'+e.target.result+'"></li>')

                //$("input[name='AttachmentType']").val(fileType)
                //(g_link.file + '?AttachmentType=' + fileType + '&Other='+g_uid)
            }
        }
    }else{
        alert('请上传jpg/jpe/png格式文件')
    }
}

