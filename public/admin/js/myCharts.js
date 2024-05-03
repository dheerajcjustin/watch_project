
console.log("inside my");


  const DATA_COUNT = 5;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

const categoryLabel = ['Red', 'Orange', 'Yellow', 'Green', 'Blue'];
const categoryData = {
  labels: categoryLabel,
  datasets: [
    {
      label: 'Dataset 1',
      data: [11, 16, 7, 3, 14],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(75, 192, 192)',
      'rgb(255, 205, 86)',
      'rgb(201, 203, 207)',
      'rgb(54, 162, 235)'
    ]
    }
  ]
};



const config1 = {
    type: 'polarArea',
    data: categoryData,
    options: {
      responsive: true,
      scales: {
        r: {
          pointLabels: {
            display: true,
            centerPointLabels: true,
            font: {
              size: 18
            }
          }
        }
      },
     
      
    },
  };

const brandCartt = new Chart(
    document.getElementById('brandCart'),
    config1
);