document.addEventListener("DOMContentLoaded", () => {
    getUserData()
})

function getUserData() {
    const form = document.getElementById("github-form")
    const repos = document.getElementById("repos-list")
    form.addEventListener("submit", event => {
        const userList = document.getElementById("user-list")
        userList.innerHTML = ""
        repos.innerHTML = ""

        const user = document.getElementById("search").value

        fetch(`https://api.github.com/search/users?q=${user}`)
        .then(response => response.json())
        .then(data => {
            userInfo = data.items[0]

            let username = document.createElement("li")
            username.innerHTML = userInfo.login

            let avatar = document.createElement("img")
            avatar.className = "avatar"
            avatar.src = userInfo.avatar_url

            let link = document.createElement("a")
            link.href = userInfo.html_url
            link.innerHTML = userInfo.html_url
    
            let div = document.createElement("div")
            div.id = userInfo.login
            div.className = "card"
            
            div.append(username, avatar, link)

            div.addEventListener("click", () => {
                
                getRepos(user)
            })
    
            userList.append(div)
        })

        event.preventDefault()
    })
}

function getRepos(user) {
    const repos = document.getElementById("repos-list")
    repos.innerHTML = ""
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(response => response.json())
    .then(data => {
        data.forEach(innerData => {
            let li = document.createElement("li")
            li.id = innerData.id
            let repo = document.createElement("a")
            repo.href = `github.com/${innerData.full_name}`
            repo.innerHTML = innerData.name

            li.append(repo)
            repos.append(li)
        })
    })
}