var dataset = [4, 10, 15, 16, 23, 42];


d3.select("body")					// We select the body, as before, and pass this down the chain
	.selectAll("p")					// Within the body, we now select ALL paragraph (<p>) elements. We dont have any initially, this returns an empty selection.
	.data(dataset)					// counts and parses the data values within the dataset array. There are 6 values, so each step will be executed 6 times
	.enter()	// enter examines the doc and the data being passed into it.  As there are more data values (6) than corresponding DOM elements (0), enter() creates new placeholder elements and hands them down the chain
		.append("p")				// we now append a new paragraph, by taking the placeholder element created within enter() and inserting a <p> element into it in the DOM
		.text(function (d) {
			return d;
		})		// And finally adds some text to the newly created paragraph
		.style("color", function (d){
			if (d > 15) {
				return "red";
			} else{
				return "blue";
			}
		})


// create a simple bar chart

d3.select("body")
	.selectAll("div")
	.data(dataset)
	.enter()
	.append("div")
	.attr("class", "bar")
	.style("height", function(d){
		return d*5 + "px";
	})

// EXERCISE

var foods = [
	{
		name: "sandwich",
		price: 2,
		calorie_count: 200
	},
	{
		name: "pizza",
		price: 4,
		calorie_count: 400
	},
	{
		name: "lasagna",
		price: 5,
		calorie_count: 500
	},
	{
		name: "salad",
		price: 3,
		calorie_count: 150
	},
	{
		name: "chocolate bar",
		price: 1.50,
		calorie_count: 100
	}
]

d3.select("body")
	.append("table")


d3.select("table")
	.selectAll("tr")
	.data(foods)
	.enter()
		.append("tr")


d3.select("table")
	.data(Object.keys(foods[1]))
	.enter()
		.selectAll("tr")
		.append("td")

/*
Anytime after you call data(), you can create anonymous functions that accept d as an input - where d is always set to the corresponding value in the dataset. 
data() handles this, and ensures d is always set to the correct value. As D3 loops through each element, it updates the value of d accordingly.
*/

/*

d3.selectAll("p")

returns an obj 
obj._groups is an array of 6 para obj
para1.__data__ = 4
para2.__data__ = 10
...
and so on

*/


