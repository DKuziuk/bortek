function lengthOfElem (element) {
    // Функция lengthOfElem считает длинну элемента чертежа
    if (element.type ==='CIRCLE') {
        return (element.r * 2 * Math.PI).toFixed(2);
    } else if (element.type ==='LINE') {
        return (Math.sqrt((element.end.x - element.start.x)**2 + (element.end.y - element.start.y)**2)).toFixed(2);
    } else if (element.type ==='LWPOLYLINE') {
        let sumLength = 0;
        // Если фигура полилинии замкнута, дополнительно считаем длинну линиё между первой и последней точками:
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
        return sumLength.toFixed(2);
    } else if (element.type ==='ARC') {
        return (element.r * Math.abs((element.endAngle - element.startAngle))).toFixed(2);
    } else {
        if (element.type !=='MTEXT') {
            // Выводим сообщений о ошибке, если элемент не является линией, кругом, дугой или полилинией:
            console.error(`Элемент ${element.type} не посчитан`);
        }
        return 0
    }
}

function layerColorIsRed (elementLayer, layers) {
    if (layers[elementLayer].colorNumber === 1) {
        return true
    } else return false
}

export function TotalLength(elements) {
    // Функция TotalLength считает суммарную длинну элементов чертежа
    let length = {
        cut: 0,
        engraving: 0
    }
    elements.denormalised.forEach(element => {
        if (element.colorNumber) {
            if (element.colorNumber === 1) {
                length.engraving += +lengthOfElem(element);
            } else {
                length.cut += +lengthOfElem(element);
            }
        } else {
            if (layerColorIsRed(element.layer, elements.parsed.tables.layers)) {
                length.engraving += +lengthOfElem(element);
            } else {
                length.cut += +lengthOfElem(element);
            }
        }
    });
    return length;
}