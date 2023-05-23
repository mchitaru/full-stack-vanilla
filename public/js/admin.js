const form = document.getElementById("form")
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    console.log(data.get('title'))

    const res = await fetch('/posts', {
        method: 'POST',
        body: data
    })

    const post = await res.json()
    
    window.location.href = `./post.html?id=${post.insertedId}`
})