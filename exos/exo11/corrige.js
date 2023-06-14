function lanceChrono() {
  
  let tempsEcoule = 0;
  
  let id = setInterval(() => {
    console.log(++tempsEcoule);
    if (tempsEcoule === 10) clearInterval(id);
  }, 1000);
}

lanceChrono();
