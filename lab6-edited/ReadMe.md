# Lab 6: Final Project

Download this lab. There should be 5 items in the file:
1. cleaned_why_not_vote.csv
2. index.html
3. main.js
4. style.css
5. ReadMe.md


Reminder: Start an http server for this lab's directory. From command line call `python -m SimpleHTTPServer 8080` (for Python 2) or `python -m http.server 8080` (for Python 3).

## Why People Don't Vote Data

This project works with Table 10. Reasons For Not Voting, By Selected Characteristics: November 2020 dataset that was provided in the sample data folder to the class. 

## How to Navigate the visualization

The page is split into two sections.

The first section: Total Number of People Not Voting by Demographic Category
This is a bar chart that displays the total number of people who did not vote, categorized by demographic characteristics.
The Y-axis represents number of people who didn’t vote.
The X-axis represents the demographic categories or characteristics. When the page first loads, the x-axis will feature one bar that repsents the total people who did not vote across all demographics.
There is a dropdown menu that allows users to select a specific demographic. Depending on the demographic, the bar chart will filter to show groups within this demographic. For example if you select the age demographic, the bar chart will display 4 bars where each bar represents the number of people that didn't vote within a certain age group.
The user may hover over a certain bar. This displays a tooltip that shows the total number of people who didn't vote in that selected group.
The user may also select a certain bar by clicking it. This highlights the bar and triggers the second section to display.


The second section: Reasons for Not Voting by Percentage. 
When the page first loads, the second section will be empty. As stated above, once the user selects a certain bar, the second section displays.
Once this occurs, a pie chart is populated. This bar chart represents the different reasons why people in the selected demographic did not vote, shown as percentages. For example, if the user selects the 18 to 24 years group from the age demographic, the percentages of different reasons for why people in this age group didn't vote will display as slices in the pie chart.
The different reasons are listed below the pie chart as a legend with reason and corresponding color.
The user may hover over a slice in the pie chart. This displays a tooltip that shows the specific reason, the corresponding percentage, and the total number of people who didn't vote for that reason in that group. For example, If I select the dark green slice after selecting the 18 to 25 years group, the tooltip will say "Reason: Not Interested, Percentage: 19.2%, Total: 387.26". The total may not be a whole number as there was rounding during percentage data collection.


