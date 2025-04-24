async function fetchData(name: string = "bulbasaur") {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const searchButton = document.getElementById("search") as HTMLButtonElement;
const searchInput = document.getElementById("input") as HTMLInputElement;

searchButton.addEventListener("click", async () => {
  const name = searchInput.value.trim();
  
  if (name) {
    const data = await fetchData(name);

    if (data) {
      updatePokemonDetails(data);
    }
  }
});

function updatePokemonDetails(data: any) {
  const pkmnImage = document.getElementById("image") as HTMLImageElement;
  const pkmnName = document.getElementById("name") as HTMLHeadingElement;
  const pkmnType = document.getElementById("type") as HTMLParagraphElement;
  const pkmnWeight = document.getElementById("weight") as HTMLParagraphElement;
  const pkmnHeight = document.getElementById("height") as HTMLParagraphElement;

  if (pkmnImage) {
    pkmnImage.src = data.sprites.front_default;
    pkmnImage.alt = "Pokemon";
  }

  let name = data.name.charAt(0).toUpperCase() + data.name.slice(1);

  if (pkmnName) {
    pkmnName.textContent = name;
  }

  let types = data.types.map((type: Type) => type.type.name);

  if (pkmnType) {
    pkmnType.textContent = `Types: ${types.map((type: string) => type.charAt(0).toUpperCase() + type.slice(1)).join(", ")}`;
  }

  if (pkmnWeight) {
    pkmnWeight.textContent = `Weight: ${data.weight}`;
  }

  if (pkmnHeight) {
    pkmnHeight.textContent = `Height: ${data.height}`;
  }
}

interface Type {
  "slot": number,
  "type": TypeItem
}

interface TypeItem {
  "name": string,
  "url": string
}

(async () => {
  const data = await fetchData();
  if (data) {
    updatePokemonDetails(data);
  }

})();

