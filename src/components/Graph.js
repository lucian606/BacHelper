import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

export default function Graph(props) {
    const userData = props.userData;
    const subject = props.subject;
    const subjectNames = { "romana" : "Limba Romana", "mate" : "Matematica" };
    const grades = userData.map(function(grade) {
        return grade.grade;
    });
    const labels = userData.map(function(grade) {
        return grade.timestamp;
    });
  
    
    const options = {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        y : 
          {
            min: 0,
            max: 11,
            steps: 10,
            ticks: {
              stepSize: 1
            }
          }
      }
      // ,
      // plugins: {
      //   legend: {
      //     position: 'bottom',
      //   },
      //   title: {
      //     display: true,
      //     text: 'Chart.js Line Chart',
      //   },

      // },
    };

    const data = {
      labels: [0,1,4,5,6,7,8,9,10],
      datasets: [
        {
          label: subject,
          borderColor: "#f87979",
          data: grades
        }
      ]
    };

    console.log("Displaying graph");
    return (
        <div className="flex flex-col justify-center items-center">
            <Line data={data} height={props.height} options={options}/>
        </div>
    )
}