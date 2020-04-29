//
// const setStorageDataPromisify = (items) => {
//   const promise = new Promise((resolve) => {
//     chrome.storage.local.set(items, (response) => {
//       resolve(response);
//     });
//   });
//   return promise;
// };
//
const getStorageData = (keys) =>
  new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (items) => {
      if (chrome.runtime.lastError) {
        reject(new Error(`Error in storage.get: ${chrome.runtime.lastError}`));
      } else {
        console.log(items);
        resolve(items);
      }
    });
  });
//
const setStorageData = (items) => {
  chrome.storage.local.set(items);
};
//
// const sendContentMessage = params => new Promise((resolve) => {
//   chrome.runtime.sendMessage(params, (response) => {
//     resolve(response);
//   });
// });
//
// const uuidv4 = () =>
//   /* eslint-disable */
//    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
//     const r = Math.random() * 16 | 0;
//     const v = c == 'x' ? r : r & 0x3 | 0x8;
//     return v.toString(16);
//   })
//   /* eslint-enable */
//
//
// export {
//   getStorageData,
//   setStorageDataPromisify,
//   setStorageData,
//   sendContentMessage,
//   uuidv4,
// };
// const setStorageAnyData = (key, data) => {
//   chrome.storage.local.set({ key: data });
// };
const setToStorageData = (data) => {
  // console.log(data);
  chrome.storage.local.set({ data: data });
};
const getStorageData1 = () => {
  let resultReturn = [];
  chrome.storage.local.get(['data'], (result) => {
    resultReturn = result;
  });
  return resultReturn;
};

export { setToStorageData, getStorageData, setStorageData };
