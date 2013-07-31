function refresh()
{
    var req = new XMLHttpRequest();
 	console.log("Refreshing Count...");
 	var url = urlObject({'url':document.location});
 	var subreddit = url.parameters.subreddit;
    req.onreadystatechange=function() {
		if (req.readyState==4 && req.status==200) {
    		var json=req.responseText.split("<!-- Hosting24 Analytics Code -->")[0]; //needed because of free hosting bullshit
    		var obj=JSON.parse(json);
    		var childrenArray = obj.data.children;
    		var imgRedditUrl = "";
    		var imgTitle = "";
    		var imgUrl = "";
			for (var i = 0; i < childrenArray.length; i++) {
				var child = childrenArray[i].data;
				imgUrl = child.url;
				imgRedditUrl = "http://www.reddit.com"+child.permalink;
				imgTitle = child.title;
				if (!child.is_self && (endsWith(imgUrl, ".png") || endsWith(imgUrl, ".jpg") || endsWith(imgUrl, ".jpeg") || endsWith(imgUrl, ".gif")))
					break;
			}
    		imgTitle.length <= 120 ? imgTitle : imgTitle.substring(0,120)+'...'; //sets a limit to the character length
    		document.getElementById("mainContainer").innerHTML='<h2>Top picture on /r/'+subreddit+'</h2><img class="image" src="'+imgUrl+'" /><p>'+imgTitle+'</p>';
      	}
    }
    req.open("GET", 'get.php?subreddit='+subreddit, true);
    req.send(null);
}
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
function init()
{
	// Change page background to black if the URL contains "?desktop", for debugging while developing on your computer
	if (document.location.href.indexOf('desktop') > -1)
	{
		document.getElementById('mainContainer').style.backgroundColor = 'black';
	}
	refresh();
	var int=self.setInterval(function(){refresh()},600000);
}
function urlObject(options)
{
   default_options = {'url':window.location.href,'unescape':true,'convert_num':true};

   if(typeof options !== "object")
      options = default_options;
   else
   {
      for(var index in default_options)
      {
         if(typeof options[index] ==="undefined")
            options[index] = default_options[index];
      }
   }
 
   var a = document.createElement('a');
   a.href = options['url'];
   url_query = a.search.substring(1);

   var params = {};
   var vars = url_query.split('&');

   if(vars[0].length > 1)
   {
      for(var i = 0; i < vars.length; i++)
      {
        var pair = vars[i].split("=");
        var key = (options['unescape'])?unescape(pair[0]):pair[0];
        var val = (options['unescape'])?unescape(pair[1]):pair[1];
 
        if(options['convert_num'])
        {	
           if(val.match(/^\d+$/))
             val = parseInt(val);
 
           else if(val.match(/^\d+\.\d+$/))
             val = parseFloat(val);
        }

        if(typeof params[key] === "undefined")
           params[key] = val;
        else if(typeof params[key] === "string")
           params[key] = [params[key],val];
        else
           params[key].push(val);
      }	
   }

   var urlObj = {
      protocol:a.protocol,
      hostname:a.hostname,
      host:a.host,
      port:a.port,
      hash:a.hash,
      pathname:a.pathname,
      search:a.search,
      parameters:params
   };
 
   return urlObj;
}