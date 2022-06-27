import { Pie } from 'react-chartjs-2';
import { chartColors } from "../colors";
export default function PieChart(props) {
    const interestScoresJson = props.data;
    const labels = []
    const scores = []
    
    Object.keys(interestScoresJson).forEach(function(key) {
        labels.push(key);
        scores.push(interestScoresJson[key]);
    });
    const options = {
      maintainAspectRatio: false,
      responsive: true
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

    console.log(labels)
    console.log(scores)
    const data = {
      labels: labels,
      datasets: [
        {
            backgroundColor: chartColors,
            hoverBackgroundColor: chartColors,
            data: scores
        }
      ]
    };

    console.log("Displaying pie chart");
    console.log(props.height);
    return (
        <div className="flex flex-col justify-center items-center">
            <Pie data={data} height={props.height} options={options}/>
        </div>
    )
}