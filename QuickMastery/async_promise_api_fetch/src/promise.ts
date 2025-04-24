async function fetchData(name: string = "bulbasaur") {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  const cyndaquil = await fetchData("Cyndaquil");
  console.log(cyndaquil);
  const charmander = await fetchData("Charmander");
  console.log(charmander);
})();
