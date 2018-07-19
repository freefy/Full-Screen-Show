//动态生成的btn和<li>
// 2.找索引值lastIndex 和activeIndex
// 3.on('go') 和on('come')
//4.点击eq(lastIndex).trigger('go') eq(activeIndex).trigger('come')

var $wrapper=$('.lbt'),
    $slider = $('.slider'), 
    sliderLen = $slider.length,
    activeIndex = 0,
    lastIndex,
    timer,
    flag = true ;
// 节约性能,获取dom元素,最好在前面设置变量存,而不是每次都通过$去查找
function createDom(len){
    if(len > 1){
        var str ='';//先拼接好再插入dom,减少重排重绘,节约性能;
        for(var i = 0; i < len; i ++){
            if(i == 0){
                str += '<li class ="active"></li>';
            }
            else{
                str +='<li></li>';
            }
        }
            var pointerStr= '<div class="slider-point"><ul>'+str+'</ul></div>';
            var btnStr = '\
            <div class="slider-btn">\
            <span class="pre-btn"></span>\
            <span class="next-btn"></span>\
             </div>';
            $wrapper.append(pointerStr).append(btnStr);
            // 不使用html('pointerStr')是后面还要插入其他,会替换覆盖;
    }
}
createDom(sliderLen);
sliderAuto();
// 最好封装为立即执行函数
//  (function(len){
//    if(len > 1){
//     var str ='';//先拼接好再插入dom,减少重排重绘,节约性能;
//     for(var i = 0; i < len; i ++){
//         if(i == 0){
//             str += '<li class ="active"></li>';
//         }
//         else{
//             str +='<li></li>';
//         }
//     }
//         var pointerStr= '<div class="slider-point"><ul>'+str+'</ul></div>';
//         var btnStr = '\
//         <div class="slider-btn">\
//         <span class="pre-btn"></span>\
//         <span class="next-btn"></span>\
//          </div>';
//         $wrapper.append(pointerStr).append(btnStr);
//         // 不使用html('pointerStr')是后面还要插入其他,会替换覆盖;
// }
// })(sliderLen)

//查找上一页和下一页--->索引值
var $preBtn = $('.pre-btn'),
    $nextBtn = $('.next-btn'),
    $point = $('.slider-point li');
 
    
  $preBtn.on('click',function(){
    clickFun('prev');
})  
  $nextBtn.on('click',function(){
   clickFun('next');
    
  })  
  $point.on('click',function(){
      var index = $(this).index();
    clickFun(index);
    
  })  
  function clickFun(index){
      if(flag){
          $.getSliderIndex(index);
          if(lastIndex != activeIndex){
              flag = false;
              $slider.eq(lastIndex).trigger('go').end().eq(activeIndex).trigger('come');
              pointStyle();
          }
         
}
  }
//找索引值(上一页和下一页)//把上一页隐藏,下一页显示(动画显示)
$.extend({
    getSliderIndex:function(direction){
        lastIndex = activeIndex;//上一页即在当前活动页改变之前那一页
        if(direction == 'next'){
            activeIndex = activeIndex == sliderLen -1 ? 0 :activeIndex+1;
            // console.log(activeIndex);
        }else if(direction =='prev'){
            activeIndex = activeIndex == 0 ? sliderLen-1 :activeIndex-1;
            // console.log(activeIndex);
        }else{
            activeIndex = direction;
            // console.log(activeIndex);
        }
       
    }

}) 
$slider.on('go',function(){
    $slider.eq(lastIndex).fadeOut(300).find($('.slider-content')).animate({fontSize:'16px'}).end().find($('.slider-image')).delay(300).animate({width:'0%'});
})
$slider.on('come',function(){
    $slider.eq(activeIndex).delay(300).fadeIn(300).find($('.slider-content')).animate({fontSize:'20px'},300).end().find($('.slider-image')).delay(300).animate({width:'40%'},function(){
        flag=true;
    });
})
// delay(300)fadeOut后再fadeInt; 
function pointStyle(){
    $('.active').removeClass('active');
    $point.eq(activeIndex).addClass('active');
}
function sliderAuto(){
    timer = setInterval(function(){
        clickFun('next');
    },3000)
}

