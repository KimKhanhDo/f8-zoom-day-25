const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const table = $('.data-table');
const selectedCount = $('.selected-count');
const mainCheckbox = $('#main-checkbox');
const checkboxCells = $$('.js-checkbox');
const rowCheckboxes = Array.from(checkboxCells).filter(
    (cb) => cb !== mainCheckbox
);

table.addEventListener('change', (e) => {
    handleTableActions(e);
});

function handleTableActions(e) {
    const mainBox = e.target.closest('#main-checkbox');
    const rowBox = e.target.closest('.js-checkbox');

    if (mainBox) {
        const isChecked = mainCheckbox.checked;

        // set checked for row-checkbox only
        rowCheckboxes.forEach((checkbox) => (checkbox.checked = isChecked));
        updateMainCheckboxState();
        return;
    }

    // apply logic for row-checkbox only, exclude main-checkbox
    if (rowBox && rowBox !== mainCheckbox) {
        updateMainCheckboxState();
    }
}

function updateSelectedCount(value) {
    selectedCount.innerText = `${value} selected`;
}

function totalChecked() {
    return rowCheckboxes.reduce((total, cb) => total + (cb.checked ? 1 : 0), 0);
}

// Update state of main-checkbox (tick or indeterminate)
function updateMainCheckboxState() {
    const mainCheckmark = mainCheckbox.nextElementSibling;
    const checkedCountByRows = totalChecked();

    if (checkedCountByRows === 0) {
        mainCheckbox.checked = false;
        mainCheckmark.classList.remove('indeterminate');
    } else if (checkedCountByRows === rowCheckboxes.length) {
        mainCheckbox.checked = true;
        mainCheckmark.classList.remove('indeterminate');
    } else {
        mainCheckbox.checked = false;
        mainCheckmark.classList.add('indeterminate');
    }

    updateSelectedCount(checkedCountByRows);
}
