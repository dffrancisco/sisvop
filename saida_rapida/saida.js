let xgCarrinho
let xmModalPrdutos
let xgProdutos
let xmObs

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
    $("#btnFin").click(()=>{
        saida.validaCarrinho()
        // xmObs.open()
    })

});


var saida = (function () {

    let produto = {}
    let carrinho = {}
    let from = ""

    let url = "saida_rapida/per.saida.php"

    function grid() {
        xgCarrinho = new xGridV2.create({
            el: "#xgCarrinho",
            theme: "x-clownV2",
            height: "200",
            columns: {
                CODIGO:{ dataField: "CODIGO", width:"20%"},
                DESCRICAO:{ dataField: "DESCRICAO", width:"40%"},
                MARCA:{ dataField: "MARCA", width:"30%"},
                QTD:{ dataField: "QTD_RETIRADA", width:"10%"},
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

                $("#edtQTD").val(produto.QTD_RETIRADA)

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

                    if(produto.QTD <= 0){
                        setTimeout(()=>{
                            show("Não há item em estoque!")
                        })    
                        produto = {}
                        return false
                    }

                    from = "estoque"

                    setQTD()

                    xmModalPrdutos.close()
                },
            },

            dblClick: (ln) => {
                if (ln == false) return false;

                produto = ln

                if(produto.QTD <= 0){
                    setTimeout(()=>{
                        show("Não há item em estoque!")
                    })    
                    produto = {}
                    return false
                }

                from = "estoque"

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
                
                if(produto == "" || produto == undefined || codigo == null){
                    return false
                }

                if(produto.QTD <= 0){
                    setTimeout(()=>{
                        show("Não há item em estoque!")
                    })    
                    return false
                }

                from = "codigo"
                setQTD()
            })
    }

    // DO
    function setQTD(){

        if(produto.CODIGO != "" || produto.CODIGO != null)
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

        produto.QTD_RETIRADA = $("#edtQTD").val()

        if(produto.QTD_RETIRADA == 0 || produto.QTD_RETIRADA == undefined 
            || produto.QTD_RETIRADA == "" || produto.QTD_RETIRADA == NaN){
            setTimeout(()=>{
                show("Quantidade vazia!")
            })
            return false

        }

        if(produto.QTD_RETIRADA > produto.QTD){
            setTimeout(()=>{
                show("Quantidade maior!")
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

        for(let i in xgCarrinho.data()){
            if(produto.ID_PRODUTO == xgCarrinho.data()[i].ID_PRODUTO){
                xgCarrinho.deleteLine(i)
                break
            }
        }

        produto = {}

        $("#edtCodigo").val("")
        $("#spDescricao").html("")
        $("#spMarca").html("")
        $("#edtQTD").val("")

        $("#edtCodigo").focus()

        xgCarrinho.focus()
    }

    function finalizarCarrinho(){

        let funcionario = {
            ID_FUNCIONARIOS: usuario.ID_FUNCIONARIOS,
            DATA: new Date().toLocaleDateString("pt-BR")
        }

        let OBS = $("#txtObs").val().toUpperCase()

        carrinho = {}
        carrinho = xgCarrinho.data()

        for(let i in carrinho){

            carrinho[i].newEstoque = carrinho[i].QTD - carrinho[i].QTD_RETIRADA

        }

        axios.post(url,{
            call: "gerarCarrinho",
            param: {itens: carrinho, OBS: OBS, funcionario: funcionario}
        }).then(r=>{

            if(r.data == "feito"){
                xmObs.close()
                show("RETIRADA FEITA COM SUCESSO!")
                 $(".container").remove()
            }
            else{
                show("ERRO INTERNO!")
            }
        })
    }

    function validaCarrinho(){
        carrinho = {}

        for(let i in xgCarrinho.data()){
            carrinho[i] = xgCarrinho.data()[i] 
        }

        if(isEmpty(carrinho) == true){
            setTimeout(()=>{
                show("Carrinho vazio!")
            })
            return false
        }

        xmObs.open()
    }

    function isEmpty(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
      }

    // MODAL

    function modal() {
        xmModalPrdutos = new xModal.create({
            el: "#xmModalPrdutos",
            title: "Produtos",
            width: "700",
            height: "500",
        });

        xmObs = new xModal.create({
            el: "#xmModalObs",
            title: "OBS",
            width: "500",
            height: "210",
            buttons:{
                btn1:{
                    html:"Confirmar",
                    click: ()=>{
                        finalizarCarrinho();
                    }
                }
            },
        });
    }

    return {
        grid: grid,
        modal: modal,
        getCodigoProduto: getCodigoProduto,
        inserirCarrinho: inserirCarrinho,
        retirarItem: retirarItem,
        validaCarrinho: validaCarrinho,
    }
})();
