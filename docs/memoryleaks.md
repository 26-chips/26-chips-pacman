# Утечки памяти

## Что использовалось для проверки

1. Chrome DevTools
2. Firefox Developer Tools (memory, [profiler](https://github.com/firefox-devtools/profiler))
3. Библиотека мониторинга памяти [fuite](https://github.com/nolanlawson/fuite)

## Как проверялось

Осуществлялись переходы по страницам, взаимодействие с игровым канвасом

<details>
  <summary>Chrome DevTools</summary>
    <img alt="Chrome DevTools profiler" src="./imgs/memoryleaks/chrome_profiler.png" />
</details>

<details>
  <summary>Firefox Developer Tools</summary>
    <img alt="Firefox Developer Tools profiler" src="./imgs/memoryleaks/firefox_profiler.png" />
</details>

<details>
  <summary>Fuite</summary>
    <img alt="Fuite tests result" src="./imgs/memoryleaks/fuite.png" />
</details>

Во всех инструментах после прекращения взаимодействия со страницей величина используемой памяти вернулась к исходному значению

## Результаты

При проверке утечек памяти не обнаружено
