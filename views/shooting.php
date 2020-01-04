<div id="register">
	<div class="register_container">
		<div class="register_left">
			<h1>Sign up</h1>
			<p>Lorem ipsum dolor sit amet, <br>consectetur adipisicing elit.</p>
			<button class="register_close_btn">close</button>
		</div>

		<div class="register_right">
			<form id="register_form" onsubmit="return register_process(this);">

				<div class="input-box">
					<input type="text" id="register_username" name="username">
					<label for="register_username">USERNAME</label>
				</div>
				<span class="username-span">at least 2 characters consisting lowercase or lowercase and number</span>
				<br>

				<div class="input-box">
					<input type="email" id="register_email" name="email">
					<label for="register_email">EMAIL</label>
				</div>
				<span class="email-span">Correct Email format Ex) yydh@y-y.hs.kr</span>

				<div class="input-box">
					<input type="password" id="register_password1" name="password1">
					<label for="register_password1">PASSWORD</label>
				</div>
				<span class="password1-span">at least 8 characters including a number and a lowercase letter</span>

				<div class="input-box">
					<input type="password" id="register_password2" name="password1">
					<label for="register_password2">PASSWORD CHECK</label>
				</div>
				<span class="password2-span">match the password</span>
				
				<button type="submit" id="register_submit">Get Started</button>

				<p>Already have an account? <span class="go_login">Sign in</span></p>
			</form>
		</div>

		<span class="register_close">&times;</span>
	</div>	
</div>

<div id="login">
	<div class="login-box">
		<form onsubmit="return loginProcess(this);">

			<div class="input-group">
				<div class="input-container">
					<i class="far fa-user"></i>
					<input type="text" name="username" id="login_username" placeholder="YOUR USERNAME">
				</div>

				<div class="input-container">
					<i class="fas fa-lock"></i>
					<input type="password" name="password" id="login_password" placeholder="PASSWORD">
				</div>
			</div>
	
			<button type="submit" id="login_submit">Sign in</button>
			<div class="login_bottom">
				<div class="forget">Forget Password</div>
				<div class="login_signUp">Sign Up</div>
			</div>
			<div class="login-close">&times;</div>
		</form>

		<script>
			function loginProcess(e){
				let data = {};
				data.username = $("#login_username").val();
				data.password = $("#login_password").val();
				$.ajax({
					data:data,
					method:'post',
					url:'/user_login',
					success : function(result){
						let json = JSON.parse(result);
						if(json.success){
							Swal.fire({
								title: 'SUCCESS',
								text: json.msg,
								icon: 'success',
								showCancelButton: false,
								confirmButtonColor: '#3085d6',
								cancelButtonCotlor: '#d33',
								confirmButtonText: 'OK'
							}).then((result) => {location.reload()});
						}else Swal.fire("FAIL",json.msg,'error');
					}
				});
				return false;
			}
		</script>
	</div>
</div>

