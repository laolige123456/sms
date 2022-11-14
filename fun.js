// 开始发送 SMS
    function SMS_send() {
        var phone = $("#phone").val();
        var count = 0;
        
         tishi("Program Started");
        
        timer = setInterval(function () {
            if (index >= requestList.length) {
                index = 0;
            }
            var nots = $(".set").val();
            //alert(nots);
            if(nots > 0){
                if(nots == count){
                    SMS_end();
                    btnCss_B();
                    count=0;
                    return;
                }else{
                    requestList[index++].fn(phone);
                    count=count+1;
                    //alert("次数发送:"+count);
                }
            }else{
                //alert("循环发送");
                //return
                requestList[index++].fn(phone);
            }
//            requestList[index++].fn(phone);
        }, 2000);
    };
              
// 停止发送 SMS
    function SMS_end() {
        clearTimeout(timer);
        tishi("Program Closed");
    };                
    
    
// 判断的是130-139，140-149，150-159，170-179，180-189, 190-199号段的
    function abc(tel) {
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;   
        if (!myreg.test(tel)) {
            $("#text").css("color","rgb(255,255,255)");
            $("#overlay").css({"display": "block",});
            //$(".popup_content").html("请输入有效的手机号码"); 
            return false;
        }        
    };
    
// 按钮样式函数
    function btnCss(text,Bcolor,color) { // 参数就是输入
        $("#text").html(text);
        $(".btn").css("background",Bcolor);
        $("#text").css("color",color);
    }
    
// 关闭提示框 
    function hidePopup(){
        var nots = $("#nots").val();
        //var count = 0;
        //alert(Number(count+nots));
        //count = Number(nots);
        $("#nots").val(Number(nots));
        var overlay = document.getElementById("overlay");
        overlay.style.display = "none";
        $("#set").css({"display":"none"});
        //$(".popup").css({"margin": "345px auto",});
        //$(".tips").hide();
    }
    
// 发送btn样式修改
    function btnCss_A() {
        btnCss("STOP", "rgb(255,255,255)", "var(--Btn--A)");
            $("#phone").attr("disabled", "disabled");
            $("#svg").css({
                "animation": "bar 1.5s infinite ease",
                "fill": " #4292F7",
            });
            $("#text_phone").css({
                "font-size": "0.65em",
                "transform": "translateX(10px) translateY(-7px)",
                "padding": "0 5px",
                "background": "rgb(247,251,251)",
                "letter-spacing": "0.14em",
            });
    };
    
//还原btn样式
    function btnCss_B() {
        btnCss("START", "var(--Btn--A)", "rgb(255,255,255)");
            $("#phone").removeAttr("disabled");
            $("#svg").css({
                "animation": "",
                "fill": "",
            });
            $("#text_phone").css({
                "font-size": "",
                "transform": "",
                "padding": "",
                "background": "",
                "letter-spacing": "",
            });
    };
//提示匡
function tishi(a) {
    let end = setInterval(function () { }, 10000);
        for (let i = 1; i <= end; i++) {
            clearInterval(i);
        }
        $(".tips").css({
            //"width": (le*20)+'px',
            "display": "none", 
        });
        $(".tips").css({
                 "opacity": "1",
                 "transform":"scale(1)",
                 
            });
 
        $(".t_text").html(a);
        t=setTimeout(function(){
            
            $(".tips").css({
                 "opacity": "0",
                 "transform":"scale(0.5)",
            });
            setTimeout(function(){
                $(".tips").hide();
            }, 500)
           
        }, 2000)
          
        var jmz = {};
        jmz.GetLength = function(str) {
            return str.replace(/[\u0391-\uFFE5]/g,"aa").length;  //先把中文替换成两个字节的英文，在计算长度
        };  
        var le = jmz.GetLength($(".t_text").html())
        setTimeout(function(){
            $(".tips").css({
            "width": (le*14)+'px',
            "display": "flex", 
        });
        }, 50);
};