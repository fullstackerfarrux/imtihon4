let forgot = document.querySelector(".forgot");
let form = document.querySelector(".form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let email = e.target[0].value;
  let password = e.target[1].value;

  if (email && password) {
    let {
      data: { token },
    } = await axios.post("https://reqres.in/api/login", { email, password });
    localStorage.token = token;
    document.location.replace("../index.html");
  }
  if (e.target[0].value != "eve.holt@reqres.in") {
    let email = document.querySelector(".name");
    email.style.border = "1px solid red";
  }
  if (e.target[1].value != "cityslicka") {
    let password = document.querySelector(".password");
    password.style.border = "1px solid red";
  }
});

forgot.addEventListener("click", (e) => {
  let name = document.querySelector(".name");
  let password = document.querySelector(".password");
  name.value = "eve.holt@reqres.in";
  password.value = "cityslicka";
});
let token = localStorage.token;
if (token) {
  document.location.replace("../index.html");
}
