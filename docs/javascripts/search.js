/**
 * Search functionalities for keymap.
 * @param {HTMLElement} container container element
 */

function setupKeymapSearch(container) {
    var searchBox = container.querySelector('input[name="search"]');
    if (!searchBox) {
        console.log("Cannot find searchbox, aborting");
        return;
    }
    // if the searchBox isn't in the table, move it
    var searchForm = searchBox.parentElement;
    if (searchForm) {
        if (!searchForm.parentElement.classList.contains("md-typeset__table")) {
            var tableWrap = container.querySelector(".md-typeset__table");
            if (tableWrap) {
                searchForm.parentElement.removeChild(searchForm);
                tableWrap.prepend(searchForm);
            }
        }
        searchForm.classList.remove("hidden");
    }
    // workaround for the whole PWA thing
    var tableRows = container.querySelectorAll("tbody tr");
    var contentIndex = [], rowIndex = [];
    Array.prototype.forEach.call(tableRows, function(row) {
        var termElements = row.querySelectorAll("*[data-terms]");
        var term = Array.prototype.reduce.call(termElements, function(result, el) { return result + " " + el.dataset.terms }, "");
        contentIndex.push(term); rowIndex.push(row);
    });
    function wrapWade(fn) {
        var defaultStopWords = Wade.config.stopWords;
        Wade.config.stopWords = [];
        var result = fn();
        Wade.config.stopWords = defaultStopWords;
        return result;
    }
    var search = wrapWade(function() { return Wade(contentIndex); });

    var noResultRow;
    function filterRows() {
        var result = wrapWade(function() { return search(searchBox.value); });
        var resultSet = result.reduce(function(set, result) { set[result.index] = true; return set; }, {});
        rowIndex.forEach(function(row, i) { row.style.display = searchBox.value.length === 0 || resultSet[i] ? "table-row" : "none"; });
        if (result.length === 0 && searchBox.value.length > 0) {
            if (!noResultRow) {
                var noResultTd = document.createElement("td");
                noResultTd.textContent = "No results.";
                noResultTd.style.textAlign = "center";
                noResultTd.colSpan = "2";
                noResultRow = document.createElement("tr");
                noResultRow.style.display = "none";
                noResultRow.appendChild(noResultTd);
                container.querySelector("tbody").appendChild(noResultRow);
            }
            noResultRow.style.display = "table-row";
        } else {
            if (noResultRow) noResultRow.style.display = "none";
        }
    }
    var debounceTimer;
    searchBox.addEventListener("input", function() {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
            debounceTimer = null;
        }
        debounceTimer = setTimeout(filterRows, 500);
    });
}
