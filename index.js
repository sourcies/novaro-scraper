const puppeteer = require('puppeteer');

/*
 * Types of tableURL.
 * @enum {string}
 */
const tableURL = {
  LIVE: 'https://www.novaragnarok.com/?module=vending&action=item&id=',
  HISTORY: 'https://www.novaragnarok.com/?module=vending&action=itemhistory&id=',
};

/*
 * Get data from table. Returns a 2D array with format [row][cell].
 * @param {string} itemId - The ID of the item to be looked up.
 * @param {tableURL} url - One of the enumeration values.
 * @returns {!Array<string><string>}
 */
const getTableData = async (itemId, url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url+itemId);

  let tableData = await page.evaluate(() => {
    let tableRows = $('table.horizontal-table')[1].rows;
    let tableArr = [];

    for (let row of tableRows) {
      let price = row.cells[0].innerText;
      let refine = row.cells[1].innerText;
      let additionalProp = row.cells[2].innerText;
      let location = row.cells[3].innerText;
      let rowArr = [price, refine, additionalProp, location];

      tableArr.push(rowArr);
    }
    return tableArr;
  });
  return tableData;
};

const init = async () => {
  // get live market data
  console.log(await getTableData('2162', tableURL.LIVE));

  // get transaction history
  console.log(await getTableData('2162', tableURL.HISTORY));
};

init();
