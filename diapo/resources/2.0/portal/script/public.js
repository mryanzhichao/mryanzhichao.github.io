$(function(){
    /*
        导航
     */
    var i=1;
    $('.line').on('click',function(){
        if(i==1){
            $('.nav-list').slideDown(200);
            i=2;
        }else{
            $('.nav-list').slideUp(200);
            i=1;
        }
    });

})
