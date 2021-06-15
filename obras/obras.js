let xgItensServico
let xgProdutos

let xmProdutos

let id_servico

const url = 'servicos/per.servicos.php'

$(function () {
    servicos.getServico()
    servicos.grid()
    servicos.modalProdutos()
    servicos.keydown()

    $('#edtPesquisa').keydown(function (e) {

        if (e.keyCode == 13) {
            $(".btnPesqItem").click()
        }

        if (e.keyCode == 40) {
            xgItensServico.focus()
            $("#edtPesquisa").val('')
        }
    })

    $(".btnPesqItem").click(function () {
        let item = $('#edtPesquisa').val()
        xgItensServico.queryOpen({ search: item.toUpperCase() })
        xgItensServico.source([])
    })

    $('#xmEdtPesquisa').keydown(function (e) {

        if (e.keyCode == 13) {
            $(".btnPesqProd").click()
        }

        if (e.keyCode == 40) {
            xgProdutos.focus()
            $("#xmEdtPesquisa").val('')
        }
    })

    $(".btnPesqProd").click(function () {
        let item = $('#xmEdtPesquisa').val()
        xgProdutos.queryOpen({ search: item.toUpperCase() })
        xgProdutos.source([])
    })

});


const servicos = (function () {
    let lista_servico

    let andamento
    let projeto
    let finalizado

    let STATUS
    let dados_servico = {
        FANTASIA: '',
        CNPJ: '',
        ENGENHEIRO: '',
        SERVICO: '',
        EXECUTORES: '',
        DATA_INICIO: '',
        DATA_FINALIZACAO: '',
    }

    function grid() {
        xgItensServico = new xGridV2.create({
            el: "#xgItensServico",
            height: 330,
            heightLine: 35,
            theme: "x-clownV2",

            columns: {

                Descrição: {
                    dataField: "DESCRICAO",
                }

            },
            onKeyDown: {
                '13': (ln) => {
                }
            },
            sideBySide: {
                frame: {
                    el: '#pnButtons',
                    buttons: {

                        add: {
                            html: "Adicionar",
                            class: "btnP btnAdd",
                            click: add,
                        },
                        del: {
                            html: "Excluir",
                            class: "btnP btnDel",
                            click: deletar,
                        },
                    }
                },
            },

            query: {
                execute: (r) => {
                    getMascaraProjeto(r.param.search, r.offset)

                },
            }
        })

        xgProdutos = new xGridV2.create({
            el: '#xgProdutos',
            height: 330,
            heightLine: 35,
            theme: "x-clownV2",

            columns: {
                Código: {
                    dataField: "CODIGO",
                    width: '10%'
                },
                Descrição: {
                    dataField: "DESCRICAO",
                    width: '70%'
                },
                Marca: {
                    dataField: "MARCA",
                    width: '20%'
                }
            },
            onKeyDown: {
                '13': (ln) => {
                    addProduto(ln)
                }
            },

            dblClick: (ln) => {
                addProduto(ln)
            },
            query: {
                execute: (r) => {
                    getProduto(r.param.search, r.offset)

                },
            }
        })
    }


    // GETS
    function getServico() {
        axios.post(url, {
            call: 'getServico',
        })
            .then(r => {
                lista_servico = r.data

                for (let i in r.data) {
                    let servico = `
                <div class="col s3">
                    <div class=" marginBottom">
                        <div onclick="activeCard(this.id)" class="center-align servico" id="${r.data[i].ID_SERVICO}">
                            <span class="white-text" style="font-size: 20px;">${r.data[i].SERVICO}</span>
                        </div >
                    </div>
                </div>`
                    $('#rowServico').append(servico)
                }
            })
    }

    function getMascaraProjeto(param, offset) {

        axios.post(url, {
            call: 'getMascaraProjeto',
            param: {
                id_servico: id_servico,
                item: param,
                offset: offset
            }
        }).then(r => {
            xgItensServico.sourceAdd(r.data)
            xgItensServico.focus()
        })
    }

    function getProduto(param, offset) {
        axios.post(url, {
            call: 'getProdutos',
            param: { search: param, offset: offset }
        }).then(r => {
            xgProdutos.sourceAdd(r.data)
        })
    }

    function buscar(item) {

        axios.post(url, {
            call: 'getItem',
            param: { item: item, id_servico: id_servico }
        }).then(r => {

        })
    }

    function add() {
        xmProdutos.open()

        $('#xmEdtPesquisa').val('')
        $('#xmEdtPesquisa').focus()
        xgProdutos.source([])

        xgProdutos.queryOpen({ search: '' })
    }

    function deletar() {
        let param = xgItensServico.dataSource().ID_MASCARA_PROJETO
        confirma({
            msg: `Deseja deletar o item ${xgItensServico.dataSource().DESCRICAO}`,
            call: () => {
                axios.post(url, {
                    call: 'deleteProduto',
                    param: param
                }).then(r => {
                    xgItensServico.deleteLine()
                })
            }
        })
    }

    function addProduto(ln) {

        axios.post(url, {
            call: 'insertProduto',
            param: { ID_SERVICO: id_servico, ID_PRODUTO: ln.ID_PRODUTO }
        }).then(r => {
            if (r.data.msg) {
                show(r.data.msg)
                return false
            }

            ln.ID_MASCARA_PROJETO = r.data[0].ID_MASCARA_PROJETO
            xgItensServico.insertLine(ln)
            xmProdutos.close()
        })
    }

    // MODAIS
    function modalProdutos() {

        xmProdutos = new xModal.create({
            el: '#xmProdutos',
            title: 'Produtos',
            width: '700',
            height: '500'
        })
    }

    function keydown() {
        $('#xgItensServico').keydown(function (e) {

            if (e.keyCode == 113) {
                $('#edtPesquisa').focus()
            }

            if (e.keyCode == 13) {
                if (id_servico != undefined) {
                    add()
                }
            }
        })

    }

    return {
        getServico: getServico,
        grid: grid,
        getMascaraProjeto: getMascaraProjeto,
        modalProdutos: modalProdutos,
        buscar: buscar,
        keydown: keydown
    }

})();

function activeCard(param) {
    let cards = $('.servico')
    id_servico = param

    $('#pnButtons').removeAttr("hidden")
    $('#rowPesq').removeAttr("hidden")

    for (let i = 0; i < cards.length; i++) {
        cards[i].style.background = "#1D4B70"
    }
    document.getElementById(param).style.background = "#4a5f71"

    xgItensServico.queryOpen({ search: '' })

    xgItensServico.source([])

}
