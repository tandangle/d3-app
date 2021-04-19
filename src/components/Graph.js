import React, {useRef, useEffect, useState, createContext} from "react";
import * as d3 from 'd3';

function Graph(props) {

    const togglePlayer = props.togglePlayer;

    const d3Container = useRef(null);

    var margin = { top: 10, right: 30, bottom: 30, left: 60},
    width =  1000 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

    useEffect( () => {
       if (props.salaries && props.stats) {


        var svg = d3.select(d3Container.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

            var x = d3.scaleLinear()
                .domain([0, 50000000])
                .range([ 0, width ])
           

            var y = d3.scaleLinear()
                .domain([-12, 12])
                .range([ height, 0])
            
                
            svg.append('g')
                .selectAll("dot")
                .data(props.stats)
                .enter()
                .append("svg:image")
                    .attr("id", function (d) { return d.Player_Code })
                    .datum(function(d) {return d})
                    .attr("y", function (d) { return y(d.BPM)})
                    .attr("xlink:href", function(d) { return "https://d2p3bygnnzw9w3.cloudfront.net/req/202104151/tlogo/bbr/" + d.Tm + ".png"})
                    .attr("width", function(d) { return 30 + "px"})
                    .attr("height", function(d) { return 30 + "px"})
                    .on("mouseover", function (e, d) {
                        toolTip.transition()
                        .duration(200)
                        .style("opacity", .9)
                        toolTip.html(d.Player + "</br> BPM: " + d.BPM + "</br> Salary: $" + props.salaries.find(e => e.Player_Code === d.Player_Code).current_salary.replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                            .style("left", (d3.pointer(e)[0] + window.innerWidth/3) + "px")
                            .style("top", (d3.pointer(e)[1] + 368) + "px")
                    })
                    .on("mouseout", function(e) {		
                        toolTip.transition()		
                            .duration(500)		
                            .style("opacity", 0);	
                    })
                    .on("click", function(e) {
                        togglePlayer(e.target.getAttribute("id"))
                    })
                    .each(function(d) {
                        d3.select(this)
                        .attr("x", function(d, i, element) {
                            return x(props.salaries.find(e => e.Player_Code === element[i].__data__.Player_Code).current_salary)
                        })
                    })
                    .each(function(d) {
                        if(d3.select(this).attr("x") == 0 ) {
                            d3.select(this).remove()
                        }
                    })

            svg.append("g")
            .attr("transform", "translate(0," + height/2 + ")")
            .call(d3.axisBottom(x).tickFormat((d) => {
                return d/1000000 + " Million"
            }));
            svg.append("text")
                .attr("text-anchor", "center")
                .attr("x", width/2)
                .attr("y", height/2 + 40)
                .text("Salary in Millions");

                svg.append("g")
            .call(d3.axisLeft(y).ticks(40));

            svg.append("text")
                .attr("text-anchor", "center")
                .attr("transform", "rotate(-90)")
                .attr("y", -margin.left+20)
                .attr("x", -(height/2 + 60))
                .text("Box Plus/Minus")

            var toolTip = d3.select(".graph").append("div")	
                .attr("class", "tooltip")				
                .style("opacity", 0)

       }

    }, [])

    useEffect (() => {
        if (props.player) {
            d3.select(d3Container.current).selectAll("image")
                .attr("width", function(d) { return 30 + "px"})
                .attr("height", function(d) { return 30 + "px"})
                .attr("class", null)
            d3.select(d3Container.current).select("#" + props.player)
                .attr("width", function(d) { return 50 + "px"})
                .attr("height", function(d) { return 50 + "px"})
                .attr("class", "active")
                
        }
        
    }, [props.player])

    return (
        
      <div className="graph" ref={d3Container}>
        
      </div>
    );
  }
  
  export default Graph;
 