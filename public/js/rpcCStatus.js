//rpcCStatus.js
{
    "type"; "module"
  }
  
  async function selectRpc(id) {
    fetch('http://127.0.0.1:/getRpcStatus', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                _status: id,
                get status() {
                    return this._status;
                },
                set status(value) {
                    this._status = value;
                },
            }
        ),
  
  
    }).then((response) => {
        Notification(true, "Status updated successfully!");
        getProfile();
    }).catch((error) => {
        Notification(false, "An error occured while updating your Status!");
    });  
  
  }
  /*
  let scripts = ['/js/rpcStatus.js'];
  let create = (info) => {
      return new Promise(function(resolve, reject) {
          let data = document.createElement('script');
          data.type = "module";
          data.src = info;
          data.async = false;
          data.onload = () => {
              resolve(info);
          };
          data.onerror = () => {
              reject(info);
          };
          document.body.appendChild(data);
      });
  };
  let promiseData = [];
  
  scripts.forEach(function(info) {
      promiseData.push(create(info));
      console.log("[Vulx] Loading script: " + info)
  });
  Promise.all(promiseData).then(function() {
      console.log('The required scripts are loaded successfully!');
  }).catch(function(data) {
      console.log(data + ' failed to load!');
  });
  
  
  
  console.log(discStatus+"trash");
  console.log(rpccustomstatus+"shesh");
  
  window.selectRpc = selectRpc;
  
  async function postStatus() {
      get('http://127.0.0.1:/getRpcStatus', {
          method: 'get',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(rpcCustomStatus)
      });
      
  }
  
  async function selectRpc(id) {
      fetch('http://127.0.0.1:/updateStatus', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
              {
                  status: id
              }
          )
      }).then((response) => {
          Notification(true, "Status updated successfully!");
          getProfile();
      }).catch((error) => {
          Notification(false, "An error occured while updating your Status!");
      });  
  } window.selectRpc = selectRpc;
  
  
  fetch('http://example.com/movies.json')
    .then((response) => response.json())
    .then((data) => console.log(data));
  
  
    // Example POST method implementation:
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  postData('https://example.com/answer', { answer: 42 })
    .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  */