##getPath - поиск уникального селектора
###Цель:
В ходе выполнения ДЗ студент напишет алгоритм и функцию getPath(), находяющую уникальный css-селектор для элемента в документе.
Написать алгоритм и функцию getPath(), находяющую уникальный css-селектор для элемента в документе. Уникальный селектор может быть использован document.querySelector() и возвращать исходный элемент.
Так чтобы document.querySelectorAll(), вызванный с этим селектором, не должен находить никаких элементов, кроме исходного.
$0 // HTMLElement

getPath($0) // => "body div.someclass ul li:first-child"

Использовать TDD, добавить юнит тесты для функции
