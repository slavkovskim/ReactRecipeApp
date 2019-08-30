import React,{useEffect, useState} from 'react'

import './App.css';


import Recipe from './Recipe';

const App = () => {

  const APP_ID = "27f64883";
  const APP_KEY = "f3067a3d527f7c06541c90042e88463e";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

    useEffect( () =>{
            getRecipes();
    }, [query]);

    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        const data = await response.json(); //await for some data doesnt come instantly

        setRecipes(data.hits);
        console.log(data.hits);
    };

    const updateSearch = e => {
        setSearch(e.target.value);
    };

    const getSearch = e => {
        e.preventDefault(); //stopping the page refresh with every character
        setQuery(search);
        setSearch(''); //empties the search bar
    }

  return (

      <div className="App">
       <form onSubmit={getSearch} className="search-form">
         <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
         <button className="search-button" type="submit">Search</button>

       </form>
          <div className="recipes">
          {recipes.map(recipe => (
              <Recipe
                  key={recipe.recipe.label}
                  title={recipe.recipe.label}
                  image={recipe.recipe.image}
                  ingredients={recipe.recipe.ingredients}
              />
          ))}
          </div>
      </div>
  );
}

export default App;
