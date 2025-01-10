var width = 500;
var height = 500;

var width2 = 900;
var svg = d3.select('svg');

var padding = { t: 60, r: 40, b: 30, l: 120 };

// Compute chart dimensions
var barChartWidth = width2 - padding.l - padding.r;
var chartHeight = height - padding.t - padding.b;

/******************************************
Compute the spacing for bar bands based on the number of cereals below
******************************************/

d3.csv("cereals.csv", function (csv) {
    for (var i = 0; i < csv.length; ++i) {
        csv[i].Calories = Number(csv[i].Calories)
        /******************************************
        Convert the rest of the cereal data
        ******************************************/
        csv[i].Protein = Number(csv[i].Protein);
        csv[i].Fiber = Number(csv[i].Fiber);
        csv[i].Fat = Number(csv[i].Fat);
        csv[i].Carb = Number(csv[i].Carb);
    }

    console.log(csv);

    // Functions used for scaling axes +++++++++++++++
    var fatExtent = d3.extent(csv, function (row) {
        return row.Fat;
    });
    var carbExtent = d3.extent(csv, function (row) {
        return row.Carb;
    });
    var fiberExtent = d3.extent(csv, function (row) {
        return row.Fiber;
    });
    var proteinExtent = d3.extent(csv, function (row) {
        return row.Protein;
    });

    var cerealNames = csv.map(d => d.CerealName);


    // Axis setup
    var xScale = d3.scaleBand().domain(cerealNames).range([0, barChartWidth]);
    var yScale = d3.scaleLinear().domain(fatExtent).range([chartHeight, 30]);

    var xScale2 = d3.scaleLinear().domain([0, proteinExtent[1]]).range([50, 470]);
    var yScale2 = d3.scaleLinear().domain(carbExtent).range([470, 30]);

    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    var xAxis2 = d3.axisBottom().scale(xScale2);
    var yAxis2 = d3.axisLeft().scale(yScale2);
    /******************************************
       Create your legend below
    ******************************************/

    const calorieColors = {
        LowCalorie: "red",
        MedCalorie: "orange",
        HighCalorie: "yellow"
    };

    Object.keys(calorieColors).forEach(id => {
        d3.select(`#${id}`)
            .append("circle")
            .attr("cx", 10)
            .attr("cy", 6)
            .attr("r", 5)
            .attr("stroke", "black")
            .attr("fill", calorieColors[id]);
    });
    
    //Create SVGs for charts
    var chart1 = d3
        .select("#chart1")
        .append("svg:svg")
        .attr("id", "svg1")
        .attr("width", width2)
        .attr("height", 600);

    var chart2 = d3
        .select("#chart2")
        .append("svg:svg")
        .attr("id", "svg2")
        .attr("width", width)
        .attr("height", height);

    /******************************************
        Axis added below (add labels)
    ******************************************/

    chart1 
        .append("g")
        .attr("transform", "translate(50," + (height - 90) + ")")
        .call(xAxis) 
        .selectAll("text")
        .style("text-anchor", "start")
        .attr("transform", "translate(5, 0) rotate(55)");

    chart1 
        .append("g")
        .attr("transform", "translate(50, 0)")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");

    chart2
        .append("g") 
        .attr("transform", "translate(0," + (width - 30) + ")")
        .call(xAxis2)
        .append("text")
        .attr("class", "label")
        .attr("x", width - 16)
        .attr("y", -6)
        .style("text-anchor", "end");

    chart2 
        .append("g") 
        .attr("transform", "translate(50, 0)")
        .call(yAxis2)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");

    /******************************************
              Create Bars for the Histogram
    ******************************************/

    chart1.selectAll("rect")
        .data(csv)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.CerealName) + 51)
        .attr("y", d => yScale(d.Fat))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScale(d.Fat))
        .attr("class", d => {
            if (d.Calories <= 100) {
                return "low-calorie";
            } else if ((100 < d.Calories) && (d.Calories) <= 130) {
                 return "medium-calorie";
            } else {
                return "high-calorie";
            }
        });


    /******************************************
              Create Circles for the Scatterplot
    ******************************************/
    chart2.selectAll("circle")
        .data(csv)
        .enter()
        .append("circle")
        .attr("cx", d => xScale2(d.Protein))
        .attr("cy", d => yScale2(d.Carb))
        .attr("r", 5)
        .attr("stroke", "black")
        .attr("class", d => {
            if (d.Calories <= 100) {
                return "low-calorie";
            } else if ((100 < d.Calories) && (d.Calories) <= 130) {
                 return "medium-calorie";
            } else {
                return "high-calorie";
            }
        });

    var brush = d3.brush()
        .extent([[0, 0], [width, height]])
        .on("start", brushstart)
        .on("brush", highlightBrushedCircles)
        .on("end", displayValues);

    chart2.append("g")
        .attr("class", "brush")
        .call(brush);

    function brushstart() {
        d3.selectAll("circle").classed("non_brushed", true);
        d3.selectAll("rect").classed("non_brushed", true);
        d3.select("#brush").call(brush.move, null);
    }

    function clearValues() {
        d3.select("#chart3 p").html(`
            <strong>Cereal:</strong> <span id="cereal-name"></span><br />
            <strong>Calories:</strong> <span id="calories"></span><br />
            <strong>Fat Value:</strong> <span id="fat"></span><br />
            <strong>Carb Value:</strong> <span id="carb"></span><br />
            <strong>Fiber Value:</strong> <span id="fiber"></span><br />
            <strong>Protein Value:</strong> <span id="protein"></span><br />
        `);
    }
    
    function populateValues(cereal) {
        d3.select("#chart3 p").html(`
            <strong>Cereal:</strong> ${cereal.CerealName}<br />
            <strong>Calories:</strong> ${cereal.Calories}<br />
            <strong>Fat Value:</strong> ${cereal.Fat}g<br />
            <strong>Carb Value:</strong> ${cereal.Carb}g<br />
            <strong>Fiber Value:</strong> ${cereal.Fiber}g<br />
            <strong>Protein Value:</strong> ${cereal.Protein}g<br />
        `);
    }

    // combined highlightBrushedCircles and highlightBrushedBar
    function highlightBrushedCircles() {
        var e = d3.event.selection;
        if (e) {
            var [x0, y0] = e[0];
            var [x1, y1] = e[1];

            let brushedCereals = [];

            chart2.selectAll("circle")
                .classed("non_brushed", function(d) {
                    var inside = xScale2(d.Protein) >= x0 && xScale2(d.Protein) <= x1 &&
                        yScale2(d.Carb) >= y0 && yScale2(d.Carb) <= y1;
                    if (inside) {
                        d3.select(this).classed("non_brushed", false);
                        brushedCereals.push(d);
                    }
                    return !inside;
                });

            chart1.selectAll("rect")
                .classed("non_brushed", function(d) {
                    var inside = xScale2(d.Protein) >= x0 && xScale2(d.Protein) <= x1 &&
                        yScale2(d.Carb) >= y0 && yScale2(d.Carb) <= y1;
                    if (inside) {
                        d3.select(this).classed("non_brushed", false);
                    }
                    return !inside;
                });

            if (brushedCereals.length === 1) {
                clearValues();
                populateValues(brushedCereals[0]);
            } else {
                clearValues();
            }
        } 
    }

    function displayValues() {
        if (!d3.event.selection) {
            d3.selectAll(".non_brushed").classed("non_brushed", false);
        }
    }
});