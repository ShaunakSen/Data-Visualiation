## Plotly : Interactive plots in Python

> Based on the tutorial series by CharmingData : https://www.youtube.com/playlist?list=PLh3I780jNsiTXlWYiNWjq2rBgg3UsL1Ub

---

### Introduction

Why plotly

- It is one of the few platforms that allow us to create fully interactive dashboards in python and deploy them to the web
- We can use plotly with Python, Julia or R
- Powerful graphs with very little code

**Plotly express vs Plotly Graph Objects**

Plotly express is to PGO as what seaborn is to matplotlib

PE is quick and powerful

In PGO we have to build everything from the bottom-up
We have to define data + layout + ...

> Start with plotly express, use PGO if u need more customizations

### The Data

> Link: https://drive.google.com/file/d/1G3YI7y6EUIvwXxW7WnoII4KGUs5PPLLf/view

This is about the number of bird deaths that take place every year due to the birds colliding with the windows and we wnat to raise some awareness for that



### Navigating the documentaion

> High level interface documentation: https://plotly.com/python-api-reference/plotly.express.html#px


For example the express doc for pie/doughnut chart is here: https://plotly.com/python-api-reference/generated/plotly.express.pie.html#plotly.express.pie

Say we want to add more customizations to our chart that are not supported by express

We want to change the text inside each slice but that feature is not available in plotly express


### Plotly Graph Objects

- Layout represents the chart (frames, title, color, tick, hover, legend). Basically different ways of customizing the chart 
- Traces are representing the data (inside the layout)

Update these by the `update_traces` and `update_layout` methods

Link: https://plotly.com/python/reference/index/



