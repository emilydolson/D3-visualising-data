---
layout: page
title: D3 - Paths
subtitle: Let's make some lines!
minutes: 10
---

Polygons and circles are all well and good, but sometimes you need a more 
complicated shape. Or maybe a line. In either case, what you're looking for
is an SVG `path`. Paths are elements just like `circle` and `rect`. However,
whereas circles require you to set `cx`, `cy`, and `r`, paths have one attribute
that describes their entire shape. This attribue it called `d`, and it contains
a string. This string is actually a series of instructions for how to draw the
path. You can think of it like someone has a pen and paper, and you're trying
to tell them how to draw the shape that you want.

For instance, you could draw a line with the string `"M100 100 L200 200"`. `M`
means "moveto" - you're telling the person drawing your shape where on the paper
they should put their pen down. In this case, the coordinates that the pen
should be placed at are `(100, 100)`. All paths need to start with an `M` 
command. The next command is `L`. That stands for "line to." You're telling the
person drawing your shape to draw a line to coordinates `(200, 200)`.

A full list of commands is available 
[here](http://www.w3schools.com/svg/svg_path.asp), if you're interested.

We could make this path in D3:

~~~{.js}
frame.append("path").attr("d", "M100, 100 L200, 200")
~~~

But that's a pain. We don't want to bother fiddling with coordinates. And we
certainly don't want to write a string that will draw, say, a high resolution
image of 
[Great Britain](https://en.wikipedia.org/wiki/How_Long_Is_the_Coast_of_Britain%3F_Statistical_Self-Similarity_and_Fractional_Dimension).

Fortunately, D3 gives us a better way. Remember how we can pass the
`attr()` function a callback function as its second argument? And how every time
we do that, the callback function gets passed whatever data is bound to the 
current element? Up until now, we've always written the callback function in
the same line as we pass it to `attr()`. But it doesn't have to be that way.
We can create the callback function somewhere earlier in the code and store it
in a variable. That means we can write a function once that translates our
data to a path description, and then use it every time we make a path.

D3 goes one step beyond that. It has a series of functions that will create
these path translation functions for us. Function-ception! D3 gives us functions
to write functions to make lines, filled areas, arcs, and 
[more](https://github.com/mbostock/d3/wiki/SVG-Shapes#line). For now, let's talk
about lines, since they're the most commonly used.

The function to make a line-generating function is `d3.svg.line()`:

~~~{.js}
var line_maker = d3.svg.line();
var data = [[100,100], [500,500]]

line_maker(data);
~~~
~~~{.out}
"M100,100L400,400"
~~~

Since we didn't change any default settings, `line_maker` expected to receive
a list of (x, y) coordinate pairs that directly translate to on-screen 
coordinates. It gave us a string describing a line that started at the first 
point (100, 100) and went to the second point (500, 500). 

Let's see how it looks! Note that we have to put `data` inside another array - 
otherwise D3 will think we want one path with the data value `[100, 100]` and a
 second path with the data value `[500, 500]` instead of a single path with the
data value `[[100, 100], [500, 500]]`. Also note that we have to set the
stroke color to black for the line to actually show up.

~~~{.js}
frame.append("g")
	.selectAll("path")
	.data([data])
	.enter()
	.append("path")
	.attr("d", line_maker)
	.style("stroke", "black")
~~~

D3 also offers a lot of ways to customize the lines that the line generator
makes. For instance, we've got this nice scale on our chart. Wouldn't it be
nice if we could use this scale for the line too? Turns out we can! With the
x accessor function (`.x()`), we can pass our line generator a new function to 
use for converting the raw data to an x value:

~~~{.js}
line_maker.x(function(d) {return (xScale(d[0])) })
~~~

Like the default function, this function assumes that each data point in the
series is a two-element array representing the x and y coordinates. It takes the
x coordinate and passes it into our `xScale` from before (yes, it was secretly a
function all along, too). We can do the same thing with y:

~~~{.js}
line_maker.y(function(d) {return (yScale(d[1])) })
~~~

> #Use a different data format  {.challenge}
> The data in our example dataset isn't an array of arrays, it's an array of
> objects. Change the x and y accessors to assume that each data point is an
> object with a `gdpPercap` variable and a `lifeExp` variable, like in our
> dataset.

There are more functions for changing the way the lines is made (e.g. which
`interpolate` function is used), but these are by far the two most common.

> #Display a country's trajectory  {.challenge}
> One problem with this visualization is that it's hard to track what any one
> country does over time. Choose a country and plot a path representing data
> points from that country from all years.
> 
> Hint #1: Step 1 is filtering the entire data-set by country
> Hint #2: If you don't set the style of "fill" to "none", D3 will attempt to
> fill in the area "inside" your line, usually with strange-looking results.

> #Add a fancy interaction  {.challenge}
> Add an event so that when you click a circle, it's trajectory shows up and
> when you click it again it goes away and you can click a different circle.
> Hint: Remember that you can remove an element by binding empty data and
> and then removing the exit selection. 
>
> If you're feeling adventurous, try to make it possible to show as many
> paths at once as you want. Hint: Think about filtering by data.
