import { Main } from "../main.js"
const url = `https://pokeapi.co/api/v2/`
const backpackElement = document.getElementById('backpack')
const bagPokemonElement = document.getElementById('bagPokemon')
const input = document.querySelector('input')

async function searchPokemon() {
  backpackElement.style.display = 'block'
  bagPokemonElement.style.display = 'block'
  const inputValue = input.value.trim().toLowerCase()
  const msg =
    'Desculpa, não conseguimos escontrar esse pokemon. Verifique se digitou corretamente seu nome.'
    Main.clearAllCards()
  if (inputValue != '') {
    const getPokemonByName = `${url}pokemon/${inputValue}`
    await fetch(getPokemonByName)
      .then(response => {
        if (!response.ok) {
          Main.renderMessage(msg)
          throw new Error(response.statusText)
        }
        response.json().then(data => {
          if (data != undefined) Main.renderPokemons(data)
        })
      })
      .catch(e => {
        console.log('catch:', e)
      })
  } else {
    backpackElement.style.display = 'block'
    bagPokemonElement.style.display = 'none'
    fetchPokemons()
  }
}

async function getPokemonById(id) {
  Main.clearAllCards()
  const urlId = `${url}pokemon/${id}`
    await fetch(urlId)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        response.json().then(data => {
          if (data != undefined) Main.renderPokemons(data)
        })
      })
      .catch(e => {
        console.log('catch:', e)
      })
}

async function fetchPokemons() {
  const getPokemonUrl = id => `${url}pokemon/${id}`

  const pokemonPromises = []

  for (let i = 1; i <= 150; i++) {
    pokemonPromises.push(
      fetch(getPokemonUrl(i)).then(response => response.json())
    )
  }

  Promise.all(pokemonPromises).then(pokemons => {
    pokemons.forEach(pokemon => {
      Main.renderPokemons(pokemon)
    })
  })
}

async function getColorPokemon(id) {
  const urlColor = `${url}pokemon-species/${id}/`
  return fetch(urlColor)
}

export const API = {
  searchPokemon,
  fetchPokemons,
  getColorPokemon,
  getPokemonById
}