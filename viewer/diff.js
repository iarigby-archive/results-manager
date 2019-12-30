function addDiff(diffString) {
    var diffHtml = Diff2Html.getPrettyHtml(
        diffString,
        {inputFormat: 'diff', showFiles: true, matching: 'lines', outputFormat: 'side-by-side'}
      );
      document.getElementById('diffElement').innerHTML = diffHtml;
}

