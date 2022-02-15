d3.csv("DATASET/Deaths_EU.csv").then(function(data){
    data.forEach(function(d){
        d["Country"] = d.Entity;
        d.Year = +d.Year; //Convert to date
        d.Unsafe_water_source = +d.Unsafe_water_source; //Convert to number
        d.Unsafe_sanitation = +d.Unsafe_sanitation;
        d.Household_air_pollution_from_solid_fuels = +d.Household_air_pollution_from_solid_fuels;
        d.Child_wasting = +d.Child_wasting;
        d.Low_birth_weight_for_gestation = +d.Low_birth_weight_for_gestation;
        d.Secondhand_smoke = +d.Secondhand_smoke;
        d.Alcohol_use = +d.Alcohol_use;
        d.Drug_use = +d.Drug_use;
        d.Diet_low_in_fruits = +d.Diet_low_in_fruits;
        d.Unsafe_sex = +d.Unsafe_sex;
        d.High_fasting_plasma_glucose = +d.High_fasting_plasma_glucose;
        d.High_body_mass_index = +d.High_body_mass_index;
        d.High_systolic_blood_pressure = +d.High_systolic_blood_pressure;
        d.Smoking = +d.Smoking;
        d.Iron_deficiency = +d.Iron_deficiency;
        d.Vitamin_A_deficiency = +d.Vitamin_A_deficiency;
        d.Low_bone_mineral_density = +d.Low_bone_mineral_density;
        d.Air_pollution = +d.Air_pollution;
        d.Outdoor_air_pollution = +d.Outdoor_air_pollution;
        d.Diet_high_in_sodium = +d.Diet_high_in_sodium;
    });

    let Array_Deaths = ["Unsafe_water_source","Unsafe_sanitation","Household_air_pollution_from_solid_fuels","Child_wasting","Low_birth_weight_for_gestation",         "Secondhand_smoke","Alcohol_use","Drug_use","Diet_low_in_fruits","Unsafe_sex","High_fasting_plasma_glucose","High_body_mass_index","High_systolic_blood_pressure",         "Smoking","Iron_deficiency","Vitamin_A_deficiency","Low_bone_mineral_density","Air_pollution","Outdoor_air_pollution","Diet_high_in_sodium"];


    var mylist = document.getElementById("List_Deaths");
    mylist.addEventListener('change', Change_In_Boxplot);

    var slider = document.getElementById("Slider_Year");
    slider.addEventListener('change', Change_In_Boxplot);

    var screenWidth = window.innerWidth
    var screenHeight = window.innerHeight
    



      //funzione per ricavare i morti e metterli in un array

    function getDeathForEachCountry(death_Selected, year_Selected){
        var deathArray = [];
        var l=0;
        for( var i = 0; i < data.length; i++ ){
            if(data[i].Year == year_Selected){
                if(data[i][death_Selected] >= 0){
                    deathArray[l] = parseFloat(data[i][death_Selected])
                } 
                else{
                    deathArray[l] = 0
                }
                
                l++
                                
            }
        }
        return deathArray;
    }

    function Check_Country(numb_death,death,year){
        for(var i=0; i<data.length ; i++){
            if(data[i].Year == year ){
                
                if(data[i][death] == numb_death){
                    return data[i].Country
                }
                
            }
        }
    }
    
    function Change_In_Boxplot(){

        d3.selectAll("#boxplot").selectAll("*").remove();


        var death_Selected = mylist.options[mylist.selectedIndex].value;
        var year_Selected = document.getElementById("Slider_Year").value;

        //Per trovare il massimo e il minimo nell'array e costruirci una scala
        var dataSelected = getDeathForEachCountry(death_Selected, year_Selected);
        //max
        var scaleMaximum = dataSelected.reduce(function(a,b){
            return Math.max(a,b);
        }, -Infinity);
        //min
        
        var scaleMinimum = dataSelected.reduce(function(a, b) {
            return Math.min(a, b);
        });


        // set the dimensions and margins of the graph. Per mettere due grafici width diventerà widthBoxPlot
        var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = (screenWidth/9) - margin.left - margin.right,
        //height = (screenHeight/2.3) - margin.top - margin.bottom;
        height =(screenHeight/2.279) - margin.top - margin.bottom;
        // append the svg object to the body of the page
        var svg = d3.select("#boxplot")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        //statistics
        var data_sorted = dataSelected.sort(d3.ascending)
        var q1 = d3.quantile(data_sorted, .25)
        var median = d3.quantile(data_sorted, .5)
        var q3 = d3.quantile(data_sorted, .75)
        var interQuantileRange = q3 - q1
        var min = 0
        var max = q1 + 1.5 * interQuantileRange
        
        //Y scale
        var yscale = d3.scaleLinear()
                .domain([scaleMinimum, scaleMaximum])
                .range([height, 0]);
        svg.call(d3.axisLeft(yscale))

        // a few features for the box
        var center = 65
        var width = 90

        // Show the main vertical line
        svg.append("line")
            .attr("x1", center)
            .attr("x2", center)
            .attr("y1", yscale(min) )
            .attr("y2", yscale(max) )
            .attr("stroke", "black")

        // Show the box
        svg.append("rect")
            .attr("x", center - width/2)
            .attr("y", yscale(q3) )
            .attr("height", (yscale(q1)-yscale(q3)) )
            .attr("width", width )
            .attr("stroke", "black")
            .style("fill", "#35c2b4")

        // show median, min and max horizontal lines
        svg.selectAll("toto")
            .data([min, median, max])
            .enter()
            .append("line")
            .attr("x1", center-width/2)
            .attr("x2", center+width/2)
            .attr("y1", function(d){ return(yscale(d))} )
            .attr("y2", function(d){ return(yscale(d))} )
            .attr("stroke", "black")

        var jitterWidth = 50
        svg.selectAll("indPoints")
            .data(data_sorted)
            .enter()
            .append("circle")
            .attr("cx", function(d){
                return(center - jitterWidth/2 + Math.random()*jitterWidth )})
            .attr("cy", function(d){
                return(yscale(d))})
            .attr("r", 4)
            .attr("id_Country",function(d){
                //console.log(d)
                return Check_Country(d,death_Selected,year_Selected)
            })
            .style("fill", "white")
            .attr("stroke", "black")

    }

    Change_In_Boxplot();

    

});

