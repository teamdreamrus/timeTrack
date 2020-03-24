// console.log('main');
// // eslint-disable-next-line no-unused-expressions
import {Timer} from './timer';

let allData;
let previousHostname = '';
let timer = new Timer();
const getCurrentTab = () => {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, (tab) => {
        if (tab[0].url) {
            let hostname = new URL(tab[0].url).hostname;
            if (hostname !== previousHostname) {
                //save
                //  chrome.storage.local get/set
                console.table(timer.counter);
                console.table(previousHostname);

                if (timer.detector) {
                    timer.drop();
                }
                timer.start();
                previousHostname = hostname;
            } else {}
        }
    });
};


chrome.tabs.onUpdated.addListener(getCurrentTab);
chrome.tabs.onActivated.addListener(getCurrentTab);


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