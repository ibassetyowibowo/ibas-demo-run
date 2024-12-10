$(function () {
    'use strict'

    var gridLineColor = 'rgba(77, 138, 240, .1)';

    var colors = {
        primary: "#727cf5",
        secondary: "#7987a1",
        success: "#42b72a",
        info: "#68afff",
        warning: "#fbbc06",
        danger: "#ff3366",
        light: "#ececec",
        dark: "#282f3a",
        muted: "#686868"
    }

    var flotChart1Data = [
        [0, 49.331065063219285],
        [1, 48.79814898366035],
        [2, 50.61793547911337],
        [3, 53.31696317779434],
        [4, 54.78560952831719],
        [5, 53.84293992505776],
        [6, 54.682958355082874],
        [7, 56.742547193381654],
        [8, 56.99677491680908],
        [9, 56.144488388681445],
        [10, 56.567122269843885],
        [11, 60.355022877262684],
        [12, 58.7457726121753],
        [13, 61.445407102315514],
        [14, 61.112870581452086],
        [15, 58.57202276349258],
        [16, 54.72497594269612],
        [17, 52.070341498681124],
        [18, 51.09867716530438],
        [19, 47.48185519192089],
        [20, 48.57861168097493],
        [21, 48.99789250679436],
        [22, 53.582491800119456],
        [23, 50.28407438696142],
        [24, 46.24606628705599],
        [25, 48.614330310543856],
        [26, 51.75313497797672],
        [27, 51.34463925296746],
        [28, 50.217320673443936],
        [29, 54.657281647073304],
        [30, 52.445057217757245],
        [31, 53.063914668561345],
        [32, 57.07494250387825],
        [33, 52.970403392565515],
        [34, 48.723854145068756],
        [35, 52.69064629353968],
        [36, 53.590890118378205],
        [37, 58.52332126105745],
        [38, 55.1037709679581],
        [39, 58.05347017020425],
        [40, 61.350810521199946],
        [41, 57.746188675088575],
        [42, 60.276910973029786],
        [43, 61.00841651851749],
        [44, 57.786733623457636],
        [45, 56.805721677811356],
        [46, 58.90301959619822],
        [47, 62.45091969566289],
        [48, 58.75007922945926],
        [49, 58.405842466185355],
        [50, 56.746633122658444],
        [51, 52.76631598845634],
        [52, 52.3020769891715],
        [53, 50.56370473325533],
        [54, 55.407205992344544],
        [55, 50.49825590435839],
        [56, 52.4975614755482],
        [57, 48.79614749316488],
        [58, 47.46776704767111],
        [59, 43.317880548036456],
        [60, 38.96296121124144],
        [61, 34.73218432559628],
        [62, 31.033700732272116],
        [63, 32.637987000382296],
        [64, 36.89513637594264],
        [65, 35.89701755609185],
        [66, 32.742284578187544],
        [67, 33.20516407297906],
        [68, 30.82094321791933],
        [69, 28.64770271525896],
        [70, 28.44679026902145],
        [71, 27.737654438195236],
        [72, 27.755190738237744],
        [73, 25.96228929938593],
        [74, 24.38197394166947],
        [75, 21.95038772723346],
        [76, 22.08944448751686],
        [77, 23.54611335622507],
        [78, 27.309610481106425],
        [79, 30.276849322378055],
        [80, 27.25409223418214],
        [81, 29.920374921780102],
        [82, 25.143447932376702],
        [83, 23.09444253479626],
        [84, 23.79459089729409],
        [85, 23.46775072519832],
        [86, 27.9908486073969],
        [87, 23.218855925354447],
        [88, 23.9163141686872],
        [89, 19.217667423877607],
        [90, 15.135179958932145],
        [91, 15.08666008920407],
        [92, 11.006269617032526],
        [93, 9.201671310476282],
        [94, 7.475865090236113],
        [95, 11.645754524211824],
        [96, 15.76161040821357],
        [97, 13.995208323029495],
        [98, 12.59338056489445],
        [99, 13.536707176236195],
        [100, 15.01308268888571],
        [101, 13.957161242832626],
        [102, 13.237091619700053],
        [103, 18.10178875669874],
        [104, 20.634765519499563],
        [105, 21.064946755449817],
        [106, 25.370593801826132],
        [107, 25.321453557866203],
        [108, 20.947464543531186],
        [109, 18.750516645477425],
        [110, 15.382042945356737],
        [111, 14.569147793065632],
        [112, 17.949159188821604],
        [113, 15.965876707018058],
        [114, 16.359355082317443],
        [115, 14.163139419453657],
        [116, 12.106761506858124],
        [117, 14.843319717588216],
        [118, 17.24291158460492],
        [119, 17.799018581487058],
        [120, 14.038359368301329],
        [121, 18.658227817264983],
        [122, 18.463689935573676],
        [123, 22.687619584142652],
        [124, 25.088957744790036],
        [125, 28.184893996099582],
        [126, 28.03276492115397],
        [127, 24.11167758305713],
        [128, 24.28007484247854],
        [129, 28.23487421795626],
        [130, 26.246971673504287],
        [131, 29.330939820784877],
        [132, 26.07749855928238],
        [133, 23.921786397788168],
        [134, 28.825012181053275],
        [135, 25.140449169947626],
        [136, 21.79048000172746],
        [137, 23.05414699421924],
        [138, 20.712904460250886],
        [139, 29.727388210287337],
        [140, 30.219713454550508],
        [141, 32.567062865467058],
        [142, 31.46105146001275],
        [143, 33.699736621958863],
        [144, 30.05510726036824],
        [145, 34.200669070105356],
        [146, 36.938945414022744],
        [147, 35.50411643355061],
        [148, 34.788500646665874],
        [149, 36.97330575970296]
    ];

    // Dashbaord date start
    if ($('#dashboardDate').length) {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        $('#dashboardDate').datepicker({
            format: "dd-MM-yyyy",
            todayHighlight: true,
            autoclose: true
        });
        $('#dashboardDate').datepicker('setDate', today);
    }
    // Dashbaord date end

    // Flot chart1 start
    function labelFormatter(label, series) {
        return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
    }
    function setCode(lines) {
        $("#code").text(lines.join("\n"));
    }

    if ($('#flotChartPie').length) {
        var data = [];

        let LbSeries = $('#flotChartPie').data("series").split(",");
        let LbValue = $('#flotChartPie').data("percentage");
        if (LbSeries.length != LbValue.length) return;

        for (var i = 0; i < LbSeries.length; i++) {
            let Dt = {};
            Dt.label = $.trim(LbSeries[i]);
            Dt.data = LbValue[i];
            data.push(Dt);
        }

        $.plot($('#flotChartPie'), data, {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    tilt: 0.5,
                    label: {
                        show: true,
                        radius: 1,
                        formatter: labelFormatter,
                        background: {
                            opacity: 0.8
                        }
                    },
                    combine: {
                        color: "#999",
                        threshold: 0.1
                    }
                }
            },
            legend: {
                show: false
            }
        });

        setCode([
            "$.plot('#flotChartPie', data, {",
            "    series: {",
            "        pie: {",
            "            show: true,",
            "            radius: 1,",
            "            tilt: 0.5,",
            "            label: {",
            "                show: true,",
            "                radius: 1,",
            "                formatter: labelFormatter,",
            "                background: {",
            "                    opacity: 0.8",
            "                }",
            "            },",
            "            combine: {",
            "                color: '#999',",
            "                threshold: 0.1",
            "            }",
            "        }",
            "    },",
            "    legend: {",
            "        show: false",
            "    }",
            "});",
        ]);
    };

    if ($('#flotChart1').length) {
        $.plot('#flotChart1', [{
            data: flotChart1Data,
            color: '#727cf5'
        }], {
            series: {
                shadowSize: 0,
                lines: {
                    show: true,
                    lineWidth: 2,
                    fill: true,
                    fillColor: 'transparent'
                }
            },
            grid: {
                borderColor: 'transparent',
                borderWidth: 1,
                labelMargin: 0,
                aboveData: false
            },
            yaxis: {
                show: true,
                color: 'rgba(0,0,0,0.06)',
                ticks: [[0, ''], [15, '$8400k'], [30, '$8500k'], [45, '$8600k'], [60, '$8700k'], [75, '$8800k']],
                tickColor: gridLineColor,
                min: 0,
                max: 80,
                font: {
                    size: 11,
                    weight: '600',
                    color: colors.muted
                }
            },
            xaxis: {
                show: true,
                color: 'rgba(0,0,0,0.1)',
                ticks: [[0, 'Jan'], [20, 'Feb'], [40, 'Mar'], [60, 'Apr'], [80, 'May'], [100, 'June'], [120, 'July'], [140, 'Aug']],
                tickColor: gridLineColor,
                font: {
                    size: 13,
                    color: colors.muted
                },
                reserveSpace: false
            }
        });
    }
    // Flot chart1 end

    // Apex chart1 start
    if ($('#apexChart1').length) {
        var options1 = {
            chart: {
                type: "line",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            stroke: {
                width: 2,
                curve: "smooth"
            },
            markers: {
                size: 0
            },
            colors: ["#727cf5"],
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart1"), options1).render();
    }
    // Apex chart1 end

    // Apex chart1a start
    if ($('#apexChart1a').length) {
        var options1 = {
            chart: {
                type: "line",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            stroke: {
                width: 2,
                curve: "smooth"
            },
            markers: {
                size: 0
            },
            colors: ["#727cf5"],
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart1a"), options1).render();
    }
    // Apex chart1a end

    // Apex chart1b start
    if ($('#apexChart1b').length) {
        var options1 = {
            chart: {
                type: "line",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            stroke: {
                width: 2,
                curve: "smooth"
            },
            markers: {
                size: 0
            },
            colors: ["#727cf5"],
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart1b"), options1).render();
    }
    // Apex chart1b end

    // Apex chart1c start
    if ($('#apexChart1c').length) {
        var options1 = {
            chart: {
                type: "line",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            stroke: {
                width: 2,
                curve: "smooth"
            },
            markers: {
                size: 0
            },
            colors: ["#727cf5"],
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart1c"), options1).render();
    }
    // Apex chart1c end

    // Apex chart2 start
    if ($('#apexChart2').length) {
        var options2 = {
            chart: {
                type: "bar",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "60%"
                }
            },
            colors: ["#fbbc06"],
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            xaxis: {
                crosshairs: {
                    width: 1
                }
            },
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart2"), options2).render();
    }
    // Apex chart2 end

    // Apex chart2a start
    if ($('#apexChart2a').length) {
        var options2 = {
            chart: {
                type: "bar",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "60%"
                }
            },
            colors: ["#fbbc06"],
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            xaxis: {
                crosshairs: {
                    width: 1
                }
            },
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart2a"), options2).render();
    }
    // Apex chart2a end

    // Apex chart2b start
    if ($('#apexChart2b').length) {
        var options2 = {
            chart: {
                type: "bar",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "60%"
                }
            },
            colors: ["#fbbc06"],
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            xaxis: {
                crosshairs: {
                    width: 1
                }
            },
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart2b"), options2).render();
    }
    // Apex chart2b end

    // Apex chart2c start
    if ($('#apexChart2c').length) {
        var options2 = {
            chart: {
                type: "bar",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "60%"
                }
            },
            colors: ["#fbbc06"],
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            xaxis: {
                crosshairs: {
                    width: 1
                }
            },
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart2c"), options2).render();
    }
    // Apex chart2c end

    // Apex chart3 start
    if ($('#apexChart3').length) {
        var options3 = {
            chart: {
                type: "line",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            stroke: {
                width: 2,
                curve: "smooth"
            },
            markers: {
                size: 0
            },
            colors: ["#10b759"],
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart3"), options3).render();
    }
    // Apex chart3 end

    // Apex chart3a start
    if ($('#apexChart3a').length) {
        var options3 = {
            chart: {
                type: "line",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            stroke: {
                width: 2,
                curve: "smooth"
            },
            markers: {
                size: 0
            },
            colors: ["#10b759"],
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart3a"), options3).render();
    }
    // Apex chart3a end

    // Apex chart3b start
    if ($('#apexChart3b').length) {
        var options3 = {
            chart: {
                type: "line",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            stroke: {
                width: 2,
                curve: "smooth"
            },
            markers: {
                size: 0
            },
            colors: ["#10b759"],
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart3b"), options3).render();
    }
    // Apex chart3b end

    // Apex chart3c start
    if ($('#apexChart3c').length) {
        var options3 = {
            chart: {
                type: "line",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            stroke: {
                width: 2,
                curve: "smooth"
            },
            markers: {
                size: 0
            },
            colors: ["#10b759"],
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart3c"), options3).render();
    }
    // Apex chart3c end

    // Apex chart4 start
    if ($('#apexChart4').length) {
        var options2 = {
            chart: {
                type: "bar",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "60%"
                }
            },
            colors: ["#66d1d1"],
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            xaxis: {
                crosshairs: {
                    width: 1
                }
            },
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart4"), options2).render();
    }
    // Apex chart4 end

    // Apex chart4a start
    if ($('#apexChart4a').length) {
        var options2 = {
            chart: {
                type: "bar",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "60%"
                }
            },
            colors: ["#66d1d1"],
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            xaxis: {
                crosshairs: {
                    width: 1
                }
            },
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart4a"), options2).render();
    }
    // Apex chart4a end

    // Apex chart4b start
    if ($('#apexChart4b').length) {
        var options2 = {
            chart: {
                type: "bar",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "60%"
                }
            },
            colors: ["#66d1d1"],
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            xaxis: {
                crosshairs: {
                    width: 1
                }
            },
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart4b"), options2).render();
    }
    // Apex chart4b end

    // Apex chart5 start
    if ($('#apexChart5').length) {
        var options3 = {
            chart: {
                type: "line",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            stroke: {
                width: 2,
                curve: "smooth"
            },
            markers: {
                size: 0
            },
            colors: ["#7987a1"],
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart5"), options3).render();
    }
    // Apex chart5 end

    // Apex chart6 start
    if ($('#apexChart6').length) {
        var options2 = {
            chart: {
                type: "bar",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "60%"
                }
            },
            colors: ["#282f3a"],
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            xaxis: {
                crosshairs: {
                    width: 1
                }
            },
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart6"), options2).render();
    }
    // Apex chart6 end


    // Apex chart7 start
    if ($('#apexChart7').length) {
        var options2 = {
            chart: {
                type: "bar",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "60%"
                }
            },
            colors: ["#FF0000"],
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            xaxis: {
                crosshairs: {
                    width: 1
                }
            },
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart7"), options2).render();
    }
    // Apex chart7 end

    // Apex chart7a start
    if ($('#apexChart7a').length) {
        var options2 = {
            chart: {
                type: "bar",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "60%"
                }
            },
            colors: ["#FF0000"],
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            xaxis: {
                crosshairs: {
                    width: 1
                }
            },
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart7a"), options2).render();
    }
    // Apex chart7a end


    // Apex chart7b start
    if ($('#apexChart7b').length) {
        var options2 = {
            chart: {
                type: "bar",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "60%"
                }
            },
            colors: ["#FF0000"],
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            xaxis: {
                crosshairs: {
                    width: 1
                }
            },
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart7b"), options2).render();
    }
    // Apex chart7b end

    // Apex chart7c start
    if ($('#apexChart7c').length) {
        var options2 = {
            chart: {
                type: "bar",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "60%"
                }
            },
            colors: ["#FF0000"],
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            xaxis: {
                crosshairs: {
                    width: 1
                }
            },
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChart7c"), options2).render();
    }
    // Apex chart7c end

    //#region Dashboard KSO
    // Apex chart1 start
    if ($('#apexChartKso1').length) {
        var options1 = {
            chart: {
                type: "line",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            stroke: {
                width: 2,
                curve: "smooth"
            },
            markers: {
                size: 0
            },
            colors: ["#727cf5"],
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChartKso1"), options1).render();
    }
    // Apex chart1 end

    // Apex chart2 start
    if ($('#apexChartKso2').length) {
        var options2 = {
            chart: {
                type: "bar",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "60%"
                }
            },
            colors: ["#10b759"],
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            xaxis: {
                crosshairs: {
                    width: 1
                }
            },
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChartKso2"), options2).render();
    }
    // Apex chart2 end

    // Apex chart3 start
    if ($('#apexChartKso3').length) {
        var options3 = {
            chart: {
                type: "line",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            stroke: {
                width: 2,
                curve: "smooth"
            },
            markers: {
                size: 0
            },
            colors: ["#fbbc06"],
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChartKso3"), options3).render();
    }
    // Apex chart3 end

    // Apex chart4 start
    if ($('#apexChartKso4').length) {
        var options2 = {
            chart: {
                type: "bar",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "60%"
                }
            },
            colors: ["#7987a1"],
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            xaxis: {
                crosshairs: {
                    width: 1
                }
            },
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChartKso4"), options2).render();
    }
    // Apex chart4 end

    // Apex chart5 start
    if ($('#apexChartKso5').length) {
        var options3 = {
            chart: {
                type: "line",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            stroke: {
                width: 2,
                curve: "smooth"
            },
            markers: {
                size: 0
            },
            colors: ["#66d1d1"],
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChartKso5"), options3).render();
    }
    // Apex chart5 end

    // Apex chart6 start
    if ($('#apexChartKso6').length) {
        var options2 = {
            chart: {
                type: "bar",
                height: 60,
                sparkline: {
                    enabled: !0
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "60%"
                }
            },
            colors: ["#282f3a"],
            series: [{
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
            }],
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            xaxis: {
                crosshairs: {
                    width: 1
                }
            },
            tooltip: {
                fixed: {
                    enabled: !1
                },
                x: {
                    show: !1
                },
                y: {
                    title: {
                        formatter: function (e) {
                            return ""
                        }
                    }
                },
                marker: {
                    show: !1
                }
            }
        };
        new ApexCharts(document.querySelector("#apexChartKso6"), options2).render();
    }
    // Apex chart6 end

    //if ($('#chartjsGroupedBar').length) {
    //    let DtSeries = $('#chartjsGroupedBar').data("series").split(",");
    //    let DtNew = $('#chartjsGroupedBar').data("new");
    //    let DtInProgress = $('#chartjsGroupedBar').data("inprogress");
    //    let DtWf = $('#chartjsGroupedBar').data("wf");

    //    new Chart($('#chartjsGroupedBar'), {
    //        type: 'bar',
    //        data: {
    //            //labels: ["BPD", "Teknik", "Legal", "HC", "ICT Master Data", "ICT Perangkat", "FBS Petty Cash", "FBS Pickup Service"],
    //            labels: DtSeries,
    //            datasets: [
    //                {
    //                    label: "New",
    //                    backgroundColor: "#6571ff",
    //                    //data: [0,2,3,4,5,6,7,8]
    //                    data: DtNew
    //                }, {
    //                    label: "In Progress",
    //                    backgroundColor: "#66d1d1",
    //                    //data: [2,3,4,5,6,7,8,9]
    //                    data: DtInProgress
    //                }, {
    //                    label: "Waiting",
    //                    backgroundColor: "#fbbc06",
    //                    //data: [1,2,1,2,1,2,1,2]
    //                    data: DtWf
    //                }
    //            ]
    //        }
    //    });
    //}

    if ($('#chartjsGroupedBar').length) {
        let DtSeries = $('#chartjsGroupedBar').data("series").split(",");
        let DtNew = $('#chartjsGroupedBar').data("new");
        let DtInProgress = $('#chartjsGroupedBar').data("inprogress");
        let DtWf = $('#chartjsGroupedBar').data("wf");

        var options = {
            series: [
                {
                    name: "New",
                    data: DtNew
                }, {
                    name: "In Progress",
                    data: DtInProgress
                }, {
                    name: "Waiting",
                    data: DtWf
                }
                //{
                //    name: "New",
                //    data: [4, 5, 1, 3, 2, 3, 1, 2]
                //},{
                //    name: "In Progress",
                //    data: [8, 10, 4, 6, 7, 5, 6, 2]
                //},{
                //    name: "Waiting",
                //    data: [4, 5, 4, 7, 2, 3, 2, 2]
                //}
                //{
                //    name: 'Marine Sprite',
                //    data: [44, 55, 41, 37, 22, 43, 21]
                //}, {
                //    name: 'Striking Calf',
                //    data: [53, 32, 33, 52, 13, 43, 32]
                //}, {
                //    name: 'Tank Picture',
                //    data: [12, 17, 11, 9, 15, 11, 20]
                //}, {
                //    name: 'Bucket Slope',
                //    data: [9, 7, 5, 8, 6, 9, 4]
                //}, {
                //    name: 'Reborn Kid',
                //    data: [25, 12, 19, 32, 25, 24, 10]
                //}
            ],
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    dataLabels: {
                        total: {
                            enabled: true,
                            offsetX: 0,
                            style: {
                                fontSize: '13px',
                                fontWeight: 900
                            }
                        }
                    }
                },
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            xaxis: {
                //categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
                categories: DtSeries,
                labels: {
                    formatter: function (val) {
                        return val
                    }
                }
            },
            yaxis: {
                title: {
                    text: undefined
                },
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    }
                }
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: 'top',
                horizontalAlign: 'center',
            }
        };

        var chart = new ApexCharts(document.querySelector("#chartjsGroupedBar"), options);
        chart.render();

    }
    //#endregion

    // Progressgar1 start
    if ($('#progressbar1').length) {
        var bar = new ProgressBar.Circle(progressbar1, {
            color: colors.primary,
            trailColor: gridLineColor,
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 4,
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 1400,
            text: {
                autoStyleContainer: false
            },
            from: { color: colors.primary, width: 1 },
            to: { color: colors.primary, width: 4 },
            // Set default step function for all animate calls
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);

                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                    circle.setText('');
                } else {
                    circle.setText(value + '%');
                }

            }
        });
        bar.text.style.fontFamily = "'Overpass', sans-serif;";
        bar.text.style.fontSize = '3rem';

        let percentage = $('#progressbar1').data('percentage');
        bar.animate(percentage);
        //bar.animate(0.78);
    }
    // Progressgar1 start

    // Monthly sales chart start Change Request
    if ($('#monthly-sales-chart').length) {
        debugger
        var month = [];
        var count = [];

        var getData = $.ajax({
            type: 'GET',
            enctype: 'multipart/form-data',
            url: '/ChangeRequest/MonthlyCount',
            processData: false,
            cache: false,
            contentType: false,
            //dataType: "json",
            //encode: true,
            timeout: 800000,
            success: function (data) {
                debugger
                if (data != null) {

                    data.forEach(function (item) {
                        month[item.month - 1] = item.month;
                        count[item.month - 1] = item.count;
                    });

                    for (var i = 0; i < 12; i++) {
                        if (!count[i]) count[i] = 0;
                    }

                    var maxCount = Math.max(...count);
                    var dynamicMax = Math.ceil(maxCount * 1.2); 

                    var monthlySalesChart = document.getElementById('monthly-sales-chart').getContext('2d');
                    new Chart(monthlySalesChart, {
                        type: 'bar',
                        data: {
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            datasets: [{
                                label: 'Total Request',
                                data: count,
                                backgroundColor: colors.primary,
                                datalabels: {
                                    align: 'center',
                                    anchor: 'center'
                                }
                            }]
                        },
                        options: {
                            maintainAspectRatio: false,
                            plugins: {
                                datalabels: getDatalabelsConfigBar(),
                            },
                            legend: {
                                display: false,
                                labels: {
                                    display: false
                                }
                            },
                            scales: {
                                xAxes: [{
                                    display: true,
                                    barPercentage: .8,
                                    categoryPercentage: .8,
                                    gridLines: {
                                        display: false
                                    },
                                    ticks: {
                                        fontColor: '#8392a5',
                                        fontSize: 10
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        color: gridLineColor
                                    },
                                    ticks: {
                                        fontColor: '#8392a5',
                                        fontSize: 10,
                                        min: 0,
                                        max: dynamicMax
                                    }
                                }]
                            }
                        }
                    });

                }
            }
        });


    }

    //Monthly Current year Tickets
    if ($('#monthly-tickets-chart').length) {
        debugger
        var month = [];
        var count = [];

        var getData = $.ajax({
            type: 'GET',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/tms/MonthlyCount',
            processData: false,
            cache: false,
            contentType: false,
            timeout: 800000,
            success: function (data) {
                debugger
                if (data != null) {

                    data.forEach(function (item) {
                        month[item.month - 1] = item.month;
                        count[item.month - 1] = item.count;
                    });

                    for (var i = 0; i < 12; i++) {
                        if (!count[i]) count[i] = 0;
                    }

                    var maxCount = Math.max(...count);
                    var dynamicMax = Math.ceil(maxCount * 1.2); // 10% buffer

                    var monthlySalesChart = document.getElementById('monthly-tickets-chart').getContext('2d');
                    new Chart(monthlySalesChart, {
                        type: 'bar',
                        data: {
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            datasets: [{
                                label: 'Total Tickets',
                                data: count,
                                backgroundColor: colors.primary,
                                datalabels: {
                                    align: 'center',
                                    anchor: 'center'
                                }
                            }]
                        },
                        options: {
                            maintainAspectRatio: false,
                            plugins: {
                                datalabels: getDatalabelsConfigBar(),
                            },
                            legend: {
                                display: false,
                                labels: {
                                    display: false
                                }
                            },
                            scales: {
                                xAxes: [{
                                    display: true,
                                    barPercentage: .8,
                                    categoryPercentage: .8,
                                    gridLines: {
                                        display: false
                                    },
                                    ticks: {
                                        fontColor: '#8392a5',
                                        fontSize: 10
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        color: gridLineColor
                                    },
                                    ticks: {
                                        fontColor: '#8392a5',
                                        fontSize: 10,
                                        min: 0,
                                        max: dynamicMax // Set the max dynamically
                                    }
                                }]
                            }
                        }
                    });

                }
            }
        });


    }
    // Monthly sales chart end

    //Monthly Current year Tickets KSO
    if ($('#monthly-kso-chart').length) {
        var month = [];
        var count = [];

        var getData = $.ajax({
            type: 'GET',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/FormKSO/MonthlyCount',
            processData: false,
            cache: false,
            contentType: false,
            //dataType: "json",
            //encode: true,
            timeout: 800000,
            success: function (data) {
                debugger
                if (data != null) {

                    data.forEach(function (item) {
                        month[item.month - 1] = item.month;
                        count[item.month - 1] = item.count;
                    });

                    for (var i = 0; i < 12; i++) {
                        if (!count[i]) count[i] = 0;
                    }

                    var options2 = {
                        series: [{
                            data: count
                        }],
                        chart: {
                            type: 'bar',
                            height: 350
                        },
                        plotOptions: {
                            bar: {
                                borderRadius: 4,
                                borderRadiusApplication: 'end',
                                horizontal: true,
                            }
                        },
                        dataLabels: {
                            enabled: true
                        },
                        xaxis: {
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        }
                    };

                    var chart = new ApexCharts(document.querySelector("#monthly-kso-chart"), options2);
                    chart.render();

                    //#region chartJs
                    //var monthlySalesChart = document.getElementById('monthly-kso-chart').getContext('2d');
                    //new Chart(monthlySalesChart, {
                    //    type: 'bar',
                    //    data: {
                    //        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    //        datasets: [{
                    //            label: 'Total Tickets',
                    //            data: count,
                    //            backgroundColor: colors.primary
                    //        }]
                    //    },
                    //    options: {
                    //        maintainAspectRatio: false,
                    //        legend: {
                    //            display: false,
                    //            labels: {
                    //                display: false
                    //            }
                    //        },
                    //        scales: {
                    //            xAxes: [{
                    //                display: true,
                    //                barPercentage: .3,
                    //                categoryPercentage: .6,
                    //                gridLines: {
                    //                    display: false
                    //                },
                    //                ticks: {
                    //                    fontColor: '#8392a5',
                    //                    fontSize: 10
                    //                }
                    //            }],
                    //            yAxes: [{
                    //                gridLines: {
                    //                    color: gridLineColor
                    //                },
                    //                ticks: {
                    //                    fontColor: '#8392a5',
                    //                    fontSize: 10,
                    //                    min: 0,
                    //                    max: 50
                    //                }
                    //            }]
                    //        },                            
                    //    }
                    //});
                    //#endregion
                }
            }
        });


    }
    // Monthly sales chart end


    $('#div_Dashboard_NewTicket').click(function () {
        window.location.replace(UrlOrigin + '/MyTicket/Index?status=1');
    });
    $('#div_Dashboard_InProgressTicket').click(function () {
        window.location.replace(UrlOrigin + '/MyTicket/Index?status=1');
    });
    $('#div_Dashboard_CloseTicket').click(function () {
        window.location.replace(UrlOrigin + '/MyTicket/Index?status=2');
    });

    //#region KSO
    $('#div_Dashboard_NewTicket_kso').click(function () {
        window.location.replace(UrlOrigin + '/FormKSO?status=1');
    });
    $('#div_Dashboard_InProgressTicket_kso').click(function () {
        window.location.replace(UrlOrigin + '/FormKSO?status=0');
    });
    $('#div_Dashboard_CloseTicket_kso').click(function () {
        window.location.replace(UrlOrigin + '/FormKSO?status=7');
    });
    $('#div_Dashboard_Rejected_kso').click(function () {
        window.location.replace(UrlOrigin + '/FormKSO?status=99');
    });
    $('#div_Dashboard_Revise_kso').click(function () {
        window.location.replace(UrlOrigin + '/FormKSO?status=20');
    });
    $('#div_Dashboard_Waiting_kso').click(function () {
        window.location.replace(UrlOrigin + '/FormKSO?status=17');
    });

    //#endregion

    //#region ComDay
    $('#div_dashboard_New_Comday').click(function () {
        window.location.replace(UrlOrigin + '/customerday');
    });
    $('#div_dashboard_InProgress_Comday').click(function () {
        window.location.replace(UrlOrigin + '/customerday');
    });
    $('#div_dashboard_Finish_Comday').click(function () {
        window.location.replace(UrlOrigin + '/customerday');
    });

    //Monthly Current year Tickets KSO
    if ($('#monthly-chart-ComDay').length) {
        debugger
        var month = [];
        var count = [];

        var getData = $.ajax({
            type: 'GET',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/customerday/MonthlyCount',
            processData: false,
            cache: false,
            contentType: false,
            //dataType: "json",
            //encode: true,
            timeout: 800000,
            success: function (data) {
                debugger
                if (data != null) {

                    data.forEach(function (item) {
                        month[item.month - 1] = item.month;
                        count[item.month - 1] = item.count;
                    });

                    for (var i = 0; i < 12; i++) {
                        if (!count[i]) count[i] = 0;
                    }

                    var maxCount = Math.max(...count);
                    var dynamicMax = Math.ceil(maxCount * 1.2); 

                    var monthlySalesChart = document.getElementById('monthly-chart-ComDay').getContext('2d');
                    new Chart(monthlySalesChart, {
                        type: 'bar',
                        data: {
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            datasets: [{
                                label: 'Total Tickets',
                                data: count,
                                backgroundColor: colors.primary,
                                datalabels: {
                                    align: 'center',
                                    anchor: 'center'
                                }
                            }]
                        },
                        options: {
                            maintainAspectRatio: false,
                            plugins: {
                                datalabels: getDatalabelsConfigBar(),
                            },
                            legend: {
                                display: false,
                                labels: {
                                    display: false
                                }
                            },
                            scales: {
                                xAxes: [{
                                    display: true,
                                    barPercentage: .8,
                                    categoryPercentage: .8,
                                    gridLines: {
                                        display: false
                                    },
                                    ticks: {
                                        fontColor: '#8392a5',
                                        fontSize: 10
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        color: gridLineColor
                                    },
                                    ticks: {
                                        fontColor: '#8392a5',
                                        fontSize: 10,
                                        min: 0,
                                        max: dynamicMax
                                    }
                                }]
                            }
                        }
                    });

                }
            }
        });


    }


    //Chat Pie
    if ($('#flotChartPieComDay').length) {
        var data = [];

        let LbSeries = $('#flotChartPieComDay').data("series").split(",");
        let LbValue = $('#flotChartPieComDay').data("percentage");
        if (LbSeries.length != LbValue.length) return;

        for (var i = 0; i < LbSeries.length; i++) {
            let Dt = {};
            Dt.label = $.trim(LbSeries[i]);
            Dt.data = LbValue[i];
            data.push(Dt);
        }

        $.plot($('#flotChartPieComDay'), data, {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    tilt: 0.5,
                    label: {
                        show: true,
                        radius: 1,
                        formatter: labelFormatter,
                        background: {
                            opacity: 0.8
                        }
                    },
                    combine: {
                        color: "#999",
                        threshold: 0.1
                    }
                }
            },
            legend: {
                show: false
            }
        });

        setCode([
            "$.plot('#flotChartPieComDay', data, {",
            "    series: {",
            "        pie: {",
            "            show: true,",
            "            radius: 1,",
            "            tilt: 0.5,",
            "            label: {",
            "                show: true,",
            "                radius: 1,",
            "                formatter: labelFormatter,",
            "                background: {",
            "                    opacity: 0.8",
            "                }",
            "            },",
            "            combine: {",
            "                color: '#999',",
            "                threshold: 0.1",
            "            }",
            "        }",
            "    },",
            "    legend: {",
            "        show: false",
            "    }",
            "});",
        ]);
    };

    //#endregion


    //#region Helpdesk Dashboard

    var fontFamily = "'Roboto', Helvetica, sans-serif";

    // Doughnut Chart
    if ($('#chartjsDoughnutHelpdesk').length) {

        // Make AJAX request to fetch data
        var getData = $.ajax({
            type: 'GET',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/tms/TotalHelpdeskCount', // Replace this with the correct URL
            processData: false,
            cache: false,
            contentType: false,
            timeout: 800000,
            success: function (data) {

                if (data != null) {
                    var bosCount = data.bos || 0;
                    var brightCount = data.bright || 0;
                    //var issueCount = data.issue || 0;
                    //var serviceCount = data.service || 0;

                    // Create pie chart using dynamic data
                    new Chart(document.getElementById('chartjsDoughnutHelpdesk'), {
                        type: 'pie',
                        data: {
                            //labels: ["BOS", "Bright", "Issue", "Service"],  // Label names
                            labels: ["BOS", "Bright"],  // Label names
                            datasets: [
                                {
                                    label: "Populations",
                                    backgroundColor: [colors.primary, colors.danger, colors.success, colors.warning],
                                    borderColor: colors.cardBg,
                                    //data: [bosCount, brightCount, issueCount, serviceCount],  // Dynamic data
                                    data: [bosCount, brightCount],  // Dynamic data
                                    datalabels: {
                                        anchor: 'center',
                                    }
                                }
                            ]
                        },
                        options: {
                            aspectRatio: 1,
                            plugins: {
                                datalabels: getDatalabelsConfigDoughnut(),
                            },
                            legend: {
                                display: true
                            }
                        }
                    });

                } else {
                    console.error('Data is null or empty');
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX error: ' + status + ' ' + error);
            }
        });

    }


    //Monthly Current year Tickets
    if ($('#chartjsGroupedBarHelpdesk').length) {

        // Initialize arrays for each category (BOS, Issue, and Service) and 12 months
        var bosCount = new Array(12).fill(0);
        var brightCount = new Array(12).fill(0);
        //var issueCount = new Array(12).fill(0);
        //var serviceCount = new Array(12).fill(0);

        var getData = $.ajax({
            type: 'GET',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/tms/MonthlyCountHelpdesk',
            processData: false,
            cache: false,
            contentType: false,
            timeout: 800000,
            success: function (data) {

                var maxCount = 0;
                if (data != null && Array.isArray(data)) {
                    data.forEach(function (item) {

                        if (item.month >= 1 && item.month <= 12) {  // Ensure month is valid
                            bosCount[item.month - 1] = item.bosCount;
                            brightCount[item.month - 1] = item.brightCount;
                            //issueCount[item.month - 1] = item.issueCount;
                            //serviceCount[item.month - 1] = item.serviceCount;

                            if (maxCount < (item.bosCount + item.brightCount)) {
                                maxCount = item.bosCount + item.brightCount;
                            }
                        }
                    });

                    // Ensure any missing months (if any) have a count of 0
                    for (var i = 0; i < 12; i++) {
                        if (!bosCount[i]) bosCount[i] = 0;
                        if (!brightCount[i]) brightCount[i] = 0;
                        //if (!issueCount[i]) issueCount[i] = 0;
                        //if (!serviceCount[i]) serviceCount[i] = 0;
                    }

                    // Find the maximum count for setting dynamic Y-axis range
                    //var maxCount = Math.max(...bosCount.concat(issueCount, serviceCount, brightCount)) + 10;  // Add some buffer to the max count
                    maxCount = Math.ceil(maxCount * 1.2);  // Add some buffer to the max count
                    
                    var monthlySalesChart = document.getElementById('chartjsGroupedBarHelpdesk').getContext('2d');

                    new Chart(monthlySalesChart, {
                        type: 'bar',
                        data: {
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            datasets: [
                                {
                                    label: 'BOS',
                                    data: bosCount,
                                    backgroundColor: colors.primary,
                                    borderWidth: 1,
                                    barPercentage: 0.9,
                                    categoryPercentage: 0.6,
                                    datalabels: {
                                        align: 'center',
                                        anchor: 'center'
                                    }
                                },
                                {
                                    label: 'Bright',
                                    data: brightCount, 
                                    backgroundColor: colors.danger,
                                    borderWidth: 1,
                                    barPercentage: 0.9,
                                    categoryPercentage: 0.6,
                                    datalabels: {
                                        align: 'center',
                                        anchor: 'center'
                                    }
                                },
                                //{
                                //    label: 'Issue',
                                //    data: issueCount,
                                //    backgroundColor: colors.danger,
                                //    borderWidth: 1,
                                //    barPercentage: 0.9,
                                //    categoryPercentage: 0.6,
                                //    datalabels: {
                                //        align: 'center',
                                //        anchor: 'center'
                                //    }
                                //},
                                //{
                                //    label: 'Service',
                                //    data: serviceCount,
                                //    backgroundColor: colors.warning,
                                //    borderWidth: 1,
                                //    barPercentage: 0.9,
                                //    categoryPercentage: 0.6,
                                //    datalabels: {
                                //        align: 'center',
                                //        anchor: 'center'
                                //    }
                                //},
                            ]
                        },
                        options: {
                            maintainAspectRatio: false,
                            plugins: {
                                datalabels: getDatalabelsConfigBar(),
                            },
                            legend: {
                                display: true,
                                labels: {
                                    display: true
                                }
                            },
                            scales: {
                                xAxes: [{
                                    stacked: true,
                                    display: true,
                                    barPercentage: 0.9,
                                    categoryPercentage: 0.7,
                                    gridLines: {
                                        display: false
                                    },
                                    ticks: {
                                        fontColor: '#8392a5',
                                        fontSize: 10
                                    }
                                }],
                                yAxes: [{
                                    stacked: true,
                                    gridLines: {
                                        color: gridLineColor
                                    },
                                    ticks: {
                                        fontColor: '#8392a5',
                                        fontSize: 10,
                                        min: 0,
                                        max: maxCount // Dynamically set the max value
                                    }
                                }]
                            }
                        }
                    });

                } else {
                    console.error('Data is not in expected format.');
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX error: ' + status + ' ' + error);
            }
        });
    }
    // Monthly sales chart end

    //Pie Chart helpdesk
    if ($('#chartjsPieServiceHelpdesk').length) {
        // Make AJAX request to fetch data
        var getData = $.ajax({
            type: 'GET',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/tms/TotalServicesHelpdeskCount', // Replace this with the correct URL
            processData: false,
            cache: false,
            contentType: false,
            timeout: 800000,
            success: function (data) {

                if (data != null) {

                    var SoftwareCount = 0;
                    var NetworkCount = 0;
                    var HardwareCount = 0;
                    var OfficeCount = 0;
                    var SsoCount = 0;
                    var FormRequestCount = 0;

                    data.forEach(function (item) {
                        if (item.category === 'Software') {
                            SoftwareCount = item.count;
                        } else if (item.category === 'Network') {
                            NetworkCount = item.count;
                        } else if (item.category === 'Hardware') {
                            HardwareCount = item.count;
                        } else if (item.category === 'Office') {
                            OfficeCount = item.count;
                        } else if (item.category === 'SSO') {
                            SsoCount = item.count;
                        } else if (item.category === 'Form Request') {
                            FormRequestCount = item.count;
                        }
                    });

                    new Chart($('#chartjsPieServiceHelpdesk'), {
                        type: 'doughnut',
                        data: {
                            labels: ["Hardware", "Network", "Software", "Office", "SSO", "Form Request"],
                            datasets: [{
                                label: "Population (millions)",
                                backgroundColor: [colors.primary, colors.danger, colors.info, colors.warning, colors.secondary, colors.success],
                                borderColor: colors.cardBg,
                                data: [HardwareCount, NetworkCount, SoftwareCount, OfficeCount, SsoCount, FormRequestCount],
                                datalabels: {
                                    anchor: 'center',
                                }
                            }]
                        },
                        options: {
                            plugins: {
                                datalabels: getDatalabelsConfigDoughnut(),
                            },
                            aspectRatio: 1,
                            legend: {
                                display: true                                
                            }
                        }
                    });
                } else {
                    console.error('Data is null or empty');
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX error: ' + status + ' ' + error);
            }
        });
    }

    if ($('#chartjsPieIssueHelpdesk').length) {
        // Make AJAX request to fetch data
        var getData = $.ajax({
            type: 'GET',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/tms/TotalIssueHelpdeskCount', // Replace this with the correct URL
            processData: false,
            cache: false,
            contentType: false,
            timeout: 800000,
            success: function (data) {

                if (data != null) {
                    var SoftwareCount = 0;
                    var NetworkCount = 0;
                    var HardwareCount = 0;
                    var OfficeCount = 0;
                    var SsoCount = 0;
                    var FormRequestCount = 0;

                    data.forEach(function (item) {
                        if (item.category === 'Software') {
                            SoftwareCount = item.count;
                        } else if (item.category === 'Network') {
                            NetworkCount = item.count;
                        } else if (item.category === 'Hardware') {
                            HardwareCount = item.count;
                        } else if (item.category === 'Office') {
                            OfficeCount = item.count;
                        } else if (item.category === 'SSO') {
                            SsoCount = item.count;
                        } else if (item.category === 'Form Request') {
                            FormRequestCount = item.count;
                        }
                    });



                    new Chart($('#chartjsPieIssueHelpdesk'), {
                        type: 'doughnut',
                        data: {
                            labels: ["Hardware", "Network", "Software", "Office", "SSO", "Form Request"],
                            datasets: [{
                                label: "Population",
                                backgroundColor: [colors.primary, colors.danger, colors.info, colors.warning, colors.secondary, colors.success],
                                borderColor: colors.cardBg,
                                data: [HardwareCount, NetworkCount, SoftwareCount, OfficeCount, SsoCount, FormRequestCount],
                                datalabels: {
                                    anchor: 'center',
                                }
                            }]
                        },
                        options: {
                            plugins: {
                                datalabels: getDatalabelsConfigDoughnut(),
                            },
                            aspectRatio: 1,
                            legend: {
                                display: true
                            }
                        }
                    });
                } else {
                    console.error('Data is null or empty');
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX error: ' + status + ' ' + error);
            }
        });
    }

    if ($('#chartjsPieBosHelpdesk').length) {
        // Make AJAX request to fetch data
        var getData = $.ajax({
            type: 'GET',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/tms/TotalBosHelpdeskCount', // Replace this with the correct URL
            processData: false,
            cache: false,
            contentType: false,
            timeout: 800000,
            success: function (data) {

                if (data != null) {

                    var MasterDataCount = 0;
                    var HumanErrorCount = 0;
                    var ErrorSystemCount = 0;
                    var SinkronisasiCount = 0;
                    data.forEach(function (item) {
                        if (item.category === 'Human error') {
                            HumanErrorCount = item.count;
                        } else if (item.category === 'Error System') {
                            ErrorSystemCount = item.count;
                        } else if (item.category === 'Master Data') {
                            MasterDataCount = item.count;
                        } else if (item.category === 'Sinkronisasi') {
                            SinkronisasiCount = item.count;
                        }
                    });

                    new Chart($('#chartjsPieBosHelpdesk'), {
                        type: 'doughnut',
                        data: {
                            labels: ["Master Data", "Human error", "Error System", "Sinkronisasi"],
                            datasets: [{
                                label: "Population (millions)",
                                backgroundColor: [colors.primary, colors.danger, colors.warning, colors.success],
                                borderColor: colors.cardBg,
                                data: [MasterDataCount, HumanErrorCount, ErrorSystemCount, SinkronisasiCount],
                                datalabels: {
                                    anchor: 'center',
                                }
                            }]
                        },
                        options: {
                            plugins: {
                                datalabels: getDatalabelsConfigDoughnut(),
                            },
                            aspectRatio: 1,
                            legend: {
                                display: true
                            }
                        }
                    });
                } else {
                    console.error('Data is null or empty');
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX error: ' + status + ' ' + error);
            }
        });
    }

    if ($('#chartjsPieBrightHelpdesk').length) {
        // Make AJAX request to fetch data
        var getData = $.ajax({
            type: 'GET',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/tms/TotalBrightHelpdeskCount', // Replace this with the correct URL
            processData: false,
            cache: false, 
            contentType: false,
            timeout: 800000,
            success: function (data) {

                if (data != null) {

                    var MasterDataCount = 0;
                    var HumanErrorCount = 0;
                    var ErrorSystemCount = 0;
                    var SinkronisasiCount = 0;
                    data.forEach(function (item) {
                        if (item.category === 'Human error') {
                            HumanErrorCount = item.count;
                        } else if (item.category === 'Error System') {
                            ErrorSystemCount = item.count;
                        } else if (item.category === 'Master Data') {
                            MasterDataCount = item.count;
                        } else if (item.category === 'Sinkronisasi') {
                            SinkronisasiCount = item.count;
                        }
                    });
 
                    new Chart($('#chartjsPieBrightHelpdesk'), {
                        type: 'doughnut',
                        data: {
                            labels: ["Master Data", "Human error", "Error System", "Sinkronisasi"],
                            datasets: [{
                                label: "Population (millions)",
                                backgroundColor: [colors.primary, colors.danger, colors.warning, colors.success],
                                borderColor: colors.cardBg,
                                data: [MasterDataCount, HumanErrorCount, ErrorSystemCount, SinkronisasiCount],
                                datalabels: {
                                    anchor: 'center',
                                }
                            }]
                        },
                        options: {
                            plugins: {
                                datalabels: getDatalabelsConfigDoughnut(),
                            },
                            aspectRatio: 1                            
                        }
                    });
                } else {
                    console.error('Data is null or empty');
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX error: ' + status + ' ' + error);
            }
        });
    }


    //Pic Assigned Tickets
    if ($('#chartjsGroupedBarPICAssigned').length) {

        var getData = $.ajax({
            type: 'GET',
            enctype: 'multipart/form-data', 
            url: UrlOrigin + '/tms/PicAssignPerformanceBosTicketCount',
            processData: false,
            cache: false,
            contentType: false,
            timeout: 800000,
            success: function (data) {

                if (data != null && Array.isArray(data)) {

                    var labels = [];
                    var datasets = [];
                    var categoryColors = [colors.warning, colors.danger, colors.primary, colors.success, colors.info, colors.secondary, colors.light, colors.dark, colors.muted];

                    var subjectMap = {};

                    data.forEach(function (item, index) {
                        var subject = item.subject;
                        var assignee = capitalizeFirstLetter(item.assignpic);

                        if (!subjectMap[subject]) {
                            subjectMap[subject] = { label: subject, data: [], backgroundColor: categoryColors[Object.keys(subjectMap).length] || '#cccccc' };
                        }

                        if (!labels.includes(assignee)) {
                            labels.push(capitalizeFirstLetter(assignee));
                        }

                        var assigneeIndex = labels.indexOf(assignee);

                        if (!subjectMap[subject].data[assigneeIndex]) {
                            subjectMap[subject].data[assigneeIndex] = 0; 
                        }

                        subjectMap[subject].data[assigneeIndex] = (item.count === null || item.count === undefined || item.count === '') ? 0 : item.count;
                    });

                    Object.keys(subjectMap).forEach(function (subjectKey) {
                        var subjectData = subjectMap[subjectKey];
                        datasets.push({
                            label: subjectData.label,
                            data: subjectData.data.map(function (item) {
                                return (item === null || item === undefined || item === '') ? 0 : item;
                            }),
                            backgroundColor: subjectData.backgroundColor,
                            borderWidth: 1,
                            barPercentage: 0.9,
                            categoryPercentage: 0.6,
                            datalabels: {
                                align: 'center',
                                anchor: 'center'
                            }
                        });
                    });

                    var maxCount = 0;
                    datasets.forEach(function (dataset) {
                        if (dataset.data.length > 0) {
                            maxCount = Math.max(maxCount, Math.max(...dataset.data.filter(item => !isNaN(item))));
                        }
                    });

                    maxCount = Math.ceil(maxCount * 1.2);                    

                    var monthlySalesChart = document.getElementById('chartjsGroupedBarPICAssigned').getContext('2d');
                    new Chart(monthlySalesChart, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: datasets
                        },
                        options: {
                            maintainAspectRatio: false,
                            plugins: {
                                datalabels: getDatalabelsConfigBar(),
                            },
                            legend: {
                                display: true,
                                labels: {
                                    display: true
                                }
                            },
                            scales: {
                                xAxes: [{
                                    display: true,
                                    barPercentage: 0.9,
                                    categoryPercentage: 0.7,
                                    gridLines: {
                                        display: false
                                    },
                                    ticks: {
                                        fontColor: '#8392a5',
                                        fontSize: 10
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        color: gridLineColor
                                    },
                                    ticks: {
                                        fontColor: '#8392a5',
                                        fontSize: 10,
                                        min: 0,
                                        max: maxCount // Dynamically set the max value
                                    }
                                }]
                            }
                        }
                    });

                } else {
                    console.error('Data is not in expected format.');
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX error: ' + status + ' ' + error);
            }
        });
    }

    // Doughnut Chart
    if ($('#chartjsDoughnutPICAssigned').length) {

        // Make AJAX request to fetch data
        var getData = $.ajax({
            type: 'GET',
            enctype: 'multipart/form-data',
            url: UrlOrigin + '/tms/AnnualPicAssignBosTicketCount', // Replace this with the correct URL
            processData: false,
            cache: false,
            contentType: false,
            timeout: 800000,
            success: function (data) {

                if (data != null) { 

                    var labels = [];
                    var counts = [];
                    var backgroundColors = [];

                    var categoryColors = [colors.primary, colors.danger, colors.success, colors.warning, colors.info, colors.secondary, colors.light, colors.dark, colors.muted];

                    data.forEach(function (item, index) {
                        labels.push(capitalizeFirstLetter(item.assignpic));
                        counts.push(item.count);   
                        backgroundColors.push(categoryColors[index] || '#cccccc');  // Default to grey if index exceeds the array
                    });

                    // Create Doughnut chart using dynamic data
                    new Chart($('#chartjsDoughnutPICAssigned'), {
                        type: 'doughnut',
                        data: {
                            labels: labels,  // Label names
                            datasets: [
                                {
                                    label: "Populations",
                                    backgroundColor: backgroundColors,
                                    borderColor: colors.cardBg,
                                    data: counts,   
                                    datalabels: {
                                        anchor: 'center',
                                    }
                                }
                            ]
                        },
                        options: {
                            aspectRatio: 1,
                            plugins: {
                                datalabels: getDatalabelsConfigDoughnut(),
                            },
                            legend: {
                                display: true
                            }
                        }
                    });

                } else {
                    console.error('Data is null or empty');
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX error: ' + status + ' ' + error);
            }
        });

    }

    function capitalizeFirstLetter(string) {
        // Check if the string is null or empty
        if (!string || string.trim() === "") {
            return "";  // Return empty string if the input is null, empty, or just whitespace
        }

        // Trim the string to remove leading/trailing spaces, split, capitalize, and return first word
        return string.trim().split(' ')[0].charAt(0).toUpperCase() + string.trim().split(' ')[0].slice(1).toLowerCase();
    }

    $('#div_Dashboard_NewTicketBos').click(function () {
        window.location.replace(UrlOrigin + '/TMS/BosTicketRedirect?status=Open');
    });

    $('#div_Dashboard_InProgressTicketBos').click(function () {
        window.location.replace(UrlOrigin + '/TMS/BosTicketRedirect?status=Inprogress');
    });

    $('#div_Dashboard_CloseTicketBos').click(function () {
        window.location.replace(UrlOrigin + '/TMS/BosTicketRedirect?status=Resolved');
    });

    $('#div_Dashboard_OutstandingTicketBos').click(function () {
        window.location.replace(UrlOrigin + '/TMS/BosTicketRedirect?status=Outstanding');
    });


    //#endregion


    //#region Config Plugin

    function getDatalabelsConfigBar() {
        return {
            backgroundColor: function (context) {
                return context.dataset.backgroundColor;
            },
            //borderColor: 'transaparent',
            borderRadius: 15,
            //borderWidth: 2,
            color: 'white',
            display: function (context) {
                var dataset = context.dataset;
                var count = dataset.data.length;
                var value = dataset.data[context.dataIndex];
                return value > 0;  // Only display if value is greater than 0
            },
            font: {
                weight: 'bold'
            },
            padding: 7,
            // Formatter function to display percentage
            formatter: function (value, context) {
                var total = context.dataset.data.reduce(function (sum, currentValue) {
                    return sum + currentValue;
                }, 0);  // Calculate the total sum of the dataset
                var percentage = ((value / total) * 100).toFixed(2);  // Calculate percentage and format to 2 decimals
                //return percentage + '%';  // Return the formatted percentage

                return value;
            }
        };
    }

    function getDatalabelsConfigPie() {
        return {
            backgroundColor: function (context) {
                return context.dataset.backgroundColor;
            },
            //borderColor: 'transaparent',
            borderRadius: 25,
            //borderWidth: 2,
            color: 'white',
            display: function (context) {
                var dataset = context.dataset;
                var count = dataset.data.length;
                var value = dataset.data[context.dataIndex];
                return value > 0;  // Only show label if the value is greater than 0
            },
            font: {
                weight: 'bold'
            },
            padding: 6,
            // Formatter function to display percentage
            formatter: function (value, context) {
                var total = context.dataset.data.reduce(function (sum, currentValue) {
                    return sum + currentValue;
                }, 0);  // Calculate the total sum of the dataset
                var percentage = ((value / total) * 100).toFixed(2);  // Calculate percentage and format to 2 decimals
                return percentage + '%';  // Return the formatted percentage
            }
        };
    }

    function getDatalabelsConfigDoughnut() {
        return {
            backgroundColor: function (context) {
                return context.dataset.backgroundColor;
            },
            //borderColor: 'transaparent',
            borderRadius: 25,
            //borderWidth: 2,
            color: 'white',
            display: function (context) {
                var dataset = context.dataset;
                var count = dataset.data.length;
                var value = dataset.data[context.dataIndex];
                return value > 0;  // Only show label if the value is greater than 0
            },
            font: {
                weight: 'bold'
            },
            padding: 6,
            // Formatter function to display percentage
            formatter: function (value, context) {
                var total = context.dataset.data.reduce(function (sum, currentValue) {
                    return sum + currentValue;
                }, 0);  // Calculate the total sum of the dataset
                var percentage = ((value / total) * 100).toFixed(2);  // Calculate percentage and format to 2 decimals
                return percentage + '%';  // Return the formatted percentage
            }
        };
    }



    //#endregion
});