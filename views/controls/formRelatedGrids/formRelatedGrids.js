
function orderGrid(gridId){
    var arg = "table#" + gridId + " div.gridOrdem input";
    dojo.query(arg).forEach(function(node, index, arr){
        dijit.byId(node.id).set('value', index + 1);
    });
}

function gridDestSubmit(){
    var form = dojo.byId(manager.getParentForm('gridDest'));
    dojo.query("table#gridDest div.gridOrdem input").forEach(function(node, index, arr){
        var list = document.createElement('INPUT');
        list.id = node.id.replace('ordem','ordemDest');
        list.name = list.id;
        list.type = 'hidden';
        list.value = dijit.byId(node.id).get('value');
        form.appendChild(list);
    });
    return true;
}   

var nOrdemDest = 1;
var arrayDest = [];
var arrayQuantDest = [];
var arrayDestId = [];

function adicionar(id, nome){
    console.log(id);
    console.log(nome);
    var gridDest = dojo.byId('gridDest');
    var pos = dojo.indexOf(arrayDestId, id);
    if (pos < 0) {
        var posNome = dojo.indexOf(arrayDest, nome);
        if (posNome < 0) {
            var tr = document.createElement('TR');
            var order = document.createElement('INPUT');
            order.id = 'ordemDest' + nOrdemDest;
            order.name = order.id;
            order.type = 'text';
            order.value = nOrdemDest;
            nOrdemDest++;
            var td0 = document.createElement('TD');
            td0.appendChild(order);
            tr.appendChild(td0);
            var td1 = document.createElement('TD');
            td1.appendChild(document.createTextNode(id));
            tr.appendChild(td1);
            var td2 = document.createElement('TD');
            td2.appendChild(document.createTextNode(nome));
            tr.appendChild(td2);
            var quant = 1;
            var td3 = document.createElement('TD');
            td3.appendChild(document.createTextNode(1));
            tr.appendChild(td3);
            gridDest.tBodies[0].appendChild(tr);
            arrayDest.push(nome)
        } else {
            console.log(gridDest.tBodies[0].rows[posNome].cells[3].innerHTML);
            var quant = parseInt(gridDest.tBodies[0].rows[posNome].cells[3].innerHTML) + 1;
            gridDest.tBodies[0].rows[posNome].cells[3].innerHTML = quant;
        }
        arrayDestId.push(id)
    } else {
        alert('Id ' + id + ' já adicionado!');
    }
    
}

function remover(id, nome){
    console.log(id);
    console.log(nome);
    var gridDest = dojo.byId('gridDest');
    console.log(arrayDestId);
    var pos = dojo.indexOf(arrayDestId, id);
    if (pos > -1) {
        console.log(arrayDest);
        var posNome = dojo.indexOf(arrayDest, nome);
        console.log('posnome = ' + posNome);
        if (posNome > -1) {
            console.log(gridDest.tBodies[0].rows[posNome].cells[3].innerHTML);
            var quant = parseInt(gridDest.tBodies[0].rows[posNome].cells[3].innerHTML) - 1;
            if (quant == 0) {
                arrayDest[posNome] = '-x-';
                arrayDestId[pos] = -1;
                gridDest.deleteRow(posNome + 1);
            } else {
                gridDest.tBodies[0].rows[posNome].cells[3].innerHTML = quant;
                arrayDestId[pos] = -1;
            }
        }
    } else {
        alert('Id ' + id + ' não está no grid destino!');
    }
    
}
