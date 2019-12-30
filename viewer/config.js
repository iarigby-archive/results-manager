const backend = 'http://localhost:3000'

const getId = function() {
    const path = window.location.href.toString()
    return path.substring(path.indexOf('?id=') + 4, path.length)   
}

const studentId = getId()