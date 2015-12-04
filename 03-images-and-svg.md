---
layout: page
title: Images and SVG
subtitle: Adding graphical components
minutes: 20
---

> ## Learning Objectives {.objectives}
>
> * Understanding Scalable Vector Graphics (SVGs) 
> * Adding multiple SVGs to your page

Websites that only consist of text can be quite boring. So let's have a look at
how we can add graphics!

The end goal for us is to create a graph, which will be made up of graphical 
objects such as lines, circles, and squares. We can do this with Scalable 
Vector Graphics (SVGs).

An SVG is just another element in the HTML file, used in the same way as a 
division.

~~~{.html}
<svg class="chart">
 	<circle cx="25" cy="25" r="15" class="circ1">
 	</circle>
</svg>
~~~

Here, we've created an SVG canvas, using the styles of the class 'chart'.
Within this element, we've created a circle, using the styles of the class 'circ1'.
Both of these classes need to also be defined in our CSS file:

~~~{.css}
.chart {
	width: 100px;
	height: 100px;
}

.circ1 {
	stroke: green; 
	fill: white;
	stroke-width: 5;
}
~~~

The circle element is already defined. 'cx', 'cy', and 'r' are attributes that
are special to the circle element. 'cx' and 'cy' define the x and y coordinates of 
the center of the circle, 'r' is the radius of the circle. 

But what if we don't want to only use circles, but instead want to use other shapes?
On the internet we can find tons of helpful examples. A good resource to 
find simple examples of using different, commonly used SVG shapes is 
[w3school](http://www.w3schools.com/svg/default.asp). 

> ## Question {.challenge}
>
> What happens if 'cx' and 'cy' aren't set?

> ## Make art! {.challenge}
>
> Make some art, using at least one circle, one rectangle, and one polygon.
> If you don't know what to do, draw a robot! 

> ## Create and use your own class {.challenge}
>
> Create a class called `prettycircle` and apply it to a circle in your html.
> Use it to set some combination of the following attributes: opacity, stroke,
> fill, and stroke-width. 