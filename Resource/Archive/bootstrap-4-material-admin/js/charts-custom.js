/*global $, document*/
$(document).ready(function () {

    'use strict';


    // ------------------------------------------------------- //
    // Charts Gradients
    // ------------------------------------------------------ //
    var ctx1 = $("canvas").get(0).getContext("2d");
    var gradient1 = ctx1.createLinearGradient(150, 0, 150, 300);
    gradient1.addColorStop(0, 'rgba(133, 180, 242, 0.91)');
    gradient1.addColorStop(1, 'rgba(255, 119, 119, 0.94)');

    var gradient2 = ctx1.createLinearGradient(146.000, 0.000, 154.000, 300.000);
    gradient2.addColorStop(0, 'rgba(104, 179, 112, 0.85)');
    gradient2.addColorStop(1, 'rgba(76, 162, 205, 0.85)');


    // ------------------------------------------------------- //
    // Line Chart
    // ------------------------------------------------------ //
    var LINECHARTEXMPLE   = $('#lineChartExample');
    var lineChartExample = new Chart(LINECHARTEXMPLE, {
        type: 'line',
        options: {
            legend: {labels:{fontColor:"#777", fontSize: 12}},
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        color: '#eee'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        color: '#eee'
                    }
                }]
            },
        },
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "Data Set One",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: gradient1,
                    borderColor: gradient1,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 1,
                    pointBorderColor: gradient1,
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: gradient1,
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [30, 50, 40, 61, 42, 35, 40],
                    spanGaps: false
                },
                {
                    label: "Data Set Two",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: gradient2,
                    borderColor: gradient2,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 1,
                    pointBorderColor: gradient2,
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: gradient2,
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [50, 40, 50, 40, 45, 40, 30],
                    spanGaps: false
                }
            ]
        }
    });


    // ------------------------------------------------------- //
    // Doughnut Chart
    // ------------------------------------------------------ //
    var DOUGHNUTCHARTEXMPLE  = $('#doughnutChartExample');
    var pieChartExample = new Chart(DOUGHNUTCHARTEXMPLE, {
        type: 'doughnut',
        options: {
            cutoutPercentage: 70,
        },
        data: {
            labels: [
                "A",
                "B",
                "C",
                "D"
            ],
            datasets: [
                {
                    data: [250, 50, 100, 40],
                    borderWidth: 0,
                    backgroundColor: [
                        '#3eb579',
                        '#49cd8b',
                        "#54e69d",
                        "#71e9ad"
                    ],
                    hoverBackgroundColor: [
                        '#3eb579',
                        '#49cd8b',
                        "#54e69d",
                        "#71e9ad"
                    ]
                }]
            }
    });

    var pieChartExample = {
        responsive: true
    };


    // ------------------------------------------------------- //
    // Line Chart 1
    // ------------------------------------------------------ //
    var LINECHART1 = $('#lineChartExample1');
    var myLineChart = new Chart(LINECHART1, {
        type: 'line',
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        max: 40,
                        min: 0,
                        stepSize: 0.5
                    },
                    display: false,
                    gridLines: {
                        display: false
                    }
                }]
            },
            legend: {
                display: false
            }
        },
        data: {
            labels: ["A", "B", "C", "D", "E", "F", "G"],
            datasets: [
                {
                    label: "Total Overdue",
                    fill: true,
                    lineTension: 0,
                    backgroundColor: "transparent",
                    borderColor: '#6ccef0',
                    pointBorderColor: '#59c2e6',
                    pointHoverBackgroundColor: '#59c2e6',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 3,
                    pointBackgroundColor: "#59c2e6",
                    pointBorderWidth: 0,
                    pointHoverRadius: 4,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 0,
                    pointRadius: 4,
                    pointHitRadius: 0,
                    data: [20, 28, 30, 22, 24, 10, 7],
                    spanGaps: false
                }
            ]
        }
    });


    // ------------------------------------------------------- //
    // Line Chart 2
    // ------------------------------------------------------ //
    var LINECHART1 = $('#lineChartExample2');
    var myLineChart = new Chart(LINECHART1, {
        type: 'line',
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        color: '#eee'
                    }
                }],
                yAxes: [{
                    ticks: {
                        max: 40,
                        min: 0,
                        stepSize: 0.5
                    },
                    display: false,
                    gridLines: {
                        display: false
                    }
                }]
            },
            legend: {
                display: false
            }
        },
        data: {
            labels: ["A", "B", "C", "D", "E", "F", "G"],
            datasets: [
                {
                    label: "Total Overdue",
                    fill: true,
                    lineTension: 0,
                    backgroundColor: "transparent",
                    borderColor: '#ff7676',
                    pointBorderColor: '#ff7676',
                    pointHoverBackgroundColor: '#ff7676',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 3,
                    pointBackgroundColor: "#ff7676",
                    pointBorderWidth: 0,
                    pointHoverRadius: 4,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 0,
                    pointRadius: 4,
                    pointHitRadius: 0,
                    data: [20, 8, 30, 22, 24, 17, 20],
                    spanGaps: false
                }
            ]
        }
    });


    // ------------------------------------------------------- //
    // Pie Chart
    // ------------------------------------------------------ //
    var PIECHARTEXMPLE    = $('#pieChartExample');
    var pieChartExample = new Chart(PIECHARTEXMPLE, {
        type: 'pie',
        data: {
            labels: [
                "A",
                "B",
                "C",
                "D"
            ],
            datasets: [
                {
                    data: [300, 50, 100, 80],
                    borderWidth: 0,
                    backgroundColor: [
                        '#44b2d7',
                        "#59c2e6",
                        "#71d1f2",
                        "#96e5ff"
                    ],
                    hoverBackgroundColor: [
                        '#44b2d7',
                        "#59c2e6",
                        "#71d1f2",
                        "#96e5ff"
                    ]
                }]
            }
    });

    var pieChartExample = {
        responsive: true
    };


    // ------------------------------------------------------- //
    // Bar Chart
    // ------------------------------------------------------ //
    var BARCHARTEXMPLE    = $('#barChartExample');
    var barChartExample = new Chart(BARCHARTEXMPLE, {
        type: 'bar',
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        color: '#eee'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        color: '#eee'
                    }
                }]
            },
        },
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "Data Set 1",
                    backgroundColor: [
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1
                    ],
                    hoverBackgroundColor: [
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1
                    ],
                    borderColor: [
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1,
                        gradient1
                    ],
                    borderWidth: 1,
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
                {
                    label: "Data Set 2",
                    backgroundColor: [
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2
                    ],
                    hoverBackgroundColor: [
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2
                    ],
                    borderColor: [
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2,
                        gradient2
                    ],
                    borderWidth: 1,
                    data: [35, 40, 60, 47, 88, 27, 30],
                }
            ]
        }
    });



    // ------------------------------------------------------- //
    // Bar Chart 1
    // ------------------------------------------------------ //
    var BARCHART1 = $('#barChart1');
    var barChartHome = new Chart(BARCHART1, {
        type: 'bar',
        options:
        {
            scales:
            {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    display: false
                }],
            },
            legend: {
                display: false
            }
        },
        data: {
            labels: ["A", "B", "C", "D", "E", "F", "G", "H"],
            datasets: [
                {
                    label: "Data Set 1",
                    backgroundColor: [
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7'
                    ],
                    borderColor: [
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7'
                    ],
                    borderWidth: 0,
                    data: [35, 55, 65, 85, 30, 22, 18, 35]
                },
                {
                    label: "Data Set 1",
                    backgroundColor: [
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6'
                    ],
                    borderColor: [
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6'
                    ],
                    borderWidth: 0,
                    data: [49, 68, 85, 40, 27, 35, 20, 25]
                }
            ]
        }
    });


    // ------------------------------------------------------- //
    // Bar Chart 2
    // ------------------------------------------------------ //
    var BARCHART2 = $('#barChart2');
    var barChartHome = new Chart(BARCHART2, {
        type: 'bar',
        options:
        {
            scales:
            {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    display: false
                }],
            },
            legend: {
                display: false
            }
        },
        data: {
            labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
            datasets: [
                {
                    label: "Data Set 1",
                    backgroundColor: [
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d'
                    ],
                    borderColor: [
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d'
                    ],
                    borderWidth: 1,
                    data: [40, 33, 22, 28, 40, 25, 30, 40, 28, 27, 22, 15, 20, 24, 30]
                }
            ]
        }
    });


    // ------------------------------------------------------- //
    // Polar Chart
    // ------------------------------------------------------ //
    var POLARCHARTEXMPLE  = $('#polarChartExample');
    var polarChartExample = new Chart(POLARCHARTEXMPLE, {
        type: 'polarArea',
        options: {
            elements: {
                arc: {
                    borderWidth: 0,
                    borderColor: '#aaa'
                }
            }
        },
        data: {
            datasets: [{
                data: [
                    11,
                    16,
                    12,
                    11,
                    7
                ],
                backgroundColor: [
                    "#e05f5f",
                    "#e96a6a",
                    "#ff7676",
                    "#ff8b8b",
                    "#fc9d9d"
                ],
                label: 'My dataset' // for legend
            }],
            labels: [
                "A",
                "B",
                "C",
                "D",
                "E"
            ]
        }
    });

    var polarChartExample = {
        responsive: true
    };


    // ------------------------------------------------------- //
    // Radar Chart
    // ------------------------------------------------------ //
    var RADARCHARTEXMPLE  = $('#radarChartExample');
    var radarChartExample = new Chart(RADARCHARTEXMPLE, {
        type: 'radar',
        data: {
            labels: ["A", "B", "C", "D", "E", "C"],
            datasets: [
                {
                    label: "First dataset",
                    backgroundColor: "rgba(84, 230, 157, 0.4)",
                    borderWidth: 2,
                    borderColor: "rgba(75, 204, 140, 1)",
                    pointBackgroundColor: "rgba(75, 204, 140, 1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(75, 204, 140, 1)",
                    data: [65, 59, 90, 81, 56, 55]
                },
                {
                    label: "Second dataset",
                    backgroundColor: "rgba(255, 119, 119, 0.4)",
                    borderWidth: 2,
                    borderColor: "rgba(255, 119, 119, 1)",
                    pointBackgroundColor: "rgba(255, 119, 119, 1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(255, 119, 119, 1)",
                    data: [50, 60, 80, 45, 96, 70]
                }
            ]
        }
    });
    var radarChartExample = {
        responsive: true
    };



});
