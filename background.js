
/*
let a = checkTab=()=>{
    chrome.tabs.onActivated.addListener((activeInfo) => {
        //console.log(activeInfo.tabId)
        chrome.tabs.get(activeInfo.tabId,(tab)=>{
            console.log(tab.url);
            a;
            });
    });
}*/


// ВОТ ТУТ НОРМ НА ПРОВЕРКУ УРЛЫ 
// НАДО ВРЕМЯ СЧитАТЬ В БЭКГРАУНДЕ
let lastUrl="";
let times=[];
let urls=[];
let prevTime=0;
let timeStart=0;
check=()=>{
    chrome.tabs.query({active: true,lastFocusedWindow: true,currentWindow: true},(tabs)=>{
            if(tabs.length>0){
             //   console.log(tabs[0].url);
            let url=tabs[0].url;
                if(lastUrl!=url){
                    while(true){
                        let index = urls.indexOf(url,0);
                        if(index<0) {
                            times.push(new Date() - timeStart);
                            urls.push(lastUrl);
                            timeStart = new Date();
                            lastUrl=url;
                            break;
                        }else
                        times[index]+=new Date() - timeStart;
                        break;
                    }
                 
                }   
            };
        });
       
}
setInterval(check,500);

print=()=>{
    if(urls[0]=="")
        times[0]=0;
console.table(times);
console.table(urls);
}

setInterval(print,5000);
//let timerId = setTimeout(checkTab,1000);
/*chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        //console.log(request)
        if(request != "handshake"){
            let url = new URL(sender.tab.url);
            let  time = new Date(request*1);
            var sec = request / 1000;
            var min = sec / 60;
            var hour = min / 60;
            var day =
                'Дней: ' + Math.floor(hour / 24) +
                ', часов: ' + Math.floor(hour % 24) +
                ', минут: ' + Math.floor(min % 60) +
                ', секунд: ' + Math.floor(sec % 60);
            
                console.log(day + " from " + url.hostname );        
        }

    });*/


// chrome.runtime.onMessage.addListener((msg) => {
//     console.log(msg);
// });
/*let lastUrl = "";
let timeUrlstart = new Date;
let countUrl = 0;
let arrayUrls = [];
let arrayTimes = [];
let arrayCounts = [];

chrome.tabs.onActivated.addListener((obj) => {
    chrome.tabs.get(obj.tabId, (tab) =>{
        console.log(tab.url);
        //не срабатывает при изменении урл
    })
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.status === "complete")//переписать, в любом случае отслеживать когда загрузилась но в той же табе
        if (lastUrl !== tab.url) {
             console.log(tab.url);
            // console.log(new Date - timeUrlstart);
            // arrayUrls.push(tab.url);
            // arrayCounts.push(countUrl);
            // arrayTimes.push(new Date - timeUrlstart);
            // countUrl++;
            //
            // timeUrlstart = new Date;
            // lastUrl = tab.url;
            // countUrl = 0;
        } else {
            // countUrl++;
        }

});
// chrome.runtime.onMessage.addListener((msg) => {
//     let allData = [];
//     for (let i=0; i < arrayUrls.length; i++) {
//         let oneData=[];
//         let url = arrayUrls[i];
//         let time = arrayTimes[i];
//         console.log(time);
//
//         let count = arrayCounts[i];
//         let index;
//         while(true){
//             index = arrayUrls.indexOf(url,i);
//             if(index<0) break;
//             time+=arrayTimes[index];
//             console.log(time,arrayTimes[index]);
//
//             arrayTimes.splice(index, 1);
//
//             count+=arrayCounts[index];
//
//             arrayCounts.splice(index, 1);
//             arrayUrls.splice(index, 1);
//         }
//         console.log(time);
//         oneData.push(url);
//         oneData.push(time);
//         oneData.push(count);
//         allData.push(oneData);
//     }
//     console.log(allData);
// });







*/