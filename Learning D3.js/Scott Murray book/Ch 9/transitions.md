### Modernizing the bar chart

``` javascript

//Width and height
			var w = 600;
			var h = 250;
			
			var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
							11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

			var xScale = d3.scaleBand()
                            .domain(d3.range(dataset.length)) // d3.range is like range in python
                            .rangeRound([0,w]) // round op values to have crisp visuals
                            .paddingInner(0.05) // 5 percent  of width of each band will be used for padding

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
			   .attr("width", xScale.bandwidth()) //scaleBand calculates this for us using bandwidth() function
			   .attr("height", function(d) {
			   		return yScale(d);
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0, " + Math.round(d * 10) + ")";
			   });

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
			

```

### On click

``` javascript

d3.select("p")
               .on("click", function(){
                    // define new values
                    if (!animationFlag){
                        dataset = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
								5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ];
                        animationFlag = true;
                    } else {
                        dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
							11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
                        animationFlag = false;
                    }
                    


                    // update all rects
                    svg.selectAll("rect")
                        .data(dataset) // new data bound : now update the visuals which depend on 'd' as d changes
                        .transition()
                        .attr("y", function(d) {
			   		        return h - yScale(d);
			            })
                        .attr("height", function(d){
                            return yScale(d);
                        })
                        .attr("fill", function(d) {
					        return "rgb(0, 0, " + Math.round(d * 10) + ")";
			            });
                    // update the labels

                    svg.selectAll("text")
                        .data(dataset) // new data bound : now update the visuals which depend on 'd' as d changes: dont think we need to update x
                        .transition()
                        .text(function(d) {
                                return d;
                        })
                        .attr("x", function(d, i) {
			   		        return xScale(i) + xScale.bandwidth() / 2;
			            })
                        .attr("y", function(d) {
                                return h - yScale(d) + 14;
                        });
                    

               });
```