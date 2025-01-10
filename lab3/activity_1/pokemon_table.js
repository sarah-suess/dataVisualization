// Load the CSV data
d3.csv("./pokemon.csv").then(function(data) {
    console.log(data); // Check that the data is loaded correctly

    // Calculate total stats for each Pokémon and create table rows

    var tbody = d3.select("#pokemon-table").select("tbody");

    data.forEach(function(d) {
        d.StatScore = +d.HP + +d.Attack + +d.Defense + +d.Speed;

        var row = tbody.append("tr");

        row.append("td").text(d.Name);
        row.append("td").text(d["Type 1"]);
        row.append("td").text(d.StatScore);
    });

    var pokemonInfo = d3.select("#pokemon-info");

    // Finding the Pokémon with the highest speed
    var fastestPokemon = d3.max(data, function(d) { return +d.Speed; });
    var fastest = data.find(function(d) { return +d.Speed === fastestPokemon; });

    console.log(fastest);

    // Create paragraphs for each Pokémon
    data.forEach(function(d) {
        if (d.Name == fastest.Name) {
            var paragraph = pokemonInfo.append("p");

            paragraph.text(d.Name + " is a " + d["Type 1"] + " type Pokemon with a stat score of " + d.StatScore + ".", "red");

            // Highlight the paragraph of the Pokémon with the highest speed (you can move this elsewhere in your code for functionality)
            paragraph.style("color", "red");
        } else {
            var paragraph = pokemonInfo.append("p");

            paragraph.text(d.Name + " is a " + d["Type 1"] + " type Pokemon with a stat score of " + d.StatScore + ".");
        }
    });    
});