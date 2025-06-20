const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $('#tabs');
const tabItems = $$('.tab-item');
const tabPanels = $$('.tab-panel');

initializeApp();

function initializeApp() {
    if (tabItems.length && tabPanels.length) {
        tabItems.forEach((tab, index) => (tab.dataset.index = index));
        tabPanels.forEach((tab, index) => (tab.dataset.index = index));

        tabItems[0].classList.add('active');
        tabPanels[0].classList.add('active');

        tabs.addEventListener('click', handleClickAction);
        document.addEventListener('keydown', handleKeyDown);
    }
}

function handleKeyDown(e) {
    const keyNumber = +(e.key - 1);

    if (
        Number.isNaN(keyNumber) ||
        keyNumber < 0 ||
        keyNumber >= tabItems.length
    )
        return;

    resetAndUpdateNewTabs(keyNumber);
}

function handleClickAction(e) {
    const tabItem = e.target.closest('.tab-item');
    if (!tabItem) return;

    const index = +tabItem.dataset.index;

    resetAndUpdateNewTabs(index);
}

function resetTabsAndPanels() {
    tabItems.forEach((tab) => tab.classList.remove('active'));
    tabPanels.forEach((tab) => tab.classList.remove('active'));
}

function activateTab(index) {
    const tabPanel = $(`.tab-panel[data-index="${index}"]`);

    if (!tabItems[index] || !tabPanel) return;

    tabItems[index].classList.add('active');
    tabPanel.classList.add('active');
}

function resetAndUpdateNewTabs(index) {
    resetTabsAndPanels();
    activateTab(index);
}
