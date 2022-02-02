# Icons-Atlas

**Icons-Atlas** - это веб-приложение для поиска по иконкам проектов созданных на платформе BYOND. Поиск осуществляется как по [icon_state](https://www.byond.com/docs/ref/#/atom/var/icon_state) так и по пути до иконки.

Этот репозитории настроен на работу с репозиторием [OnyxBay](https://github.com/ChaoticOnyx/OnyxBay).

Для работы требуется два файла:

- `icons.bin` - файл со всеми иконками закодированными в base64, требуется для возможности отображать их в веб-приложении.
- `database.bin` - база данных созданная с помощью [tantivy](https://github.com/quickwit-oss/tantivy), требуется для поиска среди иконок по введённому запросу.

Исходый код веб-приложения расположен в ветке `web`. В ветке `utils` расположен исходный код программ создающих базу данных и собирающих иконки вместе, а также **wasm** приложение - API для работы веб-приложения с запакованными файлами и поиском по ним.
