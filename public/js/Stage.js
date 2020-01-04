class Stage {
	constructor(gw,gh,imgs){

		this.stage1 = [
		{
			time : 1,
			data:{
				x:gw /2-30,
				y: 0,
				w:60,
				h : 40,
				img: imgs.enemy,
				fireTerm : 2000,
				hp:5,
				s:50,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 1,
			data:{
				x:-60,
				y: 0,
				w:60,
				h : 40,
				img: imgs.enemy,
				fireTerm : 2000,
				hp:5,
				s:50,
				v: new Vector(0.5,1).normalize()
			}
		},
		{
			time : 1,
			data:{
				x:gw,
				y: 0,
				w:60,
				h : 40,
				img: imgs.enemy,
				fireTerm : 2000,
				hp:5,
				s:50,
				v: new Vector(-0.5,1).normalize()
			}
		},
		{
			time : 5,
			data:{
				x:30,
				y: -10,
				w:44,
				h : 30,
				img: imgs.enemy,
				fireTerm : 2000,
				hp:1,
				s:60,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 5,
			data:{
				x:30+30+44,
				y: -10,
				w:44,
				h : 30,
				img: imgs.enemy,
				fireTerm : 2000,
				hp:1,
				s:60,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 5,
			data:{
				x:30+30+44+74,
				y: -10,
				w:44,
				h : 30,
				img: imgs.enemy,
				fireTerm : 2000,
				hp:1,
				s:60,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 5,
			data:{
				x:30+30+44+74+74,
				y: -10,
				w:44,
				h : 30,
				img: imgs.enemy,
				fireTerm : 2000,
				hp:1,
				s:60,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 5,
			data:{
				x:30+30+44+74+74+74,
				y: -10,
				w:44,
				h : 30,
				img: imgs.enemy,
				fireTerm : 2000,
				hp:1,
				s:60,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 10,
			data:{
				x:0,
				y: 0,
				w:60,
				h : 40,
				img: imgs.enemy,
				fireTerm : 2000,
				hp:2,
				s:100,
				v: new Vector(1,4)
			}
		},
		{
			time : 10,
			data:{
				x:gw-60,
				y: 0,
				w:60,
				h : 40,
				img: imgs.enemy,
				fireTerm : 2000,
				hp:2,
				s:100,
				v: new Vector(-1,4)
			}
		},
		{
			time : 13,
			data:{
				x:46,
				y: -20,
				w:72,
				h : 48,
				img: imgs.enemy,
				fireTerm : 2000,
				hp:5,
				s:70,
				v: new Vector(0,1)
			}
		},
		{
			time : 13,
			data:{
				x:46+46+72,
				y: 0,
				w:72,
				h : 48,
				img: imgs.enemy,
				fireTerm : 2000,
				hp:5,
				s: 90,
				v: new Vector(0,1)
			}
		},
		{
			time : 13,
			data:{
				x:46+46+72+46+72,
				y: -20,
				w:72,
				h : 48,
				img: imgs.enemy,
				fireTerm : 2000,
				hp:5,
				s:70,
				v: new Vector(0,1)
			}
		},
		{
			time : 17,
			data:{
				x:gw/2-50,
				y: -40,
				w:100,
				h : 66,
				img: imgs.enemy2,
				fireTerm : 500,
				hp:22,
				s:60,
				v: new Vector(0,1)
			}
		},
		{
			time : 22,
			data:{
				x:gw/2-30,
				y: -10,
				w:60,
				h : 40,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:7,
				s:80,
				v: new Vector(0,1)
			}
		},
		{
			time : 22,
			data:{
				x:-60,
				y: -10,
				w:60,
				h : 40,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:7,
				s:80,
				v: new Vector(0.5,1).normalize()
			}
		},
		{
			time : 22,
			data:{
				x:gw,
				y: -10,
				w:60,
				h : 40,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:7,
				s:80,
				v: new Vector(-0.5,1).normalize()
			}
		},
		{
			time : 28,
			data:{
				x:20,
				y: -40,
				w:56,
				h : 37,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:6,
				s:65,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 27,
			data:{
				x:20+76,
				y: -20,
				w:56,
				h : 37,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:6,
				s:65,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 26,
			data:{
				x:20+76+76,
				y: 0,
				w:56,
				h : 37,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:6,
				s:65,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 26+1,
			data:{
				x:20+76+76+76,
				y: -20,
				w:56,
				h : 37,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:6,
				s:65,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 27+1,
			data:{
				x:20+76+76+76+76,
				y: -40,
				w:56,
				h : 37,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:6,
				s:65,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 31+1,
			data:{
				x:20,
				y: -40,
				w:56,
				h : 37,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:6,
				s:65,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 30+1,
			data:{
				x:20+76,
				y: -20,
				w:56,
				h : 37,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:6,
				s:65,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 28+1,
			data:{
				x:20+76+76,
				y: 0,
				w:56,
				h : 37,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:6,
				s:65,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 30+1,
			data:{
				x:20+76+76+76,
				y: -20,
				w:56,
				h : 37,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:6,
				s:65,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 31+1,
			data:{
				x:20+76+76+76+76,
				y: -40,
				w:56,
				h : 37,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:6,
				s:65,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 35+1,
			data:{
				x:20,
				y: -40,
				w:56,
				h : 37,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:6,
				s:65,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 34+1,
			data:{
				x:20+76,
				y: -20,
				w:56,
				h : 37,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:6,
				s:65,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 33+1,
			data:{
				x:20+76+76,
				y: 0,
				w:56,
				h : 37,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:6,
				s:65,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 34+1,
			data:{
				x:20+76+76+76,
				y: -20,
				w:56,
				h : 37,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:6,
				s:65,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 35+1,
			data:{
				x:20+76+76+76+76,
				y: -40,
				w:56,
				h : 37,
				img: imgs.enemy3,
				fireTerm : 1500,
				hp:6,
				s:65,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 38+1,
			data:{
				x:-80,
				y: 0,
				w:80,
				h : 53,
				img: imgs.enemy3,
				fireTerm : 100,
				hp:2,
				s:100,
				v: new Vector(1,0).normalize()
			}
		},
		{
			time : 38+1,
			data:{
				x:gw,
				y: 70,
				w:80,
				h : 53,
				img: imgs.enemy3,
				fireTerm : 100,
				hp:2,
				s:100,
				v: new Vector(-1,0).normalize()
			}
		},
		{
			time : 43,
			data:{
				x:20,
				y: 0,
				w: 75,
				h : 50,
				img: imgs.enemy3,
				fireTerm : 1000,
				hp: 6,
				s: 70,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 44,
			data:{
				x:20+95,
				y: -20,
				w: 75,
				h : 50,
				img: imgs.enemy3,
				fireTerm : 1000,
				hp: 6,
				s: 70,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 45,
			data:{
				x:20+95+95,
				y: -40,
				w: 75,
				h : 50,
				img: imgs.enemy3,
				fireTerm : 1000,
				hp: 6,
				s: 70,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 46,
			data:{
				x:20+95+95+95,
				y: -60,
				w: 75,
				h : 50,
				img: imgs.enemy3,
				fireTerm : 1000,
				hp: 6,
				s: 70,
				v: new Vector(0,1).normalize()
			}
		},
		{
			time : 50,
			data:{
				x:-80,
				y: 0,
				w:80,
				h : 53,
				img: imgs.enemy3,
				fireTerm : 100,
				hp:2,
				s:100,
				v: new Vector(2,0).normalize()
			}
		},
		{
			time : 50,
			data:{
				x:gw,
				y: 70,
				w:80,
				h : 53,
				img: imgs.enemy3,
				fireTerm : 100,
				hp:2,
				s:100,
				v: new Vector(-1,0).normalize()
			}
		},
		{
			time : 56,
			data:{
				x:gw/2-150,
				y: -50,
				w:300,
				h : 200,
				img: imgs.boss1,
				fireTerm : 1000,
				hp:200,
				s: 20,
				boss1:true,
				v: new Vector(1,3)
			}
		}
		];
	}
}