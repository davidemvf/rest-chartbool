console.log("hello world");

$(document).ready(init);

function init() {
  getData();
}

// funzione per recuperare i dati dal server tramite chiamata API
function getData() {
  $.ajax({
    url:"http://157.230.17.132:4007/sales",
    method:"GET",
    success: function(data) {

      console.log(data);

    },
    error: function() {
    alert("Errore")
    }
  });
}
  // funzione per ricavare i profitti mensili
  // function monthProfit() {
  //
  // }


    //

  // var ctx = document.getElementById('myChart').getContext('2d');
  // var myChart = new Chart(ctx, {
  //   type: 'bar',
  //   data: {
  //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //       datasets: [{
  //           label: '# of Votes',
  //           data: [12, 19, 3, 5, 2, 3]
  //       }]
  //   }
  // });
