$(function() {
  // var url = window.location.pathname
  // session接口
  
  $.fetch({
    url: "/login/sessCx",
    type: "get"
  }).done(function(result) {
      var data = result.returnData;
      if (data.executeResult == "1") {
        var session_mc = data.sessionEntity.xzqhdmmc
        var session_id = data.sessionEntity.xzqhdm
        // 存到session
        sessionStorage.setItem("xzqhid", data.sessionEntity.xzqhdm);
        sessionStorage.setItem("xzqhmc", data.sessionEntity.xzqhdmmc);
        sessionStorage.setItem("sjh", data.sessionEntity.sjh);
        $(".J_hj_select").val(session_mc)
        $(".session_mc").html(session_mc);
      } else {
        $.layerMsg(data.message, "我知道了");
      }
    })
  // 退出登录
  $('body').on('click', '.loginout', function(){
    $.layerMsg('是否退出', [{text: '确定', cb: function () {
      $.fetch({
        url: "/logout/logout",
        type: "get"
      }).done(function(result) {
        var data = result.returnData;
            if (data.executeResult == "1") {
              window.location.href =  conf.urlPrefix + "/login.html";
            } 
      })
    }}, {text: '取消'}]);
    
  })
  // 图片跳转
  $('body').on('click', '.img_link' ,function(){
    // window.location.href ='http://121.43.68.40/exposure/jiucuo.html?site_code=1100000062&url=http%3A%2F%2Fwww.bjrbj.gov.cn%2Fjycy%2Fjycs'
  })
  // 单选框切换
  $(document).on("click",".radio_wrap",function(e){
    var _this  = $(this),
        _   = {
            yes : 'radio_yes',
            no  : 'radio_no',
            flag : _this.attr('radio')
        },
        $all   = $(".radio_wrap[radio='"+ _.flag +"']").find("i"),
        $i  = _this.find("i");
    if(!$i.hasClass(_.yes)){
        $all.removeClass(_.yes).addClass(_.no);
        $i.removeClass(_.no).addClass(_.yes);
    }
  });
});
