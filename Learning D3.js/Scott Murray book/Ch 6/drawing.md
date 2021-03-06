## Ch 6 - Drawing with data

- To assign class to an elem we use:
`.attr('class', 'bar')`

- There is a diff bw setting a class and applying a style directly to an elem. D3 can do both. **But setting classes is better**

- `classed()`: used to apply or remove classes from elems. Eg: `.classed('bar', true)`

### Simple bar chart:

```javascript
var dataset = [5,10,15,20,25];

            d3.select("body")
                .selectAll("div")
                .data(dataset)
                .enter()
                .append("div")
                .attr("class", "bar")
                .style("height", function(d){
                    var barHeight = d*5 
                    return barHeight + "px";
                });
```

### Complete bar chart code:

```javascript
// Your beautiful D3 code will go here
            var dataset = [ 25, 7, 5, 26, 11, 8, 25, 14, 23, 19, 14, 11, 22, 29, 
                            11, 13, 12, 17, 18, 10, 24, 18, 25, 9, 3 ];
            
            var w = 500;
            var h = 200;
            var barPadding = 1;

            // create an empty svg elem and append it to the DOM

            var svg = d3.select("body").append("svg").attr("width", w).attr("height", h).style("background-color", "none");

            svg.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("x", function(d, i){
                    return i * (w/dataset.length);
                })
                .attr("y", function(d){
                    //console.log(h-d);
                    // y is the coord of the top of the bar
                    // its like h - d: h and then cutting off d pixels so that the bar can grow by d pixels
                    return h-d*4;
                })
                .attr("width", w/dataset.length - barPadding)
                .attr("height", function(d){
                    return d*4;
                })
                .attr("fill", function(d){
                    // taller bars (higher d) will be more blue(less black)
                    return "rgb(0,0," + Math.round(d*10) + ")";
                });     

            // ADD LABELS (using text)

            // x and y pos of labels should be same as that of bars

            svg.selectAll('text')
                .data(dataset)
                .enter()
                .append('text')
                .text(function(d){
                    return d;
                })
                .attr("x", function(d, i){
                    // x pos: left edge of each bar + half of bar width
                    return i * (w/dataset.length) + (w/dataset.length - barPadding)/2;
                })
                .attr("y", function(d){
                    return h-(d*4)+12;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", "white")
                .attr("text-anchor", "middle");
                

```