<div id="main">
	<div class="main_black">
		<div class="main_black_box">
			<h1>
				<span>SPACE</span>
				<br>
				SHOOTING GAME
			</h1>
			<?php if(__SIGN) : ?>
				<button id="main_start" class="start_true">START</button>
				<p class="adt_fx start_true"><span>LOGOUT</span></p>
				<?php else : ?>
					<button id="main_start" class="start_false">LOGIN</button>
					<p class="adt_fx start_false"><span>SIGN UP</span></p>
				<?php endif; ?>
			</div>
		</div>
	</div>

	<script>
		const log = console.log;
		function getDom(selector){
			return document.querySelector(selector);
		}

		let username_ok = false;
		let email_ok = false;
		let password1_ok = false;
		let password2_ok = false;

		$('.adt_fx.start_true').on("click",(e)=>{
			$.ajax({
				method:'post',
				url:'/user_logout',
				success : function(e){
					location.reload();
				}
			});
		});

		$("#main_start.start_true").on("click",(e)=>{
			location.href = "/shooting/game";
		});

		getDom(".adt_fx.start_false > span").addEventListener("click",(e)=>{
		// Sign up 버튼을 눌러서 회원가입 팝업을 띄움
		getDom("#main").style.filter = `blur(6px)`;
		$("#register").fadeIn();
		$("#register_form input").val("");
		$("#register_form input").css({borderBottom : `2px solid #e6e6e6`});
		$("#register_form label").css({color : `#aaa`,bottom:'6px'});
		$("#register_form > span").css({color:"#777"});
		username_ok = false;
		email_ok = false;
		password1_ok = false;
		password2_ok = false;
	});

		getDom("#main_start.start_false").addEventListener("click",(e)=>{
			getDom("#main").style.filter = `blur(6px)`;
			$("#login").fadeIn();
			$("#login input").val("");
		});

		getDom(".register_close").addEventListener("click",(e)=>{
			getDom("#main").style.filter = `blur(0px)`;
			$("#register").fadeOut();
		});

		getDom(".register_close_btn").addEventListener("click",(e)=>{
			getDom(".register_close").click();
		});

		$("#register_form > .input-box > input").on('focus',(e)=>{
			let parent = $(e.target).parent();
			let label = parent[0].querySelector("label");
			label.style.bottom = '20px';
		});

		$(".login-close").on("click",(e)=>{
			$("#login").fadeOut();
			getDom("#main").style.filter = `blur(0px)`;
		});

		$(".login_signUp").on("click",(e)=>{
			$("#login").fadeOut();
			$(".adt_fx.start_false > span").click();
		});

		$("#register_form > .input-box > input").on('focusout',function(e){
			let parent = $(e.target).parent();
			let label = parent[0].querySelector("label");
			label.style.bottom = this.value=="" ? '6px' : '20px';
		});

		const email_ptn = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
		const username_ptn = /^[a-z][\w]{1,}$/;
		const password1_ptn = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;

		getDom("#register_username").addEventListener("input",(e)=>{
			let value = e.target.value;
			let span = getDom(".username-span");
			let input = e.target;
			let label = $(e.target).parent()[0].querySelector("label");

		if(value == ""){ // 다 지웠다면
			span.style.color = "#777";
			label.style.color = "#aaa";
			input.style.borderBottom = `2px solid #e6e6e6`;
			username_ok = false;
			return;
		}

		username_ok = username_ptn.test(value);
		let color = username_ok ? `#12cc86` : `#ff6161`;
		input.style.borderBottom = `2px solid ${color}`;
		label.style.color = color;
		span.style.color = color;
	});

		getDom(".go_login").addEventListener("click",(e)=>{
			$("#register").fadeOut();
			$("#main_start.start_false").click();
		});



		getDom("#register_email").addEventListener("input",(e)=>{
			let value = e.target.value;
			let span = getDom(".email-span");
			let input = e.target;
			let label = $(e.target).parent()[0].querySelector("label");

			if(value==""){
				span.style.color = "#777";
				label.style.color = "#aaa";
				input.style.borderBottom = `2px solid #e6e6e6`;
				email_ok = false;
				return;	
			}

			email_ok = email_ptn.test(value);
			let color = email_ok ? `#12cc86` : `#ff6161`;
			input.style.borderBottom = `2px solid ${color}`;
			label.style.color = color;
			span.style.color = color;
		});

		getDom("#register_password1").addEventListener("input",(e)=>{
			let value = e.target.value;
			let span = getDom(".password1-span");
			let input = e.target;
			let label = $(e.target).parent()[0].querySelector("label");

			$("#register_password2").val("");
			password2_ok = false;
			getDom("#register_password2").style.borderBottom = `2px solid #e6e6e6`;
			let pwd2_label = $("#register_password2").parent()[0].querySelector("label");
			pwd2_label.style.bottom = "6px";
			pwd2_label.style.color = "#aaa";
			getDom(".password2-span").style.color = "#777";


			if(value==""){
				span.style.color = "#777";
				label.style.color = "#aaa";
				input.style.borderBottom = `2px solid #e6e6e6`;
				password1_ok = false;
				return;	
			}

			password1_ok = password1_ptn.test(value);
			let color = password1_ok ? `#12cc86` : `#ff6161`;
			input.style.borderBottom = `2px solid ${color}`;
			label.style.color = color;
			span.style.color = color;
		});

		getDom("#register_password2").addEventListener("input",(e)=>{
			let value = e.target.value;
			let span = getDom(".password2-span");
			let input = e.target;
			let label = $(e.target).parent()[0].querySelector("label");		
			if(value==""){
				span.style.color = "#777";
				label.style.color = "#aaa";
				input.style.borderBottom = `2px solid #e6e6e6`;
				password2_ok = false;
				return;	
			}
			password2_ok = $("#register_password1").val() === value;
			let color = password2_ok ? `#12cc86` : `#ff6161`;
			input.style.borderBottom = `2px solid ${color}`;
			label.style.color = color;
			span.style.color = color;
		});

		function register_process(e){
			if(!username_ok)  	   swal1("FAIL","Username not formatted",'error');
			else if(!email_ok) 	   swal1("FAIL","Email not formatted",'error');
			else if(!password1_ok) swal1("FAIL","Password not formatted",'error');
			else if(!password2_ok) swal1("FAIL","Password Check not match",'error');
			else {
				let data = {};
				data.username = $("#register_username").val();
				data.email = $("#register_email").val();
				data.password = $('#register_password1').val();
				$.ajax({
					method:'post',
					url:"/user_register",
					data:data,
					success:function(result){
						let json = JSON.parse(result);
						if(json.success){
							Swal.fire({
								title: 'SUCCESS',
								text: json.msg,
								icon: 'success',
								showCancelButton: false,
								confirmButtonColor: '#3085d6',
								cancelButtonCotlor: '#d33',
								confirmButtonText: 'OK'
							}).then((result) => {location.reload()});
						}else swal1('FAIL',json.msg,'error');
					}
				});
			}
			return false;
		}

		function swal1(title,sub,icon){
			Swal.fire(title,sub,icon);
		}
	</script>
