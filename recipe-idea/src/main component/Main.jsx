import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const Main = () => {
    const [ingredient, setIngredient] = useState('');
    const [data, setData] = useState([]);
    const [mealDetail, setMealDetail] = useState([]);
    const [detailModal, setDetailModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);


    // Handler for getting different meals based on the ingredient
    const handleMeal = () => {
        axios.post(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
            .then((response) => {
                setData(response.data.meals);
                setHasSearched(true);
               
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // Handler for getting ingredients, instructions and video link for each and specific meals
    const handleMealDetails = async (mealId) => {
        setLoading(true);
        setMealDetail([]);
        
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
            const result = await response.json();
            setMealDetail(result.meals || []);
            setDetailModal(true);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    // Close the modal
    const closeModal = () => {
        setDetailModal(false);
        setTimeout(() => setMealDetail([]), 300);
    }





    return (
        <>
            <div className="">
                <div className="px-4 py-12">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">
                            Your Meal Partner
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover delicious recipes based on ingredients you have at home
                        </p>
                    </div>

                    {/* Search Section */}
                    <div className="max-w-md mx-auto mb-16">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter an ingredient (e.g. chicken, tomato)"
                                    value={ingredient}
                                    onChange={(e) => setIngredient(e.target.value)}
                                />
                                <button
                                    onClick={handleMeal}
                                    disabled={!ingredient.trim()}
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                                >
                                    Find Recipes
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results Grid */}
                    {data && data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {data.map((meal) => (
                                <div
                                    key={meal.idMeal}
                                    onClick={() => handleMealDetails(meal.idMeal)}
                                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={meal.strMealThumb}
                                            alt={meal.strMeal}
                                            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {meal.strMeal}
                                        </h3>
                                        <p className="text-sm text-gray-500">Click to view recipe</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        hasSearched ? (
                            <p className="text-center text-lg text-gray-500 mt-8">
                                No recipes found. Please try another search.
                            </p>
                        ) : (
                            <p className="text-center text-lg text-gray-500 mt-8">
                                Search for a recipe to get started.
                            </p>
                        )
                    )}

                    
                </div>

                {/* Meal Details Modal */}
                {detailModal && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeModal();
                    }}
                >
                    {loading ? (
                        <div className="bg-white w-full max-w-lg rounded shadow-lg p-6 relative">
                            <div className="flex justify-center items-center h-32">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600"></div>
                            </div>
                        </div>
                    ) : (
                        mealDetail.map((mealD) => (
                            <div key={mealD.idMeal} className="bg-white w-full max-w-lg rounded shadow-lg p-6 relative max-h-96 overflow-y-auto">
                                <button
                                    className="absolute text-3xl top-1 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
                                    onClick={closeModal}
                                >
                                    &times;
                                </button>
                                
                                <h2 className="text-lg font-bold mb-4 ml-5 text-black pr-8">{mealD.strMeal}</h2>
                                
                                <div className="mb-4">
                                    <img
                                        src={mealD.strMealThumb}
                                        alt={mealD.strMeal}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <p className="text-black font-bold mb-2">Ingredients:</p>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <ul className="text-black text-sm space-y-1">
                                            {Array.from({ length: 20 }, (_, i) => i + 1)
                                                .map(num => ({
                                                    ingredient: mealD[`strIngredient${num}`],
                                                    measure: mealD[`strMeasure${num}`]
                                                }))
                                                .filter(item => item.ingredient && item.ingredient.trim())
                                                .map((item, index) => (
                                                    <li key={index} className="flex justify-between">
                                                        <span className="font-medium">{item.ingredient}</span>
                                                        <span className="text-gray-600">{item.measure?.trim() || ''}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="mb-4">
                                    <p className="text-black font-bold mb-2">Instructions:</p>
                                    <p className="text-black text-sm leading-relaxed">{mealD.strInstructions}</p>
                                </div>
                                
                                {mealD.strYoutube && (
                                    <div className="mt-4">
                                        <a
                                            href={mealD.strYoutube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                                        >
                                            Watch Video Tutorial
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}

            </div>


        </>
    )
}

export default Main