const tree = document.getElementById('DOMTree');
const style = document.createElement('style');
const dataTree = tree.getAttribute('data-tree');

customElements.define('my-tree',
  class extends HTMLElement {
    constructor() {
      super();
    }
  });

customElements.define('my-leaf',
  class extends HTMLElement {
    constructor() {
      super();
    }
  });

tree.attachShadow({
  mode: 'open'
});

const createTreeElem = (tree, parent) => {
  const ul = document.createElement('my-tree');
  const li = document.createElement('my-leaf');
  li.appendChild(document.createTextNode(tree.id));
  ul.appendChild(li);
  parent.appendChild(ul);

  if (tree.items) {
    li.classList.add('parent');
    tree.items.forEach(item => {
      createTreeElem(item, li);
    })
  }
  li.classList.add('element');
  return parent;
};

const createTree = (dataTree) => createTreeElem(JSON.parse(dataTree), new DocumentFragment);

style.textContent = `my-tree {
                      display: block;
                      margin-left: 16px;
                    }
                    .parent,
                    .element{
                       display: list-item;
                    }`;
tree.shadowRoot.appendChild(style);
tree.shadowRoot.appendChild(createTree(dataTree));
