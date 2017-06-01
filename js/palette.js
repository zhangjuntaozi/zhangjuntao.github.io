function Palette(obj,ctx,opcity){
    this.obj=obj;
    this.ctx=ctx;
    this.opcity=opcity;
    //console.log(opcity)
    this.width=obj.width;
    this.height=obj.height;
    this.fillStyle='#ff7856';
    this.strokeStyle='#ff7856';
    this.lineWidth=5;
    this.lineCap='round';
    //填充和描边
    this.type="stroke";
    console.log(this.type);
    this.jiao=5;
    //线宽，
    this.num=5;
    //历史纪录
    this.history=[];
    // 保存
    this.imgeas=document.querySelector('img');
}
Palette.prototype= {
    init:function(){
        this.ctx.lineWidth=this.lineWidth;
        this.ctx.fillStyle=this.fillStyle;
        this.ctx.strokeStyle=this.strokeStyle;
        this.ctx.lineCap=this.lineCap;
        //this.ctx.setLineDash([]);
    },
    fill:function(){
        this.type="fill";
    },
    strok:function(){
        this.type="stroke";
    },
    fcolor:function(color){
        console.log(color)
        this.fillStyle=color;
    },
    fcolor1:function(color){
        this.strokeStyle=color;
        console.log(color)
    },
    line: function () {
        console.log(this.opcity);
        let self = this;

        self.opcity.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            console.log(self.opcity)
            self.opcity.onmousemove = function (e) {
                let mx = e.offsetX, my = e.offsetY;
                self.ctx.clearRect(0, 0, self.width, self.height);
               if (self.history.length > 0) {
                    self.ctx.putImageData(self.history[self.history.length - 1], 0, 0);
                }
                self.init();
                self.ctx.beginPath();
                self.ctx.moveTo(ox, oy);
                self.ctx.lineTo(mx, my);
                self.ctx.closePath();
                self.fill();
                self.ctx.stroke();
            }
            self.opcity.onmouseup = function () {
               self.history.push(self.ctx.getImageData(0, 0, self.width, self.height));
                self.opcity.onmousemove = null;
                self.opcity.onmouseup = null;
            }
        }
    },
    penpil: function () {
        let self = this;
        self.opcity.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            self.init();
            if(self.history.length>0){
                self.ctx.putImageData(self.history[self.history.length-1],0,0);
            }
            self.ctx.beginPath();
            self.ctx.moveTo(ox, oy);
            self.opcity.onmousemove = function (e) {
                let mx = e.offsetX, my = e.offsetY;
                self.ctx.lineTo(mx, my);
                self.ctx.stroke();
            }
            self.opcity.onmouseup = function () {
                self.ctx.closePath();
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.opcity.onmousemove = null;
                self.opcity.onmouseup = null;
            }
        }
    },
    /*squre: function () {
        let self = this;
        self.opcity.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            self.opcity.onmousemove = function (e)
                let mx = e.offsetX, my = e.offsetY;
                self.ctx.clearRect(0, 0, self.width, self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);

                self.ctx.beginPath();
                self.ctx.moveTo(ox, oy);
                self.ctx.lineTo(mx, my);
                self.ctx.closePath();
                self.ctx.fillRect(ox, oy, mx - ox, my - oy);
            }
        }
        self.opcity.onmouseup = function () {
            arr.push(self.ctx.getImageData(0, 0, self.width, self.height));
            self.opcity.onmousemove = null;
            self.opcity.onmouseup = null;
        }
    },*/
    squre:function(){   //rect(坐标，坐标，宽，高)
        let self=this;
        self.opcity.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.opcity.onmousemove=function(e){
                self.init();
                let mx=e.offsetX,my=e.offsetY;
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                let w=mx-ox,h=my-oy;
                self.ctx.beginPath();
                self.ctx.rect(ox,oy,w,h);
                self.ctx.closePath();
                //self.ctx.stroke();
                self.ctx[self.type]();
            }
            self.opcity.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.opcity.onmousemove=null;
                self.opcity.onmouseup=null;
            }
        }
    },
    polygon:function (num) {
        let self = this;
        console.log(num);
        self.opcity.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;

            self.opcity.onmousemove = function (e) {
                self.init();
                let mx = e.offsetX, my = e.offsetY;
                self.ctx.clearRect(0, 0, self.width, self.height);
                if (self.history.length > 0) {
                    self.ctx.putImageData(self.history[self.history.length - 1], 0, 0);
                }
                let angle = (360 /num) / 180 * Math.PI;
                //let radius = Math.sqrt((mx - ox) * (mx - ox) + (my - oy) * (my - oy));
                let radius=Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));
                self.ctx.beginPath();
                self.ctx.moveTo(ox + radius, oy);
                for (let i = 0; i <num; i++) {
                    //console.log(num);
                    let posX = ox + radius * Math.cos(angle * i), posY = oy + radius * Math.sin(angle * i);
                    self.ctx.lineTo(posX, posY);
                }
                self.ctx.closePath();
                //self.ctx.stroke();
                self.ctx[self.type]();
            }
            self.opcity.onmouseup = function () {
                self.history.push(self.ctx.getImageData(0, 0, self.width,self.height));
                self.opcity.onmousemove = null;
                self.opcity.onmouseup = null;
            }
        }
    },
    polygonJ:function (num) {   //多角形原理：利用外切大圆计算半径大的角度，利用大圆半径的一半计算小半径
        let self = this;
       // console.log(num);
        self.opcity.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;

            self.opcity.onmousemove = function (e) {
                self.init();
                let mx = e.offsetX, my = e.offsetY;
                self.ctx.clearRect(0, 0, self.width, self.height);
                if (self.history.length > 0) {
                    self.ctx.putImageData(self.history[self.history.length - 1], 0, 0);
                }
                let angle =( 360/(num*2)) / 180 * Math.PI;   //利用角数*2=边数计算角度换弧度
                //let radius = Math.sqrt((mx - ox) * (mx - ox) + (my - oy) * (my - oy));
                let radius=Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));  //半径=鼠标开始位置*平方+鼠标结束位置*平方
                let radius1=radius/2;  //小圆半径
                self.ctx.beginPath();
                self.ctx.moveTo(ox + radius, oy);           //开始鼠标位置+半径移动到圆边
                for (let i = 0; i<num*2; i++) {              //循环角点数  输入点数是大圆点数为奇数
                    //console.log(num);                                      小圆点数为偶数
                    if(i%2==0){
                        let posX = ox + radius * Math.cos(angle * i), posY = oy + radius * Math.sin(angle * i);
                        self.ctx.lineTo(posX, posY);          //结束坐标位置
                    }else{
                        let posX1 = ox + radius1 * Math.cos(angle * i), posY1 = oy + radius1 * Math.sin(angle * i);
                        self.ctx.lineTo(posX1, posY1);         //
                    }

                }
                self.ctx.closePath();
                //self.ctx.stroke();
                self.ctx[self.type]();
                //self.ctx.stroke();
            }
            self.opcity.onmouseup = function () {
                self.history.push(self.ctx.getImageData(0, 0, self.width,self.height));
                self.opcity.onmousemove = null;
                self.opcity.onmouseup = null;
            }
        }
    },
    circle:function(){
        let self=this;
        self.opcity.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.opcity.onmousemove=function(e){
                self.init();
                self.ctx.clearRect(0, 0, self.width, self.height);
                if (self.history.length > 0) {
                    self.ctx.putImageData(self.history[self.history.length - 1], 0, 0);
                }
                let mx=e.offsetX,my=e.offsetY;
                self.ctx.beginPath();
                let radius=mx-ox;
                self.ctx.arc(ox,oy,radius,0,Math.PI*2);
                //self.ctx.stroke();
                self.ctx[self.type]();
            }
            self.opcity.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0, 0, self.width, self.height));
                self.opcity.onmousemove=null;
                self.opcity.onmouseup=null;
            }
        }
    },
    /*earser:function(){
        let self=this;
        let arr=[];
        self.ctx.beginPath();
        self.opcity.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.opcity.onmousemove=function(e){
                if(arr.length>0){
                    arr.push(arr[arr.length-1]);
                }
                let mx=e.offsetX,my=e.offsetY;
                self.ctx.clearRect(ox,oy,mx-ox,my-oy);
            }
        }
    },*/
    earser:function(w,h,eraserBtn){
        let self=this;
        console.log(self);
        self.opcity.onmousedown=function(e){
            eraserBtn.style.width=w;
            eraserBtn.style.height=h;
            eraserBtn.style.display='block';
            console.log(eraserBtn);
            self.opcity.onmousemove=function(e){
                self.init();
                let ox=e.offsetX,oy=e.offsetY;
                //console.log(self.width);
                console.log(w);
                // console.log(eraserBtn.offsetWidth=w);
                if(ox>self.width-w/2){
                    ox=self.width-w/2;
                }
                if(ox<w/2){
                    ox=w/2;
                }
                if(oy>self.height-h/2){
                   oy=self.height-h/2;
                }
                if(oy<h/2){
                    oy=h/2;
                }
                let lefts=ox-w/2,tops=oy-h/2;
                eraserBtn.style.left=lefts+'px';
                eraserBtn.style.top=tops+'px';
                self.ctx.clearRect(lefts,tops,w,h);
            }
            self.opcity.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.opcity.onmousemove=null;
                self.opcity.onmouseup=null;
                eraserBtn.style.display='none';
            }
        }
    },
    round:function(){
        let self=this;
        self.opcity.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.opcity.onmousemove=function(e){
                self.init();
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                let mx=e.offsetX,my=e.offsetY;
                let w=mx-ox,h=my-oy,r=10;
                console.log(w);
                //第一个点
                self.ctx.beginPath();
                 self.ctx.moveTo(ox+r,oy);
                self.ctx.lineTo(mx-r,oy);
                self.ctx.quadraticCurveTo(ox+w,oy,ox+w,oy+r);
                //第二点
                self.ctx.lineTo(mx,my-r);
                self.ctx.quadraticCurveTo(mx,my,mx-r,my);
                //第三点
                self.ctx.lineTo(ox+r,my);
                self.ctx.quadraticCurveTo(ox,my,ox,my-r);
                //第四点
                self.ctx.lineTo(ox,oy+r);
                self.ctx.quadraticCurveTo(ox,oy,ox+r,oy);
                self.ctx.closePath();
                //self.ctx.stroke();
                self.ctx[self.type]();
            }
            self.opcity.onmouseup=function(){
                self.opcity.onmousemove=null;
                self.opcity.onmouseup=null;
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
            }
        }

    },
    dashed:function(){
        let self=this;
        self.opcity.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.opcity.onmousemove=function(e){
                self.init();
                //self.ctx.lineDashOffset=0;
                let mx=e.offsetX,my=e.offsetY;

                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }

                self.ctx.beginPath();
                self.ctx.setLineDash([10,20]);
                self.ctx.moveTo(ox,oy);

                self.ctx.lineTo(mx,my);

                self.ctx.closePath();
                self.ctx.stroke();
                //self.ctx[self.type]();
            }
            self.opcity.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.opcity.onmousemove=null;
                self.opcity.onmouseup=null;
                self.ctx.setLineDash([]);
            }
        }
    },
    text:function(){
        let self=this;
        self.opcity.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
                let box=document.createElement("div");
                box.style.cssText=`
                    width:300px;
                    height:50px;
                    background:#f5f5f5;
                    position:relative;
                    top:$(oy)px;
                    left:$(ox)px;
                    font-size:20px;
                    color:#f40;
                `;
            box.contentEditable="true";
            self.opcity.appendChild(box);
            self.opcity.onmousedown=null;
            box.onblur=function(){
                let newv=box.innerText;
                self.ctx.fillText(newv,ox,oy+20);
                self.opcity.removeChild(box);
            }
        }
    },
    save:function(img){        //img是保存在右侧显示框中
        let data = this.obj.toDataURL('image/png');   //canvas获取图片内容信息上传到服务器
        img.src = data;  //src=图片数据信息
        console.log(img);
    },
    newB:function(img){
        let flag = confirm('是否保存图片');
        if (flag) {
            this.save(img);      //保存到右侧
            console.log(this);
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.history=[];
        } else {               //不保存则
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.history.push(this.ctx.getImageData(0, 0, this.width, this.height));
            // 将这存放在历史记录中 用于返回上一步
        }
    },
    cut:function(cutobj){
        let self=this;
        self.opcity.onmousedown=function(e){
            var startx=e.offsetX;
            var starty=e.offsetY;
            var minx,miny,w,h;
            self.init();
            self.opcity.onmousemove=function(e){
                var endx=e.offsetX;
                var endy=e.offsetY;
                minx=startx>endx?endx:startx;//反向拉
                miny=starty>endy?endy:starty;
                w=Math.abs(endx-startx);//去绝对值，不管哪个方向拉都可以，获得裁剪框的宽高
                h=Math.abs(endy-starty);
                cutobj.style.width=w+'px';//设置一下裁剪那个框的样式，
                cutobj.style.height=h+'px';
                cutobj.style.top=miny+'px';
                cutobj.style.left=minx+'px';
            }
            self.opcity.onmouseup=function(){
                self.opcity.onmousemove=null;
                self.opcity.onmouseup=null;
                self.cutimg=self.ctx.getImageData(minx,miny,w,h);//获取裁剪的那一块图片
                self.ctx.clearRect(minx,miny,w,h);//只清除maks上边裁剪的那一块
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));//清除完后保存一下当前状态
                self.ctx.putImageData(self.cutimg,minx,miny);//把裁剪的那一块图片放回原位
                self.drap(minx,miny,w,h,cutobj);
            }
        }
    },
    drap:function(minx,miny,w,h,cutobj){
        let self=this;
        self.opcity.onmousemove=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            //判断鼠标的位置是否是在裁剪的那个框里
            if(ox>minx&&ox<w+minx&&oy>miny&&oy<h+miny){
                self.opcity.style.cursor = "move";//在框内的话让opcity上出现移动的小图标
            } else {
                self.opcity.style.cursor = "default";
                return;
            }
        }
        self.opcity.onmousedown=function(e){
            var ox = e.offsetX;
            var oy = e.offsetY;
            var cx = ox - minx;//当鼠标按下时计算鼠标距离裁剪框的位置
            var cy = oy - miny;
            if(ox > minx && ox < w + minx && oy > miny && oy < h + miny) {
                self.opcity.style.cursor = "move";
            }else{
                self.opcity.style.cursor = "default";
                return;
            }
            self.opcity.onmousemove=function(e){
                self.ctx.clearRect(0, 0, self.width,self.height);
                if (self.history.length != 0) {
                    self.ctx.putImageData(self.history[self.history.length - 1], 0, 0)
                }
                var endx = e.offsetX;
                var endy = e.offsetY;
                var left = endx - cx;//当鼠标移动时计算裁剪框距离上左的位置
                var top = endy - cy;
                if(left<0){//判断边界
                    left=0;
                }
                if(left>self.width-w){
                    left=self.width-w
                }
                if(top<0){
                    top=0;
                }
                if(top>self.height-h){
                    top=self.height-h
                }
                cutobj.style.left= left+'px';//让裁剪框跟着鼠标移动
                cutobj.style.top=top+'px';
                minx=left;
                miny=top;
                self.ctx.putImageData(self.cutimg,left,top);//把裁剪的图片放到和裁剪框同一个位置
            }
            self.opcity.onmouseup = function () {
                self.opcity.onmouseup = null;
                self.opcity.onmousemove = null;
                self.drap(minx,miny,w,h,cutobj);//回调函数，再次点击是还能移动裁剪框和图片
            }
        }
    },
    cancel:function(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.arr.push(this.ctx.getImageData(0, 0, this.width, this.height));

    },
    load: function () {
        let data = this.obj.toDataURL('image/png').replace('data:image/png', 'data:stream/octet');
        this.imgeas.src = data;
        location.href = data;
    },
    screen:function(){
        if(document.documentElement.requestFullscreen){
            document.documentElement.requestFullscreen();
        }else if(document.documentElement.webkitRequestFullscreen){
            document.documentElement.webkitRequestFullscreen();
        }else if(document.documentElement.mozRequestFullscreen){
            document.documentElement.mozRequestFullscreen();
        }
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}