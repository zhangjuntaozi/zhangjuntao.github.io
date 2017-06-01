/*
* @Author: Acer
* @Date:   2017-04-29 22:37:43
* @Last Modified by:   Acer
* @Last Modified time: 2017-05-09 10:33:38
*/

'use strict';

function $(selector,ranger=document){
	if(typeof selector=='string'){
		let select=selector.trim();
		let first=select.charAt(0);
		if(first=='.'){
			return ranger.getElementsByClassName(select.substring(1));
		}else if(first=='#'){
			return ranger.getElementById(select.substring(1));
		}else if(/^[a-zA-z][a-zA-z1-6]{0,8}$/.test(select)){
			return ranger.getElementsByTagName(select);
		}else if(/^<[a-zA-z][a-zA-z1-6]{0,8}>$/.test(select)){
			return ranger.createElement(select.slice(1,-1));  //从第二个到最后一个（不包括）
		}
	}else if(typeof selector=='function'){
		 window.onload=function(){
		 	selector();
		 }
		// addEvent(window,'load',selector());
	} 
}

function html(obj,content){
	if(content){
		//����
		obj.innerHTML=content;
	}else{
		//��ȡ
		return obj.innerHTML;
	}
}

function getChilds(obj){
	let childs=obj.childNodes;
	let arr=[];
	childs.forEach(function(value){
		if(value.nodeType==1){
			arr.push(value);
		}
	})
	return arr;
}

function getFrist(obj,num=0){
	return	getChilds(obj)[num];

}
function getLast(obj,num=0){
	let last=getChilds(obj)[childs.length-1];
	return	last;

}

function getNum(obj,num){
	let aa=getChilds(obj)[num];
	return aa;
}

/*getNext
1.��һ���ֵ�Ԫ�ؽڵ� a
2.����a��һ���ֵڽڵ�  b
*/

function getNext(obj){
	let a=obj.nextSibling;
	if(a===null){
		return false;
	}
	while(a.nodeType!=1){
		a=a.nextSibling;
		if(a==null){
			return false;
		}
	}
	return a;
}

//��ȡ��һ���ֵ�Ԫ�ؽڵ�

function getPrevionsibling(obj){
	let a=obj.PrevionSibling;
	if(a===null){
		return false;
	}
	while(a.nodeType!=1){
		a=a.nextSibling;
		if(a==null){
			return false;
		}
	}
	return a;
}

//������Ԫ�ز��뵽��Ԫ����
//1.partent.appendChild(ele);  eleԪ�ز��뵽��Ԫ����
//2.ele.appendTo(partent);     ����Ԫ��ele���뵽��Ԫ����
Node.prototype.appendTo=function(parent){
	parent.appendChild(this);   //thisΪ���ö���
	console.log(this);
}


function mousewheel(obj,upfn,downfn) {                  //定义一个函数
    obj.addEventListener('mousewheel',fn,false);       // 同一个事件绑定多个事件处理程序   对象.添加事件（事件类型，）
    function fn(e){                                    //mousewheel     upfn和downfn 事件处理程序
        e.preventDefault();      //屏蔽浏览器滚动
        let dir=e.wheelDelta ;                         //事件对象的属性 .wheelDalte 获取滚轮滚动方向
        console.log(dir)                               // 判断滚轮滚动方向
        if(dir==120||dir==150||dir==180){
            upfn.call(obj);
        }else if(dir==-120||dir==-150||dir==-180){
            downfn.apply(obj);
        }
    }
}

/*
// 关于鼠标滚轮的滚轮事件
if(document.attachEvent){
	document.attachEvent('onmousewheel',scrollFn);  //ie  opera
}else if(document.addEventListener){
	document.addEventListener('mousewheel',scrollFn,false);   //chrome,safari    -webkit-
	document.addEventListener('DOMMouseScroll',scrollFn,false);  //firefox    -moz-
}
*/



























