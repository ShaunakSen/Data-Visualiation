### Ch 8 - Axes

D3’s call() function takes a selection as input and hands that selection off to any function. So, in this case, we have just appended a new g group element to contain all of our about-to-be-generated axis elements. (The g isn’t strictly necessary, but keeps the elements organized and allows us to apply a class to the entire group, which we’ll do in a moment.)

That g becomes the selection for the next link in the chain. call() hands that selection off to the xAxis function, so our axis is generated within the new g. 

Set CSS of axes:

```css
.axis path,
            .axis line {
                stroke: blueviolet;
                shape-rendering: crispEdges;
            }

            .axis text{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-weight: 300;
                font-size: 14px;
                fill: blueviolet;
            }
```

