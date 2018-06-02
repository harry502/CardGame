class LoginView extends core.UIView {

	private BgGroup:eui.Group;
	private LoginGroup:eui.Group;
	private account:eui.TextInput;
	private password:eui.TextInput;
	private denglu:eui.Group;
	private zhuce:eui.Group;
	private Mark:eui.Label;

	public constructor(){
		super("resource/skins/LoginSkin.exml");
	}

	public open()
	{
		this.addAllListener();
		this.password.inputType = egret.TextFieldInputType.PASSWORD;
	}

	public destroy()
	{

	}

	private addAllListener()
	{
		this.BgGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			this.LoginGroup.visible = true;
		},this);
		this.denglu.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			var params = {};
			HttpManager.getInst().init();
			params['username'] = this.account.textDisplay.text;
			params['password'] = this.password.textDisplay.text;
			HttpManager.getInst().post("http://119.29.204.43/CardGame/backend/web/index.php?r=user/login",params,this);
		},this);

		this.zhuce.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			var params = {};
			HttpManager.getInst().init();
			params['username'] = this.account.textDisplay.text;
			params['password'] = this.password.textDisplay.text;
			params['password1'] = this.password.textDisplay.text;
			HttpManager.getInst().post("http://119.29.204.43/CardGame/backend/web/index.php?r=user/create",params,this);
		},this);
	}

	private onPostComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("post data : ",request.response);
        var result = JSON.parse(request.response);
        this.GetResult(result);
    }

	public GetResult(params:any)
	{
		this.Mark.text = params.Mark;
		console.log(params.Mark,params.status);
		if(params.status == 200 && params.Mark == "登录成功")
		{
			this.LoginSuccess(params.userid);
		}
	}

	public LoginSuccess(user:any)
	{
		Userinfo.getInst().userid = user.userid;
		Userinfo.getInst().userName = user.username;
		Userinfo.getInst().coins = user.wealth;
		DeckManager.getInst().setDeckbyStr(user.decklist);
		CardManager.getInst().setList(user.owncardlist);
		GameViewControl.getInst().LoadView(ViewList.Main);
	}
}
