const PathClass = require('./main');

const rawHTML = '<body><div><ul><li>1</li>2<li>3</li>4<li>5</li>6<li>7</li></ul></div></body>'
const parser = new DOMParser();
const document = parser.parseFromString( rawHTML, 'text/html' );
const service = new PathClass();

test('getNthChild should return tag', ()=>{
  const element = service.getNthChild( document.querySelector('body') )
  expect( element ).toMatch('body')
})

test('getNthChild should return tags nth-child', ()=>{
  const element = service.getNthChild( document.querySelector('div') )
  expect( element ).toMatch('div:nth-child(1)')
})

test('getPath should return unique path', () => {
  const element = document.querySelector('li:first-child')
  const selector = service.getPath( element )
  console.log( 'Предложенный селектор:', selector )
  const amountOfElements = document.querySelectorAll( selector ).length
  expect( amountOfElements ).toBe(1)
})
