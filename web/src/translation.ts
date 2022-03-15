export type Translation = {
  [languade_code: string]: {
    [key: string]: string
  }
}

export default {
  en: {
    $LOADING_RESOURCES$: 'Loading Resources',
    $LOADING$: 'Loading',
    $SEARCH$: 'Search',
    $OPEN_ON_GITHUB$: 'Open on GitHub',
    $STATE$: 'State',
    $PATH$: 'Path',
    $HELP_PREFIXES_TITLE$: 'Prefixes',
    $HELP_PREFIXES_BODY1$: 'Use prefix',
    $HELP_PREFIXES_BODY2$: 'to search across icon state names:',
    $HELP_PREFIXES_BODY3$: 'to search across icon paths:',
    $HELP_BOOLEANS_TITLE$: 'Booleans',
    $HELP_BOOLEANS_BODY1$: 'Use boolean operators',
    $HELP_BOOLEANS_BODY2$: 'to combine queries',
    $HELP_MISC_TITLE$: 'Misc',
    $HELP_MISC_BODY1$: 'Also, you can use',
    $HELP_MISC_BODY2$: 'to exclude a query and',
    $HELP_MISC_BODY3$: 'to require some query:',
    $HELP_SEE$: 'See',
    $HELP_DETAILS$: 'details',
    $LAST_COMMIT_HASH$: 'Commit:'
  },
  ru: {
    $LOADING_RESOURCES$: 'Загрузка ресурсов',
    $LOADING$: 'Загрузка',
    $SEARCH$: 'Поиск',
    $OPEN_ON_GITHUB$: 'Открыть на GitHub',
    $STATE$: 'Стейт',
    $PATH$: 'Путь',
    $HELP_PREFIXES_TITLE$: 'Префиксы',
    $HELP_PREFIXES_BODY1$: 'Используйте префикс',
    $HELP_PREFIXES_BODY2$: 'для поиска по названиям стейтов:',
    $HELP_PREFIXES_BODY3$: 'для поиска по путям:',
    $HELP_BOOLEANS_TITLE$: 'Булевы операторы',
    $HELP_BOOLEANS_BODY1$: 'Используйте булевы операторы',
    $HELP_BOOLEANS_BODY2$: 'для комбинирования запросов',
    $HELP_MISC_TITLE$: 'Разное',
    $HELP_MISC_BODY1$: 'Также вы можете использовать',
    $HELP_MISC_BODY2$: 'чтобы исключить запрос, и',
    $HELP_MISC_BODY3$: 'чтобы сделать запрос обязательным:',
    $HELP_SEE$: 'Смотрите',
    $HELP_DETAILS$: 'подробнее',
    $LAST_COMMIT_HASH$: 'Коммит:'
  }
} as Translation
