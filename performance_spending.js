/**
 * Call our functions on window load event
 */
window.onload = function(){
    setup();
};

/**
 * Global variables
 */
var mainData;               // our visualization
/**
 * Function setup: sets up our visualization environment.
 * You can change the code to not have static paths and elementID's
 */
function createHexagons(size){

}
let svgCanvas;
let mainCircle;
let outerCircle;
function setupCanvas(){
    svgCanvas = d3.select("#vis")
        // .attr("width", "1700")
        // .attr("height", "1000")
        .attr("viewBox", "0 0 1700 1000")
        .attr("preserveAspectRatio","xMinYMin meet")
        // .attr("overflow", "visible")
        // .attr("transform", function(hex) {
        //     return "translate(" + 500 + "," + 0 + ")";
        //  });



    mainCircle = svgCanvas.append("circle")
        .attr("id", "ball")
        .attr("cx", 575)
        .attr("cy", 375)
        .attr("r", 350)
        .attr("stroke", "#38003c")
        .attr("stroke-width", "10")
        .attr("fill", "#ffffff");

    outerCircle = svgCanvas.append("circle")
        .attr("id", "filter")
        .attr("cx", 575)
        .attr("cy", 375)
        .attr("r", 500)
        .attr("stroke", "#38003c")
        .attr("stroke-width", "2")
        .attr("stroke-dasharray","2")
        .attr("fill", "none");
}


function calculateScaledPoints(hex, sizeScale){
    console.log(hex.points);



    let height = (Math.sqrt(3)/2);
    let radius = sizeScale(hex.averagepoints);
    console.log(hex.averagepoints + "averagepoints of " + hex.name);
    let xPoint = hex.x +200 ;
    let yPoint = hex.y +90;
    console.log("radius", radius);

    hex.topleftx = radius/2+xPoint - radius;
    hex.toplefty = -radius*height+yPoint + radius/4 - height;

    let newPoint = "";
    newPoint += parseInt(radius+xPoint)+","+parseInt(yPoint);
    newPoint += " "+parseInt(radius/2+xPoint)+","+parseInt(radius*height+yPoint);
    newPoint += " "+parseInt(-radius/2+xPoint)+","+parseInt(radius*height+yPoint);
    newPoint += " "+parseInt(-radius+xPoint)+","+parseInt(yPoint);
    newPoint += " "+parseInt(-radius/2+xPoint)+","+parseInt(-radius*height+yPoint);
    newPoint += " "+parseInt(radius/2+xPoint)+","+parseInt(-radius*height+yPoint);

    console.log("hex points original", hex.points);
    console.log("new scaled", newPoint);
    hex.radius = radius;
    hex.points = newPoint;

}
function alterspiderchart(team, index){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Best Finish', 'Worst Finish', 'Usual Finish', 'Points', 'Goal Differential', "Top 4 Finishes", "League Titles", "Times Relegated", "Years in League", "Player Arrivals(Hundred)", "Player Departures(hundreds)"],
            datasets: [{
                label: "League Averages",
                backgroundColor: 'rgba(4,245,255,0.1)',
                data: [8.26, 18.5, 13.28, 46, -11, 2.12, 0.5, 1.61, 10.86, 5.5, 5.4]
            },
            {
                label: `${team.name}`,
                backgroundColor: 'rgba(233,0,82,0.1)',
                data: [parseInt(team.bestfinish), parseInt(team.worstfinish), parseInt(team.averagefinish), parseInt(team.averagepoints), parseInt(team.averagegd), parseInt(team.top4finishes), parseInt(team.titles), parseInt(team.timesrelegated), parseInt(team.yearsinepl), (parseInt(team.arrivals)/100), (parseInt(team.departures)/100)]
            }]
        },
        options: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Team Performance VS League Averages'
            },
            scale: {
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    pointLabelFontSize:300
                }
            },

        },
    });

    console.log(team);
}

