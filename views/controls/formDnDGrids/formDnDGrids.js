
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
