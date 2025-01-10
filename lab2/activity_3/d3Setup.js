// d3 code that creates the bar chart visualization. Please go through this file to get an initial exposure to the d3 library. Do not edit anything in this file.

const margin = {top: 20, right: 20, bottom: 30, left: 40};
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Create SVG element
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Create scales
const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
const y = d3.scaleLinear().rangeRound([height, 0]);

// Create axes
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y);

// Add x-axis
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis);

// Add y-axis
svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis);

// Function to update the visualization
function updateVisualization(data) {
    // Update scales
    x.domain(data.map(d => d.genre));
    y.domain([0, d3.max(data, d => d.averageRating)]);

    // Update axes
    svg.select(".x-axis").transition().duration(300).call(xAxis);
    svg.select(".y-axis").transition().duration(300).call(yAxis);

    // Create a selection for movie rating bars
    const bars = svg.selectAll(".bar")
        .data(data, d => d.genre);

    // New elements
    bars.enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.genre))
        .attr("y", height)
        .attr("width", x.bandwidth())
        .attr("height", 0)
        .merge(bars) 
        .transition().duration(300)
        .attr("x", d => x(d.genre))
        .attr("y", d => y(d.averageRating))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.averageRating));

    // Remove old elements
    bars.exit().remove();
}

// populate the year dropdown
function populateYearDropdown() {
    const yearSelect = d3.select("#year-select");

    yearSelect.append("option")
        .attr("value", "all")
        .text("All");
    

    for (let year = 1970; year <= 2015; year += 5) {
        yearSelect.append("option")
            .attr("value", year)
            .text(year);
    }
}
populateYearDropdown();

d3.select("#year-select").on("change", function() {
    updateBars(this.value);
});

function setTopMovies(topMovieTitles) {
    d3.select("#top-movies").text(topMovieTitles);
}

// Initial update
updateBars("all");