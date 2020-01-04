class Vector {
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.normal = null;
	}

	//백터의 정규화 값
	normalize(){ // 백터의 길이를 1로 하면서 방향을 유지하는 것
		if(this.normal == null){
			let c = Math.sqrt(this.x*this.x + this.y*this.y)
			this.normal = new Vector(this.x, this.y /c);
		}
		return this.normal;
	}
}