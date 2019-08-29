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
      console.log(data);
      monthProfit(data);

      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: getLabel(),
            datasets: [{
                label: '# of Votes',
                data: monthProfit(data)
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
  console.log(profitPerMonth);
  for (var i=0; i<data.length; i++) {
    var obj = data[i];
    var amount = Number(obj.amount);
    var date = obj.date;
    var month = moment(date, "DD/MM/YYY").month();
    console.log(amount);
    console.log(date);
    console.log(month);

    profitPerMonth[month] += amount;

  }
  console.log(profitPerMonth);
  return(profitPerMonth);
}

//funzione per il label del grafico
function getLabel() {
  var months = moment.months();
  console.log("label: " + months);
  return(months);
}
