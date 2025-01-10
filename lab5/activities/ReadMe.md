# Lab 5: Brushing and Linking

## Learning Objectives

After completing this lab you will:

- Have a better understanding of system design and code structure for multiple views
- Know how to link multiple views with each other
- Understand the concept behind D3's brush component
- Know how to create an HTML div Tooltip
  
## Prerequisites

- Download the corresponding lab from the code repo (either using git or downloading the folder from the code of this repo (in the Code tab above))
- You have read Chapter 10 in [D3 - Interactive Data Visualization for the Web](https://scottmurray.org/work/d3-book-2e) by Scott Murray
## Recommended Reading

[Scatterplot Matrix Brushing, v3 code but still relevant](https://gist.github.com/mbostock/4063663) by Mike Bostock

[Brush & Zoom](https://gist.github.com/mbostock/34f08d5e11952a80609169b7917d4172) by Mike Bostock

## Additional Reading

- [d3 tooltip for v4](https://github.com/VACLab/d3-tip) by Dave Gotz
- [MDN - Introducing JavaScript Objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects)
- [W3C Schools - JavaScript Objects](https://www.w3schools.com/js/js_object_definition.asp)
  
## What to submit

1. You should have completed Activity 1, Activity 2, Activity 3 (in each respective subfolder).
2. Rename your `lab5` folder to `LastName_FirstName_lab5`
3. Zip up `LastName_FirstName_lab5` as `LastName_FirstName_lab5.zip` and submit it to GradeScope.
   
## Grading

Your assignment will be graded on the following requirements:

- Functionality of Activity 1, 2, 3 completed
- Specifically, grading for Lab 5 will weigh more on the functionality of Activity 2: the brushing and linking between two different views.
  
## Getting Familiar with Today's Activities

Previously you have learned the fundamentals of D3 and you have gained some implementation expertise during labs and programming assignments. You should be comfortable with the major concepts and be able to implement common charts as well as interactive and more advanced visualizations with D3.

In this lab, you will be working on one visualization system between a histogram and a scatterplot. It will give you a better understanding of linked views and system design for creating a visualization system. By the end of the lab, you will have created system linking a histogram to a scatterplot, which you can brush for the `cereals` dataset (please see reference images in the acitivties folder).

<img src="https://github.gatech.edu/CS4460-InfoVis/Fall24-Labs-Public/blob/main/lab5/activities/Overview.gif" alt="Fig 2" width="600px">

We will provide a template so that your main tasks will focus on the structure and the event handling components. However, please make sure that you understand the code in the provided templates, and take your time to read through it!

Reminder: Start an http server for this lab's directory. From command line call `python -m SimpleHTTPServer 8080` (for Python 2) or `python -m http.server 8080` (for Python 3).

## How to structure your code for interaction

Like previous weeks we have already added structure to your `activities\main.js` code. This should help speed up the time it takes to complete the lab - notice we've added more than usual. There are a number of additions to the code:

- `xScale` and `yScale` - global x-,y-scales for the first scatterplot, already configured

- `xScale2` and `yScale2` - global x-,y-scales for the second scatterplot, already configured

- `xAxis` and `yAxis` - global x-,y-axes for all the first scatterplot, already configured

- `xAxis2` and `yAxis2` - global x-,y-axes for all the second scatterplot, already configured

- `width` and `height` - Layout parameters for configuring the spacing of your chart

- `d3.csv('cereals.csv', function(csv){...})` is included

- `style.css` - not all required css styling for the activities has been added for you

## Take some time to look through the template and read the comments.

## Cereal Data

During today's activities you will be working with the cereals.csv dataset. The dataset includes 74 rows. Each row corresponds to a cereal name. The dataset also includes a lot of interesting nutritional information for each type of cereal:

| CerealName     | Calories | Protein | Fiber | Fat | Carb |
|----------------|----------|---------|-------|-----|------|
| 100%_Bran      | 70       | 4.3     | 10    | 1.1 | 5    |
| Crispix        | 110      | 2.3     | 1     | 0.2 | 21   |
| Quaker_Oatmeal | 100      | 6       | 2.7   | 2.1 | -1   |
| Rice_Chex      | 110      | 1.2     | 0     | 0.1 | 23   |
| Special_K      | 110      | 6.4     | 1     | 0.6 | 16   |

## Structuring for success

You should always try to split a complex problem into smaller, easier-to-tackle sub-problems. Each sub-problem will be solved independently and afterward integrated into the final system.

## Activity 1: Draw Scatterplot and Color Code Points by Calorie Count

We know how to successfully draw one scatterplot from one of our previous projects, drawing two is no different. Using the code we have provided, append all the correlating values for every cereal in the cereals.CSV file to the two scatterplots. Then color coordinate these values based on their calore count.

### 1. Append Circles

The first step to accomplishing Activity 1 is appending each cereal to both the histogram and the  scatterplot respectively, determining its location based off the axes we have already drawn and labeled for you.

The location of the bars we will be appending to the histogram will be determined by the cereal's `CerealName` and `Fat` information. 

The location of the circles for the scatterplot on the right will be determined by the cereal's `Protein` and `Carb` values. The radius of each circle should be set to `5 px` and the stroke `black`. Please reference `Activity 1` image in the `activities` folder.

### 2. Color Coordinate by Calories

We want to display a bit more information with our charts, so we will be color coordinating all the points based off their calorie count. The following criteria should be used to color code the bars/points:

Low Calorie: calories <= 100
Medium Calorie: 100 < calories <= 130
High Calorie: calories > 130

This can be accomplished in multiple ways. The default approach you may be drawn to is using:

.style("fill", function(d) { ... }

However, our goal can be accomplished in a different way which will be better for the purposes of this project. Think about how you access and style certain features from you JS file in your CSS file (classes!). We suggest you consider creating an anonymous function in the .attr() functions for each of your circles to set their classes based on their calorie count.

Color code your points by setting a points class name based on its calorie count. Perform similar steps for your bars. From this, you can then edit the JS file's respective style sheet to set the fill color of these attributes. 

### 3. Histogram Labels

For the histogram, we have provided you with the axes. Here, we would like for you to label the x-axis with the names of all of the cereal brands in alphabetical order.

### 4. Legend Creation

For the scatterplot, we have already provided you with the inital legend values (Low Calorie, Med Calorie, High Calorie). All you need to do is complete the legend by appending a circle to each HTML element with the color represented by it.

You should now have two color coded charts (one histogram and one scatterplot) and a legend (please reference the Activity_1 image in the activities folder).

<img src="https://github.gatech.edu/CS4460-InfoVis/Fall24-Labs-Public/blob/main/lab5/activities/Activity1.png" alt="Fig 2" width="600px">

At this point, rename the activities folder as activity_1. Duplicate this folder and name it as activity_2. You will start there for the next activity.

# Activity 2: Brushing and Linking

The D3 brush is comparable to D3's axis component. You have to initialize the brush and then append a new `g` element to `call()` your brush function on. Internally, the brush uses `selection.on` to bind the necessary event listeners for dragging.

The brush also creates the SVG elements necessary to display the brush selection and to receive input events for interaction. You can add, remove or modify these elements as desired to change the brush appearance; you can also apply stylesheets to modify the brush appearance.

The event binding `on` sets an event listener, whereby you can choose between three different events:

- `start` - at the start of a brush gesture, such as on mousedown.
- `brush` - when the brush moves, such as on mousemove.
- `end` - at the end of a brush gesture, such as on mouseup.

Brushes can be two-dimensional or one-dimensional.

- `d3.brush()` - creates a new two-dimensional brush.
- `d3.brushX()` - creates a new one-dimensional brush along the x-dimension.
- `d3.brushY()` - creates a new one-dimensional brush along the y-dimension.

[D3-Brush API](https://github.com/d3/d3-brush)

1. Instantiate a brush object

We are going to instantiate d3-brush function for each of the charts.

`var brush = d3.brush()
    .extent([[0, 0], [width, height]])
    .on("start", brushstart)
    .on("brush", highlightBrushedCircles)
    .on("end", displayValues);`
    
 `.extent()` takes a 2x2 matrix for the pixel extent of the brush. We want to restrict the brush to our chart`s pixel dimensions.

You will notice that we have also pointed to event listener functions for the `brushstart`, `highlightBrushedCircles`, and `displayValues` functions. We will define these functions next.

## 2. Define brush event listeners

We will use the `brushstart`, `highlightBrushedCircles`, and `displayValues` functions to create a behavior for brushing on the selected dots in the other chart. For the bars, we will use `highlightBrushedBar` function in a similar manner. To achieve this, we should create the following functions:

- `brushstart` - clear any old brushes and setup the new brush
- `highlightBrushedCircles` - the actual brushing occurs here, hide any circles that that are outside the bounds of the brush's bounds
- `highlightBrushedBar` - this is where the brushing is done for the bars-side
- `displayValues` - clean up the brush if its been cleared by the user, bring back any hidden circles
  
Any time we are using d3 special events such as `brush` or `drag`, we need to access the global `d3.event` within the event listener for the event. The `d3.event` object contains properties that represent that event. In the case of `brush` the property `d3.event.selection` specifies the bounding box or extent of the brush (in pixels). Putting this all together we will create the following the event listener functions (you can add these anywhere):

`function brushstart() {
  d3.select("#chart").selectAll("circle").attr("class", "non_brushed");
  d3.select("#brush").call(brush.move, null); //using `.call()` to call the brush function on each elements
}

function highlightBrushedCircles() {

    // Get the extent or bounding box of the brush event, this is a 2x2 array
    var e = d3.event.selection;
    if(e) {
        //Revert circles to initial style
        circles.attr("class", "non_brushed");

        //Select the instance of brush selection (access coordinates of the selection area)
        var coords = d3.brushSelection(this);

        // Select all circles, and add the color gradient classes if the data for that circle
        // lies outside of the brush-filter applied for this x and y attributes

       var selected = circles.filter("Write a function here to return the circle elements which lie inside the selection area." 
       Hint: Use `cx, `cy` attributes of circles and `coords' variable defined above)
                            .attr("class", `Use the function to assign different classes based on calorie values`)
    }
}

function displayValues() {
    // If there is no longer an extent or bounding box then the brush has been removed
    if(!d3.event.selection) {
        // Bring back all non brushed circle elements to original color gradient
        d3.selectAll(".non_brushed").attr("class", `Use the function to assign different classes based on calorie values`)

    }
    // In Activity 3: Write the code to display tooltip only if one circle is selected in here.     
}`

3. Combining all this together

The above event handling functions are given for one of the two charts. You will have to duplicate this to use this for another chart. Make sure to change the elements that you are selecting in the brush object according to the chart that you are using it for. The class `non_brushed` which is assigned initially to all the circles in `brushstart` function can be assumed as the respective class used for assigning styling or attributes to the circles when they are not selected in brushing. Reference the `Activity 2` image in the `activities` folder.

<img src="https://github.gatech.edu/CS4460-InfoVis/Fall24-Labs-Public/blob/main/lab5/activities/Activity2.gif" alt="Fig 2" width="600px">


At the end of Activity 2, duplicate this folder and name it as `activity_3`. You will start there for the next activity.

## Activity 3: Upon Selecting One Data Point with Brush, Populate Data Values On the Side

You have now successfully implemented brushing and linking in your project! In the past, we have revealed more information about a selected data point through the use of a tool tip by using hovering. However, we will now accomplish a similar goal through taking advantage of your already implemented brushing feature.

To generalize, we will be creating three functions.

1. Disregard Points Outside of Brush

The first function will include if statements to disregard all points and bars that are not within the scope of our brush then create another if statement if only one cereal is contained within the brush (Hint: for some implementations the number of brushed items will actually be 2 because they are linked, for example: if I brush over 100%_Bran, it would be considered to be brushing over two cereals, both being 100%_Bran, one both the scatterplot and the histogram). If it is found that only one cereal is contained in the selected space, then we want to call both of our other functions, first to clear out old text from our previous selection, and then to populate the space with the current cereal's information. If it is found that more than one cereal is in our selected space, then we only want to clear out the values being diplayed from our prior selection since we no longer want to show that data anymore.

2. Clear Values From Information Section

As aforementioned, our next function will be to clear all the values in our information section. This is as simple as setting the text values for each HTML element to be nothing ("").

3. Populate Values in Information Section

Our last function to implement for this activity is populating/drawing the text values for each appropriate data value if there is only one cereal in the brush. Hence, this function should take in one element, the selected cereal. The function should set the text for each HTML element to be given value of the cereal for that specific element. Refer to the `Activity 3` image in the `activities` folder.

<img src="https://github.gatech.edu/CS4460-InfoVis/Fall24-Labs-Public/blob/main/lab5/activities/Activity3.gif" alt="Fig 2" width="600px">


Once you have the functionality working, save your work and you are done with Lab 5.

## What to Turn In

You should place the completed Activity 1, Activity 2, Activity 3 (in each respective subfolder) in `lab5` folder.
Rename your `lab5` folder to `LastName_FirstName_lab5`
Zip up `LastName_FirstName_lab5` as `LastName_FirstName_lab5.zip` and submit it to Canvas.

### This lab was based on the following material:

- Hanspeter Pfister's CS171 Lab Material (Harvard)
- [D3 - Interactive Data Visualization for the Web](https://scottmurray.org/work/d3-book-2e) by Scott Murray
- [Scatterplot Matrix Brushing, v3 code but still relevant](https://gist.github.com/mbostock/4063663) by Mike Bostock
- [d3 tooltip for v4](https://github.com/VACLab/d3-tip)
