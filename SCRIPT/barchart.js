function Change_barchart(){

    var numero_Country_Brushed =  document.getElementById("number_of_Country_Selected").value

    var screenWidth = window.innerWidth
    var screenHeight = window.innerHeight
    var SelectedCountries = []

    for(let l=1; l<=numero_Country_Brushed;l++){
        var base = "Selected_Country_"
        var id_country = base.concat(l)
        country_parsed = document.getElementById(id_country).getAttribute("value")
        SelectedCountries.push(country_parsed)
    }
    //SelectedCountries = SelectedCountries.sort()

    var margin = {top: 0, right: 20, bottom: 0, left: 200},
        width = (screenWidth/2) - margin.left - margin.right,
        height = (screenHeight/2) - margin.top - margin.bottom;

    /*var SelectedCountries = ["Albania","Austria","Belarus","Belgium","Bosnia and Herzegovina","Bulgaria","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France",
        "Germany","Greece","Hungary","Iceland","Ireland","Italy","Latvia","Lithuania","Luxembourg","Macedonia","Malta","Moldova","Montenegro","Netherlands",
        "Norway","Poland","Portugal","Romania","Serbia","Slovakia","Slovenia","Spain","Sweden","Switzerland","Ukraine","United Kingdom"]   //è quello che mi arriva dalle checkbox
        SelectedCountries.sort() //nel caso non lo fosse/*/


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
            d.Low_bone_mineral_density = +d.Low_bone_mineral_density; //dimenticato il piu
            d.Air_pollution = +d.Air_pollution;
            d.Outdoor_air_pollution = +d.Outdoor_air_pollution;
            d.Diet_high_in_sodium = +d.Diet_high_in_sodium;
            d.Diet_low_in_whole_grains = +d.Diet_low_in_whole_grains; //aggiunto
        });

        
        
        let Array_Deaths = ["Unsafe_water_source","Unsafe_sanitation","Household_air_pollution_from_solid_fuels","Child_wasting","Low_birth_weight_for_gestation",
            "Secondhand_smoke","Alcohol_use","Drug_use","Diet_low_in_fruits","Unsafe_sex","High_fasting_plasma_glucose","High_body_mass_index","High_systolic_blood_pressure",
            "Smoking","Iron_deficiency","Vitamin_A_deficiency","Air_pollution","Outdoor_air_pollution","Diet_high_in_sodium"]; //grains da togliere?
        //21

        let Countries =["Albania","Austria","Belarus","Belgium","Bosnia and Herzegovina","Bulgaria","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France",
            "Germany","Greece","Hungary","Iceland","Ireland","Italy","Latvia","Lithuania","Luxembourg","Macedonia","Malta","Moldova","Montenegro","Netherlands",
            "Norway","Poland","Portugal","Romania","Serbia","Slovakia","Slovenia","Spain","Sweden","Switzerland","Ukraine","United Kingdom"];  //39  //macedonia e UK messe bene  (hungary doppia rimossa)

        var ColorsTest = ['#F44336','#FFEBEE','#FFCDD2','#EF9A9A','#E57373','#EF5350','#F44336','#E53935','#D32F2F','#C62828','#B71C1C','#FF8A80','#FF5252','#FF1744','#D50000','#E91E63',
        '#FCE4EC','#F8BBD0','#F48FB1','#F06292','#EC407A','#E91E63','#D81B60','#C2185B','#AD1457','#880E4F','#FF80AB','#FF4081','#F50057','#C51162','#9C27B0','#F3E5F5','#E1BEE7',
        '#CE93D8','#BA68C8','#AB47BC','#9C27B0','#8E24AA',"#FFFF00"] //39

        var DistinctColors = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a"] //10


        var slider = document.getElementById("Slider_Year");
        slider.addEventListener('change', Change_In_Barchart);

        var mylist = document.getElementById("List_Deaths");
        mylist.addEventListener('change', Change_In_Barchart);

        var margin = {top: 5, right: 20, bottom: 0, left: 200},
            width = (screenWidth/1.644) - margin.left - margin.right,
            height = (screenHeight/1.945) - margin.top - margin.bottom;

        

        

        function NormalizeAndRetrieve(relevantVal){
            
            
            
            var ArrayTotals = new Array(Array_Deaths.length).fill(0);
            for( var i = 0; i < Array_Deaths.length; i++){
                for (var j = 0; j < SelectedCountries.length; j++){
                    
                    if (relevantVal[j][Array_Deaths[i]] > 0){
                        ArrayTotals[i] =  ArrayTotals[i] + relevantVal[j][Array_Deaths[i]]
                    }
                    //else non agg nulla
                }
            }

            

            //relevant values è una matrice CountryXMorte, io devo passare a MorteXCountry, oltre a normalizzare

            var NormalizedValues = new Array(Array_Deaths.length);
            var sum = 0
            for( var i = 0; i < Array_Deaths.length; i++){
                NormalizedValues[i] = new Array(SelectedCountries.length); 
                sum = 0
                for (var j = 0; j < SelectedCountries.length; j++){
                    if (relevantVal[j][Array_Deaths[i]] >= 0){
                        
                        NormalizedValues[i][SelectedCountries[j]] = (relevantVal[j][Array_Deaths[i]]/ArrayTotals[i])*100  
                    }
                    else{
                        NormalizedValues[i][j] = 0.0
                    }
                    sum += NormalizedValues[i][j]
                }
                //console.log(sum)
            }
            
            //console.log(NormalizedValues)
            

            return NormalizedValues
        }

    
        

        function Change_In_Barchart(){

            d3.selectAll("#barchart").selectAll("*").remove();
            d3.selectAll("#DivRectStats").remove();



            let year_Selected = document.getElementById("Slider_Year").value;



            var RelevantValues = new Array(SelectedCountries.length);

            for (var i = 0; i < SelectedCountries.length; i++) {
                RelevantValues[i] = new Array(Array_Deaths.length + 3);  //ha nome country e  entity e year in piu
            }
            
            
            for( var i = 0; i < SelectedCountries.length; i++ ){
                for (var k=0; k < data.length; k++){
                    if(data[k].Year == year_Selected && data[k].Country == SelectedCountries[i]){
                        RelevantValues[i] = data[k]
                    }
                }
            }
            //console.log(RelevantValues)

            var svg = d3.select("#barchart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform","translate(" + margin.left + "," + margin.top + ")"); //cos'è
            
            var textHint = d3.select("#barchartTextHint");

            if(SelectedCountries.length == 0){
                textHint.style('opacity', 1);
            }
            else{
                textHint.style('opacity', 0);
            }   
                

            

            // Add X axis
            var x = d3.scaleLinear()
                .domain([0, 100])
                .range([ 0, width ]);
            svg.append("g")
                .call(d3.axisBottom(x));

            // Add Y axis
            var y = d3.scaleBand()
                .domain(Array_Deaths)
                .range([30, height])
            svg.append("g")
                .call(d3.axisLeft(y).tickSizeOuter(0));

            var color = d3.scaleOrdinal()
                .domain(SelectedCountries)  
                .range(DistinctColors)

            normalized_values = NormalizeAndRetrieve(RelevantValues)

            //console.log(normalized_values)

            //groups = cause morte
            //subgroups = countries

            var div_RectStats = d3.select('body').append('div')   
                            .attr('id', 'DivRectStats')   
                            .style('opacity', 0);

            

            var stackGen = d3.stack().keys(SelectedCountries)
            var stackedData = stackGen(normalized_values)

            var deathNum = -1
            
            //console.log(stackedData)

            svg.append("g")
                .selectAll("g")
                .data(stackedData)
                .enter().append("g")  //loop
                    .attr("fill", function(d) { 
                        return color(
                            d.key); })
                    .attr("countr", function(d){
                        return d.key
                    })    
                    .selectAll("rect")   //selecta i rettangoli
                    .data(function(d) {  
                        return d; }) 
                    .enter()  //loop  //entra nell' array di una Nazione
                    
                    .append("rect")  //aggiunge un rettangolo
                        .attr("x", function(d) { 
                    
                            //console.log(d[0]) //originale (fino a 100 o meno)
                            //console.log(x(d[0])) //scalato con width
                            return x(d[0]); })  //d riguarda valori di una morte per quella Nazione
                        .attr("y", function(d) { 
                            if (deathNum == Array_Deaths.length - 1){
                                deathNum = -1
                            }
                            deathNum++;
                            return y(Array_Deaths[deathNum]); })
                        .attr("deathType", function(d){
                            if (deathNum == Array_Deaths.length - 1){
                                deathNum = -1
                            }
                            deathNum++;
                            return Array_Deaths[deathNum] })
                        
                        .attr("height",y.bandwidth()-4)  //qui decidi spessore righe
                        .attr("width", function(d) { return x(d[1]) - x(d[0]); })

                        //.attr("opacity", 0.5)

                    


                        .on("mousemove",function(_event,d){
                            //console.log(_event)  
                            //console.log(_event.path)
                            deathType = _event.path[0].getAttribute("deathType") //death of the entered rect
                            country = _event.path[1].getAttribute("countr")  //country of the entered rect
                            var countryPosition = 0
                            for (var i = 0; i < SelectedCountries.length; i++) {
                                if (SelectedCountries[i] == country){
                                    countryPosition = i
                                }
                                
                            }
                            
                            quantitativeValue = RelevantValues[countryPosition][deathType].toFixed(0)


                            percentageValue = Math.round((d[1] - d[0]) * 100) / 100


                            //console.log(countryPosition)
                            //console.log(_event.path[0].getAttribute("deathType"))  
                            //console.log(_event.path[1].getAttribute("countr"))    

                            //console.log(d)
                            
                            div_RectStats.transition()        
                                    .duration(0)      
                                    .style('opacity', .9);
                            div_RectStats.html(
                                country + "\n\n" 
                                + "Percentage: " + percentageValue + " %\n"
                                + "Death Number: " + quantitativeValue)
                                    //.style('left', (_event.path[0].getAttribute("x") +40) + 'px')     
                                    //.style('top', (_event.path[0].getAttribute("y") +100) + 'px'); 
                                    .style('left', (_event.pageX -0) + 'px')  
                                    .style('top', (_event.pageY - 85) + 'px');  
                        
                        })

                        .on("mouseleave",function(){
                            div_RectStats.transition()  
                                .duration(0)          
                                .style('opacity', 0);
                                div_RectStats.html('')
                        });
            
                            
        }

        Change_In_Barchart();
        


    })
}