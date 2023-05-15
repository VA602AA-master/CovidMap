const d3 = require('d3');


function MapVisualization(){
    //const width = 800;
    //const height = 600;

    function me(selection){
        const fc = selection.datum()
        const projection = d3.geoMercator()
            .center([12.490367188063198, 42.004858406718476])
            .scale(1800);
        const path = d3.geoPath().projection(projection);

        selection.selectAll('path')
            .data(fc.features)
            .join('path')
            .attr('d', path)
    }

    return me;
}

function BubbleMapVisualization(){
    const attribute = 'totale_positivi';
    const projection = d3.geoMercator()
        .center([12.490367188063198, 42.004858406718476])
        .scale(1800);
    const r = d3.scaleSqrt()
        .domain([0, 1500])
        .range([0, 15]);

    function me(selection){

        selection.selectAll('circle')
            .data(selection.datum())
            .join('circle')
            .attr('cx', d => projection([d.long, d.lat])[0])
            .attr('cy', d => projection([d.long, d.lat])[1])
            .attr('r', d => r(d[attribute]))
            .attr('fill', 'red')
    }

    return me;
}

export {MapVisualization, BubbleMapVisualization}