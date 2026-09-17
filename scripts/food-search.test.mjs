import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import test from 'node:test'
import {foodSearchScore} from '../lib/food-reference.ts'
const {foods}=JSON.parse(readFileSync('public/data/usda-foods.json','utf8'))
test('milk is not a pastry-category substring search',()=>{
 const matches=foods.filter(food=>foodSearchScore(food,'شیر')>=0)
 assert(matches.length>0)
 assert(matches.every(food=>/\bmilks?\b/i.test(food.name)))
 assert(!matches.some(food=>food.name.startsWith('Archway Home Style Cookies')))
})
test('supports multiword Persian aliases and English prefixes',()=>{
 assert(foods.some(food=>foodSearchScore(food,'برنج پخته')>=0))
 assert(foods.some(food=>foodSearchScore(food,'عدس')>=0))
 assert(foods.some(food=>foodSearchScore(food,'ric')>=0))
 assert.equal(foodSearchScore(foods[0],'not-a-real-food-query'),-1)
})
test('primary food names rank above ingredients',()=>{
 const milk={id:1,name:'Milk, whole'}
 const cereal={id:2,name:'Cereal, prepared with whole milk'}
 assert(foodSearchScore(milk,'شیر')>foodSearchScore(cereal,'شیر'))
})
