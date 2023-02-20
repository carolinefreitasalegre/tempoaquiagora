const chave = "d9ef783dd77b9937315748849c22b81b"
const button = document.getElementById('button')
const input = document.getElementById('input')
const dataHora = document.getElementById('dataHora')
const cidadeSpan = document.getElementById('cidadeSpan')
const horarioSpan = document.getElementById('horarioSpan')
const temperatura = document.getElementById('temperatura')
const ceu = document.getElementById('ceu')


function buscar() {
  if (!input.value) return

  getDataApi()
}
// adicionado o evento de clik


document.addEventListener("keypress", function(e) {
  if(e.key === 'Enter') {
  
      var btn = document.getElementById('button');
    
    btn.click();
  
  }
});
  
  
async function getDataApi() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input.value)}&units=metric&appid=${chave}&lang=pt_br`

  try {
    await fetch(url)
      .then((resposta) => resposta.json())
      .then((data) => {
        if (data?.cod && data.cod === "404") {
          return alert("Cidade não enconreada!")
        }
        loadData(data)
      })
  } catch (error) {
    alert(error)
  }

}
function loadData(data) {
  let nowDate = new Date()
  


  dataHora.innerText = dateBuilder(nowDate);
  cidadeSpan.innerText = `${data.name}, ${data.sys.country}`;
  temperatura.innerText = `${parseFloat(data.main.temp.toFixed())}º C`
  ceu.innerText = `${data.weather[0].description}`

  
  const imgUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`

  const img02 = document.getElementById('img02')

  img02.setAttribute('src', imgUrl)
  
}
function dateBuilder(data) {
  let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  let day = days[data.getDay()]; //getDay: 0-6
  let date = data.getDate();
  let month = months[data.getMonth()];
  let year = data.getFullYear();
  let hours = data.getHours()
  let min = data.getMinutes()
  
  
  
  if (hours < 12) {
    document.body.style.backgroundImage = 'url(img/manhã.jpg)';
  }
  else if (hours < 15){
    document.body.style.backgroundImage = 'url(img/tarde.jpg)';
  }
  else {
    document.body.style.backgroundImage = 'url(img/noite.jpg)';
  }
 

  
  return `${day}, ${date} ${month} ${year}. Às ${hours}h:${min}min`;
  
}
