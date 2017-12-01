(function(){
    var bannerSwiper = new Swiper(".bannerSwiper",{
        pagination:'.swiper-pagination',
        autoplay:2000,
    })
    $("#more").on('click',function(){
        $('.mask').fadeIn(200);
        $('.rightBar').show(200);
    })
    $('.mask').on('click',function(){
        $(this).fadeOut(200);
        $('.rightBar').hide(200);
    })
    $.ajax({
        url:'js/data.json',
        success:function(data){
            data.forEach(val=>{ //压缩ES6语法 会报错 unable to minify JavaScript
                $(`<a href="javascript:;">
					<img src="${val.img}">
					<p>${val.p}</p>
				</a>`).appendTo($('.list'))
            })
        }
    })
})();