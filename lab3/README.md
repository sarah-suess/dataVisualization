### Learning Objectives

After completing this lab you will be able to:
* Run a simple HTTP server with `python`
* Load data with D3 (includes learning about asynchronous methods)
* Basics of D3:
	* Create a D3 selection
	* Append elements with D3
	* Data-bindings with D3 to create new HTML elements based on data
	* Set HTML style and attributes with D3

### Prerequisites

* Download the corresponding lab from the code repo (either using git, or downloading the folder) from the code of this repo (in the Code tab above)
* You have **read Chapters 5 and 6** in [D3 - Interactive Data Visualization for the Web](http://alignedleft.com/work/d3-book-2e) by Scott Murray

### Recommended Reading

* [Let's Make a Bar Chart](https://bost.ocks.org/mike/bar/) by Mike Bostock (creator of D3)
* [DOM Manipulation and D3 Fundamentals](http://dataviscourse.net/2015/lectures/lecture-d3/) by A. Lex of U. of Utah

### Additional Reading

* [D3.js Introduction](https://d3js.org/#introduction)
* [Dashing D3.js](https://www.dashingd3js.com/)
* [Practical applications of a d3js selection](https://github.com/billautomata/d3js_design_patterns/blob/master/volume-3.md)

### What to submit

* Zip up your entire `lab3` folder, name it `LastName_FirstName_lab3.zip` and submit it to Gradescope.
* You should have completed Activity 1, Activity 2, and Activity 3 (in each respective subfolder).  

### Grading

Your assignment will be graded on the following requirements:
* Functionality of Activity 1, 2, and 3 completed

## Activity 0: Run a Local Web Server

Before we dive into the details of D3, let's learn to run a local web server while getting a taste of the visualizations you can create using D3. Running a local web server is a crucial skill as you will use it in each of the subsequent labs.

To create data visualizations using D3, you need to store your data in a data file. Usually, the data file is in CSV format. When your visualization is being rendered by D3, your web browser fetches the CSV files from your file system. For your web browser to have access to your CSV files, you will need to run a local web server.

To run the server, open `Terminal` (for Mac) or `Command Prompt` (for Windows). Navigate to the folder `lab3/activity_0` using for example, `cd /lab3/activity_0`.

You should now be in the directory `lab3/activity_0`. Now we will run a python command which will create an HTTP web server for this current directory and all of its sub-directories. In the console execute the following command if you're running Python 2.x:

    python -m SimpleHTTPServer 8080

if you're running Python 3.x or higher, use

    python -m http.server 8080  (or python3 -m http.server 8080)

Now, open your browser and type `http://localhost:8080/` in the URL bar and press enter or go. You should see the following visualization:

<img src="https://github.gatech.edu/CS4460-InfoVis/Fall24-Labs/blob/cleanup/lab3_key/lab3_images/activity_0_screenshot.png" alt="Fig 1" width="400px">

If you go to the directory `lab3/activity_0`, you will see the file named `index.html`. When you enter `http://localhost:8080/` in your browser, your browser will automatically load the file named `index.html` in the folder.

## Tutorial 1: What is Data-Driven Documents (D3)?

D3.js (Data-Driven Documents) is a powerful JavaScript library for manipulating documents based on data.

> "D3 allows you to bind arbitrary data to a Document Object Model (DOM), and then apply data-driven transformations to the document. For example, you can use D3 to generate an HTML table from an array of numbers. Or, use the same data to create an interactive SVG bar chart with smooth transitions and interaction." (D3.js, Mike Bostock)

A summary of D3's features and key aspects by Scott Murray:
* **Loading** data into the browser`s memory
* **Binding** data to elements within the document and creating new elements as needed
* **Transforming** those elements by interpreting each element's bound datum and setting its visual properties accordingly
* **Transitioning** elements between states in response to user input

We will introduce all these concepts in the following weeks.

**We will use the version 5.x of D3 in this class.** The 2nd edition of the book (http://alignedleft.com/work/d3-book-2e) utilizes version 4.x. The major difference between version 4.x and version 5.x lies loading data files into the web browser (see Tutorial 3). The two versions are otherwise very similar.

## Tutorial 2: Integrating D3 into Your Project

Before working with D3 you have to include the D3 library first. We recommend the minified version which has a smaller file size and faster loading time. D3 hosts the latest minified version at: [https://d3js.org/d3.v5.min.js](https://d3js.org/d3.v5.min.js)

You will include a `<script>` element in your html to include the D3 library:

	<html>
		...
    		</div>
		</body>
		<script src="https://d3js.org/d3.v5.min.js"></script>
		...
	</html>

Including a library with a `<script>` element loads the library as a global namespace. It allows you to use `d3` in your code to reference the D3 object. With `d3`, we can access its methods and properties.

## Tutorial 3: Loading Data Files Using D3

Instead of typing the data in a local variable in a `.js` file (like we did in the previous lab), we can load data asynchronously from external files. The D3 built-in methods make it easy to load JSON, CSV and other data file types. The use of the right file format depends on the data - JSON should be used for hierarchical data and CSV is usually a proper way to store tabular data.

By calling D3 methods like `d3.csv()`, `d3.json()`, `d3.tsv()` etc. we can load external data resources in the browser:

	d3.csv('pokemon.csv').then(function(dataset) {
		// the variable `dataset` is an array of data elements
	});

The above function takes two arguments: a string representing the path of the file, and an anonymous function. Usually, we call the anonymous function a **callback function**.

You may wonder how the callback function works. In our data loading problem, loading a file from the disk or an external server takes a while. The callback function is executed only until receiving a notification that the data loading process is complete.

The implication is that **code that depends on the dataset should exist only in the callback function**. This makes sure that your data-dependent code will have access to the data. To clarify this, let's look at the following example:

	d3.csv('pokemon.csv').then(function(dataset) {
		console.log("Line 1: inside the callback function");
	});
	console.log("Line 2: outside the callback function");

In this example, `console.log("Line 2: outside the callback function");` is executed first. The CSV file is then loaded into the browser. Finally, `console.log("Line 1: inside the callback function");` is executed. Hence, if you put your data-dependent code outside the callback function, it might be executed before your data file is loaded and may not have access to the data.

> A NOTE ON FILE NAMING CONVENTION: Always use something like `d3.csv("pokemon.csv")` (without `./`) and not `d3.csv("./pokemon.csv")` (with `./`). The later one works in Mac on local server but not on Windows, while the first one works in both Mac and Windows.

## Tutorial 4: Method Chaining and D3 Selections

#### Method Chaining

Method or function chaining is a common technique in JavaScript, especially when working with D3. It can be used to simplify code in scenarios that involve calling multiple methods on the same object consecutively. The functions are "chained" together with periods.

	d3.selectAll('circle')
		.attr('r', 10)
		.style('fill', '#777');

Here is the execution sequence of the above example. `d3.selectAll('circle')` returns all the circles in a page. `.attr('r', 10)` changes the radii of the returned circles to 10. `.attr('r', 10)` again returns all the circles in a page. `.style('fill', '#777');` changes the color of the circles to '#777'.

Here is the alternative code without method chaining:

	var circles = d3.selectAll('circle');
	circles.attr('r', 10);
	circles.style('fill', '#777');
	
The main drawback here is that you have to instantiate a new variable. The example code from here on out will use method chaining extensively.

#### D3 Selections

D3 selection allows you to select [DOM elements](https://stackoverflow.com/questions/1122437/what-is-dom-element/1122447) for manipulation. DOM elements consists of any HTML elements and SVG elements in a page. D3 selection is your entry point for finding, creating, and removing DOM elements. You also use selections to apply styles and attributes that dictate how those elements appear on the page and respond to events.

`d3.select()` selects the first element that matches a selector. Selectors can specify tags (`p` in our example below), classes, and IDs:

	d3.select('p')
		.style('font-size', '0.9em')
		.text('First Paragraph');

Notice, however, that as mentioned previously, only the first element that matches is selected. Of course, it is more practical to select all elements of a certain type, which we can achieve with `d3.selectAll()`. The code below selects all the paragraph `p` and changes the font size.

	d3.selectAll('p')
		.style('font-size', '0.9em');

This example illustrates **the declarative approach of D3:** we don’t have to iterate over a list of elements and apply the style. Instead we select a set of elements through rules and declare properties.

Once you have a selection, you can bulk-modify it’s content, not only in terms of style, but we can modify arbitrary attributes using `selection.attr(name[, value])`, the textual content of the elements with `selection.text([value])`, etc. We can also append elements to a selection.

#### Append Elements

With a D3 selection, we can now `append()` elements to the selection. For example, calling `d3.select('svg').append('g')` selects the `svg` canvas, creates a new `<g>` element and adds it as a child of the `svg` canvas. Note that `append()` adds child elements at the end of the child list, while `insert()` adds them to the beginning of the child list of an element. Here is another example:

	var group = d3.select('svg').append('g');
	group.append('circle');
	group.append('text');

In the above example, `d3.select('svg').append('g')` appends a `<g>` element to the `svg` canvas and returns the appended `<g>` element. Calling `group.append('circle');` and `group.append('text');` will add a `<circle>` element and a `<text>` element to the `<g>` element.

	<svg>
		<g>
			<circle/>
			<text></text>
		</g>
	</svg>

#### Binding Data

Data visualization is a process of mapping data to visuals. Data in, visual properties out. Maybe bigger numbers make taller bars, or special categories trigger brighter colors. The mapping rules are up to you. With D3, we bind our data input values to elements in the DOM. Binding is like “attaching” or associating data to specific elements, so that later you can reference those values to apply mapping rules.

We use D3’s `selection.data()` method to bind data to DOM elements. Binding data requires two things:

* The data (an array of objects, strings, numbers, etc.)
* A selection of DOM elements - the elements your data will be associated with

Let's take a look at this example:

	var states = ["Connecticut", "Maine", "Massachusetts", "New Hampshire", "Rhode Island", "Vermont"];

	var p = d3.select("body").selectAll("p")
		.data(states)
		.enter()
		.append("p")
		.text("Array Element");

You will see the following:

<img src="https://github.gatech.edu/CS4460-InfoVis/Fall22-Labs-PUBLIC/blob/main/images/lab3/t4-1.jpeg" alt="Fig 2" width="600px">

Here’s what’s happening:

`d3.select("body")`

Finds the body in the DOM and hands off a reference to the next step in the chain.

`.selectAll("p")`

Selects all paragraphs in the DOM. Because none exist yet, this returns an empty selection. Think of this empty selection as representing the paragraphs that will soon exist.

`.data(states)`

There are six values in our array called `states`. This steps binds each value to a `<p>` element that does not yet exist. In total, there are six `<p>` elements that do not yet exist because there are six values in the `states` array. You can consider these `<p>` elements that do not yet exist placeholders.

`.enter()`

Select the six placeholder elements.

`.append("p")`

Create the six placeholder elements, which now becomes six `<p>` elements. Each `<p>` element is associated with a state value.

`.text("Array Element")`

Changes the text of each of the six `<p>` elements to "Array Element".

If we inspect the `p` elements that we added to the `body` with the Web Inspector, we will see that in the "Properties" tab for each of these `p` elements that there is a `__data__` property associated with each.

<img src="https://github.gatech.edu/CS4460-InfoVis/Fall22-Labs-PUBLIC/blob/main/images/lab3/t4-2.jpeg" alt="Fig 3" width="600px">


When D3 binds data to an element, that data doesn’t exist in the DOM, but it does exist in memory as a `__data__` attribute of that element. And the console is where you can go to confirm whether or not your data was bound as expected.

We can see that the data has been loaded into the page and is bound to our newly created elements in the DOM. Now we are going to use each string bound to the `p` elements by setting the text contents of each `p` to the state name:

	var p = d3.select("body").selectAll("p")
		.data(states)
		.enter()
		.append("p")
		.text("Array Element");

Let’s change the last line to:

    	.text(function(d, i) { return d; });

Now we will see the following on our page:

<img src="https://github.gatech.edu/CS4460-InfoVis/Fall22-Labs-PUBLIC/blob/main/images/lab3/t4-3.jpeg" alt="Fig 4" width="600px">

Here, we used an anonymous function that is called by D3 for each element in the selection. The anonymous function `function(d, i)` takes two inputs. 

* `d` = the data element bound (in this case each state, e.g. "Connecticut", "Maine", etc.)
* `i` = the index for that bound array element (e.g. 0, 1, etc.)

Generally in D3 documentation and tutorials, you'll see the parameter `d` used for the current data element and `i` (or index ) used for the index of the current data element. The index is passed in as the second element to the function calls and is optional.

The function `function(d, i)` loops through all the six '<p>' elements to change the text values. The return statement `return d;` specifies that the text value of a '<p>' elements should be equal to 'd', which is a state name. 

#### HTML Attributes and CSS Properties

Styles, attributes, and other properties can also be specified based on the data.

For example, in the previous example we can emphasize "Massachusetts" with a bold font-weight. We can also style all of the `p` elements:

	var p = d3.select('body').selectAll('.state-name')
		.data(states)
		.enter()
		.append('p')
		.attr('class', 'state-name')
		.text(function(d, i) { return d; })
		.style('color', '#777')
		.style('font-size', '10px')
		.style('font-weight', function(d) {
			return d == 'Massachusetts' ? 'bold' : 'normal';
		});

<img src="https://github.gatech.edu/CS4460-InfoVis/Fall22-Labs-PUBLIC/blob/main/images/lab3/t4-4.jpeg" alt="Fig 5" width="600px">

* We use D3 to set the paragraph content, the HTML class, the `color` and as the last property, the `font-weight` which depends on the individual array value.

* If you want to assign specific styles to the whole selection (e.g. font-color: blue), we recommend you define an HTML class ("state-name" in our example) and add these rules in an external stylesheet. That will make your code concise and reusable.

In the following example we use numeric data to create five rectangles. We then style them by data:

	var numericData = [1, 2, 4, 8, 16];
	
	var svg = d3.select('svg');
	
	// Add rectangles
	svg.selectAll('rect')
    	.data(numericData)
    	.enter()
    	.append('rect')
    	.attr('fill', '#f77e46')
    	.attr('width', 30)
    	.attr('height', function(d){
        	return 160 * d / 16;
    	})
    	.attr('y', 20)
    	.attr('x', function(d, i) {
        	return (i * 40) + 100;
    	});

<img src="https://github.gatech.edu/CS4460-InfoVis/Fall22-Labs-PUBLIC/blob/main/images/lab3/t4-5.jpeg" alt="Fig 6" width="400px">

* We have appended SVG elements to the DOM tree in our second example.
* It is crucial to set the SVG coordinates. If we don't set the x and y values, all the rectangles will be drawn on the same position at (0, 0). By using the index - of the current element in the selection - we can create a dynamic x property and shift every newly created rectangle `40px` to the right (plus an initial `100px` to center them).
* We also set the `height` attribute of each rectangle based on the bound data. Remember from the SVG lab that the y-coordinate system in SVG starts at the top (0px) and goes down. This is why our bar chart is aligned at the top. We would need to set the y-position of the rectangles based on data to align them at the bottom (hint for upcoming homework).

## Activity 1: Creating a List of Data (3 points)

> Start an http server for this lab's directory. You can accomplish this by opening a command line window, navigating to this lab's directory (e.g. `cd ~/Fall24-Labs-PUBLIC/lab3/`). From there you will start the http server by executing: `python -m SimpleHTTPServer 8080` (for Python 2) or `python -m http.server 8080`. You will need to start an http server for every lab from here on out. Servers are required to serve local files and run JavaScript.

Similar to the examples above, you will be creating a list of paragraph elements in your web page. As always, please start by opening your code editor to `lab/activity_1/`. In that directory you will see a familiar project structure with `index.html`, `style.css`, and `pokemon_table.js` files. `pokemon_table.js` is where you will write JavaScript code for this activity. Also notice that there is a CSV data file in the directory: `pokemon.csv`. 

The CSV dataset is a list of top 10 Pokemon with information about their type(s), HP, attack, defense, and speed stats. The primary type of a pokemon will be under the column `Type 1`, while the stat score of the pokemon will be the sum of its stat columns (`HP` + `Attack` + `Defense` + `Speed` = `StatScore`). See below for a snippet of the dataset:


| Name             					       | Type 1   | Type 2   | HP | Attack | Defense     | Speed   					 |
| ---------------------------------------- | -------- | -------- | --- | ----- | -------    | ------------------------- |
| Pikachu             	 			       | Electric |          | 35 | 55 | 40    | 90   					 |
| Bulbasaur             			       | Grass    | Poison   | 45 | 49 | 49    | 45   					 |
| Charmander             			       | Fire     |          | 39 | 52 | 43    | 65   					 |
| Squirtle             					   | Water    |          | 44 | 48 | 65    | 43   					 |



For this activity you will create a table and use d3 data binding to create a paragraph (`<p>`) for each Pokemon in the list. You will also add text content to each paragraph to describe the Pokemon's type and stat score. In the end your web page should look like this:

<img src="https://github.gatech.edu/CS4460-InfoVis/Fall24-Labs/blob/cleanup/lab3_key/lab3_images/activity_1_key.png" alt="Fig 7" width="400px">

You will edit the `activity_1/pokemon_table.js` file for this activity.

Create a table of the dataset like in the below snippet and add the table to the `#main` div:

We have provided the following table HTML to get you started:

	<table id="pokemon-table">
		<thead>
			<tr>
				<td>Pokemon</td>
				<td>Primary Type</td>
				<td>Stat Score</td>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>

You will need to append a table row `<tr>` for each Pokemon to the `<tbody>`. You will then need to add a `<td>` cell element for each column as your calculated stat score for each Pokemon. DO NOT hardcode the table rows, you should use `d3` to dynamically update the table. 

> **Note**: A `.csv` file contains simple comma-separated text, where each value is treated as a string by default when read into JavaScript. To convert these strings into numbers, you can use the **unary plus operator** (+) or the `Number()` function. For example, if to use the Attack stat as a number, you can use `+d.Attack` or `Number(d.Attack)`. This conversion is essential for performing mathematical operations on the data, such as scaling values or calculating totals.

Next, follow the following steps to create the paragraphs for each Pokemon:

Move the `#pokemon-info` div below the table.

##### 1. Load the CSV file

Using `d3.csv()`, load the dataset at `./pokemon.csv`. Make sure to write a callback function to access the loaded data.

We recommend using `console.log()` on the loaded data to double check everything went according to plan.

##### 2. Create your paragraphs

Append a `p` element to the `#pokemon-info` div for each Pokemon in the dataset. (Recall that '#' indicates id.) You will need to follow the above examples to achieve this. Remember that we are now reading from a data file rather than declaring some data within the javascript file.

##### 3. Add text content

Add text content using `text()` for your D3 data selection. The text content should include the Pokemon's name, primary type (Type 1 column), and stat score (calculated as the summation of the other stat columns). Again, you can follow the examples above to add text content. Hint: you need to create only one text object with all the right words in it.

##### 4. Highlight the Pokemon with the highest speed stat

Change the text color to `red` for the Pokemon with highest speed stat. There are a number of different ways to select and style this `p` element based on the Speed Score, index of the Pokemon's JS object, or the Pokemon's name.

Think about what code should go in your html file and what should go in the javascript file. This can be pretty challenging if you haven't worked much with D3 before.

## Activity 2: Drawing a Pixel Scatterplot (4 points)

> The starter code for this activity can be found at `lab3/activity_2/`.

In this activity, you will create a pixel scatterplot for a Pokémon dataset. This dataset includes various Pokémon, their attack, defense, and speed attributes. Your scatterplot will visualize each Pokémon's attack (x-axis) and defense (y-axis) values, with circle sizes representing their speed. You will also highlight faster Pokémon using a distinct color. 

You will create the following scatterplot during this activity:

<img src="https://github.gatech.edu/CS4460-InfoVis/Fall24-Labs/blob/cleanup/lab3_key/lab3_images/activity_2_key_1.png" alt="Fig 8" width="600px">

You will edit the `activity_2/scatterplot.js` file for this activity. We have already added code to create the axes, scales, and labels for the scatterplot. You will use the following functions we have provided: `scaleAttack(attack)`, `scaleDefense(defense)`, and `scaleSpeed(speed)`. Each function returns a scaled pixel value for the input numeric data value.

##### 1. Load the CSV file

Load the dataset at `./PokemonExtended.csv` using `d3.csv()` as you did in the previous activity. Again be sure to include all code that requires the loaded dataset within the callback function.

##### 2. Add axes and title to the SVG

Before creating the circles, you need to add the axes and title to your SVG. For each axis,
append a `g` element to the svg with the correct class name ("x axis" or "y axis"). Use the `transform` method to position the axes correctly. Call the d3 axes methods (`d3.axisBottom`, `d3.axisLeft`) to populate your axes. For each axis, create a label as well (again, use `transform`) to position it properly. Lastly, add a chart title in a similar way you added the labels.

##### 3. Create and center your circles

Create a `circle` element for each data case by: Select all `circle` elements in the svg, then create a data-binding with the dataset, and finally enter/append `circle` elements. 

Set the center point of each circle by data. 
* The cx position should be set to the `Attack` data attribute for each circle (use the provided `scaleAttack(attack)` method).
* The cy position should be set to the `Defense` data attribute (use the provided `scaleDefense(defense)` method).
* Set the radius of each circle to be scaled by the `Speed` attribute (use `scaleSpeed(speed)).

##### 4. Style your circles

You should now see all of the black circles placed in the chart. You cannot see it because of the black-opaque fill of the circles, but a lot of points are on top of each other - this is due to overlapping Pokemon stats. To fix this we ask that you style the `fill` and `opacity` so that we can see circles that overlap.

Style the circles:
* `fill`: `steelblue` for all circles (you will be modifying this later)
* `opacity`: `0.7` to allow overlapping circles to be seen

##### 5. Make fast Pokemon stand out.

Once your scatterplot looks like the one shown in the image above, you will need to update the style of circles so that Pokemon with speeds `greater than 100` stand out. It should look like this:
<!-- Specifically, you need to change the `fill` color of these Pokemon circles to #ffd32d. With these changes, your scatterplot will look somewhat as follows: -->

<img src="https://github.gatech.edu/CS4460-InfoVis/Fall24-Labs/blob/cleanup/lab3_key/lab3_images/activity_2_key_2.png" alt="Fig 9" width="600px">

***Hint:*** You can accomplish these changes using CSS classes or using d3's `.style()`. For the first approach, look at `style.css` and think about how you could style specific circles differently. For the second approach, read more about using `.style()` [here](http://jonathansoma.com/tutorials/d3/using-attr-and-style/) or look at [this example](https://bl.ocks.org/Jverma/076377dd0125b1a508621441752735fc).

At this point, save your work. For Activity 3 below, you will want to duplicate your Activity 2 folder and files as some changes will be conflicting. Name this new folder `activity_3`.

## Activity 3: Adding a Tooltip to the Scatterplot (3 points)

Starting with the files in your new folder, let's add some more features to your Pokemon scatterplot.

### Tooltips
A **tooltip** is a small, interactive element that appears when you hover over a part of a visualization—in this case, the circles representing Pokémon. It allows users to see detailed information about a data point without adding extra elements to the chart, keeping the visualization clean and easy to read.

In this activity, you will add a tooltip that displays detailed information about each Pokémon, such as its name and types, when hovering over a circle.

##### 1. Create a Tooltip Element.

To start off, you will need to add a tooltip element using a `div` that will appear when a user hovers over a circle:

	// Create a tooltip div that is initially hidden
	var tooltip = d3.select('body').append('div')
		.attr('class', 'tooltip')
		.style('position', 'absolute')
		.style('background-color', 'white')
		.style('border', '1px solid black')
		.style('padding', '5px')
		.style('border-radius', '5px')
		.style('opacity', 0); // Start with opacity 0 to keep it hidden

Place this code near the start of your JavaScript file before creating the circles. This code will create a `div` with a class of `tooltip` positioned absolutely on the page and styled to look like a small pop-up box.

##### 2. Display Tooltip on Hover.

Now, we're going to update the hover behavior of each circle so that the tooltip displays detailed information about the hovered Pokémon. The tooltip will include:
* The Pokémon's name in bold as the title.
* The Type 1 and Type 2 information.
* If Type 2 is empty or missing, the tooltip should only show Type 1.
	
		.on('mouseover', function(event, i) {
			const d = data[i]; // Use 'i' as an index to access the correct object
			const cx = // TO-DO: Get the x-position for the tooltip
			const cy = // TO-DO: Get the y-position for the tooltip
			// TO-DO: Style the tooltip correctly.
		}).on('mouseout', function() {
			// TO-DO: Hide the tooltip when not hovering
		});

> Hint: Style the tooltip's opacity to make it appear on `mouseover` or disappear on `mouseout`.

Hover over each circle in your scatterplot to ensure that the tooltip displays correctly with the Pokémon’s name and types.
Adjust the CSS or the tooltip positioning in JavaScript if the tooltip appears too far from the point or needs styling improvements.

See below for how the hover interaction looks:

<img src="https://github.gatech.edu/CS4460-InfoVis/Fall24-Labs/blob/cleanup/lab3_key/lab3_images/activity_3_key.gif" alt="Fig 10" width="600px">

#### Extra Credit: Highlighting Similar Pokemon (0.5 points)
Enhance the interactivity of your Pokémon scatterplot by highlighting all Pokémon of the same type when hovering over a particular Pokémon. For example, when a user hovers over a Fire-type Pokémon, all other Fire-type Pokémon in the scatterplot should become more visible while other types become less prominent. When a user hovers over a Grass-type and Poison-type Pokémon, all Grass-type, Poison-type, and Grass and Poison-type Pokémon should become more visible. If a user hovers over a Fire-type Pokémon, a Pokémon that is both Fire-type and Poison-type should also be highlighted.

> Hint: Modify the opacity of the circles to make them more or less visible.

***

## Checklist for Implementation and Submission:

1. Modify `pokemon_table.js` to format the table and add paragraphs for each Pokemon, highlighting the Pokemon with the highest speed.
2. Modify `scatterplot.js` to create a scatterplot of Pokemon Attack vs Defense with circle size scaling to Speed.
3. Duplicate activity 2 and add tooltip functionality showing the Pokemon type
4. (Optional bonus): Highlight pokemon of the similar type when mousing over

**This lab is based on the following material:**

* Hanspeter Pfister's CS171 Lab Material (Harvard)
* [DOM Manipulation and D3 Fundamentals](http://dataviscourse.net/2015/lectures/lecture-d3/) by Alex Lex of U. of Utah
* [Practical applications of a d3js selection](https://github.com/billautomata/d3js_design_patterns/blob/master/volume-3.md)
* [D3 - Interactive Data Visualization for the Web](http://alignedleft.com/work/d3-book-2e) by Scott Murray
* [D3 - scaleTime](https://observablehq.com/@d3/d3-scaletime) Online resource for d3.scaleTime
* [Building legends in d3.js](https://d3-graph-gallery.com/graph/custom_legend.html) Online resource for legends in D3
