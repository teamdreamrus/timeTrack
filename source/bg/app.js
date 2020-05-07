import { Timer } from './timer';
import * as Utils from '../utils';

const reloadAllHistory = () => {
  let date30DaysAgoInMilliseconds = new Date() - 1000 * 60 * 60 * 24 * 30;
  let date7DaysAgoInMilliseconds = new Date() - 1000 * 60 * 60 * 24 * 7;
  let date24HoursAgoInMilliseconds = new Date() - 1000 * 60 * 60 * 24;
  let date1HourAgoInMilliseconds = new Date() - 1000 * 60 * 60;
  loadHistory(date30DaysAgoInMilliseconds, 'date30days');
  loadHistory(date7DaysAgoInMilliseconds, 'date7days');
  loadHistory(date24HoursAgoInMilliseconds, 'date24hours');
  loadHistory(date1HourAgoInMilliseconds, 'date1hour');
};
const loadHistory = (startTime, key) => {
  let historyData = {};
  let maxNumToResults = 100000000;
  chrome.history.search({ text: '', startTime: startTime, maxResults: maxNumToResults }, function (
    data,
  ) {
    data.forEach((el) => {
      let hostname = new URL(el.url).hostname;
      if (historyData[hostname]) {
        historyData[hostname].visitCount += el.visitCount;
        historyData[hostname].typedCount += el.typedCount;
        historyData[hostname].nodes.push(el);
      } else {
        historyData[hostname] = {
          visitCount: el.visitCount,
          typedCount: el.typedCount,
          nodes: [el],
        };
      }
    });
    let historyDataArray = [];
    for (let key in historyData) {
      let newObject = historyData[key];
      newObject.hostname = key;
      historyDataArray.push(newObject);
    }
    sortByCounts(historyDataArray);
    let item = {};
    item[key] = historyDataArray;
    Utils.setStorageData(item);
    console.log(key, historyDataArray);
  });
  const sortByCounts = (arr) => {
    arr.sort((a, b) => (a.visitCount + a.typedCount > b.visitCount + b.typedCount ? -1 : 1));
  };
};

reloadAllHistory();

let blacklist = ['', 'settings', 'newtab', 'devtools', 'extensions'];
let allData = [];
let previousHostname = '';
let timer = new Timer();

const refreshFromStorage = () => {
  chrome.storage.local.get(['data'], function (result) {
    if (result.data.length > 0) {
      console.log(result.data);
      allData = result.data.filter((el) => !blacklist.includes(el.hostname));
    } else allData = [];
  });
};
refreshFromStorage();
const getCurrentTab = () => {
  chrome.tabs.query(
    {
      currentWindow: true,
      active: true,
    },
    (tab) => {
      if (tab[0] && tab[0].url) {
        let hostname = new URL(tab[0].url).hostname;
        if (!hostname) {
          console.log('hostname is empty url ' + new URL(tab[0].url));
          return;
        }
        let foundIndex = allData.findIndex((el) => el.hostname === previousHostname);
        if (foundIndex > -1) {
          // add to count
          console.log(allData[foundIndex]);
          allData[foundIndex].nodes.push({ timeStart: timer.timeStart, count: timer.counter });
        } else {
          allData.push({
            hostname: previousHostname,
            nodes: [{ timeStart: timer.timeStart, count: timer.counter }],
          });
          // add new
        }

        timer.drop();
        timer.start();
        previousHostname = hostname;
      }
    },
  );
};
const sortByCount = (arr) => {
  arr.sort((a, b) => (a.count > b.count ? -1 : 1));
};

setInterval(() => {
  // sortByCount(allData);
  console.log('trySave');
  console.log(allData);
  Utils.setToStorageData(
    allData.filter((el) => {
      return !blacklist.includes(el.hostname);
    }),
  );
}, 3000);

chrome.tabs.onUpdated.addListener(getCurrentTab);
chrome.tabs.onActivated.addListener(getCurrentTab);
