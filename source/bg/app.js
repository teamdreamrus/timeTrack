import { Timer } from './timer';
import * as Utils from '../utils';
import { DEFAULT_LANG } from '../constants';
import { getStorageData } from '../utils';

let banList = {};
// chrome.storage.local.set({ inLastHour: [] });
// chrome.storage.local.set({ data: [] });

//visits (history)

Utils.getStorageData('banList')
  .then((res) => {
    if (res.banList.status) {
      Utils.setStorageData({
        banList: {
          status: false,
          list: res.banList.list,
        },
      });
    }
  })
  .catch((err) => console.log(err));

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
    // console.log(key, historyDataArray);
  });
  const sortByCounts = (arr) => {
    arr.sort((a, b) => (a.visitCount + a.typedCount > b.visitCount + b.typedCount ? -1 : 1));
  };
};

//setInterval
setInterval(reloadAllHistory, 10000);
reloadAllHistory();

//
let blacklist = ['', 'settings', 'newtab', 'devtools', 'extensions'];
let allData = [];
let previousHostname = '';
let timer = new Timer();

const refreshFromStorage = () => {
  chrome.storage.local.get(['data'], function (result) {
    if (result.data.length > 0) {
      // console.log(result.data);
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
        if (banList.status) {
          banList.list.forEach((el) => {
            if (tab[0].url.includes(el)) {
              console.log('openPage');
              chrome.tabs.update(tab.id, { url: 'banPage.html' });
            }
          });
        }

        let hostname = new URL(tab[0].url).hostname;
        if (!hostname) {
          // console.log('hostname is empty url ' + new URL(tab[0].url));
          return;
        }
        if (previousHostname !== hostname) {
          let foundIndex = allData.findIndex((el) => el.hostname === previousHostname);
          timer.stop();
          if (timer.timeStart) {
            if (foundIndex > -1) {
              // add to count
              // console.log(allData[foundIndex]);
              allData[foundIndex].nodes.push({
                timeStart: timer.timeStart,
                timeStop: timer.timeStop,
                count: timer.timeStop - timer.timeStart,
              });
            } else {
              allData.push({
                hostname: previousHostname,
                nodes: [
                  {
                    timeStart: timer.timeStart,
                    timeStop: timer.timeStop,
                    count: timer.timeStop - timer.timeStart,
                  },
                ],
              });
              // add new
            }
          }
          timer.start();
          previousHostname = hostname;
        }
      }
    },
  );
};
const sortByCount = (arr) => {
  arr.sort((a, b) => (a.count > b.count ? -1 : 1));
};

setInterval(() => {
  // sortByCount(allData);
  // console.log('trySave');
  // console.log(allData);
  allData = allData.filter((el) => {
    return !blacklist.includes(el.hostname);
  });
  Utils.setToStorageData(allData);
  splitSave(allData);
}, 5000);

const transformation = (time, allData) => {
  return allData
    .map((unit) => {
      return {
        hostname: unit.hostname,
        nodes: unit.nodes
          .filter((el) => {
            return el.timeStop >= time;
          })
          .map((el) => {
            if (el.timeStart <= time) return el;
            else return { timeStart: time, timeStop: el.timeStop, count: el.count };
          }),
      };
    })
    .filter((unit) => unit.nodes.length >= 1)
    .sort((a, b) =>
      a.nodes.reduce((summ, current) => summ + current.count, 0) >
      b.nodes.reduce((summ, current) => summ + current.count, 0)
        ? -1
        : 1,
    );
};
async function splitSave(allData) {
  let inLast24Hours = new Date() - 1000 * 60 * 60 * 24;
  let inLast12Hours = new Date() - 1000 * 60 * 60 * 12;
  let inLast8Hours = new Date() - 1000 * 60 * 60 * 8;
  let inLast4Hours = new Date() - 1000 * 60 * 60 * 4;
  let inLastHour = new Date() - 1000 * 60 * 60;
  Utils.setStorageData({ inLast24Hours: transformation(inLast24Hours, allData) });
  Utils.setStorageData({ inLast12Hours: transformation(inLast12Hours, allData) });
  Utils.setStorageData({ inLast8Hours: transformation(inLast8Hours, allData) });
  Utils.setStorageData({ inLast4Hours: transformation(inLast4Hours, allData) });
  Utils.setStorageData({ inLastHour: transformation(inLastHour, allData) });
}

// setInterval(() => {
//   log()
//     .then((r) => console.log(r))
//     .catch((err) => console.log(err));
// }, 7000);
// async function log() {
//   const result = await Utils.getStorageData('inLastHour');
//   // console.log('last ', result);
// }

//work mode
// Utils.setStorageData({
//   banList: {
//     status: false,
//     list: [],
//   },
// });

chrome.tabs.onUpdated.addListener(getCurrentTab);
chrome.tabs.onActivated.addListener(getCurrentTab);

chrome.contextMenus.removeAll();
chrome.contextMenus.create({
  title: 'add this page to ban list',
  contexts: ['page'],
  onclick: function () {
    // add to ban list
  },
});
// chrome.storage.onChanged.addListener()
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (changes.banList) {
    banList = changes.banList.newValue;
    console.log(banList);
  }
  if (changes.lang) {
    fetch(`../_locales/${changes.lang.newValue}/messages.json`, { mode: 'no-cors' })
      .then((response) => response.json())
      .then((data) => Utils.setStorageData({ locales: data }))
      .catch((error) => console.log(error));
  }
});
// fetch(`../_locales/ru/messages.json`, { mode: 'no-cors' })
//   .then((response) => response.json())
//   .then((data) => Utils.setStorageData({ locales: data }))
//   .catch((error) => console.log(error));

//locales
Utils.setStorageData({ lang: DEFAULT_LANG });
let fetchUrl = `../_locales/${DEFAULT_LANG.code}/messages.json`;
fetch(fetchUrl, { mode: 'no-cors' })
  .then((response) => response.json())
  .then((data) => {
    Utils.setStorageData({ locales: data });
    console.log(data);
  })
  .catch((error) => console.error(error));

// setTimeout(() => {
//   getLoc();
// }, 3000);
// async function getLoc() {
//   Utils.getLocales('popup').then((res) => console.log(res));
// }
