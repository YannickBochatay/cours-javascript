let ul = document.querySelector("#listeDesEmplois");
let ex = document.querySelector("#exemple");

ex.remove();

function ajoutOffre(job) {

  let a = document.createElement("a");
  a.href = job.url;
  a.textContent = job.jobTitle;

  let li = document.createElement("li");
  li.appendChild(a);

  ul.appendChild(li);
}

async function recupOffres() {

  let res = await fetch('https://jobicy.com/api/v2/remote-jobs?count=20&geo=france&industry=dev');
  let { jobs } = await res.json();

  jobs.forEach(ajoutOffre);
}

recupOffres();
