// console.log('main');
/* eslint-disable */

import {Timer} from './timer';
import * as Utils from '../utils';


// chrome.storage.local.set({'data': []});
let blacklist = ['', 'settings', 'newtab', 'devtools', 'extensions'];
let allData = [];
let previousHostname = '';
let timer = new Timer();
// let data = JSON.parse(Utils.getStorageData('data')) | [];
// let obj = [{hostname: 'vk.com', count: 100},{hostname: 'www.youtube.com', count: 50}];
// obj example:   {hostname: 'vk.com', count: 100}


const refreshFromStorage = () => {
    chrome.storage.local.get(['data'], function (result) {
        if (result.data.length > 0) {
            console.log(result.data);
            allData = result.data.filter(el => !blacklist.includes(el.hostname));

        } else allData = [];
    });
};

// const getCurrentTab = () => {
//     // console.log(Utils.getStorageData());
//     chrome.tabs.query({
//         currentWindow: true,
//         active: true
//     }, (tab) => {
//         if (tab[0].url) {
//             let hostname = new URL(tab[0].url).hostname;
//             if (!blacklist.includes(hostname)) {
//                 if (hostname !== previousHostname) {
//                     //save
//                     //  chrome.storage.local get/set
//                     let foundIndex = allData.findIndex((el) => el.hostname === previousHostname);
//                     if (timer.detector) {
//                         if (foundIndex > -1) {
//                             allData[foundIndex].count = allData[foundIndex].count + timer.getSeconds();
//                             console.log(`change ${previousHostname} :${allData[foundIndex].count} +  ${timer.getSeconds()} = ${allData[foundIndex].count}`);
//                         } else {
//                             allData.push({hostname: previousHostname, count: timer.getSeconds()});
//                             console.log(`new: ${previousHostname} : ${timer.getSeconds()}`);
//                         }
//                         timer.drop();
//                     }
//                     // console.log(allData);
//                     timer.start();
//                     previousHostname = hostname;
//
//                 } else {
//                 }
//             }
//         }
//     });
// };
const getCurrentTab = () => {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, (tab) => {
        if(tab[0] && tab[0].url) {
            let hostname = new URL(tab[0].url).hostname;
            if(hostname===''){
                console.log('hostname is empty url '+ new URL(tab[0].url));
            }
            let foundIndex = allData.findIndex((el) => el.hostname === previousHostname);
            if (foundIndex > -1) {
                // add to count
                allData[foundIndex].count = allData[foundIndex].count + timer.counter;
            } else {
                allData.push({hostname: previousHostname, count: timer.counter})
                // add new
            }
            timer.drop();
            timer.start();
            previousHostname = hostname;
        }
    });

};
const sortByCount = (arr) => {
    arr.sort((a, b) => a.count > b.count ? 1 : -1);
};

refreshFromStorage();
// setInterval(() => {refreshFromStorage()}, 10000)
setInterval(() => {
    sortByCount(allData);
    Utils.setToStorageData(allData.filter(el => {
       return (blacklist.includes(el.hostname) || el.count !== 0 || el.count !== undefined);
    }));
}, 3000);
chrome.tabs.onUpdated.addListener(getCurrentTab);
chrome.tabs.onActivated.addListener(getCurrentTab);

// setInterval(() => {Utils.setToStorageData(allData)}, 10000)
//
// setInterval(Utils. ('data'),5000);


//
// let lastUrl='';
// let times=[];
// let urls=[];
// let prevTime=0;
// let timeStart=0;
// check=()=>{
//     chrome.tabs.query({active: true,lastFocusedWindow: true,currentWindow: true},(tabs)=>{
//         if(tabs.length>0){
//             //   console.log(tabs[0].url);
//             let url=tabs[0].url;
//             if(lastUrl!==url){
//                 while(true){
//                     let index = urls.indexOf(url,0);
//                     if(index<0) {
//                         times.push(new Date() - timeStart);
//                         urls.push(lastUrl);
//                         timeStart = new Date();
//                         lastUrl=url;
//                         break;
//                     }else
//                         times[index]+=new Date() - timeStart;
//                     break;
//                 }
//
//             }
//         };
//     });
//
// }
// setInterval(check,500);
//
// print=()=>{
//     if(urls[0]==='')
//         times[0]=0;
//     console.table(times);
//     console.table(urls);
// };
//
// setInterval(print,5000);
/* eslint-enable */