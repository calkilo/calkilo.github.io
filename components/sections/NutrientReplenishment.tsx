import { useState } from 'react'
import { useTranslation } from '../../hooks/useTranslation'

const NutrientReplenishment = () => {
  const { t } = useTranslation('common')
  const [activeTab, setActiveTab] = useState('calories')

  const tabs = [
    { id: 'calories', label: t('nutrientReplenishment.tabs.calories') },
    { id: 'carbohydrates', label: t('nutrientReplenishment.tabs.carbohydrates') },
    { id: 'proteins', label: t('nutrientReplenishment.tabs.proteins') },
    { id: 'fat', label: t('nutrientReplenishment.tabs.fat') },
  ]

  const meals = [
    { name: t('nutrientReplenishment.meals.cheeseBread'), calories: 320, carbs: 45, protein: 12, fat: 8 },
    { name: t('nutrientReplenishment.meals.saladNuts'), calories: 180, carbs: 15, protein: 8, fat: 12 },
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
          <h2>{t('nutrientReplenishment.title')}</h2>
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
                    <span>{meal.calories} {t('nutrientReplenishment.units.kcal')}</span>
                    <span>{meal.carbs}{t('nutrientReplenishment.units.g')} {t('nutrientReplenishment.units.carbs')}</span>
                    <span>{meal.protein}{t('nutrientReplenishment.units.g')} {t('nutrientReplenishment.units.protein')}</span>
                    <span>{meal.fat}{t('nutrientReplenishment.units.g')} {t('nutrientReplenishment.units.fat')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="nutrient-trackers">
            <div className="tracker-card meal-tracker">
              <h3>{t('nutrientReplenishment.mealTracker')}</h3>
              <div className="tracked-meals">
                <div className="tracked-meal">
                  <div className="tracked-meal-image">🥗</div>
                  <div className="tracked-meal-info">
                    <span className="tracked-meal-name">{t('nutrientReplenishment.meals.saladNuts')}</span>
                    <div className="tracked-meal-stats">
                      <span>180 {t('nutrientReplenishment.units.kcal')}</span>
                      <span>45{t('nutrientReplenishment.units.percent')} {t('nutrientReplenishment.units.carbs')}</span>
                      <span>20{t('nutrientReplenishment.units.percent')} {t('nutrientReplenishment.units.protein')}</span>
                      <span>35{t('nutrientReplenishment.units.percent')} {t('nutrientReplenishment.units.fat')}</span>
                    </div>
                  </div>
                </div>
                <div className="tracked-meal">
                  <div className="tracked-meal-image">🍳</div>
                  <div className="tracked-meal-info">
                    <span className="tracked-meal-name">{t('nutrientReplenishment.meals.eggsAvocado')}</span>
                    <div className="tracked-meal-stats">
                      <span>320 {t('nutrientReplenishment.units.kcal')}</span>
                      <span>15{t('nutrientReplenishment.units.percent')} {t('nutrientReplenishment.units.carbs')}</span>
                      <span>30{t('nutrientReplenishment.units.percent')} {t('nutrientReplenishment.units.protein')}</span>
                      <span>55{t('nutrientReplenishment.units.percent')} {t('nutrientReplenishment.units.fat')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tracker-card nutrients-required">
              <h3>{t('nutrientReplenishment.nutrientsRequired')}</h3>
              <div className="nutrient-progress">
                <div className="nutrient-progress-item">
                  <div className="nutrient-progress-header">
                    <span className="nutrient-label">{t('nutrientReplenishment.tabs.calories')}</span>
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
                    <span className="nutrient-label">{t('nutrientReplenishment.tabs.carbohydrates')}</span>
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
                    <span className="nutrient-label">{t('nutrientReplenishment.tabs.proteins')}</span>
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
                    <span className="nutrient-label">{t('nutrientReplenishment.tabs.fat')}</span>
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

