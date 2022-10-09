const localStorageKey = 'favoritePokemons'

function getFavoritePokemons() {
  return JSON.parse(localStorage.getItem(localStorageKey))
}

function saveToLocalStorage(pokemon) {
  const pokemons = getFavoritePokemons() || []
  pokemons.push(pokemon.id)

  const pokemonsJSON = JSON.stringify(pokemons)
  try {
    localStorage.setItem(localStorageKey, pokemonsJSON)
  } catch (error) {
    console.log('Error in local storage', error)
  }
}

function checkPokeminIsFavorited(idInput) {
  const pokemons = getFavoritePokemons() || []
  return pokemons.find( id => id == idInput)
}

function removeFromLocalStorage(idInput) {
  const pokemons = getFavoritePokemons() || []
  const newPokemons = pokemons.filter(id => id != idInput)
  localStorage.setItem(localStorageKey, JSON.stringify(newPokemons))
}

export const LocalStorage = {
  getFavoritePokemons,
  saveToLocalStorage,
  checkPokeminIsFavorited,
  removeFromLocalStorage
}
