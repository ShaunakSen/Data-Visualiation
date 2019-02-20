## Data: Chapter 5
### Chaining Methods

`d3.select("body").append("p").text("Mini")`

- d3: References D3 obj
- select("body"): returns refernce to the **first** elem that matches. Alt: selectAll()
- append: creates whatever new elem u specify and appends it to the end but inside of whatever selection its acting on (here body). Finally, **append() hands off a reference to the new elem it just created**
- Because the prev elem passed down the ref to out new p, text acts on it
- ; ends the chain

**When using chaining ORDER MATTERS**. The op type of one method must match the ip expected by the next one

### Reading csv

- while reading csv, d3 converts floats to strings. So its is good to specify a row conversion function