function lengthOfElem (length, element) {
    if (element.type ==='CIRCLE') {
        console.log(`Длинна круга: ${(element.r * 2 * Math.PI).toFixed(2)}`);
        return (element.r * 2 * Math.PI).toFixed(2);
    }
    if (element.type ==='LINE') {
        console.log(`Длинна линии: ${(Math.sqrt((element.end.x - element.start.x)**2 + (element.end.y - element.start.y)**2)).toFixed(2)}`);
        return (Math.sqrt((element.end.x - element.start.x)**2 + (element.end.y - element.start.y)**2)).toFixed(2);
    }
    if (element.type ==='LWPOLYLINE') {
        let sumLength = 0;
        if (element.closed) {
            let Cclosed = Math.sqrt((element.vertices[0].x - element.vertices[element.vertices.length-1].x)**2 + (element.vertices[0].y - element.vertices[element.vertices.length-1].y)**2);
            if (element.vertices[element.vertices.length-1].bulge) {
                let tethaclosed = Math.abs(Math.atan(element.vertices[element.vertices.length-1].bulge)*4);
                sumLength += Cclosed*tethaclosed/2/Math.sin(tethaclosed/2);
            } else sumLength += Cclosed;
        }
        for (let i=1; i<element.vertices.length; i++) {
            let C = Math.sqrt((element.vertices[i].x - element.vertices[i-1].x)**2 + (element.vertices[i].y - element.vertices[i-1].y)**2);
            if (element.vertices[i-1].bulge) {
                let tetha = Math.abs(Math.atan(element.vertices[i-1].bulge)*4);
                sumLength += C*tetha/2/Math.sin(tetha/2);
            } else sumLength += C;
        };
        console.log(`Длинна полилинии: ${sumLength.toFixed(2)}`);
        return sumLength.toFixed(2);
    }
    if (element.type ==='ARC') {
        console.log(`Длинна дуги: ${(element.r * Math.abs((element.endAngle - element.startAngle))).toFixed(2)}`);
        return (element.r * Math.abs((element.endAngle - element.startAngle))).toFixed(2);
    } else {console.log(`Элемент ${element.type} не посчитан`); return 0}
}

export function TotalLength(elements) {
    console.log(elements.denormalised);
    let length = 0;
    elements.denormalised.forEach(element => {
        length += +lengthOfElem(length, element);
    });
    return length;
}