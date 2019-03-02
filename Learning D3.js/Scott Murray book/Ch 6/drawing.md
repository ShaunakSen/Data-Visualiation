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