function Stroke_Country_boxplot(){
    var numero_Country_Brushed =  document.getElementById("number_of_Country_Selected").value
    var boxp = document.getElementById("boxplot")
    var boxp_svg = boxp.getElementsByTagName("circle")

    for (let i=0; i < boxp_svg.length; i++){
        circle_to_color = boxp_svg[i]

        circle_to_color.setAttribute("r","4")
        circle_to_color.style["fill"] = "white"
    }

    if(numero_Country_Brushed > 0){
        
        for(var i=0; i < boxp_svg.length ; i++){
            for(let l=1; l<=numero_Country_Brushed;l++){
                var base = "Selected_Country_"
                var id_country = base.concat(l)
                country_parsed = document.getElementById(id_country).getAttribute("value")
                if(boxp_svg[i].getAttribute("id_Country") === country_parsed){
                    circle_to_color = boxp_svg[i]
                    circle_to_color.setAttribute("r","8")
                    circle_to_color.setAttribute("opacity","1")
                    circle_to_color.style["fill"] = "blue"
                    /*circle_to_color[0].style["stroke-width"]="11"
                    circle_to_color[0].style["stroke"] = "blue"*/
                }
            }

        }

    }/*
    else{
        for (let i=0; i < boxp_svg.length; i++){
            circle_to_color = boxp_svg[i]

            circle_to_color.setAttribute("r","4")
            circle_to_color.style["fill"] = "white"
        }
    }*/
    
}
