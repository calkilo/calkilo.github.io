"""Rebuild the browser catalogue from the official USDA SR Legacy CSV archive.
Usage: python3 scripts/import-usda-foods.py /path/to/archive.zip
Download: https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_sr_legacy_food_csv_2018-04.zip
No nutrition values are invented or inferred; absent measurements remain null.
"""
import csv
import hashlib
import io
import json
from pathlib import Path
import sys
import zipfile

archive = Path(sys.argv[1])
z = zipfile.ZipFile(archive)
def rows(name):
    path = next(p for p in z.namelist() if p.endswith('/' + name))
    return csv.DictReader(io.TextIOWrapper(z.open(path), encoding='utf-8-sig'))

# USDA nutrient IDs, values per 100 g, retaining the source's units.
fields = {'1008':'calories','1003':'protein','1004':'fat','1005':'carbs','1079':'fiber','2000':'sugar','1093':'sodium','1087':'calcium','1089':'iron','1092':'potassium','1106':'vitaminA','1162':'vitaminC','1114':'vitaminD','1258':'saturatedFat','1253':'cholesterol'}
categories_fa = ['لبنیات و تخم‌مرغ','ادویه و سبزی خشک','غذای کودک','روغن و چربی','مرغ و ماکیان','سوپ و سس','سوسیس و کالباس','صبحانه و غلات آماده','میوه و آبمیوه','گوشت خوک','سبزیجات','آجیل و دانه‌ها','گوشت گاو','نوشیدنی','ماهی و غذای دریایی','حبوبات','گوشت بره و گوساله و شکار','نان و شیرینی','شیرینی و شکلات','غلات و ماکارونی','فست‌فود','غذای آماده','میان‌وعده','غذای بومی آمریکا','غذای رستورانی','غذای بسته‌بندی','مواد کنترل کیفیت','نوشیدنی الکلی']
category_rows = list(rows('food_category.csv'))
assert len(category_rows) == len(categories_fa)
categories = {r['id']: {'en': r['description'], 'fa': fa} for r,fa in zip(category_rows,categories_fa)}
foods = {r['fdc_id']: {'id':int(r['fdc_id']), 'name':r['description'], 'category':categories[r['food_category_id']]['fa'], **{v:None for v in fields.values()}} for r in rows('food.csv')}
for r in rows('food_nutrient.csv'):
    if r['nutrient_id'] in fields and r['amount'] != '':
        foods[r['fdc_id']][fields[r['nutrient_id']]] = float(r['amount'])
assert len(foods) == 7793, len(foods)
assert all(f['calories'] is not None for f in foods.values())
assert all(v is None or v >= 0 for f in foods.values() for k,v in f.items() if k in fields.values())
result = {'source':'USDA FoodData Central — SR Legacy (April 2018)', 'sourceUrl':'https://fdc.nal.usda.gov/download-datasets/', 'archiveSha256':hashlib.sha256(archive.read_bytes()).hexdigest(), 'basisGrams':100, 'count':len(foods), 'foods':sorted(foods.values(),key=lambda f:f['name'])}
root = Path(__file__).resolve().parent.parent
out = root / 'public/data/usda-foods.json'
out.parent.mkdir(exist_ok=True)
out.write_text(json.dumps(result,ensure_ascii=False,separators=(',',':'))+'\n')
print(f'Imported {len(foods)} foods in {len(categories)} groups; {out.stat().st_size:,} bytes')
print([(r['id'],r['description'],categories[r['id']]['fa']) for r in category_rows])
