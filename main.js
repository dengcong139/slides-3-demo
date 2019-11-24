let $buttons=$('#buttonWrapper>button');
let current=0;
let $sildes=$('#slides')
let $images=$sildes.children('img')
let $firstCopy=$images.eq(0).clone(true);//true表示同时克隆他的后代
let $lastCopy=$images.eq($images.length-1).clone(true)
//将第一张追加到最后一张后面,最后一张追加到第一张前面
$sildes.append($firstCopy);
$sildes.prepend($lastCopy);
//起初显示第1张图
$sildes.css({transform:'translateX(-400px)'}) 
bindEvents();
//点击上下页翻页
$(next).on('click',function(){
    gotoSlide(current+1);
})
$(previous).on('click',function(){
    gotoSlide(current-1);
})
//设置自动滚动
let timeID=setInterval(function(){
    gotoSlide(current+1);
},2000)
//设置鼠标移进图片取消轮播
$('.container').on('mouseenter',function(){
    window.clearInterval(timeID);
}).on('mouseleave',function(){//设置鼠标移出图片,轮播恢复
    timeID=setInterval(function(){
        gotoSlide(current+1);   
    },2000)
})

function bindEvents(){
    $('#buttonWrapper').on('click','button',function(e){
        let $button = $(e.currentTarget)
        let index=$button.index();
        gotoSlide(index);
    })
}
function gotoSlide(index){
    if(index>$buttons.length-1){
        index=0;
    }else if(index<0){
        index=$buttons.length-1;
    }
    if(current === $buttons.length-1 && index === 0){
        //从最后一张到第一张
        $sildes.css({transform:`translateX(${-($buttons.length+1)*400}px)`})
        .one('transitioned',function(){
            $sildes.hide().offset();
            $sildes.css({transform:`translateX(${-(index+1)*400}px)`}).show();
        })
    }else if(current === 0 && index === $buttons.length - 1){
        //如果从第一张到最后一张
        $sildes.css({transform:'translateX(0px)'})
        .one('transitioned',function(){
            $sildes.hide().offset();
            $sildes.css({transform:`translateX(${-(index+1)*400}px)`}).show();
        })
    }else{
        $sildes.css({transform:`translateX(${-(index+1)*400}px)`}).show();
    }
    current=index;
}
// $buttons.eq(0).on('click',function(){
//     console.log(current);
//     if(current==4){
//         //如果从最后一张到第一张
//         console.log("从最后一张到第一张")
//         $sildes.css({transform:'translateX(-2400px)'})
//         .one('transitioned',function(){
//             $sildes.hide().offset();
//             $sildes.css({transform:'translateX(-400px)'}).show();
//         })
//         console.log(current);
//     }else{
//         $sildes.css({transform:'translateX(-400px)'})
//     }
//     current=0;
// })
// $buttons.eq(1).on('click',function(){
//     console.log(current);
//     $sildes.css({transform:'translateX(-800px)'})
//     current=1;
// })
// $buttons.eq(2).on('click',function(){
//     console.log(current);
//     $sildes.css({transform:'translateX(-1200px)'})
//     current=2;
// })
// $buttons.eq(3).on('click',function(){
//     console.log(current);
//     $sildes.css({transform:'translateX(-1600px)'})
//     current=3;
// })
// $buttons.eq(4).on('click',function(){
//     console.log(current);
//     if(current==0){
//         //如果从第一张到最后一张
//         console.log("从第一张到最后一张")
//         $sildes.css({transform:'translateX(0px)'})
//         .one('transitioned',function(){
//             $sildes.hide().offset();
//             $sildes.css({transform:'translateX(-2000px)'}).show();
//         })
//         console.log(current);

//     }else{
//         $sildes.css({transform:'translateX(-2000px)'})
       
//     }
//     current=4;
// })