var width = 500;
var height = 500;

var width2 = 800;

var padding = { t: 60, r: 40, b: 30, l: 120 };

//Chart dimensions
var barChartWidth = width2 - padding.l - padding.r;
var chartHeight = height - padding.t - padding.b;



d3.csv("cleaned_why_not_vote.csv", function (csv) {
    //load in data and format
    for (var i = 0; i < csv.length; ++i) {
        csv[i].Total_Not_Voting = Number(csv[i].Total_Not_Voting)
        /******************************************
        Reasons for not voting: percentage of total not voting
        ******************************************/
        csv[i].Out_of_Town = +csv[i].Out_of_Town;
        csv[i].Forgot_to_Vote = +csv[i].Forgot_to_Vote;
        csv[i].COVID_Concerns = +csv[i].COVID_Concerns;
        csv[i].Illness_or_Disability = +csv[i].Illness_or_Disability;
        csv[i].Not_Interested = +csv[i].Not_Interested;
        csv[i].Too_Busy = +csv[i].Too_Busy;
        csv[i].Transportation_Problems = +csv[i].Transportation_Problems;
        csv[i].Dislike_Candidates = +csv[i].Dislike_Candidates;
        csv[i].Registration_Problems = +csv[i].Registration_Problems;
        csv[i].Bad_Weather = +csv[i].Bad_Weather;
        csv[i].Polling_Place_Issues = +csv[i].Polling_Place_Issues;
        csv[i].Other_Reason = +csv[i].Other_Reason;
        csv[i].Unknown_Reason = +csv[i].Unknown_Reason;

       
    }

    // Function used for scaling axes 
    var totalExtent = d3.extent(csv, function (row) {
        return row.Total_Not_Voting;
    });

    //formatting data to access characteristics
    var characteristic = csv.map(d => d.Characteristic);
    var filteredCharacteristics = [];
    // console.log(characteristic);
    var categories = csv.map(d => d.Category);
    var noRepeatCategories = Array.from(new Set(categories));
    // console.log(categories);
    // console.log(noRepeatCategories);


    //dropdown menu
    const dropdown = d3.select("#filter-dropdown");
    dropdown
        .selectAll("option")
        .data(noRepeatCategories)
        .enter()
        .append("option")
        .attr("value", d => d)
        .text(d => d);

    dropdown.on("change", function () {
        const selectedCategory = this.value;
        updateChart(selectedCategory);
        chartPie.selectAll("path").remove();
        legendContainer.selectAll("div").remove();
        
    });

    //creating svg for bar chart
    var chartBar = d3
    .select("#chart1")
    .append("svg:svg")
    .attr("id", "svg1")
    .attr("width", width2)
    .attr("height", 600);

    //original x and y axis
    var xScale = d3.scaleBand().domain(filteredCharacteristics).range([0, barChartWidth]);
    var yScale = d3.scaleLinear().domain(totalExtent).range([chartHeight, 30]);
    var xAxis = d3.axisBottom().scale(xScale);


    //tooltips
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("opacity", 0);

    var tooltip2 = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("opacity", 0);
    

    updateChart(noRepeatCategories[0]);

    //function to update bar chart
    function updateChart(selectedCategory) {
        //formatting data to access characteristics for selected category
        var filteredData = csv.filter(d => d.Category === selectedCategory);
        console.log(filteredData);
        filteredCharacteristics = filteredData.map(d => d.Characteristic);
        // console.log(filteredData.map(d => d.Characteristic));
        // console.log(filteredCharacteristics);


        // function used for scaling axes
        var xScale = d3.scaleBand().domain(filteredCharacteristics).range([0, barChartWidth]);
        var yScale = d3.scaleLinear().domain(totalExtent).range([chartHeight, 30]);

        xAxis = d3.axisBottom().scale(xScale);
        yAxis = d3.axisLeft().scale(yScale);

        // Clear existing axes
        chartBar.selectAll(".x-axis").remove();
        chartBar.selectAll(".label").remove();
        chartBar.selectAll("rect").remove();
        

        //add bars
        chartBar.selectAll('rect')
        .data(filteredData)
        .enter()
        .append('rect')
        .attr('fill', 'steelblue')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr("x", d => xScale(d.Characteristic) + 55)
        .attr("y", d => yScale(d.Total_Not_Voting))
        .attr("width", xScale.bandwidth() - 10)
        .attr("height", d => chartHeight - yScale(d.Total_Not_Voting))

        //tooltip when hovering over bar to tell total number of people not voting
        .on("mouseover", function(event, d) {
            console.log(d);
            var myCharacteristic = Object.values(filteredData[d]);
            console.log(myCharacteristic);

            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("Total Not Voting: " + myCharacteristic[2])
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY + 10) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })
        //update pie chart when bar is clicked
        .on("click", function(event, d) {
            updatePieChart(d, filteredData);
            //console.log(d);
            //also highlight bar
            chartBar.selectAll('rect')
            .attr('fill', 'steelblue');

            // Highlight the clicked bar
            d3.select(this)
            .attr('fill', 'gold');



        });

        /******************************************
                labels that change with data 
        ******************************************/

        //x axis
        chartBar 
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(50," + (height - 90) + ")")
        .call(xAxis) 
        .selectAll("text")
        .style("text-anchor", "start")
        .attr("transform", "translate(5, 0) rotate(55)");

        //y axis
        chartBar 
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(50, 0)")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");

        //x axis label
        chartBar
        .append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .attr("x", barChartWidth / 2 + 50)
        .attr("y", height + 10)
        .text(selectedCategory)
        .attr("font-weight", "bold");

        //y axis label
        chartBar
        .append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -chartHeight / 2)
        .attr("y", 10)
        .text("Number of People Not Voting")
        .attr("font-weight", "bold");

    }
    
    //creating svg for pie chart
    var chartPie = d3
        .select("#chart2")
        .append("svg:svg")
        .attr("id", "svg2")
        .attr("width", width)
        .attr("height", 505)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    //legend container
    var legendContainer = d3.select("#chart2")
    .append("div")
    .attr("class", "legend-container")
    .style("display", "grid")
    .style("flex-direction", "column")

    //function to update pie chart
    function updatePieChart(index, filteredData) {
        
        console.log(filteredData);
        //reasons for not voting
        var reasons = [
            "Out of Town", "Forgot to Vote", "COVID Concerns", "Illness or Disability",
            "Not Interested", "Too Busy", "Transportation Problems", "Dislike Candidates",
            "Registration Problems", "Bad Weather", "Polling Place Issues",
            "Other Reason", "Unknown Reason"
        ];

        var radius = 200;
        //this is an array that corresponds to which bar we clicked on
        var myCharacteristic = Object.values(filteredData[index]);
        //formatting data to acces percentages for pie chart
        var pieData = [];
        for (var i = 0; i < reasons.length; i++) {
            pieData.push(myCharacteristic[i + 3]);
        }
        //console.log(pieData);

        //color scale for pie chart
        var color = d3.scaleOrdinal()
        .domain(reasons)
        .range([
            "#e6194B", 
            "#f58231", 
            "#9A6324", 
            "#bfef45", 
            "#3cb44b", 
            "#000075",
            "#4363d8",
            "#911eb4",
            "#f032e6",
            "#a9a9a9",
            "#33A1FF",
            "#800000",
            "#FFD700"
        ]);

        var pie = d3.pie()
        .value(d => d.value);
    
        var data_ready = pie(d3.entries(pieData));

        chartPie.selectAll("path").remove();

        //build the pie
        chartPie
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        )
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

        //labels for pie chart
        .on("mouseover", function(event, d) {
            tooltip2.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip2.html("Reason: " + reasons[d] + "<br>Percentage: " + pieData[d] + "%" + "<br>Total: " + (pieData[d]*.01 * myCharacteristic[2]).toFixed(2))
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY + 10) + "px");
        })
        .on("mouseout", function(d) {
            tooltip2.transition()
                .duration(500)
                .style("opacity", 0);
        });

        // Clear previous legend
        legendContainer.selectAll("div").remove();

        // Create legend items
        reasons.forEach((reason, i) => {
        var legendItem = legendContainer.append("div")
            .attr("class", "legend-item")
            .style("display", "grid")
            .style("align-items", "center")
            .style("margin-bottom", "3px");

        legendItem.append("div")
            .style("width", "20px")
            .style("height", "20px")
            .style("background-color", color(reason))
            .style("opacity", 0.7)
            .style("margin-right", "10px");

        legendItem.append("span")
            .text(reason);
    });

    }

    

   
    /******************************************
        labels that don't change
    ******************************************/

    //bar chart labels
    
    //title for bar chart
    chartBar.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", width2 / 2 - 40)
        .attr("y", padding.t / 2 - 10)
        .text("Total Number of People Not Voting by Demographic Category")
        .attr("font-weight", "bold");

    //y-axis label for bar chart
    chartBar
        .append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -chartHeight / 2)
        .attr("y", 10)
        .text("Number of People Not Voting")
        .attr("font-weight", "bold");

    //pie chart:


    //title for pie chart
    chartPie
        .append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .attr("x", 4)
        .attr("y", -220)
        .text("Reasons for Not Voting by Percentage")
        .attr("font-weight", "bold"); 
        
});
