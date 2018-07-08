# Install the dependency
```
npm i --save https://github.com/d4rkwizo/novaro-scraper.git
```
# Usage example
```
const NovaroScraper = require('novaro-scraper');

NovaroScraper.getTableData('2162', 'LIVE');

// [ [ 'Price ▲', 'Refine', 'Additional Properties', 'Location' ],
//   [ '20,000,000z', '+0', 'None', 'newvending,135,142' ],
//   [ '30,000,000z', '+0', 'INT +1', 'einbroch,221,189' ],
//   [ '30,000,000z', '+0', 'INT +1', 'einbroch,221,189' ] ]

NovaroScraper.getTableData('2162', 'HISTORY');

// [ [ 'Date Sold ▼', 'Price', 'Refine', 'Additional Properties' ],
//   [ '07/7/18 - 18:38', '20,000,000z', '+0', 'None' ],
//   [ '07/7/18 - 09:19', '19,500,000z', '+0', 'None' ],
//   [ '07/7/18 - 08:24', '18,000,000z', '+0', 'None' ],
//   [ '07/7/18 - 08:18', '18,000,000z', '+0', 'None' ],
//   [ '07/7/18 - 05:54', '18,000,000z', '+0', 'None' ],
//   [ '07/7/18 - 03:17', '20,000,000z', '+4', 'STR +1, DEF +3' ],
//   [ '07/6/18 - 18:55', '17,500,000z', '+0', 'None' ],
//   [ '07/6/18 - 04:11', '19,500,000z', '+0', 'None' ],
//   [ '07/5/18 - 11:13', '19,999,999z', '+0', 'None' ],
//   [ '07/5/18 - 06:39', '20,000,000z', '+0', 'None' ],
//   [ '07/4/18 - 16:16', '19,000,000z', '+0', 'None' ] ]
```
# Documentation
```
/*
 * Get data from table. Returns a 2D array with format [row][cell].
 * @param {string} itemId - The ID of the item to be looked up.
 * @param {tableURL} url - One of the enumeration values.
 * @returns {!Array<string><string>}
 */
 getTableData(itemId, url)

 /*
  * Types of tableURL.
  * @enum {string}
  */
 const tableURL = {
   LIVE: 'https://www.novaragnarok.com/?module=vending&action=item&id=',
   HISTORY: 'https://www.novaragnarok.com/?module=vending&action=itemhistory&id=',
 };
 ```
