import { type SiteLanguage } from './site-language'

/**
 * Product facts checked against the mobile application source. Customer-facing
 * statements that vary by locale should derive from this file.
 */
export const VERIFIED_PRODUCT_FACTS = {
  platforms: ['iOS', 'Android'],
  estimatedNutrients: ['calories', 'protein', 'carbohydrates', 'fat'],
  photoEstimateCanBeEdited: true,
  macroGoalsCanBeViewed: true,
  macroGoalsCanBeManuallyEdited: false,
} as const

export const PREFERENCE_UPDATE_ANSWER_EN =
  'You can update personal details such as height and goal weight after onboarding. You can view your macro goals, but the current app does not provide controls for manually changing those targets.'

export const PREFERENCE_UPDATE_ANSWERS: Record<SiteLanguage, string> = {
  en: PREFERENCE_UPDATE_ANSWER_EN,
  nl: 'Na de onboarding kun je persoonlijke gegevens zoals lengte en streefgewicht aanpassen. Je kunt je macrodoelen bekijken, maar in de huidige app kun je deze doelen niet handmatig wijzigen.',
  ru: 'После регистрации можно изменить личные данные, например рост и целевой вес. Цели по макронутриентам можно просматривать, но в текущей версии приложения нельзя менять их вручную.',
  zh: '完成初始设置后，你可以更新身高和目标体重等个人信息。你可以查看宏量营养目标，但当前版本尚不支持手动修改这些目标。',
  ar: 'يمكنك تحديث البيانات الشخصية مثل الطول والوزن المستهدف بعد الإعداد الأولي. ويمكنك عرض أهداف المغذيات الكبرى، لكن الإصدار الحالي لا يتيح تعديل هذه الأهداف يدوياً.',
  fa: 'بعد از شروع کار می‌توانید اطلاعات شخصی مانند قد و وزن هدف را به‌روزرسانی کنید. هدف‌های ماکرو قابل مشاهده‌اند، اما نسخه فعلی امکان تغییر دستی این هدف‌ها را ندارد.',
  it: 'Dopo la configurazione iniziale puoi aggiornare dati personali come altezza e peso obiettivo. Puoi vedere gli obiettivi dei macronutrienti, ma la versione attuale non consente di modificarli manualmente.',
}
