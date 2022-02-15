/*d3.csv("DATASET/Deaths_EU.csv").then(function(data){
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
        d.Low_bone_mineral_density = +d.Low_bone_mineral_density; //dimenticato il piu
        d.Air_pollution = +d.Air_pollution;
        d.Outdoor_air_pollution = +d.Outdoor_air_pollution;
        d.Diet_high_in_sodium = +d.Diet_high_in_sodium;
        d.Diet_low_in_whole_grains = +d.Diet_low_in_whole_grains; //aggiunto
    });*/

    let Countries =["Albania","Austria","Belarus","Belgium","Bosnia and Herzegovina","Bulgaria","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France",
        "Germany","Greece","Hungary","Iceland","Ireland","Italy","Latvia","Lithuania","Luxembourg","Macedonia","Malta","Moldova","Montenegro","Netherlands",
        "Norway","Poland","Portugal","Romania","Serbia","Slovakia","Slovenia","Spain","Sweden","Switzerland","Ukraine","United Kingdom"];  //39  

    

    var DistinctColors = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a"] //10

    var screenWidth = window.innerWidth
    var screenHeight = window.innerHeight

    

    /*var mylist = document.getElementById("List_Deaths");
    var slider = document.getElementById("Slider_Year");

    mylist.addEventListener('change', Change_In_The_ColorLegend);
    slider.addEventListener('change', Change_In_The_ColorLegend);*/


function Change_In_The_ColorLegend(){
    var SelectedCountries =[];  

    d3.selectAll("#colorlegendSVG").remove();

    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = (screenWidth/11.5) - margin.left - margin.right,
        height = (screenHeight/1.7) - margin.top - margin.bottom;
           
    var svg = d3.select("#colorlegend")
                .append("svg")
                .attr("id", "colorlegendSVG")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                /*.append("g")
    
                .attr("transform","translate(" + margin.left + "," + margin.top + ")");*/    //forse da rimettere
    
    var numero_Country_Brushed =  document.getElementById("number_of_Country_Selected").value

        if(numero_Country_Brushed>0){
            for(let l=1; l<=numero_Country_Brushed;l++){
                var base = "Selected_Country_"
                var id_country = base.concat(l)
                country_parsed = document.getElementById(id_country).getAttribute("value")
                SelectedCountries.push(country_parsed)
            }

        }
    
    
    
    
    //fill empty spaces with dummies
    let gap = SelectedCountries.length
    for(var i = 0; i < (10-gap); i ++){
        SelectedCountries.push("Dummy" + i);
    }

    var color = d3.scaleOrdinal()
                .domain(SelectedCountries)  
                .range(DistinctColors)  

    svg.append("text").attr("x", "19%").attr("y", "5%").text("DYNAMIC").style("font-size", "20px").style("font-family", "American Typewriter, serif")   
    svg.append("text").attr("x", "13%").attr("y", "9%").text("COUNTRIES").style("font-size", "20px").style("font-family", "American Typewriter, serif")   
    svg.append("text").attr("x", "22%").attr("y", "13%").text("LEGEND").style("font-size", "20px").style("font-family", "American Typewriter, serif")   
    for(var i = 0; i < 10; i++){

        let country = SelectedCountries[i]
        
        let countryName = country
        if ((country.charAt(0) == "D") && (country.charAt(1) == "u")){  //check that is dummy
            countryName = "NULL";
        }

        if (country == "Bosnia and Herzegovina"){
            countryName = "Bosnia and H."
        }
            

        let squaresSeparation = 8 * i
        
        
        svg.append("rect").attr("x", "19%").attr("y", (19 + squaresSeparation) + "%").attr("width", "10%").attr("height", "2.8%").style("fill", color(country))

        if(countryName == "NULL")
            svg.append("text").attr("x", "33%").attr("y", (20.7 + squaresSeparation) + "%").text(countryName).style("font-size", "16px").attr("alignment-baseline","middle").style("opacity", .5);
        else
            svg.append("text").attr("x", "33%").attr("y", (20.7 + squaresSeparation) + "%").text(countryName).style("font-size", "16px").attr("alignment-baseline","middle")

        //svg.append("rect").attr("x", 130 * i).attr("y",startingHighRect).attr("width", 15).attr("height", 15).style("fill", color(country))
        //svg.append("text").attr("x", 20 + (130 * i)).attr("y", startingHighRect + 10).text(country).style("font-size", "14px").attr("alignment-baseline","middle")
    

    
    }
    //console.log(SelectedCountries)

}
Change_In_The_ColorLegend();
/*
});*/