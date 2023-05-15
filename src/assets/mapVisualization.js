const d3 = require('d3');


function MapVisualization(){
    //const width = 800;
    //const height = 600;
    let projection = d3.geoMercator()
        .center([0, 0])
        .scale(1);

    function me(selection){
        const fc = selection.datum()

        const path = d3.geoPath().projection(projection);

        selection.selectAll('path')
            .data(fc.features)
            .join('path')
            .attr('d', path)
    }

    me.projection = function(value){
        if(!arguments.length) return projection;
        projection = value;
        return me;
    }

    return me;
}

function BubbleMapVisualization(){
    let attribute = 'totale_positivi';
    let projection = d3.geoMercator()
        .center([0, 0])
        .scale(20);
    const r = d3.scaleSqrt()
        .domain([0, 1500])
        .range([0, 15]);

    function me(selection){
        r.domain([0, d3.max(selection.datum(), d => d[attribute])]);

        selection.selectAll('circle')
            .data(selection.datum())
            .join('circle')
            .attr('cx', d => projection([d.long, d.lat])[0])
            .attr('cy', d => projection([d.long, d.lat])[1])
            .attr('r', d => r(d[attribute]))
            .attr('fill', 'red')
    }

    me.attribute = function(value){
        if(!arguments.length) return attribute;
        attribute = value;
        return me;
    }

    me.projection = function(value){
        if(!arguments.length) return projection;
        projection = value;
        return me;
    }

    return me;
}

export {MapVisualization, BubbleMapVisualization}