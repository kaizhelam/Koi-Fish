"use strict"
let H, W, san, koi=[], X=100, Y=100
let {hypot, atan2, sin, cos, random} = Math
 
class Koi {

    constructor(x,y) {
        this.x = random()*W;
        this.y = random()*H;
        this.vx = 0 //Math.random()*4-2;
        this.vy = -random()*3-1; 
        this.s = .5;  
        this.dx = 0;
        this.dy = 0;
        this.a = 0;
        this.A = 0;
        this.c0 = random()*360;
        this.c1 = `hsl(${this.c0},100%,50%)`
        this.c2 = `hsl(${this.c0+50},100%,50%)`        
    }

    draw() {
        this.update()
        this.a+=hypot(this.vx,this.vy)/20;
        let An = sin(this.a);
        let k = [50,15+An*5,-20,30+An*5,20,50+An*5,50,15+An*5,50,-15+An*5,-20,-30+An*5,20,-50+An*5,50,-15+An*5,100,0,100,-40,0,-10,-100,0+An*30,0,10,100,40,100,0,90,-6,90,6,70,0,-0,-0,-95,0+An*30,-130,0+An*40,-110,-0+An*30,-150,0+An*30,-70,-0+An*30,-130,0+An*40]
        let p = [];
        for(let i=0; i<50; i+=2) {
            p.push((k[i]*cos(this.A) - k[i+1]*sin(this.A))*this.s);
            p.push((k[i]*sin(this.A) + k[i+1]*cos(this.A))*this.s);
        }   
                                                
        san.beginPath();
        san.fillStyle = this.c2;
        san.moveTo(this.x+p[0],
                   this.y+p[1]);
        san.bezierCurveTo(this.x+p[2],
                          this.y+p[3],
                          this.x+p[4],
                          this.y+p[5],
                          this.x+p[6],
                          this.y+p[7]);
        san.fill();        
        san.beginPath()
        san.fillStyle = this.c2;
        san.moveTo(this.x+p[8],
                   this.y+p[9]);
        san.bezierCurveTo(this.x+p[10],
                          this.y+p[11],
                          this.x+p[12],
                          this.y+p[13],
                          this.x+p[14],
                          this.y+p[15])
        san.fill()        
        san.beginPath();
        san.fillStyle = this.c1;
        san.moveTo(this.x+p[16],
                   this.y+p[17]);        
        san.bezierCurveTo(this.x+p[18],
                          this.y+p[19],
                          this.x+p[20],
                          this.y+p[21],
                          this.x+p[22],
                          this.y+p[23])
        san.bezierCurveTo(this.x+p[24],
                          this.y+p[25],
                          this.x+p[26],
                          this.y+p[27],
                          this.x+p[28],
                          this.y+p[29])
        san.fill();
        san.beginPath();
        san.fillStyle="black";
        san.arc(this.x+p[30],this.y+p[31],1,0,44/7);
        san.arc(this.x+p[32],this.y+p[33],1,0,44/7);
        san.fill();
        
        san.beginPath()
        san.strokeStyle = this.c2;
        san.lineWidth = .5;
        san.moveTo(this.x+p[34],
                   this.y+p[35]); 
        san.quadraticCurveTo(this.x+p[36],
                             this.y+p[37],
                             this.x+p[38],
                             this.y+p[39])
        san.stroke()
        
        san.beginPath()
        san.fillStyle = this.c2;
        san.moveTo(this.x+p[40],
                   this.y+p[41]); 
        san.quadraticCurveTo(this.x+p[42],
                             this.y+p[43],
                             this.x+p[44],
                             this.y+p[45])
        san.quadraticCurveTo(this.x+p[46],
                             this.y+p[47],
                             this.x+p[48],
                             this.y+p[49])                  
        san.fill();                  
    }
    
    update() {
        this.rules();
        this.vx+=this.dx*.002;
        this.vy+=this.dy*.002;
        this.x+=this.vx;
        this.y+=this.vy;
        this.A=atan2(this.vy,this.vx);        
        if(this.x>W+100) this.x=-100;
        if(this.x<-100) this.x=W+100;
        if(this.y>H+100) this.y=-100;
        if(this.y<-100) this.y=H+100;                
        this.dx=0;
        this.dy=0;
    }
        
    rules() {
        let closeedKoi = []
        koi.forEach(koi => {if(koi != this && hypot(koi.x-this.x, koi.y-this.y) < 100) closeedKoi.push(koi)});
        if(closeedKoi.length==0) return 
        let dx = 0
        let dy = 0
        for(let koi of closeedKoi){
            let d = hypot(koi.x-this.x, koi.y-this.y)
            dx -= (1-d/100)*(koi.x - this.x)
            dy -= (1-d/100)*(koi.y - this.y)
        }            
        this.dx += dx
        this.dy += dy
        
        this.vx *= .9995;
        this.vy *= .9995;
                
    }    
}

const M = e => {
    X = e.touches[0].pageX*2
    Y = e.touches[0].pageY*2
}

const Loop = () => {
    san.fillStyle ="rgba(0,0,0,.12)"
    san.fillRect(0, 0, W, H)
    san.fillStyle = "red";
    san.fill()
    koi.forEach(v=>v.draw())
    webkitRequestAnimationFrame(Loop);
}

const init = () => {
    document.body.style.margin = 0;
    let c = document.createElement("canvas");
    document.body.appendChild(c);
    c.style.position = "fixed";
    c.style.background = "black";
    c.style.width = "100vw";
    c.style.height = "100vh";
    c.height = H = innerHeight*2;
    c.width = W = innerWidth*2;
    san = c.getContext('2d');  
    for(let i=0;i<50;i++) koi.push(new Koi(200, 100+i*100));
    c.ontouchmove = M;
    Loop();
};
onload = init;