const input = [["a", "b"], ["a", "c"], ["d", "e"]];

function maxItemAssociation(arr){

  function getUnique(arr){ // возвращает уникальные элементы массива
    return arr.filter((item, i) => arr.indexOf(item) === i)
  }

  const flat = arr.flat(); // делаем одномерный массив

  const popularItemsUnique = getUnique(flat.filter((item, index) => flat.indexOf(item) !== index)); // ищем повторяющиеся элементы, и убираем из ни дубли потом будем искать массивы, которые их содержат

  const rawResult = [] // сюда будем складывать все массивы, которые содержат popularItemsUnique

  popularItemsUnique.forEach(uniqItem => { // собственно ищем массивы и складываем в rawResult
    arr.forEach(arrItem => {
      if(arrItem.includes(uniqItem)){
        rawResult.push(arrItem)
      }
    })
  })

  const result = getUnique(rawResult.flat()) // берем уникальные

  console.log(result)

  return result

  // P.S старался расписать подробнее, конечно можно было записать покороче, но было бы менее понятно
}

maxItemAssociation(input);
