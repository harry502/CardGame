
if(typeof(EventSource)!=="undefined")
{
    console.log(document.getElementById("order"));
    var source=new EventSource("index.php?r=site/order");
    source.onmessage=function(event)
    {
        if(event.data == 0){
            document.getElementById("order").innerHTML ='';
        }else{
            document.getElementById("order").innerHTML = event.data;
        }
    };
}
else
{
    document.getElementById("order").innerHTML="低端的浏览器";
}

