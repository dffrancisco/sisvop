let xgProduto;


$(function () {
    exemplo.grid()
    exemplo.getExemplo()
});


var exemplo = (function () {
    let url = 'empresa/per.empresa.php'
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
        axios.post(url, {
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
