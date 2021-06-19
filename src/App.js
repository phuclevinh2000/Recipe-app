import React,{useEffect, useState} from 'react';
import Recipe from './components/Recipe';
import './App.css';

const App = () => {

  const APP_ID = 'fdd144a3'
  const APP_KEY = 'eaefe1aeb6679afe8d1b061336998c20'

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')

  useEffect( () => {
    getRecipes()
  }, [query])

  const getRecipes = async () => {
    const respone = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await respone.json();
    setRecipes(data.hits)
    console.log(data.hits)
  }

  const updateSearch = (e) => {
    setSearch(e.target.value)
    console.log(search)
  }

  const getSearch = (e) => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">  
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            url={recipe.recipe.url}
          />
      ))}
      </div>
    </div>
  )
}

export default App;
