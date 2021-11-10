
class TreeNode {
    constructor(id,titulo){
        this.id = id;
        this.titulo = titulo;
        this.hijos = [];
    }
}

const ls_puestos = JSON.parse( localStorage.getItem("puestos") )
                 .map( (i) => {return {id:i.id, titulo:i.titulo, padre: i.parent[0] } })   ;

const setHijos = ( nodo ) => {
    const h = ls_puestos.filter( (i) => i.padre === nodo.id ).map( (obj) => new TreeNode(obj.id,obj.titulo));
    nodo.hijos.push(...h);
    h.forEach( (hijo) => setHijos(hijo) );
}

const root = new TreeNode( ls_puestos[0].id, ls_puestos[0].titulo );
setHijos(root);

