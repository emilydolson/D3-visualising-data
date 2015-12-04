---
layout: page
title: JavaScript
subtitle: A quick introduction
minutes: 20
---

> ## Learning Objectives {.objectives}
>
> * Linking to a JavaScript file
> * Javascript variables
> * Functions in Javascript

We've learned how to integrate text and graphical objects into our page.
So far, we might as well just create a plot elsewhere and publish it as an image. But wouldn't it be much better, if the user could interact with the data? To do that, we need to learn a little scripting. Javascript is a programming language designed to be used to manipulate html documents.
Everything between &lt;script&gt; and &lt;/script&gt; within the body will be interpreted as JavaScript code. Since the code we write in the HTML file is executed sequentially, we need to make sure that whenever we refer to an element on the page, this element already exists. An easy way to ensure this is to include scripts just before the end of the body element. 
Just like we did with styles, we can outsource our code into a separate file with the extension `.js`. 

First we need to create our `main.js` file and link to it in the HTML body.

~~~{.html}
<script src="main.js"></script>
~~~

In JavaScript there are two main data types: strings (text, everything in 
quotes) and numbers. It's important to remember that you can't do math with 
strings or append numbers together.

For example:
`5+5 = 10`
but
`'5'+'5' = '55'`

If one of the arguments is a string, the other one gets converted, too:
`5 + '5' = '55'`

> ## Debugging in a browser {.callout}
> If we right click anywhere on our page and select "Inspect Element", the browser takes us to the developer tools.
> Here, we have different tabs. The three most important ones are:
>
> * Console - The console alerts us to things going wrong in out code by showing us an error and telling us in what line the error ocurred. We can also display the values of variables by including `colsole.log(x)` in our code.
> * Elements - If we want to know if our HTML elements are all in the right spot, this is where we need to look. Hovering over any part of the page will highlight the according element and we can look at how they are styled and temporarily change attributes. 
> * Sources - Here, we can look at the files that are used by our page. And even better, if we navigate to the JavaScript file, we can add breakpoints that stay in place when we reload the page. This allows us to investigate values of variables on the spot.

There are two containers in JavaScript: 
arrays (`[]`-notation) and objects (`{}`-notation).

In order to create a container, we have to declare it 
first using the `var` keyword that we've already come across.

~~~{.js}
var list_of_numbers = [];
~~~ 

creates an array. But so far it’s empty. 

We can now add elements to this array but instead let's create it 
again with some values in it, like this:

~~~{.js}
var list_of_numbers = [30, 2, 5];
~~~

Let's use the console of the browser to look at the values of object
by including some extra code:

~~~{.js}
console.log(list_of_numbers);
~~~

Or we can just address one field of the vector. Counting begins from zero, 
so the third field has the index '2'.

~~~{.js}
console.log(list_of_numbers[2]);
~~~

`list_of_numbers` is a vector that holds 3 numbers. 
We can also have a variable that contains a string:

~~~{.js}
var text = 'I love cats.';
~~~

We can address this string by using indices, so `console.log(text[2])`
returns `l`.

Unlike arrays which allow you to access elements using their indices, 
JavaScript objects allow you to index elements using names. 
This lets us create something like this:

~~~{.js}
var cat_object = {
	weight : 5,
	past_weight_values : [4.5, 5.1, 4.9],
	name : 'Princess Caroline'
};
~~~

> ## Creating new attributes {.challenge}
> You can append the list of attributes using the dot-syntax `cat_object.attributename = ...`,
> (`attributename` is a placeholder). Create a new attribute `height` and assign a number! 

Since Javascript is a programming language like any other, it has all of the
standard features like loops, conditionals, and functions. Because of the way
D3 works, we're not actually going to need loops today.
Functions, however, are going to be super important. D3 uses functions 
everywhere. Frequently, we'll be passing functions as arguments to other 
functions. So let's go over the syntax for functions in Javascript:

~~~{.js}
var my_function = function(my_argument){
			console.log(my_argument);
			}
my_function("hi")
~~~

Notice that the function is just another variable. The name that we'll use
to call it is whatever name we gave to the variable. Javascript only
knows that it's a function because we used the `function` keyword. We specified
the arguments that this function takes by listing them in the parentheses after
`function`. The body of the function - the code that gets executed when it's
called - is everything between the open and close curly braces.
This is a pretty boring function - it takes an argument and prints it to
the console. Let's make a function that actually returns a result:

~~~{.js}
var add = function(number1, number2){
		   //This function takes two numbers and returns their sum
    	  	   return(number1 + number2);
		} 
add(1,2)
~~~
~~~{.out}
3
~~~

Since Javascript doesn't force you to pre-define the type of any variable,
we're just trusting whoever uses this function to pass it two variables that
make sense to add. That's why it's really useful to include comments indicating
what your code does (use `//` to indicate that a line is a comment).

Javascript has a lot of handy built-in functions for manipulating websites. 
We're not going to talk about them here, since d3.js provides a lot of similar
functions that are more specialized for dealing with data, which is our purpose
here. But if you're ever trying to build a website or something, you should
definitely give them a look!

> ## Write your own function {.challenge}
> Write a function that takes a Javascript object, `person`, as an argument.
> Assume `person` has a `name` attribute and an age` attribute. Make the
> function log the person's name and age to the console:
> 
> ~~~{.js}
> var person = {name:"Ginny", age:20};
> logNameAndAge(person);
> ~~~
> ~~~{.out}
> "Ginny is 20 years old"
> ~~~