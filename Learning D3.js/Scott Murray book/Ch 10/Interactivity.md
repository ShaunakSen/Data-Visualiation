### Interactivity

### Pointer events on overlapping elems

If 2 elems overlap, and the mouse moves over the elem on top then the `mouseout` event will be triggered on the elem in front

If u move over the bars, color changes, but if we move over the label on the same bar, mouseout event happens and color changes back

Soln:

`pointer-events: none;`

This tells the browser that this elem should not trigger any mouse events. So it lets the events pass to the next elem below it

```
svg
    text{
        pointer-events: none;
    }
```

If we bind event listeners to a group, all elems within that group will be triggered by the events
```
svg
    rect
    rect
    ...
    text
    text
    ...
```
After grouping:
```
svg 
    g
        rect
        text
    g
        rect
        text
    ...
```

**Always name your transitions so that they do not interfere with other transitions**

Sorting code: transitions fixed

``` javascript
//Width and height
			var w = 600;
			var h = 250;

            var sortOrder = false;
			
			var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
							11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

			var xScale = d3.scaleBand()
							.domain(d3.range(dataset.length))
							.rangeRound([0, w])
							.paddingInner(0.05);

			var yScale = d3.scaleLinear()
							.domain([0, d3.max(dataset)])
							.range([0, h]);
			
			//Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			//Create bars
			svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale(i);
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d);
			   })
			   .attr("width", xScale.bandwidth())
			   .attr("height", function(d) {
			   		return yScale(d);
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0, " + Math.round(d * 10) + ")";
			   })
                .on("mouseover", function() {
			   		d3.select(this)
			   			.attr("fill", "orange");
			   })
			   .on("mouseout", function(d) {
				   d3.select(this)
                        .transition("restoreBarColors") // name your transitions so that they do not interfere
                        .duration(500)
						.attr("fill", "rgb(0, 0, " + (d * 10) + ")");
			   })
               .append("title")
               .text(function(d){
                   return "The value is" + d;
               })
               

			//Create labels
			svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return xScale(i) + xScale.bandwidth() / 2;
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");

            // evnet listener on the p
            d3.select("p")
               .on("click", function(){
                   sortBars();
               });

            

            var sortBars = function(){
                sortOrder = !sortOrder;
                svg.selectAll("rect")
                    .sort(function(a,b){
                        if (sortOrder){
                            return d3.ascending(a,b);
                        } else{
                            return d3.descending(a,b);
                        }
                    })     
                    .transition("sortBars")
                    .delay(function(d, i){
                        return i*50;
                    })
                    .duration(1000)
                    .attr("x", function(d, i) {
			   		    return xScale(i);
                    });
                    
                svg.selectAll("text")
                .sort(function(a,b){
                        if (sortOrder){
                            return d3.ascending(a,b);
                        } else{
                            return d3.descending(a,b);
                        }
                    })     
                    .transition()
                    .delay(function(d, i){
                        return i*50;
                    })
                    .duration(1000)
                    .attr("x", function(d, i) {
                        return xScale(i) + xScale.bandwidth() / 2;
                    });
            
            }
```

### Tooltips

