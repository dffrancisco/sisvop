let xgMarca;

$(function () {
    marca.grid();
    xgMarca.queryOpen({search: ''})
});

const marca = (function (){
    let url = 'marca/per.marca.php';
    let controleGrid;

    function grid(){

        xgMarca = new xGridV2.create({
            el: '#pnGridMarca',
            height: '200',
            theme: 'x-clownV2',
            
            columns:{

                Marca:{
                    dataField: 'marca',
                    // style: "font-size: 12px",
                },
            },

            sideBySide:{
                el: "#pnFields",
                frame:{
                    el: "#pnButtons",
                    buttons:{

                        novo:{
                            html: "Novo",
                            class: "btnP",
                            state: xGridV2.state.insert,
                            click: novo,
                        },
                        edit:{
                            html: "Editar",
                            class: "btnP",
                            state: xGridV2.state.update,
                            click: edit,
                        },
                        deletar:{                            
                            html: "Deletar",
                            class: "btnP btnDel",
                            state: xGridV2.state.delete,
                            click: deletar,
                        },
                        save: {
                            html: "Salvar",
                            class: "btnP",
                            state: xGridV2.state.save,
                            click: salvar,
                        },
                        cancelar: {
                            html: "Cancelar",
                            class: "btnP",
                            state: xGridV2.state.cancel,
                            click: cancelar,
                        },
                    },
                },
            },
            query: {
                execute: (r) => {                    
                    getMarcas(r.param.search, r.offset);   
                } 
            } ,
        });
    }    

    function getMarcas(search, offset){
        axios.post(url, {
            call: 'getMarca',
            param: {search: search, offset: offset}
        }).then(rs => {
            xgMarca.querySourceAdd(rs.data);
            if (offset == 0) xgMarca.focus();
        })            
    }

    function novo(){

        xgMarca.clearElementSideBySide()
        xgMarca.focusField()
        xgMarca.disable()
    }

    function edit(){
        controleGrid = "edit"
    }

    function deletar(){
        let param;
        console.log('DELETE')
        if(xgMarca.dataSource().id_marca){

            param = xgMarca.dataSource().id_marca;
            
            console.log(param)
            axios.post(url, {

                call: 'deletar',
                param: param

            }).then(rs => {

                xgMarca.deleteLine();
            });        
        }
    }

    function salvar(){
        let param;        
        param = xgMarca.getElementSideBySideJson();

        if(controleGrid == 'edit'){
            param.id_marca = xgMarca.dataSource().id_marca;
        }

        axios.post(url,{
            call: 'salvar',
            param: param
        }).then(rs => {

            if(rs.data.id_marca){
                param.id_marca = rs.data.id_marca; 
                xgMarca.insertLine(param);            
                
            }else{ 
                xgMarca.dataSource(param);
            }
        });

        xgMarca.enable()
        xgMarca.focus()
    }

    function cancelar(){
        
        xgMarca.enable();         
        xgMarca.focus();
    }

    return{
        grid: grid,
    };

})();