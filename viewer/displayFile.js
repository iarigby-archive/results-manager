const displayFile = function(file) {
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

