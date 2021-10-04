contentTypeRadioHandler();

function contentTypeRadioHandler() {
  let jsonTypeRadio = document.getElementById("jsonTypeRadio");
  let jsonType = document.getElementById("jsonType");
  let customType = document.getElementById("customType");

  if (jsonTypeRadio.checked == true) {
    jsonType.style.display = "block";
    customType.style.display = "none";
    console.log("JSON Type Visible");
  } else {
    jsonType.style.display = "none";
    customType.style.display = "block";
    console.log("JSON Type Hidden");
  }
}

function addParameterControl() {
  let customType = document.getElementById("customType");
  let id = (customType.children.length + 1);

  let html = `<div id="${id}">
  <div class="label" id="parameter+${id}">
    Parameter ${id}
  </div>

  <div class="label">
    <input type="text" class="parameterBox" placeholder="Enter Parameter ${id} Key" id="key${id}"></input>
  </div>

  <div class="label">
    <input type="text" class="parameterBox" placeholder="Enter Parameter ${id} Value" id="value${id}"></input>
  </div>

  <div class="label">
    <input type="button" value="-" class="addBtn" id="removeBtn${id}" onclick="removeParameterControl(this,${id})">
  </div>

</div>`;

  customType.innerHTML += html;
}


function removeParameterControl(e,id){
  console.log(e.getAttribute('id'));
  let customType = document.getElementById("customType");
  customType.removeChild(document.getElementById(id));

}

function requestHandler(e){
    //e.preventDefault();
    let requestUrl=document.getElementById('requestUrl').value;
    let requesType = document.getElementById("postRadio").checked? 'POST': 'GET';
    let contentType = document.getElementById("jsonTypeRadio").checked ? 'JSON' : 'CUSTOM';
    let requestBody;
    
    if(contentType=='JSON')
    {
      console.log(contentType);
      requestBody=JSON.stringify(document.getElementById('requestBody').value);
    }
    else{
      let customType = document.getElementById("customType").children;
      
      customType.forEach(element => {
        let id= element.getAttribute('id');
        let key= element.getElementById(`key${id}`).value;
        let value= element.getElementById(`value${id}`).value;
        if(key.length>0 && value.length>0 )
          requestUrl+='?'+ key + '='+value;
        
      });
      console.log(requestUrl);
      
    }
    if(requesType=='GET')
      getData(requestUrl);
    else
      postData(requestUrl,requestBody);

}


function getData(url)
{
  fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      document.getElementById('responseTxt').value=json;
    });
}

function postData(url,requestBody)
{
  const params={
    method:'post',
    headers:{
      'Content-type':'application/json'
    },
    body:requestBody
  };
  fetch(url,params).then((response)=>{
      return response.text();
  }).then((data)=>{
    document.getElementById('responseTxt').value=JSON.parse(data);
  });
}