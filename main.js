function search(){
    console.log("searching");
	var searchTerm = document.getElementById("searchbox").value;
	
	$.ajax({
		
		url: "https://us.api.invisiblehand.co.uk/v1/products?identifier="+searchTerm+"&include_pages=true&app_id=b99c5cf8&app_key=35c6118f97a3e2eedeeca5251fa5049e&size=100",
		success: function(data, textStatus, jqXHR) {
			
			//eliminate unimportant retailers
			for( var i in data.results[0].pages ){
				var retailerName= data.results[0].pages[i].retailer_name.toLowerCase();
				if(retailerName === "target.com" || retailerName === "amazon.com" || retailerName === "tigerdirect.com" || retailerName === "bhphotovideo.com" || retailerName === "officedepot.com" || retailerName === "officemax.com" || retailerName === "crutchfield.com" || retailerName === "walmart.com" || retailerName === "sears.com" || retailerName === "hp.com" || retailerName === "homedepot.com" || retailerName === "lowes.com" || retailerName === "newegg.com"){
					console.log(retailerName);
					//create current object
					var currentResult = data.results[0].pages[i];
					console.log(currentResult);
					var result = {
						retailer:	currentResult.retailer_name,
						price:		currentResult.price,
						image:      currentResult.image_url,
						link:		currentResult.deeplink,
						title:		currentResult.title.slice(0,50)
					};
					console.log(result.retailer);

				
					var resultTemplate = "<div class=\"result\"><div class=\"title\">{{title}}</div><div class=\"imageContainer\" style=\"background-image: url(\'{{image}}\');\"></div><div class=\"price\">${{price}}</div><div class=\"retailer\">{{retailer}}</div><div class=\"link\"><a href=\"{{link}}\">Click Here!</a></div></div>";
					var injectResult = Mustache.to_html(resultTemplate, result);
					$('#results').append(injectResult);
					
				
				}
}
  }});}