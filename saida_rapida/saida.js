let xgCarrinho
let xmModalPrdutos
let xgProdutos

$(function () {
    saida.grid()
    saida.modal()

    $("#edtCodigo").focus()

    $("#buscarProdutos").click(() =>{

        xmModalPrdutos.open()
        xgProdutos.queryOpen({ search: '' })
    })
    $("#xmEdtProduto").keydown(r =>{

        if(r.keyCode == 13){
            let produto = $("#xmEdtProduto").val()
            xgProdutos.queryOpen({ search: produto })
        }

    })
    $("#edtCodigo").keydown(r =>{

        if(r.keyCode == 13){
            let codigo = $("#edtCodigo").val().trim()
            saida.getCodigoProduto(codigo)
        }

    })
    $("#edtQTD").keydown(r =>{

        if(r.keyCode == 13){
            $("#btnFinalizar").click()
        }

    })
    $("#btnFinalizar").click(()=>{
        saida.inserirCarrinho()
    })
    $("#btnDeletar").click(()=>{
        saida.retirarItem()
    })

});


var saida = (function () {

    let produto = {}
    let from = ""

    let url = "saida_rapida/per.saida.php"

    function grid() {
        xgCarrinho = new xGridV2.create({
            el: "#xgCarrinho",
            theme: "x-clownV2",
            height: "300",
            columns: {
                CODIGO:{ dataField: "CODIGO", width:"20%"},
                DESCRICAO:{ dataField: "DESCRICAO", width:"40%"},
                MARCA:{ dataField: "MARCA", width:"30%"},
                QTD:{ dataField: "QTD", width:"10%"},
            },

            onKeyDown: {
                13: (ln, e) => {
                    $("#edtQTD").focus()
                    $("#edtQTD").select()
                },
            },

            dblClick: (ln) => {
                if (ln == false) return false;
                
                $("#edtQTD").focus()
                $("#edtQTD").select()
            },

            onSelectLine: (r)=>{
                produto = r

                from = "carrinho"

                setQTD()

                $("#edtQTD").val(produto.QTD)

            },
        })

        xgProdutos = new xGridV2.create({
            el: "#xgProdutos",
            theme: "x-clownV2",
            height: "300",
            columns: {
                CODIGO:{ dataField: "CODIGO", width:"20%"},
                DESCRICAO:{ dataField: "DESCRICAO", width:"50%"},
                MARCA:{ dataField: "MARCA", width:"20%"},
                QTD:{ dataField: "QTD"},
            },

            onKeyDown: {
                13: (ln, e) => {
                    produto = ln

                    if(produto.QTD <= 0) return false

                    from = "estoque"

                    setQTD()

                    xmModalPrdutos.close()
                },
            },

            dblClick: (ln) => {
                if (ln == false) return false;
                
                if(produto.QTD <= 0) return false
                
                produto = ln
                
                setQTD(produto)

                xmModalPrdutos.close()
            },
            query: {
                execute: (r) => {
                    getProdutos(r.param.search, r.offset);
                },
            },
        })
    }

    // GET
    function getProdutos(search, offset) {
        axios.post(url, {
            call: 'getProdutos',
            param: { search: search.toUpperCase(), offset: offset }
        })
            .then(rs => {

                xgProdutos.querySourceAdd(rs.data);
                if (rs.data[0]) xgProdutos.focus();

            })

    }

    function getCodigoProduto (codigo){

        if(codigo == "" || codigo == undefined || codigo == null || codigo == NaN){
            return false
        }

        axios.post(url, {
            call: 'getCodigo',
            param: {codigo}
        })
            .then(rs => {
                produto = rs.data[0]
                console.log('produto :', produto);
                
                if(produto == "" || produto == undefined || codigo == null){
                    return false
                }

                from = "codigo"
                setQTD()
            })
    }

    // DO
    function setQTD(){

        $("#edtCodigo").val(produto.CODIGO)
        $("#spDescricao").html(produto.DESCRICAO)
        $("#spMarca").html(produto.MARCA)
        $("#spEstoque").html(produto.QTD)
        
        $("#edtQTD").val("")
        
        if(from != "carrinho"){
            $("#edtQTD").focus()
            $("#edtQTD").select()
        }


    }

    function inserirCarrinho(){

        if(produto.ID_PRODUTO == undefined || produto.ID_PRODUTO == null){
            setTimeout(()=>{
                show("Não há item!")
            })
            return false
        }

        produto.QTD = $("#edtQTD").val()

        if(produto.QTD == 0 || produto.QTD == undefined || produto.QTD == "" || produto.QTD == NaN){
            setTimeout(()=>{
                show("Quantidade vazia!")
            })
            return false

        }

        for(let i in xgCarrinho.data()){

            if(produto.ID_PRODUTO == xgCarrinho.data()[i].ID_PRODUTO){
                setTimeout(()=>{
                    show("Item já existente no carrinho!")
                })
                return false
            }
        }
        
        xgCarrinho.insertLine(produto)

        $("#edtCodigo").focus()
        $("#edtCodigo").select()
        
    }

    function retirarItem(){

        if(produto.ID_PRODUTO == undefined || produto.ID_PRODUTO == null || produto.ID_PRODUTO == ""){
            return false
        }
        console.log('produto :', produto);

        for(let i in xgCarrinho.data()){
            if(produto.ID_PRODUTO == xgCarrinho.data()[i].ID_PRODUTO){
                console.log('xgCarrinho.data()[i].ID_PRODUTO :', xgCarrinho.data()[i].ID_PRODUTO);
                console.log('produto.ID_PRODUTO :', produto.ID_PRODUTO);
                console.log('i :', i);

                xgCarrinho.deleteLine(i)
                break
            }
        }

        produto = {}

        $("#edtCodigo").val("")
        $("#spDescricao").html("")
        $("#spMarca").html("")
        $("#edtQTD").val("")

    }

    // MODAL

    function modal() {
        xmModalPrdutos = new xModal.create({
            el: "#xmModalPrdutos",
            title: "Produtos",
            width: "700",
            height: "500",
        });
    }

    return {
        grid: grid,
        modal: modal,
        getCodigoProduto: getCodigoProduto,
        inserirCarrinho: inserirCarrinho,
        retirarItem: retirarItem,
    }
})();
