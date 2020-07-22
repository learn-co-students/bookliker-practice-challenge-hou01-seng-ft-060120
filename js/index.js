document.addEventListener("DOMContentLoaded", function() {
    
    bookGetter()
});

function bookGetter() {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(json => createBookList(json));
}

function createBookList(data) {
    const bookList = document.getElementById('list');
    data.forEach( book => {
        const bookItem = document.createElement('li');
        bookItem.innerText = book.title
        bookList.appendChild(bookItem)
        clickTheBook(book, bookItem)
    })
}

function clickTheBook(book, bookItem) {
    bookItem.addEventListener('click', () => {
        makePanel(book);
        
        })
}

function makePanel(book) {
    const bookInfo = document.getElementById('show-panel')
        bookInfo.innerHTML = `<div><img src="${book.img_url}"></div>
          <p>${book.title}</p>
          <p>${book.author}</p>
          <p>${book.description}</p>`
        const bookLikes = document.createElement('ul')
        bookLikes.setAttribute("id", `${book.title}-${book.id}`)
          bookInfo.appendChild(bookLikes)
        book.users.forEach( user => {
            const bookLiker = document.createElement('li')
            bookLiker.innerText = user.username
            bookLikes.appendChild(bookLiker)
        })
        truthiness(book)
            if (truthiness(book) === true) {
            unlikeButton = document.createElement('button')
            unlikeButton.setAttribute("id", `${book.id}`)
            unlikeButton.innerText = "Unlike"
            bookInfo.appendChild(unlikeButton)
            unliker(book)
            }
            else {
            likeButton = document.createElement('button')
            likeButton.setAttribute("id", `${book.id}`)
            likeButton.innerText = "Like"
            bookInfo.appendChild(likeButton)
            liker(book)
            }
}

function liker (book) {
    document.getElementById(book.id).addEventListener('click', like => {
      like.preventDefault()
      const users = book.users
      users.push({id: 1, username: "pouros"})
     
      fetch(`http://localhost:3000/books/${book.id}`, {
          method: "PATCH", 
          headers: {
              'content-type': 'application/json',
              accept: 'application/json',
          },
          body: JSON.stringify({
              users: users
          })
      })
      .then(response => response.json())
      .then(data => {
          makePanel(data)
        })
    })
}

function unliker (book) {
    document.getElementById(book.id).addEventListener('click', like => {
      like.preventDefault()
      const users = book.users
      
      users.splice (users.indexOf({id: 1, username: "pouros"}), 1);
     
      fetch(`http://localhost:3000/books/${book.id}`, {
          method: "PATCH", 
          headers: {
              'content-type': 'application/json',
              accept: 'application/json',
          },
          body: JSON.stringify({
              users: users
          })
      })
      .then(response => response.json())
          .then(data => {
            makePanel(data)
          })
    })
}

function truthiness(book) {
    let truthy = false
    book.users.forEach( user =>{ 
        
        if (user.id === 1)
            truthy = true
    } )
    return truthy
}   


