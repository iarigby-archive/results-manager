const backend = 'http://localhost:3000'

const getId = function() {
    const path = window.location.href.toString()
    return path.substring(path.indexOf('?id=') + 4, path.length)   
}

const studentId = getId()function addDiff(diffString) {
    var diffHtml = Diff2Html.getPrettyHtml(
        diffString,
        {inputFormat: 'diff', showFiles: true, matching: 'lines', outputFormat: 'side-by-side'}
      );
      document.getElementById('diffElement').innerHTML = diffHtml;
}

const url = `${backend}/midterms/4/disputes`

const disputeRequest = function(path) {
    const subPath = path || ''
    const fullUrl = `${url}/${studentId}/${subPath}`
    return fetch(fullUrl)
        .then(response => response.json())
        .then(res => res.disputes.filter(e => e.status == 'unresolved'))
        .catch(err => console.log(err))
}

const updateDisputes = async function() {
    const disputes = await disputeRequest()
    addDisputeElement(disputes)
}

const addDisputeElement = function(disputes) {
    const elem = (disputes.length == 0) ?
        'თქვენ გასაჩივრებები არ გაქვთ' :
        disputes.map(dispute =>
            `<div class="dispute">
            ${dispute.info}
            <button onclick=resolveDispute(${dispute.id})>დახურვა</button>
        </div>`).join('\n')
    document.getElementById('disputes').innerHTML = elem
}
const resolveDispute = function(id) {
    disputeRequest(`resolve/${id}`)
        .then(addDisputeElement)
}

const disputeInput = (type) =>
    `<div>
    გთხოვთ დასაწყისში მიუთითოთ ხაზის ნომრები, რომელსაც გულისხმობთ 
    <div class="container"><textarea id="dispute"></textarea>
    <button onclick=sendDispute('${type}')>გაგზავნა</button>
    </div></div>`

const disputeCorrectness = () => dispute('Correctness')

const disputeSolution = () => dispute('Solution')

const clearElements = () => {
    [`Solution`, `Correctness`].forEach(type =>
        document.getElementById(`dispute${type}`).innerHTML = ''
    )
}
const dispute = function(type) {
        clearElements()
        document.getElementById(`dispute${type}`).innerHTML = disputeInput(type)
    }
    // in admin panel: request confirmation button
const sendDispute = function(type) {
    const info = document.querySelector('textarea').value
    if (info.length > 0)
        postData(`${url}/${studentId}/new`, { info: info, type: type })
        .then(res => res.disputes.filter(e => e.status == 'unresolved'))
        .then(elem => addDisputeElement(elem))
        .then(clearElements)
        .catch(err => console.log(err))

}async function postData(url = '', data = {}) {
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
}const displayFile = function(file) {
    const lines = file.split('\n')
    return `
    <div class="d2h-code-wrapper">
        <table class="d2h-diff-table">
            <tbody class="d2h-diff-tbody">
            ${lines.map((line, number) =>
                `<tr>
                <td class="d2h-code-side-linenumber d2h-cntx">
                  ${number}
                </td>
                <td class="d2h-cntx">
                    <div class="d2h-code-side-line d2h-cntx">
                        <span class="d2h-code-line-prefix">&nbsp;</span>
                        <span class="d2h-code-line-ctn">${line}
                    </div>
                </td>
                </tr>             `
                )}
            </tbody>
        </table>
    </div>
`
}

