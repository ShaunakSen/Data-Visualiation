## Data: Chapter 5
### Chaining Methods

`d3.select("body").append("p").text("Mini")`

- d3: References D3 obj
- select("body"): returns refernce to the **first** elem that matches. Alt: selectAll()
- append: creates whatever new elem u specify and appends it to the end but inside of whatever selection its acting on (here body). Finally, **append() hands off a reference to the new elem it just created**
- Because the prev elem passed down the ref to out new p, text acts on it
- ; ends the chain

**When using chaining ORDER MATTERS**. The op type of one method must match the ip expected by the next one

Reading csv:

- while reading csv, d3 converts floats to strings. So its is good to specify a row conversion function

### Displaying dynamic paragraphs

```javascript
d3.select("body").selectAll("p")
                .data(dataset)
                .enter()
                .append("p")
                .text("blaah")
```
Here is what is happenning:

- d3.select("body"): finds the body elem and hands it off as a reference to the next step in the chain
- selectAll("p"): selects ALL paras. As none exist, this returns an empty selection
- data(dataset): Counts and parses our data values. There are 5 values. So **everything past this pt is executed 5 times, once for each value**
- enter(): To create new, data-bound elems enter() is used. This looks at the current DOM selection and then the data being handed to it. If there are more data vals than corr DOM elems then enter() **creates a new placeholder elem**. It then hands off a ref to this new elem
- append("p"): Takes the empty placeholder created by enter() and appends a p elem
- text(): takes ref to newly created p elem and adds text to it

#### NOTE: 

In this eg: if there is already a `<p>` tag : `<p>Test para</p>`, then only 4 paras will be rendered by d3

However if we modify our code to `d3.select("body").selectAll("p")` then still 5 paras will be rendered

### Data Binding

We can check the data

In console: `d3.selectAll("p")`:

`_groups[0]`: array of 5 paras
Under each p obj there is a `__data__` param which holds the corr data value

Thus when d3 binds data to an elem, the data **does not exist in the DOM but exists in memory as a __data__ attr of that elem. And at the console we can confirm whether data has been bound or not**

We can use 
```javascript
.text(function(d){
                    console.log(d);
                    return d;
                })   

```

Anytime after we call data() we can create an annon func that accepts d as ip. The data() method ensures that d is set to the corr value of the original dataset, given the current elem at hand

### Beyond text

```javascript
d3.select("body").selectAll("p")
                .data(dataset)
                .enter()
                .append("p")
                .text(function(i,d){
                    console.log(i,d);
                    return "blaah mini " + d;
                })   
                .style("color", function(d){
                    if(d>15){
                        return "red";
                    } else{
                        return "blue";
                    }
                });
```

We have learned to load data, dynamically create DOM elems bound to data. Next step is drawing with the data!





