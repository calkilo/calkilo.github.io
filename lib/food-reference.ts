export interface ReferenceFood {
  id: number
  name: string
  category: string
  calories: number
  protein: number | null
  fat: number | null
  carbs: number | null
  fiber: number | null
  sugar: number | null
  sodium: number | null
  calcium: number | null
  iron: number | null
  potassium: number | null
  vitaminA: number | null
  vitaminC: number | null
  vitaminD: number | null
  saturatedFat: number | null
  cholesterol: number | null
}
export const normalizeFoodSearch = (text: string) => text.normalize('NFKC').replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[\u064B-\u065F]/g, '').replace(/[\s\u200c-]+/g, ' ').trim().toLowerCase()
// Search aliases, not translations of the complete preparation or branded product name.
export const FOOD_SEARCH_ALIASES: [string, string][] = [
  ['rice','برنج'],['bread','نان'],['chicken','مرغ'],['beef','گوشت گاو'],['lamb','گوشت بره گوسفند'],['veal','گوشت گوساله'],['turkey','بوقلمون'],['duck','اردک'],['fish','ماهی'],['salmon','سالمون'],['tuna','تن ماهی'],['trout','قزل آلا'],['sardine','ساردین'],['shrimp','میگو'],['egg','تخم مرغ'],['milk','شیر'],['yogurt','ماست'],['cheese','پنیر'],['butter','کره'],['cream','خامه'],['apple','سیب'],['banana','موز'],['orange','پرتقال'],['tangerine','نارنگی'],['lemon','لیمو'],['lime','لیموترش'],['grape','انگور'],['raisin','کشمش'],['date','خرما'],['fig','انجیر'],['peach','هلو'],['apricot','زردآلو'],['plum','آلو'],['pear','گلابی'],['cherry','گیلاس'],['strawberry','توت فرنگی'],['raspberry','تمشک'],['blackberry','شاه توت'],['blueberry','بلوبری'],['watermelon','هندوانه'],['melon','خربزه طالبی'],['kiwi','کیوی'],['pomegranate','انار'],['mango','انبه'],['pineapple','آناناس'],['coconut','نارگیل'],['avocado','آووکادو'],['olive','زیتون'],['potato','سیب زمینی'],['tomato','گوجه فرنگی'],['cucumber','خیار'],['onion','پیاز'],['garlic','سیر'],['carrot','هویج'],['spinach','اسفناج'],['lettuce','کاهو'],['cabbage','کلم'],['broccoli','بروکلی'],['cauliflower','گل کلم'],['eggplant','بادمجان'],['squash','کدو'],['pumpkin','کدو حلوایی'],['zucchini','کدو سبز'],['mushroom','قارچ'],['celery','کرفس'],['radish','تربچه'],['turnip','شلغم'],['beet','چغندر لبو'],['pepper','فلفل'],['corn','ذرت'],['peas','نخود فرنگی'],['lentil','عدس'],['chickpea','نخود'],['beans','لوبیا'],['soy','سویا'],['tofu','توفو'],['peanut','بادام زمینی'],['almond','بادام'],['walnut','گردو'],['pistachio','پسته'],['hazelnut','فندق'],['cashew','بادام هندی'],['sesame','کنجد'],['tahini','ارده'],['sunflower','تخمه آفتابگردان'],['flaxseed','تخم کتان'],['chia','چیا'],['oat','جو دوسر'],['barley','جو'],['wheat','گندم'],['quinoa','کینوا'],['pasta','پاستا ماکارونی'],['spaghetti','اسپاگتی ماکارونی'],['noodle','نودل'],['flour','آرد'],['sugar','شکر'],['honey','عسل'],['jam','مربا'],['chocolate','شکلات'],['cocoa','کاکائو'],['coffee','قهوه'],['tea','چای'],['juice','آبمیوه'],['water','آب'],['soup','سوپ'],['pizza','پیتزا'],['hamburger','همبرگر'],['sandwich','ساندویچ'],['falafel','فلافل'],['hummus','حمص'],['sausage','سوسیس'],['mayonnaise','مایونز'],['ketchup','کچاپ'],['mustard','خردل'],['vinegar','سرکه'],['oil','روغن'],['cinnamon','دارچین'],['ginger','زنجبیل'],['turmeric','زردچوبه'],['saffron','زعفران'],['cumin','زیره'],['parsley','جعفری'],['basil','ریحان'],['mint','نعناع'],['dill','شوید'],['coriander','گشنیز'],['raw','خام'],['cooked','پخته'],['boiled','آب پز'],['fried','سرخ شده'],['roasted','برشته'],['dried','خشک'],['canned','کنسروی'],['frozen','منجمد'],['salt','نمک'],
]
export function referenceSearchText(food: ReferenceFood) {
  const words = food.name.toLowerCase().split(/[^a-z]+/)
  const aliases = FOOD_SEARCH_ALIASES.filter(([word]) => words.includes(word) || words.includes(`${word}s`)).map(([,fa]) => fa).join(' ')
  return normalizeFoodSearch(`${food.name} ${food.category} ${aliases} ${food.id}`)
}
export const REFERENCE_NUTRIENTS = [
  ['calories','انرژی','کیلوکالری'],['protein','پروتئین','گرم'],['carbs','کربوهیدرات','گرم'],['fat','چربی','گرم'],['fiber','فیبر','گرم'],['sugar','قند کل','گرم'],['saturatedFat','چربی اشباع','گرم'],['sodium','سدیم','میلی‌گرم'],['calcium','کلسیم','میلی‌گرم'],['iron','آهن','میلی‌گرم'],['potassium','پتاسیم','میلی‌گرم'],['cholesterol','کلسترول','میلی‌گرم'],['vitaminA','ویتامین A (RAE)','میکروگرم'],['vitaminC','ویتامین C','میلی‌گرم'],['vitaminD','ویتامین D','میکروگرم'],
] as const
