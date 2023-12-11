const callAPI = (request,headers) => {
  fetch(request,headers)
    .then((response) => {
      if (response.ok) { return response.json(); }})
    .then((result) => displayResult(result))
    .catch((error) => console.log(error));
};

const displayResult = (result) => {
  document.getElementById("python").innerHTML = result.ranks.languages.python.score;
  document.getElementById("php").innerHTML = result.ranks.languages.php.score;
  document.getElementById("javascript").innerHTML = result.ranks.languages.javascript.score;
  document.getElementById("csharp").innerHTML = result.ranks.languages.csharp.score;
  document.getElementById("sql").innerHTML = result.ranks.languages.sql.score;
}

const initialization = () => {
  
  var request = "https://www.codewars.com/api/v1/users/Théo06";
  var headers = {method: "GET",redirect: "follow"};
  callAPI(request,headers);
};

initialization();