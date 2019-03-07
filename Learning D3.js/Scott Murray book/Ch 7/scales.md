### Scales

**Scales are functions that map from an ip domain to an op range**

They map the data values to pixel measurements in the viz

i/p domain -------> o/p range

ip domain depends on data. The op range is upto us the develeoper of the viz

With linear scales D3 handles the math of the normalization process. the ip value is normalized acc to the domain and then the normalized value is scaled to the op range

For eg: with 365 days in a yr, day no 310 maps upto 0.85 of the way through a yr. If upper limit of op range = 100, then 310 will corr to value of 85 in op range

The power of using scales is that if we add new data pts or if we change ht or width of SVG everything scales approprately

```javascript

var dataset = [
							[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
							[410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
						  ];

            //Width and height
			var w = 500;
			var h = 100;

            var padding = 20;


            // X SCALE

            // lower domain can be calculated using min() as well
            // upper end of domain is set to the max x coord of dataset
            // op range is set from 0 to SVG width +/- padding to push them inside the svg container
            var xScale = d3.scaleLinear()
                            .domain([0, d3.max(dataset, function(d){ return d[0];})])
                            .range([0 + padding, w - padding*2]);

            // Y SCALE

            // Note how the range oof y has to be inverted so that larger y values are near top

            var yScale = d3.scaleLinear()
                            .domain([0, d3.max(dataset, function(d){ return d[1];})])
                            .range([h - padding, 0 + padding]);
            

            // R scale: map y values to a anumber bw 2 and 5: data value of 0 get rad 2 and max data value get rad of 5

            rScale = d3.scaleLinear()
                        .domain([0, d3.max(dataset, function(d){ return d[1]; })])
                        .range([2, 5])

            //Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

            svg.selectAll("circle")
                .data(dataset)
                .enter()
                .append("circle")
                .attr("cx", function(d){
                    return xScale(d[0]);
                })
                .attr("cy", function(d){
                    return yScale(d[1]);
                })      
                .attr("r", function(d){
                    // making circles at the top larger
                    // return Math.sqrt(h-d[1]);
                    return rScale(d[1]);

                });

            // Labelling

            svg.selectAll("text")
                .data(dataset)
                .enter()
                .append("text")
                .text(function(d){
                    return d[0] + "," + d[1];
                })
                .attr("x", function(d){
                    return xScale(d[0]);
                })
                .attr("y",function(d){
                    return yScale(d[1]);
                })
                .attr("font-family", "sans-serif")
			    .attr("font-size", "11px")
			    .attr("fill", "red");

```

### Other methods:

d3.scale.linear() has several other handy methods that deserve a brief mention here:

- nice() — This tells the scale to take whatever input domain that you gave to range() and expand both ends to the nearest round value. From the D3 wiki: “For example, for a domain of [0.20147987687960267, 0.996679553296417], the nice domain is [0.2, 1].” This is useful for normal people, who find it hard to read numbers like 0.20147987687960267.
  
- rangeRound() — Use rangeRound() in place of range() and all values output by the scale will be rounded to the nearest whole number. This is useful if you want shapes to have exact pixel values, to avoid the fuzzy edges that may arise with antialiasing.
  
- clamp() — By default, a linear scale can return values outside of the specified range. For example, if given a value outside of its expected input domain, a scale will return a number also outside of the output range. Calling .clamp(true) on a scale, however, forces all output values to be within the specified range. Meaning, excessive values will be rounded to the range’s low or high value (whichever is nearest).

#### Square Root Scales

```javascript
var aScale = d3.scaleSqrt()
                            .domain([0, d3.max(dataset, function(d){return d[1];})])
                            .range([0,10]);
```

#### Time Scales

Convert strings to Date:

`var parseTime = d3.timeParse("%m/%d/%y)`

We can do this while reading csv:

```javascript

var rowConverter = function(d) {
				return {
					Date: parseTime(d.Date),
					Amount: parseInt(d.Amount)
				};
			}

```