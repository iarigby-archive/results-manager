async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }

function updateData(id) {
    // const path = window.location.pathname
    // const id = path.substring(path.lastIndexOf('/'), path.length)
    // console.log(id)
    return fetch(`${backend}/midterms/4/results/${id}`)
    .then(response => response.json())
    .then(json => {
        const diffText = json.text     
        addDiff(diffText)
        addSolution(json.solution)
        addScore(diffText)
        return json
    })
    .catch(err => console.log(err))
}

function addSolution(text) {
    document.getElementById('answer').innerHTML = text
    // displayFile(text)
}
function addScore(file) {
    const maxScore = 40;
    const count = (file.match(/\/\/ N:/g) || []).length;
    document.querySelector('span#score').innerHTML = maxScore - count;
    document.querySelector('span#maxscore').innerHTML = maxScore;
}