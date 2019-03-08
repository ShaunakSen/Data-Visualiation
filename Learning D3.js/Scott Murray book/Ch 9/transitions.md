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
                        .duration(5000)
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
                        .duration(5000)
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

### On start and On end

- we should not specify a transition inside on start() as there is already a transition in the outer part
- However we can specify a transition on end as then the outer transition will have ended

We can simply chain our transition at the end and that will have the same effect as on end

```javascript
svg.selectAll("circle")
					   .data(dataset)
					   .transition()
   					   .duration(1000)
                        .on("start", function(){
                            d3.select(this)
                                .attr("fill", "magenta")
                                .attr("r", 3);
                        })
					   .attr("cx", function(d) {
					   		return xScale(d[0]);
					   })
					   .attr("cy", function(d) {
					   		return yScale(d[1]);
					   })
                       .on("end", function(){
                           //we can add transitions here bcoz the outer transition is ended
                            d3.select(this)
                                .transition()
                                .duration(1000)
                                .attr("fill", "black")
                                .attr("r", 2);
                        });
```
Chain it to the end:

```javascript
//Update all circles
					svg.selectAll("circle")
					   .data(dataset)
					   .transition()
   					   .duration(1000)
                        .on("start", function(){
                            d3.select(this)
                                .attr("fill", "magenta")
                                .attr("r", 3);
                        })
					   .attr("cx", function(d) {
					   		return xScale(d[0]);
					   })
					   .attr("cy", function(d) {
					   		return yScale(d[1]);
					   })
                        .transition()
                        .duration(1000)
                        .attr("fill", "black")
                        .attr("r", 2);
```


### Clipping our viz

1. Define clipPath and give it an ID
2. Put visual elems within the clipPath
3. Add a ref to the clipPath from whatever elems u wish to be masked

``` javascript

// Define clipping path
            svg.append("clipPath")
                .attr("id", "chart-area")
                .append("rect")
                .attr("x", padding)
                .attr("y", padding)
                .attr("width", w - padding*3)
                .attr("height", h - padding*2);


svg.append("g")
                .attr("id", "circles")
                .attr("clip-path", "url(#chart-area)")
			    .selectAll("circle")
			   .data(dataset)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {
			   		return xScale(d[0]);
			   })
			   .attr("cy", function(d) {
			   		return yScale(d[1]);
			   })
			   .attr("r", 4); // constant radius
```
### Other kinds of data updates

So far we have been changing all values in the `dataset` array, rebinding the revised dataset and overwriting the original values bound to the DOM

This is useful when all values are changing and length of dataset remains same

#### Adding Values

In our bar chart we want a click to add a new bar elem

When we add in an elem to our dataset

The code:

```javascript

var bars = svg.selectAll("rect")			//Select all bars
	.data(dataset);							//Re-bind data to existing bars, return the 'update' selection
											//'bars' is now the update selection
```

bars now contains the updated selection 

bars.enter() : the new elem

We then set the attributes of this new elem:
```javascript
//Enter…
bars.enter()								//References the enter selection (a subset of the update selection)
	.append("rect")							//Creates a new rect
	.attr("x", w)							//Sets the initial x position of the rect beyond the far right edge of the SVG
	.attr("y", function(d) {				//Sets the y value, based on the updated yScale
		return h - yScale(d);
	})
	.attr("width", xScale.bandwidth())		//Sets the width value, based on the updated xScale
	.attr("height", function(d) {			//Sets the height value, based on the updated yScale
		return yScale(d);
	})
	.attr("fill", function(d) {				//Sets the fill value
		return "rgb(0, 0, " + Math.round(d * 10) + ")";
	})

```

We have made the new rect. Now we have to update the visual attr of all rects

At this moment, we are still operating on the new elem. We use `merge()` to combine the enter selection with the update selection

Full code:

```javascript
//Enter…
bars.enter()								//References the enter selection (a subset of the update selection)
	.append("rect")							//Creates a new rect
	.attr("x", w)							//Sets the initial x position of the rect beyond the far right edge of the SVG
	.attr("y", function(d) {				//Sets the y value, based on the updated yScale
		return h - yScale(d);
	})
	.attr("width", xScale.bandwidth())		//Sets the width value, based on the updated xScale
	.attr("height", function(d) {			//Sets the height value, based on the updated yScale
		return yScale(d);
	})
	.attr("fill", function(d) {				//Sets the fill value
		return "rgb(0, 0, " + Math.round(d * 10) + ")";
	})
	.merge(bars)							//Merges the enter selection (new elem) with the update selection (all rects)
	.transition()							//Initiate a transition on all elements in the update selection (all rects)
	.duration(500)
	.attr("x", function(d, i) {				//Set new x position, based on the updated xScale
		return xScale(i);
	})
	.attr("y", function(d) {				//Set new y position, based on the updated yScale
		return h - yScale(d);
	})
	.attr("width", xScale.bandwidth())		//Set new width value, based on the updated xScale
	.attr("height", function(d) {			//Set new height value, based on the updated yScale
		return yScale(d);
	});

```

Reading the chain from start to finish we saw how we started with `bars` then operated on the `enter()` selection
the used `merge(bars)` to bring old bars back to the current selection again, alongside the enter selection

After merge, we transition the x,y,width,ht of **all** bars to the new values

### Removing Values (and elements)

Whenever there are more DOM elems than data values the `exit` selection contains references to those elems without data

```javascript
//Exit…
bars.exit()				//References the exit selection (a subset of the update selection)
	.transition()		//Initiates a transition on the one element we're deleting
	.duration(500)
	.attr("x", w)		//Move past the right edge of the SVG
	.remove();   		//Deletes this element from the DOM once transition is complete
```

### Data join with keys

By default join is by index order - first data value is bound to first DOM elem and so on..

If data values and DOM elems are not in same order, u need a **key function**


					