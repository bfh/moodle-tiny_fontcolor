
const insertRow = element => {
  const currRow = element.parentNode.parentNode;
  const newRow = currRow.cloneNode(true);
  const parts = newRow.querySelector('input').getAttribute('name').split('_');
  const num = parseInt(parts[parts.length -1]);
  const newNum = num + 1;
  const re = new RegExp('_' + num.toString() +'$');
  newRow.querySelectorAll('input').forEach(input => {
    ['name', 'id', 'value'].forEach((attr) => {
      if (attr === 'value') {
        input.value = '';
        return;
      }
      let content = input.getAttribute(attr).replace(re, '_' + newNum.toString());
      input.setAttribute(attr, content);
    });
  });
  currRow.parentNode.insertBefore(newRow, currRow.nextSibling);
  const button = currRow.querySelector('button');
  button.classList.remove('add');
  button.classList.add('del');
  button.innerHTML = '-';
  newRow.querySelector('button').addEventListener('click', function(e) {
    handleRow(e);
  });
};

const deleteRow = element => {
  element.parentNode.parentNode.remove();
};

const handleRow = event => {
  event.preventDefault();
  if (event.target.classList.contains('del')) {
    deleteRow(event.target);
  } else if (event.target.classList.contains('add')) {
    insertRow(event.target);
  }
};

export const init = name => {
  const root = document.querySelector('.' + name);
  if (!root) {
    return;
  }
  const buttons = root.getElementsByTagName('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons.item(i).addEventListener('click', function(e) {
      handleRow(e);
    });
  }
};