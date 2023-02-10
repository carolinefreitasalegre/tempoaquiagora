const chave = "d9ef783dd77b9937315748849c22b81b"
const button = document.getElementById('button')

const input = document.getElementById('input')
const cidadeSpan = document.getElementById('cidadeSpan')
const horarioSpan = document.getElementById('horarioSpan')
const temperatura = document.getElementById('temperatura')
const ceu = document.getElementById('ceu')
const img02 = document.getElementById('img02')


function buscar() {
  if (!input.value) return

  getDataApi()
}

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

  cidadeSpan.innerText = `${data.name}, ${data.sys.country}`;
  temperatura.innerText = `${parseFloat(data.main.temp.toFixed())}º C`
  ceu.innerText = `${data.weather[0].description}`
  img02.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`


}