# WARNING
**2018/7/9 - Memory leak found in logic. Fix has yet to be implemented.**
# Installation
```bash
npm i --save https://github.com/d4rkwizo/novaro-scraper.git
```
# Example
```js
const NovaroScraper = require('novaro-scraper');

NovaroScraper.getTableData('2162', 'LIVE', (tableData, iconURL, itemName) => {
  console.log(tableData);
  console.log(iconURL);
  console.log(itemName);
});

// [ [ 'Price ▲', 'Refine', 'Additional Properties', 'Location' ],
//   [ '20,000,000z', '+0', 'None', 'newvending,135,142' ],
//   [ '30,000,000z', '+0', 'INT +1', 'einbroch,221,189' ],
//   [ '30,000,000z', '+0', 'INT +1', 'einbroch,221,189' ] ]
// 'https://www.novaragnarok.com/data/items/icons2/2162.png'
// 'Bible of Promise(2nd Vol.) [1]'

let message = NovaroScraper.toMarkdown(tableData, 'LIVE');
console.log(message);

// { title: 'Live Market Data',
//   data: '```\nPrice ▲ | Refine | Additional Properties | Location | \n30,000,000z | +0 | INT +1 | einbroch,221,189 | \n30,000,000z | +0 | INT +1 | einbroch,221,189 | \n```' }
```
# Documentation
```jsdoc
/*
 * Types of tableURL.
 * @enum {string}
 */
const tableURL = {
 LIVE: 'https://www.novaragnarok.com/?module=vending&action=item&id=',
 HISTORY: 'https://www.novaragnarok.com/?module=vending&action=itemhistory&id=',
};

/*
 * @callback getTableDataCallback
 * @param {string[][]} tableData - 2D array with format [row][cell].
 * @param {string} iconURL - URL of the icon of the item that was looked up.
 * @param {string} itemName - Name of the item that was looked up.
 */

/*
 * Gets data from table. Callback receives a 2D array with format [row][cell].
 * @async
 * @param {string} itemId - The ID of the item to be looked up.
 * @param {tableURL} tableType - One of the enumeration values.
 * @param {getTableDataCallback} callback - The callback that handles the response.
 */
getTableData(itemId, tableType, callback(tableData, iconURL, itemName))

/*
 * Sets 'title' depending on 'tableType'. Builds a string with Markdown format from 'tableData'.
 * @param {string[][]} tableData - Table data in the format of a 2D array [row][cell].
 * @param {tableURL} tableType - One of the enumeration values.
 * @return {{title: string, data: string}}
 */
toMarkdown(tableData, tableType)
```
# FAQ
**How to get item ID?**
- Use [this](http://ratemyserver.net/index.php?page=re_item_db).
- **Make sure** *Renewal* is checked.  

- ![](renewal.png)
