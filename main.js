console.log("hello world");


$(document).ready(init);

function init() {
  moment.locale("it");
  getData();

}

// funzione per recuperare i dati dal server tramite chiamata API
function getData() {
  $.ajax({
    url:"http://157.230.17.132:4007/sales",
    method:"GET",
    success: function(data) {
      // console.log(data);
      monthProfit(data);
      var salesmen = getLabelDoughnut(data);
      console.log("venditori: " + salesmen);
      var names = Object.keys(salesmen);
      var sales = Object.values(salesmen);
      console.log("nomi: " + names);
      console.log("vendite: " + sales);


      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: getLabel(),
            datasets: [{
                label: '# of Votes',
                data: monthProfit(data),
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                'rgba(255, 99, 132, 1)'
              ]
            }]
        }
      });

      var ctxTwo = document.getElementById('myChartTwo').getContext('2d');
      var myDoughnutChart = new Chart(ctxTwo, {
        type: 'doughnut',
        data: {
            labels: names,
            datasets: [{
                label: '# of Votes',
                data: sales,
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
                ]
            }]
        }

      });
    },
    error: function() {
    alert("Errore")
    }
  });
}
// funzione per ricavare i profitti mensili
function monthProfit(data) {
  // creo un array che in seguito conterrà i ricavi mensili
  var profitPerMonth = new Array(12).fill(0);
  // console.log(profitPerMonth);
  for (var i=0; i<data.length; i++) {
    var obj = data[i];
    var amount = Number(obj.amount);
    var date = obj.date;
    var month = moment(date, "DD/MM/YYY").month();
    // console.log(amount);
    // console.log(date);
    // console.log(month);

    profitPerMonth[month] += amount;

  }
  // console.log(profitPerMonth);
  return(profitPerMonth);
}

//funzione per il label del primo grafico
function getLabel() {
  var months = moment.months();
  // console.log("label: " + months);
  return(months);
}

// funzione per il label del secondo grafico
function getLabelDoughnut(data) {
  // creo un oggetto vuoto in cui inserirò i nomi dei venditori (chiavi) e l'ammontare delle sue vendite (valori)
  var salesmen = {};

  for (var i=0; i<data.length; i++) {
    var name = data[i].salesman;
    var amount = Number(data[i].amount);

    if(!salesmen[name]) {
      // aggiungo il nome del venditore all'oggetto assegnandogli un valore iniziale di zero
      salesmen[name] = 0;
    }

    // aggiungo le vendite a quelle precedenti
    salesmen[name] += amount;
  };

  return(salesmen);

}
