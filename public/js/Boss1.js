class Boss1 {
    constructor(){
        this.x = null;
        this.y = null;
        this.w = null;
        this.h = null;
        this.img = null;
        this.vector = null;
        this.speed = null;
        this.active = false;
        this.hp = null;
        this.hpMax = null;
        this.fireTerm = null;
    }

    reset (x, y, w, h, img, s, v, hp = 5, fireTerm = 2000){
        this.x = x;
        this.y = y;
        this.hpMax = hp;
        this.w = w;
        this.h = h;
        this.img = img;
        this.speed = s;
        this.vector = v;
        this.active = true;
        this.hp = hp;
        this.fireTerm = fireTerm;
        this.fire();
    }

    setDamage(value){
        this.hp -= value;
        if(this.hp <= 0){
            this.explosion(false);
        }
        if(this.hp == this.hpMax/2){
            this.explosion(true);
            this.fireTerm/=10;
        }
    }

    explosion(value){
        //폭발이펙트 생성
        App.app.getOrCreateExplosion(this.x,this.y, this.w, this.w);
        this.active = value;
        if(!value) App.app.stopGame("CLEAR!");
    }

    fire(){
    	if(!this.active) return;

        if(this.hp >= this.hpMax/2){
            App.app.getOrCreateBullet(this.x + this.w / 2 -100,this.y+this.h-5, 3, 400,new Vector(0.5,1).normalize());
            App.app.getOrCreateBullet(this.x + this.w / 2 -80,this.y+this.h-5, 3, 400,new Vector(0.4,1).normalize());
            App.app.getOrCreateBullet(this.x + this.w / 2 -60,this.y+this.h-5, 3, 400,new Vector(0.3,1).normalize());
            App.app.getOrCreateBullet(this.x + this.w / 2 -40,this.y+this.h-5, 3, 400,new Vector(0.2,1).normalize());
            App.app.getOrCreateBullet(this.x + this.w / 2 -20,this.y+this.h-5, 3, 400,new Vector(0.1,1).normalize());
            App.app.getOrCreateBullet(this.x + this.w / 2,this.y+this.h-5, 3, 400,new Vector(0,1).normalize());
            App.app.getOrCreateBullet(this.x + this.w / 2 +20,this.y+this.h-5, 3, 400,new Vector(-0.1,1).normalize());
            App.app.getOrCreateBullet(this.x + this.w / 2 +40,this.y+this.h-5, 3, 400,new Vector(-0.2,1).normalize());
            App.app.getOrCreateBullet(this.x + this.w / 2 +60,this.y+this.h-5, 3, 400,new Vector(-0.3,1).normalize());
            App.app.getOrCreateBullet(this.x + this.w / 2 +80,this.y+this.h-5, 3, 400,new Vector(-0.4,1).normalize());
            App.app.getOrCreateBullet(this.x + this.w / 2 +100,this.y+this.h-5, 3, 400,new Vector(-0.5,1).normalize());
        }else {
             App.app.getOrCreateBullet(this.x + this.w / 2, this.y + this.h - 5 , 4, 300, new Vector(0, 1)); // 가운데줄
            App.app.getOrCreateBullet(this.x + this.w / 2+20, this.y + this.h - 5 , 4, 300, new Vector(0, 1)); // 가운데왼쪽
            App.app.getOrCreateBullet(this.x + this.w / 2-20, this.y + this.h - 5 , 4, 300, new Vector(0, 1)); // 가운데오른쪽
            App.app.getOrCreateBullet(this.x + this.w / 2-50, this.y + this.h - 70 , 3, 300, new Vector(0, 1)); // 가장왼쪽            
            App.app.getOrCreateBullet(this.x + this.w / 2-70, this.y + this.h - 70 , 3, 300, new Vector(0, 1)); // 가장왼쪽바로옆
            App.app.getOrCreateBullet(this.x + this.w / 2+50, this.y + this.h - 70 , 3, 300, new Vector(0, 1)); // 가장오른쪽
            App.app.getOrCreateBullet(this.x + this.w / 2+70, this.y + this.h - 70 , 3, 300, new Vector(0, 1)); // 가장오른쪽바로옆
        }

        setTimeout(this.fire.bind(this), this.fireTerm);
    }

    update(d){
        if(!this.active) return;
        if(this.x+this.w>=App.app.gameWidth || this.x <= 0) this.vector.x *= -1; 
        if(this.y > 10){
            this.y = 10;
            this.vector.y = 0;
        }

        let normal = this.vector;
        this.x += normal.x * d * this.speed;
        this.y += normal.y * d * this.speed;

        if(this.x < -this.w * 2 || this.y < - this.h * 2 
            || this.x > this.w + App.app.gameWidth 
            || this.y > this.h + App.app.gameHeight
            )
        {
            this.active = false;
        }
    }

    checkCollision(x,y,r){
        let centerX = this.x + this.w / 2;
        let centerY = this.y + this.h / 2;

        let d = Math.pow(centerX - x, 2) + Math.pow(centerY - y,2);
        
        return d < Math.pow(r + Math.min(this.w, this.h) / 2, 2);
    }

    render(ctx){
        if(!this.active) return;
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        ctx.strokeStyle = "#ff3b3b";
        ctx.strokeRect(0,0,App.app.gameWidth,10);
        let percent = this.hp / this.hpMax;
        ctx.fillStyle = "#ff3b3b";
        ctx.fillRect(0,0,App.app.gameWidth*percent,10);
    }
}