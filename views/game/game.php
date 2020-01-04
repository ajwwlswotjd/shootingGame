<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/fa/css/all.css">
    <title>슈팅게임 :: 제작자 : 정재성</title>
    <script src="/js/Vector.js"></script>
    <script src="/js/Boss1.js"></script>
    <script src="/js/Stage.js"></script>
    <script src="/js/Explosion.js"></script>
    <script src="/js/Enemy.js"></script>
    <script src="/js/Background.js"></script>
    <script src="/js/Bullet.js"></script>
    <script src="/js/Player.js"></script>
    <script src="/js/App.js"></script>
    <style>
        #myGame {
            border: 1px solid #fff3;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }


        input[type='range']::-webkit-slider-thumb {
            -webkit-appearance : none;
            appearance : none;
            width: 0px;
            height: 0px;
            box-shadow: -100vw 0 0 100vw #20c997;
            border-radius:100px;
        }

        input[type='range'] {
            width: 135px;
            overflow: hidden;
            -webkit-appearance : none;
            cursor: pointer;
            border-radius: 100px;
            background: #ddd;
            outline: none;
            height: 7px;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <div class="home">
            <div class="home-container">
                <h1 class="home-title">SHOOTING GAME</h1>
            </div>
        </div>
        <canvas id="myGame" width="600" height="800"></canvas>
        <!-- <input type="range"value="0" id="range"> -->
    </div>

    <script>
        class Star {
            constructor(){
                this.dom = document.createElement("i");
                this.size = 30;
                this.top = 10;
                this.colorList = ['#fff','#f0f714','#fbff8c','#bbc200','#274fe3','#8ea1e6','#162869'];
                this.vector = {x:-1,y:-1};
                this.makeAndShow();
            }

            makeAndShow(){
                this.dom.style.position = 'fixed';
                this.dom.classList.add(`fa${Math.floor(Math.random()*2) == 1 ? "s" : "r"}`);
                this.dom.classList.add("fa-star");
                this.dom.style.fontSize = this.size+'px';
                this.dom.style.color = this.colorList[Math.floor(Math.random() * this.colorList.length)];
                this.dom.style.left = Math.floor(Math.random()*1920-this.size)+'px';
                this.dom.style.top = this.top+'px';
                document.querySelector("body").appendChild(this.dom);
                this.frame = setInterval(()=>{
                    this.down();
                    if(this.dom.style.top > 1080) clearInterval(this.frame);
                },100);
            }

            down(){
                this.dom.style.left += this.vector.x;
                this.dom.style.top += this.vector.y;
                console.log("다운중");
            }
        }

        for(let i=0; i < 10; i++) new Star();
    </script>
</body>
</html>