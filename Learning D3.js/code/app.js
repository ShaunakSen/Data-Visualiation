// d3 provides us 2 methods to SELECT DOM elemets

// 1. d3.select()
// 2. d3.selectAll()

d3.select('h1');

// manupulate DOM elems by chaining:

d3.select('h1')
    .style('color', '#bd5e5e')
    .attr('class', 'my-heading')
    .text('Some updated text')

// add in an element

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

// select all paras

d3.selectAll('p').style('color', '#16067f');