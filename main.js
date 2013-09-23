function search(){
    console.log("searching");
 searchTerm = document.getElementById("searchbox").value;
$.ajax({
  url: "https://us.api.invisiblehand.co.uk/v1/products?query="+encodeURIComponent(searchTerm)+"&app_id=b99c5cf8&app_key=35c6118f97a3e2eedeeca5251fa5049e&size=100",
  success: function(data, textStatus, jqXHR) {
    for(i = 0; i <= data.results.length; i++){
        //if retailer name matches, continue
        var retailerName = data.results[i].best_page.retailer_name.toLowerCase();
        if(retailerName === "target.com" || retailerName === "amazon.com" || retailerName === "tigerdirect.com" || retailerName === "bhphotovideo.com" || retailerName === "officedepot.com" || retailerName === "officemax.com" || retailerName === "crutchfield.com" || retailerName === "walmart.com" || retailerName === "sears.com" || retailerName === "hp.com" || retailerName === "homedepot.com" || retailerName === "lowes.com" || retailerName === "newegg.com"){
        //create result container
        resultContainer = document.createElement("div");
            resultContainer.setAttribute("id", "result"+i+1);
            resultContainer.setAttribute("class", "resultcontainer");
            $(resultContainer).appendTo( "#wrapper" );
        titleDiv = document.createElement("div");
            titleDiv.setAttribute("class", "title");
            Title = data.results[i].title;
            titleDiv.innerHTML = Title;
            $(titleDiv).appendTo( "#result"+i+1 );
        retailerDiv = document.createElement("div");
            retailerDiv.setAttribute("class", "retailer");
            Retailer = data.results[i].best_page.retailer_name;
            retailerDiv.innerHTML = Retailer;
            $(retailerDiv).appendTo( "#result"+i+1);
        priceDiv = document.createElement("div");
            priceDiv.setAttribute("class", "price");
            Price = data.results[i].best_page.price;
            priceDiv.innerHTML = "$"+Price;
            $(priceDiv).appendTo( "#result"+i+1);
        linkDiv = document.createElement("div");
            linkDiv.setAttribute("class", "link");
            linkDiv.setAttribute("id", "link"+i+1);
            Link = data.results[i].best_page.deeplink;
            $(linkDiv).appendTo( "#result"+i+1);
        linkAnchorDiv = document.createElement("a");
            linkAnchorDiv.setAttribute("href", Link);
            linkAnchorDiv.setAttribute("class", "linkAnchor");
            linkAnchorDiv.innerHTML = "Link";
            $(linkAnchorDiv).appendTo( "#link"+i+1);
    }
   
         }

     }
    });}

