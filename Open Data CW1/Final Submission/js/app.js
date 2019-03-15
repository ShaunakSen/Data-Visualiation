//Width and height
console.log("app.js")
var w = 800;
var h = 600;
var padding = 60;

var capacity_min = 50;
var estimated_generation_gwh_min = 50;

var capacity_max = 2000;
var estimated_generation_gwh_max = 4000;


var dataset, fullDataset, xScale, yScale, xAxis, yAxis, aScale, colorScheme, colorScheme2;  //Empty, for now

var listOfCountries = [];

var capacityMinSelected = 0;
var estimationMinSelected = 0;

var selectedCountries = listOfCountries;



colorScheme2 = [
    "#7D80DA", "#072986","#69686b",
    "#D5A021", "#f08453", "#937666", "#4EA699", "#FF2C55", "#44c309",
    "#92140C", "#BE5A38", "#531253", "#f15353", "#A663CC", "#6B2B06"
];


//Function for converting CSV values from strings to Dates and numbers

var rowConverterFull = function(d) {
    return {
    name: d.name,
    owner: d.owner,
    country: d.country_long,
    capacity: parseFloat(d.capacity_mw),
    generation_gwh_2015: parseFloat(d.generation_gwh_2015),
    estimated_generation: parseFloat(d.estimated_generation_gwh)
    };
};



var rowConverter = function(d) {

    // convert to float

    capacity_mw = parseFloat(d.capacity_mw);
    generation_gwh_2015 = parseFloat(d.generation_gwh_2015);
    estimated_generation_gwh = parseFloat(d.estimated_generation_gwh);

    // filter condn: TO CHANGE LATER
    if (capacity_mw > 0 && estimated_generation_gwh >0 && generation_gwh_2015 >0) {
        return {
            name: d.name,
            owner: d.owner,
            country: d.country_long,
            capacity: parseFloat(d.capacity_mw),
            generation_gwh_2015: parseFloat(d.generation_gwh_2015),
            estimated_generation: parseFloat(d.estimated_generation_gwh)
        };
    }
};



