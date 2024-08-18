// Get references to DOM elements
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

// Function to fetch data from the Pokémon API
const fetchData = async (search) => {
  // Construct the API URL with the search term (e.g., Pokémon name or ID)
  const pokemonApi = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${search}`;

  try {
    // Make the fetch request to the API
    const res = await fetch(pokemonApi);

    // Check if the response is okay (status code 200-299)
    if (!res.ok) {
      throw new Error("Pokémon not found"); // If not, throw an error
    }

    // Parse the response data as JSON
    const data = await res.json();
    return data; // Return the data to be used elsewhere
  } catch (err) {
    // Handle errors (e.g., Pokémon not found)
    alert("Pokémon not found"); // Show an alert to the user
    console.log(err); // Log the error to the console
  }
};

// Function to update the UI with the fetched Pokémon data
const update = async (pokemonData) => {
  if (!pokemonData) return; // If no data is provided, exit the function

  // Update the UI elements with the corresponding Pokémon data
  pokemonName.innerText = pokemonData.name;
  pokemonId.innerText = pokemonData.id;
  weight.innerText = `${pokemonData.weight}`;
  height.innerText = `${pokemonData.height}`;

  // Get and display the Pokémon's types (e.g., Electric, Water)
  types.innerText = `${pokemonData.types
    .map((typeInfo) => typeInfo.type.name.toUpperCase())
    .join(", ").toUpperCase()}`;

  // Get and display the Pokémon's stats (e.g., HP, Attack, Defense)
  hp.innerText = `${
    pokemonData.stats.find((stat) => stat.stat.name === "hp").base_stat
  }`;
  attack.innerText = `${
    pokemonData.stats.find((stat) => stat.stat.name === "attack").base_stat
  }`;
  defense.innerText = `${
    pokemonData.stats.find((stat) => stat.stat.name === "defense").base_stat
  }`;
  specialAttack.innerText = `${
    pokemonData.stats.find((stat) => stat.stat.name === "special-attack")
      .base_stat
  }`;
  specialDefense.innerText = `${
    pokemonData.stats.find((stat) => stat.stat.name === "special-defense")
      .base_stat
  }`;
  speed.innerText = `${
    pokemonData.stats.find((stat) => stat.stat.name === "speed").base_stat
  }`;
};

// Event listener for the search button click
searchButton.addEventListener("click", async () => {
  // Get the user's input from the search field, trim whitespace, and convert to lowercase
  const search = searchInput.value.trim().toLowerCase();

  // Check if the user entered a search term
  if (search) {
    // Fetch the Pokémon data using the inputted search term
    const pokemonData = await fetchData(search);

    // Update the UI with the fetched data
    update(pokemonData);
  } else {
    // If no input is provided, alert the user
    alert("Please enter a Pokémon name or ID.");
  }
});
