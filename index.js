const request = require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const tableURL = {
  LIVE: 'https://www.novaragnarok.com/?module=vending&action=item&id=',
  HISTORY: 'https://www.novaragnarok.com/?module=vending&action=itemhistory&id=',
};

const getTableData = (itemId, tableType, callback) => {
  let url = '';
  let iconURL = '';
  let itemName = '';

  if (tableType === 'LIVE') url = tableURL.LIVE;
  else if (tableType === 'HISTORY') url = tableURL.HISTORY;
  else {
    console.log(`Error: Invalid value in 'tableType'. Raised from asdf/2.`);
    return;
  }

  let options = {
    url: url+itemId,
    method: 'GET'
  };

  request(options, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const dom = new JSDOM(body);

      if (dom.window.document.getElementById('itemtable') !== undefined) {
        let tableRows = dom.window.document.getElementById('itemtable').rows;
        let normalizedTable = [];

        for (let row of tableRows) {
          let arrOfCells = [];
          for (let cell of row.cells) {
            arrOfCells.push(cell.textContent.replace(/\\n|\\t|\s/g, ''));
          }
          normalizedTable.push(arrOfCells);
        }

        iconURL = dom.window.document.getElementById('market-item-name').children[0].src;
        itemName = dom.window.document.getElementById('market-item-name').children[1].textContent;

        callback(normalizedTable, iconURL, itemName);
      }
    }
  })

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
