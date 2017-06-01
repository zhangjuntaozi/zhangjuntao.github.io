window.onload=function(){
    let canvas=document.querySelector('canvas');
    let ctx=canvas.getContext('2d');
    let opcity=document.querySelector('.opcity');
    console.log(opcity);
    let palette=new Palette(canvas,ctx,opcity);
    let line=document.querySelector('.icon-xian');
    let pen=document.querySelector('.icon-qianbi01');
    let squre=document.querySelector('.icon-juxing');
    let polygon=document.querySelector('.icon-duobianxing');
    let circle=document.querySelector('.icon-yuan');
    let earser=document.querySelector('.icon-xiangpical');
    let eraserBtn=document.querySelector('.eraserBtn');
    let round=document.querySelector('.icon-rounded-corners-stroke1-s40-r06')
    let dashed=document.querySelector('.icon-xuxian');
    let polygonJ=document.querySelector('.icon-wujiaoxing');
    let chong=document.querySelector('.icon-tianchong');
    let bian=document.querySelector('.icon-miaobian');
    let fcolor=document.querySelector('.fcolor');
    let fcolor1=document.querySelector('.fcolor1');
    let text=document.querySelector('.icon-wenzi');
    let save=document.querySelector('.save');
    let img=document.querySelector('img');
    let newB=document.querySelector('.new');
    let cut=document.querySelector('.cut');
    let clip=document.querySelector('.clip');
    let cancel=document.querySelector('.cancel');
    let load=document.querySelector('.load');
    let screen=document.querySelector('.screen');
    console.log(fcolor)
    line.addEventListener('click',function(){
        palette.line();
    },false);
    pen.addEventListener('click',function(){
        palette.penpil();
    },false);
    squre.addEventListener('click',function(){
        palette.squre();
    },false);
    polygon.addEventListener('click',function(){
        let bian=prompt('请输入边数',6);
        // console.log(bian)
        palette.polygon(bian);
    },false)
    polygonJ.addEventListener('click',function(){
        let num=prompt('请输入角数',5);
        palette.polygonJ(Math.abs(num));
    },false)
    circle.addEventListener('click',function(){
        palette.circle();
    },false)
    earser.addEventListener('click',function(){
        let w=prompt('请输入橡皮的宽','50');
        palette.earser(w,w,eraserBtn);
    },false)
    round.addEventListener('click',function(){
        palette.round();
    },false)
    dashed.addEventListener('click',function(){
        palette.dashed();
    },false)
    chong.addEventListener('click',function(){
        palette.fill();
    },false)
    bian.addEventListener('click',function(){
        palette.strok();
    },false)
    fcolor.onchange=function(){
        palette.fcolor(fcolor.value);
    }
    fcolor1.onchange=function(){
        palette.fcolor1(fcolor1.value);
    }
    text.addEventListener('click',function(){
        palette.text();
    },false)
    save.addEventListener('click',function(){
        palette.save(img);
    },false)
    newB.addEventListener('click',function(){
        palette.newB(img);
    },false)
    cut.addEventListener('click',function(){
        palette.cut(clip);
    },false)
    cancel.addEventListener('click',function(){
        palette.cancel();
    },false)
    load.addEventListener('click',function(){
        palette.load();
    },false)
    screen.addEventListener('click',function(){
        palette.screen();
    },false)
}