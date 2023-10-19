import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ngOnInit(){
    this.chart1();
    this.chart2();
  }

  chart1(){
     var options = {
      chart: {
          type: 'line',
          height: 75,
          sparkline: {
              enabled: true
          }
      },
      dataLabels: {
          enabled: false
      },
      colors: ["#e74c3c"],
      stroke: {
          curve: 'smooth',
          width: 3,
      },
      series: [{
          name: 'series1',
          data: [55, 35, 75, 50, 90, 50]
      }],
      yaxis: {
          min: 10,
          max: 100,
      },
      tooltip: {
          theme: 'dark',
          fixed: {
              enabled: false
          },
          x: {
              show: false,
          },
          y: {
              title: {
                 // @ts-ignore
                  formatter: function(seriesName) {
                      return 'Power'
                  }
              }
          },
          marker: {
              show: false
          }
      }
    };
    // @ts-ignore
    var chart = new ApexCharts(document.querySelector("#power-card-chart1"), options);
    chart.render();
  }

  chart2(){
    var options = {
      chart: {
          type: 'line',
          height: 75,
          sparkline: {
              enabled: true
          }
      },
      dataLabels: {
          enabled: false
      },
      colors: ["#f1c40f"],
      stroke: {
          curve: 'smooth',
          width: 3,
      },
      series: [{
          name: 'series1',
          data: [55, 35, 75, 50, 90, 50]
      }],
      yaxis: {
          min: 10,
          max: 100,
      },
      tooltip: {
          theme: 'dark',
          fixed: {
              enabled: false
          },
          x: {
              show: false,
          },
          y: {
              title: {
                  // @ts-ignore
                  formatter: function(seriesName) {
                      return 'Temperature'
                  }
              }
          },
          marker: {
              show: false
          }
      }
  };
  // @ts-ignore
  var chart = new ApexCharts(document.querySelector("#power-card-chart3"), options);
  chart.render();
  }

}
