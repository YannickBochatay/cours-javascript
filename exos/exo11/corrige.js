function lanceChrono() {
  
  let cpt = 0;
  
  let timer = setInterval(() => {
    console.log(++cpt);
    if (cpt === 10) clearInterval(timer);
  }, 1000);
}

lanceChrono();
