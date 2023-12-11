const callAPI = (request,headers) => {
  fetch(request,headers)
    .then((response) => {
      if (response.ok) { return response.json(); }})
    .then((result) => displayResult(result))
    .catch((error) => console.log(error));
};

const displayResult = (result) => {
  result.forEach(repo => {
    let row = table.insertRow(-1);
    let cell = row.insertCell(-1);
    cell.innerHTML = repo.name;
    cell = row.insertCell(-1);
    let href = document.createElement("a");
    href.innerHTML = repo.html_url;
    href.target = "_blank";
    href.setAttribute("href",repo.html_url);
    cell.appendChild(href);
    if (language == "fr") {
      var date = repo.updated_at.substring(8,10)+"/"+repo.updated_at.substring(5,7)+
      "/"+repo.updated_at.substring(0,4);
    } else {
      var date = repo.updated_at.substring(5,7)+"/"+repo.updated_at.substring(8,10)+
      "/"+repo.updated_at.substring(0,4);
    }
    cell = row.insertCell(-1);
    cell.innerHTML = date;
  });
}

const initialization = () => {
  table = document.getElementById("githubBody");
  language = document.getElementById("language").value;
  var request = "https://api.github.com/users/TheoRN25/repos";
  var headers = {method: "GET",redirect: "follow"};
  callAPI(request,headers);
};

initialization();