const main = function() {
    const studentId = getId()
    updateData(studentId)
        .then(updateDisputes)
}

document.addEventListener("DOMContentLoaded", main)