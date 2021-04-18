import React, {useRef, useEffect, useState, createContext} from "react";
import * as d3 from 'd3';

function Graph(props) {

    const d3Container = useRef(null);

    var margin = { top: 10, right: 30, bottom: 30, left: 60},
    width =  1000 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

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
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).tickFormat((d) => {
                    return d/1000000 + " Million"
                }));
            svg.append("text")
                .attr("text-anchor", "center")
                .attr("x", width/2)
                .attr("y", height + 30)
                .text("Salary in Millions");

            var y = d3.scaleLinear()
                .domain([0, 15])
                .range([ height, 0])
            svg.append("g")
                .call(d3.axisLeft(y).ticks(40));

            svg.append("text")
                .attr("text-anchor", "center")
                .attr("transform", "rotate(-90)")
                .attr("y", -margin.left+20)
                .attr("x", -(height/2))
                .text("Box Plus/Minus")
                
            svg.append('g')
                .selectAll("dot")
                .data(props.stats)
                .enter()
                .append("circle")
                    .attr("id", function (d) { return d.Player_Code })
                    .attr("cy", function (d) { return y(d.BPM)})
                    .attr("r", 3)
                    .style("fill", "#69b3a2")


            svg.selectAll("circle")
                .each(function(d) {
                    d3.select(this)
                    .attr("cx", function(d, i, element) {
                        return x(props.salaries.find(e => e.Player_Code === element[i].__data__.Player_Code).current_salary)
                    })
            })

            
       }

    }, [])

    return (
      <div className="graph" ref={d3Container}>
        
      </div>
    );
  }
  
  export default Graph;
 