// save full dataset elsewhere
d3.csv("./Clean_data_final.csv", rowConverter, function(data) {
    fullDataset = data;
    console.log("Full dataset saved");
});

    
//Load in data
d3.csv("./Clean_data_final.csv", rowConverter, function(data) {
    dataset = data;
    colorScheme = d3.schemeCategory20c;
    console.log(colorScheme);
    console.table(dataset, ['name', 'owner', 'country', 'capacity', 'generation_gwh_2015', 'estimated_generation']);

    // populate list of countries

    for (var i=0; i<dataset.length; ++i){
        if(!listOfCountries.includes(dataset[i].country)){
            listOfCountries.push(dataset[i].country);
        }
    }

    console.log(listOfCountries);



    d3.select("body").append("br")
    
    // datset has been loaded

    // set up the scales

    xScale = d3.scaleLinear()
                     .domain([
                         d3.min(dataset, function(d) { return d.capacity; }),
                         d3.max(dataset, function(d) { return d.capacity; })
                         ])
                     .rangeRound([padding, w - padding * 2]);
    yScale = d3.scaleLinear()
        .domain([
            d3.min(dataset, function(d){ return d.estimated_generation; }),
            d3.max(dataset, function(d){ return d.estimated_generation; })
        ])
    .rangeRound([h-padding, padding]);

    aScale = d3.scaleSqrt()
        .domain([
            d3.min(dataset, function(d){ return d.generation_gwh_2015; }),
            d3.max(dataset, function(d){ return d.generation_gwh_2015; })
        ])
    .rangeRound([2, 30]);

    //Define X axis
    xAxis = d3.axisBottom()
                    .scale(xScale)
                    .ticks(10);

    //Define Y axis
    yAxis = d3.axisLeft()
                    .scale(yScale)
                    .ticks(10);

    //Create SVG element
    var svg = d3.select("#svg-element")
                .attr("width", w)
                .attr("height", h);

    // Define clipping path
    svg.append("clipPath")
        .attr("id", "chart-area")
        .append("rect")
        .attr("x", padding)
        .attr("y", padding)
        .attr("width", w - padding*3)
        .attr("height", h - padding*2);

    // Create the circles

    svg.append("g")
        .attr("id", "circles")
        .attr("clip-path", "url(#)")
        .selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d){
            return xScale(d.capacity);
        })
        .attr("cy", function(d){
            return yScale(d.estimated_generation);
        })
        .attr("r", function(d){
            return aScale(d.generation_gwh_2015);
        })
        .attr("fill", function(d){
            var country_name = d.country;
            var indexOfCountry = listOfCountries.indexOf(country_name);
            return colorScheme2[indexOfCountry];
        })
        .append("title")
        .text(function(d){
            return "Country: " + d.country + "\nCapacity " + d.capacity + 
            "\nEstimated generation: " + Math.round(d.estimated_generation) + 
            "\nGeneration 2015: " + Math.round(d.generation_gwh_2015) +
            "\nName of plant: " + d.name +
            "\nOwner: " + d.owner;
        })

    // Create X axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (h-padding) + ")")
        .call(xAxis);

    // Create Y axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + (padding) + ",0)")
        .call(yAxis);

    // X axis label

    svg.append("text")
        .attr("id", "x-axis-label")
        .style("text-anchor", "middle")
        .attr("x", w/2)
        .attr("y", h-padding/2)
        .text("Capacity (in mw)");

    // Y axis label

    svg.append("text")
        .attr("id", "y-axis-label")
        .style("text-anchor", "middle")
        .attr("x", -h/2 + padding/2)
        .attr("y", padding/2 - 20)
        .text("Estimated generation (in gwh)");

    // indicator line for slider
    svg.append("line")
        .attr("class", "line safeLevel")
        .attr("id", "vertical-line")
        .attr("x1", padding + capacityMinSelected)
        .attr("x2", padding + capacityMinSelected)
        .attr("y1", h-padding)
        .attr("y2", padding);

    svg.append("line")
        .attr("class", "line safeLevel")
        .attr("id", "horizontal-line")
        .attr("x1", padding)
        .attr("x2", w-padding*2)
        .attr("y1", h-padding - estimationMinSelected)
        .attr("y2", h-padding - estimationMinSelected);

    // populate dropdown with countries
    
    var dropdown = document.getElementById("country-dropdown");
    var initialSelectedCountries = listOfCountries.slice(0,listOfCountries.length);
    listOfCountries.forEach(function(country){
        var option = document.createElement("option");
        option.setAttribute("value", country);
        if (initialSelectedCountries.includes(country)){
            option.setAttribute("selected", true);
        }
        option.text = country;
        dropdown.appendChild(option);
    });


    // CODE TO HANDLE USER INPUT -- DROPDOWNS

    d3.select("#country-dropdown").on("change", function(){
        
        // check which countries are selected
        selectedCountries = [];
        for (var i=0; i<this.options.length; ++i){
            if (this.options[i].selected){
                selectedCountries.push(listOfCountries[i]);
            }
        }
        console.log("Selected countries:" + selectedCountries);

        // Update plot
        svg.selectAll("circle")
            .filter(function(d){
                var currentCountry = d.country;
                if (selectedCountries.includes(currentCountry) && 
                d.capacity > capacityMinSelected && d.estimated_generation > estimationMinSelected){
                    return d;
                }
            })
            .each(animateIn);

        svg.selectAll("circle")
            .filter(function(d){
                var currentCountry = d.country;
                if (!(selectedCountries.includes(currentCountry) && 
                d.capacity > capacityMinSelected && d.estimated_generation > estimationMinSelected)){
                    return d;
                }
            })
            .each(animateOut);
            
        
    });

    // CODE TO HANDLE USER INPUT -- SLIDER - CAPACITY

    d3.select("#capacity-min").on("change", function(){
        capacityMinSelected = parseFloat(this.value);
        d3.select("#capacity-min-value").html("Selected Value: "+capacityMinSelected)
        console.log(capacityMinSelected);

        // update indicator
        svg.select("#vertical-line")
            .transition()
            .duration(1000)
            .attr("x1", xScale(padding + capacityMinSelected)-7)
            .attr("x2", xScale(padding + capacityMinSelected)-7)
            .attr("y1", h-padding)
            .attr("y2", padding);


        // try to update the plot
        svg.selectAll("circle")
            .filter(function(d){
                var currentCountry = d.country;
                if (selectedCountries.includes(currentCountry) && 
                d.capacity > capacityMinSelected && d.estimated_generation > estimationMinSelected){
                    return d;
                }
            })
            .each(animateIn);

        
            

        svg.selectAll("circle")
        .filter(function(d){
            var currentCountry = d.country;
            if (!(selectedCountries.includes(currentCountry) && 
            d.capacity > capacityMinSelected && d.estimated_generation > estimationMinSelected)){
                return d;
            }
        })
        .each(animateOut);

    });


    // CODE TO HANDLE USER INPUT -- SLIDER - ESTIMATION

    d3.select("#estimation-min").on("change", function(){
        estimationMinSelected = parseFloat(this.value);
        d3.select("#estimation-min-value").html("Selected Value: "+estimationMinSelected)
        console.log(estimationMinSelected);

        // update indicator
        svg.select("#horizontal-line")
            .transition()
            .duration(1000)
            .attr("x1", padding)
            .attr("x2", w-padding*2)
            .attr("y1", yScale(estimationMinSelected))
            .attr("y2", yScale(estimationMinSelected));



        // try to update the plot
        svg.selectAll("circle")
            .filter(function(d){
                var currentCountry = d.country;
                if (selectedCountries.includes(currentCountry) && 
                d.capacity > capacityMinSelected && d.estimated_generation > estimationMinSelected){
                    return d;
                }
            })
            .each(animateIn);

        
            

        svg.selectAll("circle")
        .filter(function(d){
            var currentCountry = d.country;
            if (!(selectedCountries.includes(currentCountry) && 
            d.capacity > capacityMinSelected && d.estimated_generation > estimationMinSelected)){
                return d;
            }
        })
        .each(animateOut);

    });


    var animateIn = function(d, i) {
        d3.select(this)
            .transition()
            .delay(i * 10)
            .duration(1000)
            .ease(d3.easeBounce)
            .style("opacity", 0.7)
            .attr("class", "circle");
    };

    var animateOut = function(d, i) {
        d3.select(this)
            .transition()
            .delay(i * 10)
            .duration(1000)
            .ease(d3.easeBounce)
            .style("opacity", 0)
            .attr("class", "circle hidden");
    };


    // Create the labels
    var labelElement = document.getElementById("label-row");

    var labelHTML = '';

    for (var i = 0; i < listOfCountries.length; ++i){
        labelHTML += '<h6 class="label-element">' + listOfCountries[i] + 
        '<span class="badge badge-secondary" style="background-color:' + colorScheme2[i]
        + ' "></span></h6>'
    }

    labelElement.innerHTML = labelHTML;


    d3.select("#theme-selector").on("change", function(){
        if (this.checked){
            d3.select("#main-row")
                .attr("class", "row dark");

            d3.select("#label-row")
                .selectAll("h6")
                .attr("class", "label-element dark");

            svg.selectAll("text")
                .attr("fill", "#919aa1");
        } else{
            d3.select("#main-row")
                .attr("class", "row");

            d3.select("#label-row")
                .selectAll("h6")
                .attr("class", "label-element");

            svg.selectAll("text")
                .attr("fill", "#000");
        }
    });



});
