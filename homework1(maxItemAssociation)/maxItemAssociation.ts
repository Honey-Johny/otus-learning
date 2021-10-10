const input: string[][] = [["a", "b"], ["a", "c"], ["d", "e"]];

function maxItemAssociation(arr: string[][]): string[]{

  function getUnique(array: string[]): string[]{ // возвращает уникальные элементы массива
    return array.filter((item: string, i: number) => array.indexOf(item) === i)
  }

  const flat: string[] = arr.flat(); // делаем одномерный массив

  const popularItemsUnique: string[] = getUnique(flat.filter((item: string, index: number) => flat.indexOf(item) !== index)); // ищем повторяющиеся элементы, и убираем из ни дубли потом будем искать массивы, которые их содержат

  const rawResult: string[][] = [] // сюда будем складывать все массивы, которые содержат popularItemsUnique

  popularItemsUnique.forEach(uniqItem => { // собственно ищем массивы и складываем в rawResult
    arr.forEach(arrItem => {
      if(arrItem.includes(uniqItem)){
        rawResult.push(arrItem)
      }
    })
  })

  const result: string[] = getUnique(rawResult.flat()) // берем уникальные

  console.log(result)

  return result

  // P.S старался расписать подробнее, конечно можно было записать покороче, но было бы менее понятно
}

maxItemAssociation(input);
