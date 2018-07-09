const puppeteer = require('puppeteer');

const tableURL = {
  LIVE: 'https://www.novaragnarok.com/?module=vending&action=item&id=',
  HISTORY: 'https://www.novaragnarok.com/?module=vending&action=itemhistory&id=',
};

const getTableData = async (itemId, tableType, callback) => {
    let endpoint = '';
    let iconURL = '';
    let itemName = '';

    if (tableType === 'LIVE') endpoint = tableURL.LIVE;
    else if (tableType === 'HISTORY') endpoint = tableURL.HISTORY;
    else {
      console.log(`Error: Invalid value in 'tableType'. Raised from getTableData/2.`);
      return;
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(endpoint+itemId);

    page.on('console', msg => {
      console.log(msg.args());
    });

    await page.evaluate(() => {
      let tableRows = $('table.horizontal-table')[1].rows;
      let normalizedTable = [];

      for (let row of tableRows) {
        let arrOfCells = [];
        for (let cell of row.cells) {
          arrOfCells.push(cell.innerText);
        }
        normalizedTable.push(arrOfCells);
      }

      iconURL = $('a')[21].parentElement.previousElementSibling.src;
      itemName = $('a')[21].innerText;

      return {
        normalizedTable,
        iconURL,
        itemName
      };
    })
    .then((evalData) => {
      // console.log(evalData);
      callback(evalData.normalizedTable, evalData.iconURL, evalData.itemName);
    })
    .catch((err) => {
      console.log('Error: Failed to evaluate page. Raised from getTableData/2.');
      console.log(err);
    });

    await browser.close();
};

const toMarkdown = (tableData, tableType) => {
  let title = '';

  if (tableType === 'LIVE') title = 'Live Market Data';
  else if (tableType === 'HISTORY') title = 'Transaction History';
  else {
    console.log(`Error: Invalid value in 'tableType'. Raised from toMarkdown/2.`);
    return;
  }

  let data = '```\n';
  for (let row of tableData) {
    for (let cell of row) {
      data = data + cell + ' | ';
    }
    data = data + '\n';
  }
  data = data + '```';
  data.replace('| \n', '\n');
  return {
    title,
    data
  };
};

module.exports = {
  getTableData,
  toMarkdown
};
