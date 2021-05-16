
class PathClass {
  getNthChild(htmlEl) {
    if (!htmlEl.parentElement) return htmlEl.tagName.toLowerCase(); // если нет родителя - вернем tag

    // Если родитель есть, ищем, какой по счету в нем искомый ребенок и возвращаем
    const children = Array.from(htmlEl.parentElement.children);
    const index = children.findIndex((child) => child === htmlEl);

    return `${htmlEl.tagName.toLowerCase()}:nth-child(${index + 1})`;
  }

  getPath(htmlEl) {
    // Если есть id возвращаем его
    if (htmlEl.hasAttribute("id")) return `#${htmlEl.id}`;

    // Ищем, какой элемент по счету в родителе
    let selector = this.getNthChild(htmlEl);

    // Если есть классы
    if (htmlEl.hasAttribute("class") && htmlEl.className.length)
      selector = `${selector}.${htmlEl.className.split(" ").join(".")}`;

    // Идем вверх по дереву и строим цепочку селектов типа div > div, параллельно добавляем классы и id к элементам
    while ((htmlEl = htmlEl.parentElement)) {
      // Если дошли до body, выходим из цикла
      if (htmlEl.tagName === "BODY") {
        selector = `body>${selector}`;
        break;
      } else {
        let parentSelector;

        // если есть родитель с id, выходим и начинаем путь с него
        if (htmlEl.hasAttribute("id")) {
          selector = `#${htmlEl.id}>${selector}`;
          break;
        }
        // добавляем nth-child на каждого найденого родителя
        parentSelector = this.getNthChild(htmlEl);

        // добавляем классы на каждого найденого родителя
        parentSelector = htmlEl.hasAttribute("class")
          ? `${parentSelector}.${htmlEl.className.split(" ").join(".")}`
          : parentSelector;

        selector = `${parentSelector}>${selector}`;
      }
    }

    return selector;
  }
}

const solution = new PathClass()


// накидываем евент для визуализации
document.querySelector("*").addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const selectorFromGetPath = solution.getPath(e.target); // селектор, который предложил getPath
  const result = document.querySelectorAll(selectorFromGetPath); // элементы, найденные по предложенному селектору

  // выводим, селектор, который предложила функция getPath
  document.querySelector(
    ".info-block__selector > span"
  ).textContent = selectorFromGetPath;

  // Пишем сколько найдено элементов на запрос
  document.querySelector(".info-block__count > span").textContent =
    (result.length).toString();
});


if( typeof module !== "undefined" ) module.exports = PathClass
