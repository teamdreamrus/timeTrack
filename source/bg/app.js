// console.log('main');
/* eslint-disable */

import {Timer} from './timer';
import * as Utils from '../utils';


let allData = [];
let previousHostname = '';
let timer = new Timer();
// let data = JSON.parse(Utils.getStorageData('data')) | [];
// let obj = [{hostname: 'vk.com', count: 100},{hostname: 'www.youtube.com', count: 50}];
// obj example:   {hostname: 'vk.com', count: 100}


const refreshFromStorage = () => {
    chrome.storage.local.get(['data'], function(result) {
        if(result.data.length > 0){
             console.log(result.data);
            allData = result.data;
        } else allData = [];
    });
};


const getCurrentTab = () => {
    // console.log(Utils.getStorageData());
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, (tab) => {
        if (tab[0].url) {
            let hostname = new URL(tab[0].url).hostname;
            if (hostname !== previousHostname) {
                //save
                //  chrome.storage.local get/set
                let foundIndex = allData.findIndex((el) =>  el.hostname===previousHostname);
                if(foundIndex > -1) {
                    allData[foundIndex].count = allData[foundIndex].count + timer.getSeconds();
                } else {
                    allData.push({hostname: previousHostname, count: timer.getSeconds()});
                }

                if (timer.detector) {
                    timer.drop();
                }
                timer.start();
                previousHostname = hostname;

            } else {}
        }
    });
};

refreshFromStorage();
setInterval(() => {refreshFromStorage()}, 10000)
setInterval(() => {Utils.setToStorageData(allData)}, 3000)
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