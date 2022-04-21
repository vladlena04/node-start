document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
      const id = event.target.dataset.id
  
      remove(id).then(() => {
        event.target.closest('li').remove()
      })
    }
  })
  
  document.addEventListener('click', event => {
    if (event.target.dataset.type === 'edit') {
      const id = event.target.dataset.id
      const title = prompt('Введите новое значение')
      if(title) {
        edit(id, title).then(() => {
          let elem = event.target.closest('li').querySelector('.list-item-text')
          elem.innerText = title;
          console.log('Element id', id, 'changed title to', title)
        })
      }
    }
  })
  
  async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'})
  }
  
  async function edit(id, title) {
    await fetch(`/${id}/${title}`, {method: 'PUT'})
  }
  