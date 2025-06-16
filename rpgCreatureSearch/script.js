const creatureNames = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
const dataUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";

const creatureCard = document.getElementById('creature-card-body');
const specialRows = document.getElementById('special-rows');
const creatureBaseStats = document.getElementById('creature-card-base-stats');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
let currentCreature = false;

const fetchData = async () => {
  try {
    const res = await fetch(dataUrl.concat(currentCreature));
    const data = await res.json();
    const { special, stats, types } = data;

    Object.keys(data).splice(0, 4).forEach((key) => {
      for (const child of creatureCard.getElementsByTagName("*")) {
        if (child.id.includes(key)) {
          child.textContent = `${data[key]}`
        } 
      }
    })

    Object.keys(special).forEach((key) => {
      for (const child of specialRows.getElementsByTagName("*")) {
        if (child.id.includes(key) && child.id.includes("special")) {
          child.textContent = `${special[key]}`
        }
      }
    })

    stats.forEach((obj) => {
      for (const child of creatureBaseStats.getElementsByTagName("*")) {
        if (child.id.includes(obj.name)) {
          child.textContent = `${obj.base_stat}`;
        }
      }
    })
    
    types.forEach((obj, index) => {
      document.getElementById('types').innerHTML += `<span id="type-${index + 1}" class="creature-data">${obj.name.toUpperCase()} </span>`;
    })
  } catch (err) {
    alert(`There was an error: ${err} Please try again later`);
  }
};

const getCreature = (array) => {
  const search = searchInput.value;
  array.forEach((obj) => {

    console.log(obj.name, obj.id)
    if (search == obj.name || search == obj.id) {
      currentCreature = obj.name; 
    } 
  })

  if (currentCreature) {
    fetchData();
  } else {
    alert("Creature not found");

  }
};

const fetchNames = async () => {
  try {
    const res = await fetch(creatureNames);
    const data = await res.json();
    getCreature(data);
  } catch (err) {
    alert(`There was an error: ${err} Please try again later`);
  }
};
searchInput.value = "Pyrolynx";

searchBtn.addEventListener("click", () => {
  document.getElementById('types').innerHTML = ""; 
  currentCreature = false;
fetchNames();
})
