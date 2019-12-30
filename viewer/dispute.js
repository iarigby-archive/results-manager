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

}