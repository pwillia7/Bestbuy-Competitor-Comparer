function search(){
	//grab URL from input and encode it
	var searchTerm = encodeURIComponent(document.getElementById("searchbox").value);
	//begin AJAX call
	$.ajax({
		url: "https://us.api.invisiblehand.co.uk/v1/products?url="+searchTerm+"&sort=best_price&include_pages=true&app_id=b99c5cf8&app_key=35c6118f97a3e2eedeeca5251fa5049e&size=100",
		success: function(data, textStatus, jqXHR) {
			//remove existing results
			$( ".result" ).remove();
			//eliminate unimportant retailers
			for( var i in data.results[0].pages ){
				var priceCheck = data.results[0].pages[i].price;
				var retailerName = data.results[0].pages[i].retailer_name.toLowerCase();
				if(priceCheck !== null && (retailerName === "target.com" || retailerName === "amazon.com" || retailerName === "tigerdirect.com" || retailerName === "bhphotovideo.com" || retailerName === "officedepot.com" || retailerName === "officemax.com" || retailerName === "crutchfield.com" || retailerName === "walmart.com" || retailerName === "sears.com" || retailerName === "hp.com" || retailerName === "homedepot.com" || retailerName === "lowes.com" || retailerName === "newegg.com" )){
					//parse current page and current object
					var currentResult = data.results[0].pages[i];
					var result = {
						retailer:	currentResult.retailer_name,
						price:		currentResult.price,
						image:      currentResult.image_url,
						link:		currentResult.deeplink,
						title:		currentResult.title.slice(0,80)
				};
				//define result template
				var resultTemplate = "<div class=\"result\"><div class=\"title\">{{title}}</div><div class=\"imageContainer\" style=\"background-image: url(\'{{image}}\');\"></div><div class=\"retailer\">{{retailer}}</div><div class=\"price\">${{price}}</div><div class=\"link\"><a href=\"{{link}}\">1 Here!</a></div></div>";
				//inject result template
				var injectResult = Mustache.to_html(resultTemplate, result);
				$('#results').append(injectResult);
					
				
			}
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			$( ".result" ).remove();
			var resultTemplate = "<div class='error'>Sorry, there was an error. Please try again.</div>";
			var injectResult = Mustache.to_html(resultTemplate, result);
			$('#results').append(injectResult);
		}
});}
