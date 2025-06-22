const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let activeBlock = null;

initializeApp();

function initializeApp() {
    const tabBlocks = $$('.tab-block');

    tabBlocks.forEach((block) => {
        const tabs = block.querySelector('.tabs');
        const { tabItems, tabPanels } = getTabsData(block);

        if (tabItems.length && tabPanels.length) {
            tabItems.forEach((tab, index) => (tab.dataset.index = index));
            tabPanels.forEach((tab, index) => (tab.dataset.index = index));

            let defaultIndex = Array.from(tabItems).findIndex((tab) =>
                tab.classList.contains('active')
            );

            if (defaultIndex === -1) defaultIndex = 0;

            updateTabs(block, defaultIndex);

            tabs.addEventListener('click', handleClickAction);
            document.addEventListener('keydown', handleKeyDown);
        }
    });
}

function getTabsData(block) {
    return {
        tabItems: block.querySelectorAll('.tab-item'),
        tabPanels: block.querySelectorAll('.tab-panel'),
    };
}

function handleKeyDown(e) {
    if (!activeBlock) return;

    const { tabItems } = getTabsData(activeBlock);
    const keyNumber = +(e.key - 1);

    if (
        Number.isNaN(keyNumber) ||
        keyNumber < 0 ||
        keyNumber >= tabItems.length
    )
        return;

    updateTabs(activeBlock, keyNumber);
}

function handleClickAction(e) {
    const tabItem = e.target.closest('.tab-item');

    // use "?."" to check if tabItem null -> error runtime & never reach "if (!tabItem || !block) return"
    const block = tabItem?.closest('.tab-block');
    if (!tabItem || !block) return;

    const index = +tabItem.dataset.index;
    updateTabs(block, index);
    // Confirm this is current active block
    activeBlock = block;
}

function updateTabs(block, index) {
    const { tabItems, tabPanels } = getTabsData(block);

    tabItems.forEach((tab) => tab.classList.remove('active'));
    tabPanels.forEach((panel) => panel.classList.remove('active'));

    tabItems[index].classList.add('active');
    tabPanels[index].classList.add('active');
}
