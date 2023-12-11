const callAzureAPITags = (request,body,tag) => {
  fetch(request,{method: "POST", headers: headers, body: body, redirect: "follow"})
  .then((response) => {
    if (response.ok) { return response.json(); }})
  .then(result => {
    result.workItems.forEach(task => {
      callAzureAPITasks(task.url,tag);
    });
  })
  .catch(error => console.log('error', error));
};

const callAzureAPITasks = (url,tag) => {
  fetch(url,{method: "GET", headers: headers, redirect: "follow"})
  .then((response) => {
    if (response.ok) { return response.json(); }
  })
  .then(result => {
    console.log(result);
    let ol = document.getElementById(tag);
    let li = document.createElement("li");
    li.innerHTML = result.fields["System.Title"];
    ol.appendChild(li);
  })
  .catch(error => console.log('error', error));
};

const generateBody = (tag) => {
  let body = JSON.stringify({
    "query": "Select [System.Id] From WorkItems Where [System.WorkItemType] = 'Task' "+
    "And [System.Tags] Contains '"+tag+"'"
  });
  callAzureAPITags(tag,body);  
}

const changeTable = (table,others) => {
  table.hidden = false;
  others.forEach(element => {
      element.hidden = true;
  });
};

const initialization = () => {
  const tableList = [document.getElementById("block1Table"),
  document.getElementById("block2Table"),document.getElementById("block3Table")];
  document.getElementById("block1Button").addEventListener("click",
  () => {changeTable(tableList[0],[tableList[1],tableList[2]])});
  document.getElementById("block2Button").addEventListener("click",
  () => {changeTable(tableList[1],[tableList[0],tableList[2]])});
  document.getElementById("block3Button").addEventListener("click",
  () => {changeTable(tableList[2],[tableList[0],tableList[1]])});
  const request = "https://dev.azure.com/SIO2024TheoDumont/Compétences/4d2c5ef5-4e76-4731-af8a-9207c1c0c6a4/_apis/wit/wiql?api-version=5.1";
  headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Basic OjNxam1wdnY1ZmlpY2dzaWd5aTZubHoyem9pbG02N2djdjN6a3kzNG4zdzZuc3lpaGk2Z3E=");
  headers.append("Cookie", "VstsSession=%7B%22PersistentSessionId%22%3A%223c420cbe-bee1-4ffc-a25d-1b70ad21712b%22%2C%22PendingAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22CurrentAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22SignInState%22%3A%7B%7D%7D");
  const tagList = ["1.1.1","1.1.2","1.1.3","1.1.4","1.1.5","1.1.6","1.2.1","1.2.2","1.2.3","1.3.1","1.3.2","1.3.3","1.4.1","1.4.2","1.4.3","1.5.1","1.5.2","1.5.3","1.6.1","1.6.2","1.6.3","1.6.4","2.1.1","2.1.2","2.1.3","2.1.4","2.1.5","2.1.6","2.1.7","2.1.8","2.1.9","2.1.10","2.1.11","2.2.1","2.2.2","2.2.3","2.2.4","2.2.5","2.3.1","2.3.2","2.3.3","2.3.4","3.1.1","3.1.2","3.1.3","3.1.4","3.2.1","3.2.2","3.3.1","3.3.2","3.3.3","3.3.4","3.4.1","3.4.2","3.4.3","3.4.4","3.4.5","3.5.1","3.5.2","3.5.3","3.5.4","3.5.5","3.5.6"];
  tagList.forEach(tag => {
    let body = JSON.stringify({
      "query": "Select [System.Id] From WorkItems Where [System.WorkItemType] = 'Task' And [System.Tags] Contains '"+tag+"'"
    });
    callAzureAPITags(request,body,tag);
  });
}

initialization();