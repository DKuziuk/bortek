const TurnByDegree = 5, TurnDegree = 100, ArkToLines = 4;
// TurnByDegree - угол удиничного поворота фигуры;
// TurnDegree - полный угол поворота фигуры;
// ArkToLines - на сколько линий разбивать дуги при просчёте крайней точки.

function turnPoint (point) {
    // Функция turnPoint поворачивает точку вокруг центра системы координат
    let fi = TurnByDegree * Math.PI / 180;
    let newX = (point.x * Math.cos(fi)) - (point.y * Math.sin(fi));
    let newY = (point.x * Math.sin(fi)) + (point.y * Math.cos(fi));
    return ({
            x: newX,
            y: newY,
            z: 0
        })
}

export function areaOfElem (elements) {
    // Функция areaOfElem считает и возвращает минимальную площадь чертежа
    let area = 0;
    let xl = Math.abs(elements.parsed.header.extMax.x - elements.parsed.header.extMin.x).toFixed(2);
    let yl = Math.abs(elements.parsed.header.extMax.y - elements.parsed.header.extMin.y).toFixed(2);
    area = xl*yl;
    for (let i = 1; i <= TurnDegree/TurnByDegree; i++) {
        // В цикле поворачиваем чертёж относительно центра осей координат:
        elements.denormalised.forEach(element => {
            if (element.type ==='LINE') {
                element.start = turnPoint(element.start);
                element.end = turnPoint(element.end);
            } else if (element.type ==='ARC') {
                let newXY = turnPoint(element);
                element.startAngle += TurnByDegree * Math.PI / 180;
                element.endAngle += TurnByDegree * Math.PI / 180;
                element.x = newXY.x;
                element.y = newXY.y;
            } else if (element.type ==='CIRCLE') {
                let newXY = turnPoint(element);
                element.x = newXY.x;
                element.y = newXY.y;
            } else if (element.type ==='LWPOLYLINE') {
                for (let i=0; i<element.vertices.length; i++) {
                    let newXY = turnPoint(element.vertices[i]);
                    element.vertices[i].x = newXY.x;
                    element.vertices[i].y = newXY.y;
                };
            } else if (element.type !=='MTEXT') {
                // console.error(`Элемент не был повёрнут!`);
                // console.error(`Элемент ${element.type} не был повёрнут!`);
            }
        });

        // Находим экстремумы точек для каждого поворота фигуры:
        let minimumX, maximumX, minimumY, maximumY;
        if (elements.denormalised[0].type ==='LINE') {
            minimumX = elements.denormalised[0].start.x;
            maximumX = elements.denormalised[0].start.x;
            minimumY = elements.denormalised[0].start.y;
            maximumY = elements.denormalised[0].start.y;
        } else if (elements.denormalised[0].type ==='ARC') {
            minimumX = elements.denormalised[0].x + elements.denormalised[0].r * Math.cos(elements.denormalised[0].startAngle);
            maximumX = elements.denormalised[0].x + elements.denormalised[0].r * Math.cos(elements.denormalised[0].startAngle);
            minimumY = elements.denormalised[0].y + elements.denormalised[0].r * Math.sin(elements.denormalised[0].startAngle);
            maximumY = elements.denormalised[0].y + elements.denormalised[0].r * Math.sin(elements.denormalised[0].startAngle);
        } else if (elements.denormalised[0].type ==='CIRCLE') {
            minimumX = elements.denormalised[0].x - elements.parsed.entities[0].r;
            maximumX = elements.denormalised[0].x + elements.parsed.entities[0].r;
            minimumY = elements.denormalised[0].y - elements.parsed.entities[0].r;
            maximumY = elements.denormalised[0].y + elements.parsed.entities[0].r;
        } else if (elements.denormalised[0].type ==='LWPOLYLINE') {
            minimumX = elements.denormalised[0].vertices[0].x;
            maximumX = elements.denormalised[0].vertices[0].x;
            minimumY = elements.denormalised[0].vertices[0].y;
            maximumY = elements.denormalised[0].vertices[0].y;
        }
        elements.denormalised.forEach(element => {
            if (element.type ==='LINE') {
                if (element.start.x < minimumX) {
                    minimumX = element.start.x;
                }
                if (element.start.x > maximumX) {
                    maximumX = element.start.x;
                }
                if (element.end.x < minimumX) {
                    minimumX = element.end.x;
                }
                if (element.end.x > maximumX) {
                    maximumX = element.end.x;
                }
                if (element.start.y < minimumY) {
                    minimumY = element.start.y;
                }
                if (element.start.y > maximumY) {
                    maximumY = element.start.y;
                }
                if (element.end.y < minimumY) {
                    minimumY = element.end.y;
                }
                if (element.end.y > maximumY) {
                    maximumY = element.end.y;
                }
            } else if (element.type ==='ARC') {
                let arc = {};
                let fullAngle = element.endAngle - element.startAngle;
                for (let i = ArkToLines; i > 0; i--) {
                    arc.x = element.x + element.r * Math.cos(element.startAngle + (fullAngle / i));
                    arc.y = element.y + element.r * Math.sin(element.startAngle + (fullAngle / i));
                    if (arc.x < minimumX) {
                        minimumX = arc.x;
                    }
                    if (arc.x > maximumX) {
                        maximumX = arc.x;
                    }
                    if (arc.y < minimumY) {
                        minimumY = arc.y;
                    }
                    if (arc.y > maximumY) {
                        maximumY = arc.y;
                    }
                }
            } else if (element.type ==='CIRCLE') {
                if (element.x - element.r < minimumX) {
                    minimumX = element.x - element.r;
                }
                if (element.x + element.r > maximumX) {
                    maximumX = element.x + element.r;
                }
                if (element.y - element.r < minimumY) {
                    minimumY = element.y - element.r;
                }
                if (element.y + element.r > maximumY) {
                    maximumY = element.y + element.r;
                }
            } else if (element.type ==='LWPOLYLINE') {
                for (let i=0; i<element.vertices.length; i++) {
                    if (element.vertices[i].x < minimumX) {
                        minimumX = element.vertices[i].x;
                    }
                    if (element.vertices[i].x > maximumX) {
                        maximumX = element.vertices[i].x;
                    }
                    if (element.vertices[i].y < minimumY) {
                        minimumY = element.vertices[i].y;
                    }
                    if (element.vertices[i].y > maximumY) {
                        maximumY = element.vertices[i].y;
                    }
                };
            }
        });

        // Также для каждого поворота находим площадь:
        if (maximumX && minimumX && maximumY && minimumY) {
            let newxl = Math.abs(maximumX - minimumX).toFixed(2);
            let newyl = Math.abs(maximumY - minimumY).toFixed(2);
            let newArea = newxl*newyl;
            if (newArea < area) {
                area = newArea;
            }
        }
    }
    return area;
}