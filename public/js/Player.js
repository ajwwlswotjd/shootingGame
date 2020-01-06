class Player {
    constructor(x, y, w, h, img,app,imgLeft,imgRight){
    	this.app = app;
        this.x = x;
        this.y = y;
        this.w = w;
        this.hp = 100;
        this.hpMax = this.hp;
        this.h = h;
        this.img = img;
        this.fireTerm = 0.2;
        this.currentFireTerm = 0;
        this.active = true;
        this.keyArr = [];
        this.speed = 150;
        this.firing = false;
        this.imgLeft = imgLeft;
        this.imgRight = imgRight;
        this.init();        
    }

    init(){
        document.addEventListener("keydown", e => {
            if(e.code === "ArrowLeft")  this.keyArr[0] = true;
            if(e.code === "ArrowRight") this.keyArr[1] = true;
            if(e.code === "ArrowUp")    this.keyArr[2] = true;
            if(e.code === "ArrowDown")  this.keyArr[3] = true;
            if(e.code === "ShiftLeft")  this.keyArr[4] = true;
            if(e.code === "Space") 		this.firing = true;
        });

        document.addEventListener("keyup", e => {
            if(e.code === "ArrowLeft")  this.keyArr[0] = false;
            if(e.code === "ArrowRight") this.keyArr[1] = false;
            if(e.code === "ArrowUp")    this.keyArr[2] = false;
            if(e.code === "ArrowDown")  this.keyArr[3] = false;
            if(e.code === "ShiftLeft")  this.keyArr[4] = false;
            if(e.code === "Space")      this.firing = false;
        })
    }

    setDamage(value,bulletX,bulletY,bulletRadius){
        this.hp -= value;
        if(this.hp <= 0){
            this.explosion();
            App.app.stopGame("GAME OVER");
        }else App.app.getOrCreateExplosion(bulletX-bulletRadius-10,bulletY,bulletRadius,bulletRadius,10);
    }

    explosion(){
        //폭발이펙트 생성
        App.app.getOrCreateExplosion(this.x,this.y, this.w, this.w);
        this.active = false;
    }

    fire(){
        if(this.currentFireTerm > 0 || !this.active) return;
        let left = this.keyArr[0] && !this.keyArr[1];
        let right = this.keyArr[1] && !this.keyArr[0];
        let dir = left && !right ? -0.6 : right && !left ? 0.6 : 0;
        this.app.getOrCreateBullet(this.x+this.w/2, this.y , 3 , 300, new Vector(dir,-1),false); // 가운데꺼
        this.app.getOrCreateBullet(this.x+this.w/2+20, this.y , 3 , 300, new Vector(dir,-1).normalize(),false); // 오른쪽꺼
        this.app.getOrCreateBullet(this.x+this.w/2-20, this.y , 3 , 300, new Vector(dir,-1).normalize(),false); // 왼쪽꺼
        this.currentFireTerm = this.fireTerm;
    }

    update(d){
        if(this.fireTerm > 0) this.currentFireTerm -= d;
        let dx = 0, dy = 0;
        if(this.keyArr[0] && !this.keyArr[1])  dx = -1;
        if(this.keyArr[1] && !this.keyArr[0])  dx = 1;
        if(this.keyArr[2])  dy = -1;
        if(this.keyArr[3])  dy = 1;
        if(this.firing) this.fire();
        this.speed = this.keyArr[4] ? 60 : 150;

        this.x += dx * d * this.speed;
        this.y += dy * d * this.speed;
    }

    checkOut(w, h){
        if(this.x < 0 )             this.x = 0;
        if(this.x + this.w >= w)    this.x = w - this.w;
        if(this.y < 0)              this.y = 0;
        if(this.y + this.h >= h)    this.y = h - this.h;
    }

     checkCollision(x,y,r){
        if(!this.active) return false;
        let centerX = this.x + this.w / 2;
        let centerY = this.y + this.h / 2;

        let d = Math.pow(centerX - x, 2) + Math.pow(centerY - y,2);
        
        return d < Math.pow(r + Math.min(this.w, this.h) / 2, 2);
    }

    render(ctx){
        if(!this.active) return;
        ctx.drawImage(this.keyArr[0] && !this.keyArr[1] ? this.imgLeft : this.keyArr[1] && !this.keyArr[0] ? this.imgRight : this.img, this.x,this.y,this.w,this.h);
        ctx.strokeStyle = "#ff3b3b";
        ctx.strokeRect(this.x,this.y+this.h+10,this.w,10);
        let percent = this.hp / this.hpMax;
        ctx.fillStyle = "#ff3b3b";
        ctx.fillRect(this.x,this.y+this.h+10,this.w*percent,10);
    }
}