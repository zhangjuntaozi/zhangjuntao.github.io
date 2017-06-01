$(function(){
    let li=$('li');
    let lis=$('li>img');
    let mask=$('.mask');
    let img=$('img',mask);
    let close=$('.icon-close',mask);
    let btnL=$('.icon-iconfonticonfontleft',mask);
    let btnR=$('.icon-right',mask);
    let index=0;
    lis.on('click',function(){
        let liImg=$(this).prop('src');
        img.prop('src',liImg);
        mask.addClass('active');
    })
    close.click(function () {
        mask.removeClass('active');
        mask.addClass('end');
    })
    btnL.click(function () {
        index--;
        if(index<0){
            index=0;
        }
        let limg=$(lis).eq(index).prop('src');
        img.prop('src',limg);
    })
    btnR.click(function(){
        index++;
        if(index>lis.length){
            index=lis.length;
        }
        let limg=$(lis).eq(index).prop('src');
        img.prop('src',limg);
    })
})