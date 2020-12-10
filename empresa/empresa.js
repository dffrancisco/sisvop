let xgProduto;


$(function () {
    exemplo.grid()
    exemplo.getExemplo()
});


var exemplo = (function () {

    let grid = ()=>{
        xgProduto = new xGridV2.create({
            el:'#xgProduto',
            height:200,
            columns:{
                Desc:{dataField:'descricao'},
                Marca:{dataField:'marca'},
            }
        })
    }

    function getExemplo() {
        axios.post('empresa/per.empresa.php', {
            call: 'exemplo'
        })
            .then(r => {
                xgProduto.source(r.data)
                console.log(r);
            })
    }

    

    return {
        getExemplo: getExemplo,
        grid:grid,
    }
})();
