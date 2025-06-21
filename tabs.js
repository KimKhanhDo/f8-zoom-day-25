const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let activeBlock = null;

initializeApp();

function initializeApp() {
    const tabBlocks = $$('.tab-block');

    tabBlocks.forEach((block) => {
        const tabs = block.querySelector('.tabs');
        const tabItems = block.querySelectorAll('.tab-item');
        const tabPanels = block.querySelectorAll('.tab-panel');

        if (tabItems.length && tabPanels.length) {
            tabItems.forEach((tab, index) => (tab.dataset.index = index));
            tabPanels.forEach((tab, index) => (tab.dataset.index = index));

            let defaultIndex = Array.from(tabItems).findIndex((tab) =>
                tab.classList.contains('active')
            );

            if (defaultIndex === -1) defaultIndex = 0;

            resetAndUpdateTabs(tabItems, tabPanels, defaultIndex);

            tabs.addEventListener('click', handleClickAction);
            document.addEventListener('keydown', handleKeyDown);
        }
    });
}

function handleClickAction(e) {
    const tabItem = e.target.closest('.tab-item');
    const block = tabItem.closest('.tab-block');
    if (!tabItem || !block) return;

    const tabItems = block.querySelectorAll('.tab-item');
    const tabPanels = block.querySelectorAll('.tab-panel');
    const index = +tabItem.dataset.index;

    resetAndUpdateTabs(tabItems, tabPanels, index);

    // Confirm this is current active block
    activeBlock = block;
}

function handleKeyDown(e) {
    if (!activeBlock) return;

    const tabItems = activeBlock.querySelectorAll('.tab-item');
    const tabPanels = activeBlock.querySelectorAll('.tab-panel');

    const keyNumber = +(e.key - 1);

    if (
        Number.isNaN(keyNumber) ||
        keyNumber < 0 ||
        keyNumber >= tabItems.length
    )
        return;

    resetAndUpdateTabs(tabItems, tabPanels, keyNumber);
}

function resetAndUpdateTabs(tabItems, tabPanels, index) {
    tabItems.forEach((tab) => tab.classList.remove('active'));
    tabPanels.forEach((panel) => panel.classList.remove('active'));

    tabItems[index].classList.add('active');
    tabPanels[index].classList.add('active');
}
