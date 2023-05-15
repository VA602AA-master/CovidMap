const d3 = require('d3');


export default function MapVisualization(){
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

