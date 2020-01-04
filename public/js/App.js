class App {
    constructor(){
        App.app = this; // 앱에 스태틱으로 넣었다 이말이야
        this.canvas = document.querySelector("#myGame");
        this.ctx = this.canvas.getContext("2d");
        this.gameWidth = this.canvas.width;
        this.bgmAudio = new Audio();
        this.bgmAudio.src = "/js/sound/bgm.mp3";
        this.bgmAudio.onloadeddata = ()=>{
            this.bgmAudio.volume = 0;
            this.bgmAudio.loop = true;
            // this.bgmAudio.play();
        };
        document.querySelector("#range").addEventListener("input",(e)=>{
            this.bgmAudio.volume = e.target.value/100;
        });
        this.bgmAudio.volume = document.querySelector('#range').value/100;
        this.gameHeight = this.canvas.height;
        this.pause = false;
        this.start = false;
        this.imageList = {}; //이미지 저장 오브젝트
        this.playerWidth = 60;
        this.playerHeight = 60;

        this.player = null;
        this.backList = []; //배경그림 리스트
        this.playerBulletList = []; //플레이어 총알 리스트

        this.enemyList = []; //적기체 저장 리스트
        this.expList = []; //폭발리스트

        //여기에 스테이지 데이터 제어 변수들이 들어갑니다.
        this.gameTimer = 0; //게임이 시작되고 몇초가 흘렀는지 저장
        this.stageIdx = 0; //지금 몇번째 적을 만들어내는지 저장
        this.stageData = []; //스테이지의 데이터

        this.init(); //초기화 함수
    }

    pauseAction(){
        this.pause = !this.pause;
        this.pause ? this.bgmAudio.pause() : this.bgmAudio.play();
    }

    setVolume(value){
        this.bgmAudio.volume = value;
    }

    async init(){
        this.imageList.player = await this.loadImage("sample5.png");
        this.imageList.back = await this.loadImage("back1.jpg");
        this.imageList.enemy = await this.loadImage("enemy1.png");
        this.imageList.explosion = await this.loadImage("explosion.png");
        this.imageList.enemy2 = await this.loadImage("enemy2.gif");
        this.imageList.enemy3 = await this.loadImage("enemy3.png");
        this.imageList.boss1 = await this.loadImage("boss1.png");
        
        //백그라운드 생성
        for(let i = 0; i < 3; i++){
            this.backList.push(
                new Background(0, - i * this.gameHeight, 
                                this.gameWidth, this.gameHeight,
                                this.imageList.back));
        }
        //플레이어 생성(x좌표 y좌표 너비 높이 이미지)
        this.player = new Player(
            this.gameWidth / 2 - this.playerWidth/2, this.gameHeight - 120,
            this.playerWidth,this.playerHeight, this.imageList.player, this);

        let stage = new Stage(this.gameWidth, this.gameHeight, this.imageList);
        this.stageData = stage.stage1;

        requestAnimationFrame(this.frame.bind(this));
    }

    getOrCreateExplosion(x,y,w,h){
        let exp = this.expList.find(x=> !x.active);
        if(exp === undefined){
            exp = new Explosion(this.imageList.explosion);
            this.expList.push(exp);
        }
        exp.setActive(x,y,w,h);
    }

    getOrCreateBullet(x, y, r, s, v, isEnemy = true){
        let bullet = this.playerBulletList.find(x=> !x.active);
        if(bullet == undefined) {
            bullet = new Bullet();    
            this.playerBulletList.push(bullet);
        }
        bullet.setActive(x,y,r,s,v, isEnemy);
    }

    getOrCreateEnemy(data){
        let e = this.enemyList.find(x => !x.active);
        if(e === undefined){
            e = new Enemy();
            this.enemyList.push(e);
        }
        e.reset(data.x, data.y, data.w, data.h, data.img, data.s, data.v,data.hp, data.fireTerm);
    }

    createBoss1(data){
        let e = new Boss1();
        this.enemyList.push(e);
        e.reset(data.x,data.y,data.w,data.h , data.img, data.s , data.v, data.hp, data.fireTerm);
    }

    loadImage(name){
        return new Promise((res, rej)=>{
            let img = new Image();
            img.src = `/js/images/${name}`;
            img.addEventListener("load", ()=>{
                res(img);
            });
        });
    }

    frame(time){
        if(!this.start) this.start = time;
        let delta = time - this.start;
        this.start = time;
        if(!this.pause){
            this.update(delta / 1000);
            this.render();
        }
        requestAnimationFrame(this.frame.bind(this));
    }

    update(delta){
        this.gameTimer += delta; //이렇게 되면 게임 진행시간이 this.gameTimer에 들어간다.
        this.backList.forEach(back => back.update(delta));
        if(this.backList[0].y > this.gameHeight){
            let first = this.backList.shift();
            first.y = this.backList[this.backList.length - 1].y - this.gameHeight;
            this.backList.push(first);
        }
        this.player.update(delta);
        this.player.checkOut(this.gameWidth, this.gameHeight);

        let nowEnemy = this.stageData[this.stageIdx];
        if(nowEnemy !== undefined && nowEnemy.time <= this.gameTimer){
            if(nowEnemy.data.boss1) this.createBoss1(nowEnemy.data);
            else this.getOrCreateEnemy(nowEnemy.data);
            this.stageIdx++;
        }

        this.playerBulletList.forEach(b => b.update(delta));
        this.enemyList.forEach(e => e.update(delta));

        this.playerBulletList.filter(b => b.active).forEach(b => {
            if(!b.isEnemy){
                this.enemyList.filter(e => e.active).forEach(e => {
                    if(e.checkCollision(b.x, b.y, b.r)){
                        e.setDamage(b.damage);
                        b.active = false;
                    }
                });
            }else {
                //적총알이 플레이어에 충돌했는지를 검사 => 불렛 b 를 갖고있음
                if(this.player.checkCollision(b.x,b.y,b.r)){
                    this.player.setDamage(b.damage);
                    b.active = false;
                }
            }
        });

        this.expList.forEach(e => e.update(delta));
    }
   
    render(){
        this.ctx.clearRect(0,0,this.gameWidth, this.gameHeight);
        this.backList.forEach(back => back.render(this.ctx));
        this.player.render(this.ctx);
        this.playerBulletList.forEach(b => b.render(this.ctx));
        this.enemyList.forEach(e => e.render(this.ctx));
        this.expList.forEach(e => e.render(this.ctx));
    }

    stopGame(text){
        setTimeout(()=>{
            this.pause = true;
            this.ctx.clearRect(0,0,this.gameWidth,this.gameHeight);
            this.ctx.fillStyle = "#333030";
            this.ctx.fillRect(0,0,this.gameWidth,this.gameHeight);
            this.ctx.font = "bold 35px Arial";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillStyle = "#f4f5f9";
            this.ctx.fillText(text,this.gameWidth/2,this.gameHeight/2);
        },1200);
    }
}