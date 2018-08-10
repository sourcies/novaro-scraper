const NovaroScraper = require('novaro-scraper');

NovaroScraper.getTableData('2162', 'LIVE', (tableData, iconURL, itemName) => {
  console.log(tableData);
  console.log(iconURL);
  console.log(itemName);

  let message = NovaroScraper.toMarkdown(tableData, 'LIVE');
  console.log(message);
});
