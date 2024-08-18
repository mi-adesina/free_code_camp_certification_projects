// Get references to DOM elements
const searchInput = document.getElementById("search-input"); // Input field for Pokémon name/ID
const searchButton = document.getElementById("search-button"); // Button to trigger search
const pokemonName = document.getElementById("pokemon-name"); // Element to display Pokémon name
const pokemonId = document.getElementById("pokemon-id"); // Element to display Pokémon ID
const weight = document.getElementById("weight"); // Element to display Pokémon weight
const height = document.getElementById("height"); // Element to display Pokémon height
const types = document.getElementById("types"); // Element to display Pokémon types
const hp = document.getElementById("hp"); // Element to display Pokémon HP
const attack = document.getElementById("attack"); // Element to display Pokémon attack stat
const defense = document.getElementById("defense"); // Element to display Pokémon defense stat
const specialAttack = document.getElementById("special-attack"); // Element to display Pokémon special attack stat
const specialDefense = document.getElementById("special-defense"); // Element to display Pokémon special defense stat
const speed = document.getElementById("speed"); // Element to display Pokémon speed stat
const avatarDiv = document.getElementById("pokemon-avatar"); // Container for Pokémon image

// Function to fetch data from the Pokémon API
const fetchData = async (search) => {
  // Construct the API URL with the search term (e.g., Pokémon name or ID)
  const pokemonApi = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${search}`;

  try {
    // Make the fetch request to the API
    const res = await fetch(pokemonApi);

    // Check if the response is okay (status code 200-299)
    if (!res.ok) {
      alert("Pokémon not found"); // Raise an alert
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
  let typesText = pokemonData.types
  .map((typeInfo) => typeInfo.type.name.toUpperCase())
  .map(word => word.trim());
  
  typesText = [...typesText]; // Spread into array for easy usage.

  // console.log(typesText[0 ]); // used for debugging
  types.innerHTML = ""; // clears the types div element before the next search.

  // looping through typesText so as to update the innerHTML of types.
  for (let i = 0; i < typesText.length; i++) {
    types.innerHTML += `<div>${typesText[i]}</div> `
  }

  let pokemonImageSrc;
  let pokemonImageAlt;

  //Set the Pokemon image source
  if (pokemonData.sprites && pokemonData.sprites.front_default) {
    pokemonImageSrc = pokemonData.sprites.front_default;
    pokemonImageAlt = pokemonData.name; // Update alt text with the Pokémon's name
  } else {
    pokemonImageSrc = ""; // Clear the image if no image is found
    pokemonImageAlt = "Image not available";
  }

  // Display the Pokémon image in the avatarDiv
  avatarDiv.innerHTML = `<img src=${pokemonImageSrc} alt=${pokemonImageAlt} id="sprite">`;

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
