// sample data

var dataset = [1,2,3,4,5];

var barChartDataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

// settings for bar chart

var svgWidth = 500;
var svgHeight = 300;
var barPadding = 5;

// compute width of each bar

var barWidth = (svgWidth/barChartDataset.length);




// d3 provides us 2 methods to SELECT DOM elemets

// 1. d3.select()
// 2. d3.selectAll()

d3.select('h1');

// manupulate DOM elems by chaining:

d3.select('h1')
    .style('color', '#bd5e5e')
    .attr('class', 'my-heading')
    .text('Introduction to D3.js')

// add in an element


/*
d3.select('body')
    .append('p')
    .text('My first paragraph')
    .style('font-weight', 'bold');

d3.select('body')
    .append('p')
    .text('My second paragraph')
    .style('font-weight', 'bold');

d3.select('body')
    .append('p')
    .text('My third paragraph')
    .style('font-weight', 'bold');

*/

// Data load in D3

d3.select('body')
    .selectAll('p')
    .data(dataset)
    .enter()
    .append('p')
    .text(function(d){
        console.log(d);
        return "paragraph number: " + d;
    });

/* First we select all p
there are no ps at the moment, it will return empty selection
data(dataset): this puts data into waiting set
enter: takes each data item and performs below operations on them
*/

// select all paras

d3.selectAll('p').style('color', '#16067f').style('font-weight', 'bold');


// create the svg container and give it the attrs of width and height

var svg = d3.select('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight);

// creating the bar chart

// bars are nothing but rectangles

/*

first we select all the "rect"
Since we do not have any, it will return an empty selection
We call the data() and provide it the dataset. this method takes the dataset 
and enters waiting state
Enter(): this method will take the dataset from the waiting state and perform operations on them
This performs the next (series of) ops on each data item: so it will call all the methods 
chained below it on each data item (80, 100, 56...)

For each data item we are appending a rect inside our svg container
We provide the attr of y, height, width and transform to each rect
In transform we just specify how to translate each rect in x and y direction
The y translation is 0

Rendered rect html:
<rect y="400" height="100" width="50.55555555555556" transform="translate (55.55555555555556,0)"></rect>
*/

var barChart = svg.selectAll('rect')
                .data(barChartDataset)
                .enter()
                .append("rect")
                .attr("y", function(d){
                    return svgHeight - d;
                })
                .attr("height", function(d){
                    return d;
                })
                .attr("width", barWidth - barPadding)
                .attr("transform", function(d, i){
                    var translate = [barWidth * i, 0];
                    return "translate (" + translate + ")";
                });

// Applying labels to our bar chart

var text = svg.selectAll('text')
                .data(barChartDataset)
                .enter()
                .append('text')
                .text(function(d){
                    return d;
                })
                .attr("x", function(d, i){
                    var xpos = barWidth*i;
                    return xpos;
                })
                .attr("y", function(d, i){
                    var ypos = svgHeight-d-2;
                    return ypos;
                });