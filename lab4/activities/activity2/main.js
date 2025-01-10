// Global function called when select element is changed
function onCategoryChanged() {
    var select = d3.select('#categorySelect').node();
    // Get current value of select element
    var category = select.options[select.selectedIndex].value;
    // Update chart with the selected category of temperatures
    updateChart(category);
}

// This function converts strings to numeric temperatures during data preprocessing
function dataPreprocessor(row) {
    return {
        country: row.Country,
        continent: row.Continent,
        temperature: +row['Average Temperature (°C)']
    };
}

var svg = d3.select('svg');

// Get layout parameters
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

var padding = {t: 60, r: 40, b: 30, l: 120};

// Compute chart dimensions
var chartWidth = svgWidth - padding.l - padding.r;
var chartHeight = svgHeight - padding.t - padding.b;

// Create a group element for appending chart elements
var chartG = svg.append('g')
    .attr('transform', 'translate('+[padding.l, padding.t]+')');

// Compute the spacing for bar bands based on the number of countries (20 in this case)
var barBand = chartHeight / 20;
var barHeight = barBand * 0.7;

var countries;
var scale;

d3.csv('countries_avg_temp.csv', dataPreprocessor).then(function(dataset) {
    // Create global variables here and initialize the chart
    countries = dataset;
    // scale.domain([0, d3.max(countries, function(d) {return d.temperature})])

    // **** Your JavaScript code goes here ****
    scale = d3.scaleLinear()
        .domain([0, d3.max(countries, function(d) { return d.temperature; })])
        .range([0, chartWidth]);

    svg.append('text')
        .attr('x', svgWidth / 2)
        .attr('y', padding.t / 2)
        .attr('text-anchor', 'middle')
        .text('Average Temperature (C) for Countries');

    var xAxis = d3.axisBottom(scale)
        .ticks(5)
        .tickFormat(d => d + "°C");

    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(' + padding.l + ',' + (svgHeight - padding.b) + ')')
        .call(xAxis);

    var xAxisTop = d3.axisTop(scale)
        .ticks(5)
        .tickFormat(d => d + "°C");

    svg.append('g')
        .attr('class', 'x-axis-top')
        .attr('transform', 'translate(' + padding.l + ',' + padding.t + ')')
        .call(xAxisTop);

    // Update the chart for all countries to initialize
    updateChart('all-continents');
});

function updateChart(filterKey) {
    // Create a filtered array of countries based on the filterKey
    var filteredCountries;

    if (filterKey === 'all-continents')
        filteredCountries = countries.filter(d => d.continent !== filterKey);
    else filteredCountries = countries.filter(d => d.continent === filterKey);

    // **** Draw and Update your chart here ****

    var bars = chartG.selectAll('.bar')
        .data(filteredCountries, d => d.country);

    bars.enter().append('rect')
        .attr('class', 'bar')
        .attr('y', (d, i) => i * barBand)
        .attr('height', barHeight)
        .attr('width', d => scale(d.temperature))
        .style('fill', 'blue');
    
    bars.exit().remove();

    // Handle the text labels for each country
    var labels = chartG.selectAll('.label')
        .data(filteredCountries, d => d.country);

    labels.enter().append('text')
        .attr('class', 'label')
        .attr('x', -10)
        .attr('y', (d, i) => i * barBand + barHeight / 2)
        .attr('dy', '.5em')
        .attr('text-anchor', 'end')
        .text(d => d.country);

    labels.exit().remove();
}

// Remember code outside of the data callback function will run before the data loads
