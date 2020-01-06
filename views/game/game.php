<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/main.css">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/css/fa/css/all.css">
    <title>슈팅게임 :: 제작자 : 정재성</title>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>  
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
            display: none;
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
                <button class="main-btn" id="start">START</button>
                <button class="main-btn" id="option">OPTION</button>
                <button class="main-btn" id="rank">RANKING</button>
                <button class="main-btn" id="exit">EXIT</button>
            </div>
        </div>
        <canvas id="myGame" width="600" height="800"></canvas>
        <input type="range"value="0" id="range">
    </div>

    <script>
        document.querySelector("#start").addEventListener("click",(e)=>{
            $(".home").fadeOut();
            $("#myGame").fadeIn();
            let app = new App();
        });
    </script>

    <script>
        class Star {
            constructor(){
                this.dom = document.createElement("i");
                this.size = 30;
                this.left = Math.floor(Math.random()*window.innerWidth-this.size);
                this.top = 0;
                this.colorList = ['#fff','#f0f714','#fbff8c','#bbc200','#274fe3','#8ea1e6','#162869'];
                this.vector = {x:Math.floor(Math.random()*2) == 0 ? 1 : -1,y:Math.random()*5+2};
                this.makeAndShow();
            }

            makeAndShow(){
                this.dom.style.position = 'fixed';
                this.dom.classList.add(`fa${Math.floor(Math.random()*2) == 1 ? "s" : "r"}`);
                this.dom.classList.add("fa-star");
                this.dom.style.fontSize = this.size+'px';
                this.dom.style.color = this.colorList[Math.floor(Math.random() * this.colorList.length)];
                this.dom.style.color = this.getRandomColor();

                this.dom.style.left = this.left+'px';
                this.dom.style.top = this.top+'px';

                document.querySelector("body").appendChild(this.dom);
                this.down();
            }

            down(){
                this.top += this.vector.y;
                this.left += this.vector.x;
                this.dom.style.left = this.left+'px';
                this.dom.style.top = this.top+'px';
                setTimeout(()=>{
                    this.down();
                    if(this.top > window.innerHeight || this.left < 0 || this.left > window.innerWidth) this.top = 0;
                },30);
            }

            getRandomColor(){
                function get(){
                    let value = Math.floor(Math.random()*16);
                    if(value == 10) value = 'a';
                    if(value == 11) value = 'b';
                    if(value == 12) value = 'c';
                    if(value == 13) value = 'd';
                    if(value == 14) value = 'e';
                    if(value == 15) value = 'f';
                    return value;
                }
                return `#${get()}${get()}${get()}${get()}${get()}${get()}`;
            }
        }

        // for(let i=0; i < 100; i++) new Star();
    </script> <!-- 심심해서 만듬 -->
</body>
</html>