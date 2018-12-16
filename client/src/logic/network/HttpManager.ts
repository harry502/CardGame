// TypeScript file

class HttpManager
{
    private static inst: HttpManager;
    public static getInst() {
        if (HttpManager.inst == null) {
            HttpManager.inst = new HttpManager();
        }
        return HttpManager.inst;
    }

    private request:egret.HttpRequest;

    public constructor(){
        this.init();
    }

    public init()
    {
        this.request = new egret.HttpRequest();
        this.request.responseType = egret.HttpResponseType.TEXT;
        this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }

    public post(api:string,params:any,obj:any)
    {
        //设置为 POST 请求
        var URL = RES.getRes("netconfig_json");
        this.request.open(URL.http_url + api,egret.HttpMethod.POST);
        var data = "";
        for(let i in params)
        {
            data = data + "&&" + i + "=" + params[i];
        }
        this.request.send(data);
        this.request.addEventListener(egret.Event.COMPLETE,obj.onPostComplete,obj);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
        this.request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
    }

    private onPostIOError(event:egret.IOErrorEvent):void {
        console.log("post error : " + event.type);
    }

    private onPostProgress(event:egret.ProgressEvent):void {
        console.log("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }

}