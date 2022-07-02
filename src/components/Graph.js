import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

export default function Graph(props) {
    let userData = props.userData;
    const subject = props.subject;
    const subjectNames = { "romana" : "Limba Romana", "mate" : "Matematica" };
    const daysAmount = props.timeWindow;
    if (daysAmount > 0) {
      let timeFrameBeggining = new Date();
      timeFrameBeggining.setDate(timeFrameBeggining.getDate() - daysAmount);
      console.log("Beggining date is:");
      console.log(timeFrameBeggining);
      userData = userData.filter(function(item) {
        console.log(item.timestamp);
        let timestamp = new Date(item.timestamp);
        let timestampTime = timestamp.getTime();
        let timeFrameBegginingTime = timeFrameBeggining.getTime();
        let timeWindow = timestampTime- timeFrameBegginingTime;
        console.log(timeWindow > 0);
        return timeWindow >= 0;
      });
      console.log("Filtered data is:");
      console.log(userData);
    }
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
    };

    const data = {
      labels: labels,
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