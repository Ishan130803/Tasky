import {
  DataManager,
  Query,
  CustomDataAdaptor,UrlAdaptor
  FetchOption,
} from "@syncfusion/ej2-data";

const SERVICE_URI: string = "";

const createRequest = async (url: string) => {
  let request: object;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  if (res.status >= 200 && res.status <= 299) {
    const parsedData = await res.json();
    return parsedData;
  } else {
    throw new Error("Failed to get data");
  }

  // .then((response) => {
  //     request = [{}, option, { httpRequest: response }];
  //     if (response.status >= 200 && response.status <= 299) {
  //         return await response.json();
  //     }
  // }).then((data) => {
  //     option.onSuccess(data, request);
  // }).catch((error) => {
  //     option.onFailure(request);
  // });
};

const fetchData = (url : string, option: FetchOption) => {
  const request = [{}, option, { httpRequest: response }]
  
  result
  createRequest(url).then((data) => {
    option.onSuccess(data, request);
  })
  .catch((error) => {
    option.onFailure(request)
  })


}

// const adaptor = new CustomDataAdaptor({
//   getData: function (option: FetchOption) {
//       createRequest(baseUrl + 'UrlDatasource', option);
//   },
//   addRecord: function (option: FetchOption) {
//       createRequest(baseUrl + 'Insert', option);
//   },
//   updateRecord: function (option: FetchOption) {
//       createRequest(baseUrl + 'Update', option);
//   },
//   deleteRecord: function (option: FetchOption) {
//       createRequest(baseUrl + 'Delete', option);
//   }
//   // to handle Batch operation
//   //batchUpdate: function (option: FetchOption) {
//   //  createRequest(baseUrl + 'Delete', option);  
//   //}
// })