// function getAverageResults(team){
//     let average = {
//         bestfinish: 8.26,
//         worstfinish: 906,
//         usualfinish: 13.38,
//         points: 46,
//         goaldifferential: -11,
//         top4: 2.12,
//         top5to7: 1.55,
//         titles: 0.5,
//         relegated: 1.61,
//         yearinleague: 10.86,
//         playerarrivals: 550,
//         playerdepartures: 540,
//     }
// }
function drawRectangles(hexjson){
    let teams = hexjson.hexes;
    //magic numbers of circle x and y


    for (let i in teams){
        //magic numbers: 49 = number of teams
        //magic numbers: 500 = radius of outer circle
        //width and height randomly set
        let angle = ((i/(49/2)) * Math.PI);
        let elementX= 575 + ((630)*Math.sin(angle));
        // elementX = (elementX < 512) ? elementX - 200 : elementX + 50;
        let textAnchorEnd = "start";
        if (elementX < 543){textAnchorEnd = "end";}
        if (( 574 < elementX) && ( elementX < 616)){textAnchorEnd = "middle";}
        console.log(elementX);

        let elementY = 375 + ((520) * Math.cos(angle));

        let opacityChange = d3.transition()
            .duration(740)
            .ease(d3.easeLinear);

        let labelContainer = svgCanvas.append("text")
            .attr("id", `${teams[i].name}label`)
            .attr("x", elementX)
            .attr("y", elementY)
            .text(teams[i].name)
            .attr("fill", "gray")
            .attr("fill-opacity", "0.3")
            .attr("text-anchor", function(){
                return textAnchorEnd;
             })
            .on('mouseover', function(d){
                d3.select(this).attr("fill",'#38003c')
                    .attr("fill-opacity", "1");
                d3.select(`#line${i}`).attr("visibility", "visible");
                d3.select(`#zoom`).transition(opacityChange)
                    .style("fill-opacity", "1");
                d3.select(`#innerimage${i}`).transition(opacityChange)
                    .style("opacity", "1");
                alterspiderchart(teams[i],i);
                d3.select("#myChart").transition(opacityChange)
                    .style("opacity", "1");
                // d3.selectAll("polygon").attr("visibility", "hidden");
                console.log("hover");
                // Selection.select("text").style({opacity:'1.0'});
            })
            .on('mouseout', function(d){
                d3.select(this).attr("fill",'gray')
                    .attr("fill-opacity", "0.3");
                d3.select(`#line${i}`).attr("visibility", "hidden");
                d3.select(`#zoom`).transition(opacityChange)
                    .style("fill-opacity", "0");
                d3.select(`#innerimage${i}`).transition(opacityChange)
                    .style("opacity", "0");
                d3.select("#myChart").transition(opacityChange)
                    .style("opacity", "0");
                console.log("hover");
            // Selection.select("text").style({opacity:'1.0'});
             });



        let zoomInCircle = svgCanvas.append("circle")
            .attr("id", "zoom")
            .attr("cx", 575)
            .attr("cy", 375)
            .attr("r", 350)
            .attr("stroke", "#38003c")
            .attr("stroke-width", "10")
            .attr("fill", "#ffffff")
            .attr("fill-opacity", "0");

        let teamLogo = svgCanvas.append("svg:image")
            .attr("id", `innerimage${i}`)
            .attr("width",200)
            // .attr("height",200)
            .attr('x', 470)
            .attr('y', 100)
            .attr("xlink:href", "./images/" + teams[i].name + ".svg")
            .attr("opacity", "0");

        let connection = svgCanvas.append("line")
            .attr("x1", elementX)
            .attr("y1", elementY)
            .attr("x2", teams[i].topleftx )
            .attr("y2", teams[i].toplefty + (teams[i].radius * 2))
            .attr("visibility", "hidden")
            .attr("id", `line${i}`)
            // .text(teams[i].name)
            .attr("stroke", "#38003c")
            .attr("stroke-dasharray", 15);

        // getAverageResults(team[i]);


    }
}


function setup(){
    //read in the soccer plater csv data
    d3.csv("stats_and_expenses.csv").then(function(data){
        //console.log(data);
        setupCanvas();
        //
        // setupHexagons(data);
        d3.json("test2.hexjson").then(function(hexjson){
            console.log(hexjson);
            console.log(data);
            // Set the size and margins of the svg
            var margin = {top: 10, right: 10, bottom: 10, left: 10},
                width = 750 - margin.left - margin.right,
                height = 750 - margin.top - margin.bottom;
            // Create the svg element
            var svg = d3
                .select("#vis")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("overflow", "visible")
                .append("g");




            // Render the hexes
            var hexes = d3.renderHexJSON(hexjson, width, height);

            // Bind the hexes to g elements of the svg and position them
            var hexmap = svg
                .selectAll("g")
                .data(hexes)
                .enter()
                .append("g")
                .attr("transform", function(hex) {
                    return "translate(" + 0 + "," + 20 + ")";
                });

            let sizeScale = d3.scalePow()
                .exponent(2)
                .domain([0, d3.max(data, function(d) { return parseInt(d.averagepoints); })])
                .range([3, 60]);

            //color scale code modified from Tutorial 5 sample template
            let colorScale = d3.scaleQuantize()
                .domain([d3.min(data, function(d) { return parseInt(d.averagepoints); }), d3.max(data, function(d) { return parseInt(d.averagepoints); })])
                .range(["#e90052", "#EAFF04", "#EAFF04",  "#00ff85" ]);

            // Draw the polygons around each hex's centre
            hexmap
                .append("polygon")
                .attr("points", function(hex) {calculateScaledPoints(hex, sizeScale); return hex.points;})
                .attr("stroke", "#38003c")
                .attr("stroke-width", "2")
                .attr("fill", function(hex) {return colorScale(hex.averagepoints);})
                .attr("fill-opacity", 0.9);
                // .on('mouseover', function(d){
                //     d3.select(this).attr("transform","scale(2.5)")
                //         .attr("x", 575)
                //         .attr("y", 375);
                //     console.log("hover");
                //     // Selection.select("text").style({opacity:'1.0'});
                // });




            hexmap.append("svg:image")
                .attr("width",function(hex) {return hex.radius})
                // .attr("height",200)
                .attr('x', function(hex) {return hex.topleftx})
                .attr('y', function(hex) {return hex.toplefty})
                .attr("xlink:href", function(hex) {
                    return "./images/" + hex.name + ".svg";
                });


            drawRectangles(hexjson);

        });
    });

}
