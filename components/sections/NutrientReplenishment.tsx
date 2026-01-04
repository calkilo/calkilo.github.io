import { useState } from 'react'

const NutrientReplenishment = () => {
  const [activeTab, setActiveTab] = useState('calories')

  const tabs = [
    { id: 'calories', label: 'Calories' },
    { id: 'carbohydrates', label: 'Carbohydrates' },
    { id: 'proteins', label: 'Proteins' },
    { id: 'fat', label: 'Fat' },
  ]

  const meals = [
    { name: 'Cheese Bread & Veggies', calories: 320, carbs: 45, protein: 12, fat: 8 },
    { name: 'Salad, Tomatoes & Nuts', calories: 180, carbs: 15, protein: 8, fat: 12 },
  ]

  const nutrients = {
    calories: { current: 180, target: 200, unit: 'Kcal' },
    carbohydrates: { current: 45, target: 100, unit: 'g' },
    proteins: { current: 60, target: 80, unit: 'g' },
    fat: { current: 25, target: 50, unit: 'g' },
  }

  return (
    <section id="nutrient-replenishment" className="nutrient-replenishment">
      <div className="container">
        <div className="section-header">
          <h2>Don&apos;t forget to replenish the nutrients you need in a day.</h2>
        </div>
        <div className="nutrient-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nutrient-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="nutrient-content">
          <div className="meal-cards">
            {meals.map((meal, index) => (
              <div key={index} className="meal-card-small">
                <div className="meal-image-placeholder">🍽️</div>
                <div className="meal-details">
                  <h4>{meal.name}</h4>
                  <div className="meal-nutrients">
                    <span>{meal.calories} Kcal</span>
                    <span>{meal.carbs}g Carbs</span>
                    <span>{meal.protein}g Protein</span>
                    <span>{meal.fat}g Fat</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="nutrient-trackers">
            <div className="tracker-card meal-tracker">
              <h3>Meal Tracker</h3>
              <div className="tracked-meals">
                <div className="tracked-meal">
                  <div className="tracked-meal-image">🥗</div>
                  <div className="tracked-meal-info">
                    <span className="tracked-meal-name">Salad, Tomatoes & Nuts</span>
                    <div className="tracked-meal-stats">
                      <span>180 Kcal</span>
                      <span>45% Carbs</span>
                      <span>20% Protein</span>
                      <span>35% Fat</span>
                    </div>
                  </div>
                </div>
                <div className="tracked-meal">
                  <div className="tracked-meal-image">🍳</div>
                  <div className="tracked-meal-info">
                    <span className="tracked-meal-name">Eggs & Avocado</span>
                    <div className="tracked-meal-stats">
                      <span>320 Kcal</span>
                      <span>15% Carbs</span>
                      <span>30% Protein</span>
                      <span>55% Fat</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tracker-card nutrients-required">
              <h3>Nutrients required</h3>
              <div className="nutrient-progress">
                <div className="nutrient-progress-item">
                  <div className="nutrient-progress-header">
                    <span className="nutrient-label">Calories</span>
                    <span className="nutrient-value">
                      {nutrients.calories.current}/{nutrients.calories.target} {nutrients.calories.unit}
                    </span>
                  </div>
                  <div className="nutrient-progress-bar">
                    <div
                      className="nutrient-progress-fill"
                      style={{ width: `${(nutrients.calories.current / nutrients.calories.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="nutrient-progress-item">
                  <div className="nutrient-progress-header">
                    <span className="nutrient-label">Carbohydrates</span>
                    <span className="nutrient-value">
                      {nutrients.carbohydrates.current}/{nutrients.carbohydrates.target} {nutrients.carbohydrates.unit}
                    </span>
                  </div>
                  <div className="nutrient-progress-bar">
                    <div
                      className="nutrient-progress-fill"
                      style={{ width: `${(nutrients.carbohydrates.current / nutrients.carbohydrates.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="nutrient-progress-item">
                  <div className="nutrient-progress-header">
                    <span className="nutrient-label">Proteins</span>
                    <span className="nutrient-value">
                      {nutrients.proteins.current}/{nutrients.proteins.target} {nutrients.proteins.unit}
                    </span>
                  </div>
                  <div className="nutrient-progress-bar">
                    <div
                      className="nutrient-progress-fill"
                      style={{ width: `${(nutrients.proteins.current / nutrients.proteins.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="nutrient-progress-item">
                  <div className="nutrient-progress-header">
                    <span className="nutrient-label">Fats</span>
                    <span className="nutrient-value">
                      {nutrients.fat.current}/{nutrients.fat.target} {nutrients.fat.unit}
                    </span>
                  </div>
                  <div className="nutrient-progress-bar">
                    <div
                      className="nutrient-progress-fill"
                      style={{ width: `${(nutrients.fat.current / nutrients.fat.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NutrientReplenishment

