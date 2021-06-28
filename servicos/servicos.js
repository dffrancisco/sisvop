let xgItensOperacinal
let xgItensFinalizacao
let xgProdutos

let xmProdutos

let id_servico

const url = 'servicos/per.servicos.php'

$(function () {
    servicos.getServico()
    servicos.grid()
    servicos.modalProdutos()
    servicos.keydown()

    $('.tabServico').tabs();

    $('#edtPesquisaOpe').keydown(function (e) {

        if (e.keyCode == 13) {
            $(".btnPesqItemOpe").click()
        }
        if (e.keyCode == 40) {
            xgItensOperacinal.focus()
            $("#edtPesquisaOpe").val('')
        }
    })

    $('#edtPesquisaFin').keydown(function (e) {

        if (e.keyCode == 13) {
            $(".btnPesqItemFin").click()
        }
        if (e.keyCode == 40) {
            xgItensFinalizacao.focus()
            $("#edtPesquisaFin").val('')
        }
    })

    $(".btnPesqItemOpe").click(function () {
        let item = $('#edtPesquisaOpe').val()
        xgItensOperacinal.queryOpen({ search: item.toUpperCase() })
        xgItensOperacinal.source([])
    })

    $(".btnPesqItemFin").click(function () {
        let item = $('#edtPesquisaFin').val()
        xgItensFinalizacao.queryOpen({ search: item.toUpperCase() })
        xgItensFinalizacao.source([])
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

    function grid() {
        xgItensOperacinal = new xGridV2.create({
            el: "#xgItensOperacinal",
            height: 300,
            heightLine: 27,
            theme: "x-clownV2",

            columns: {

                Operacional: {
                    dataField: "DESCRICAO",
                }

            },
            onKeyDown: {
                '13': (ln) => {
                }
            },
            sideBySide: {
                frame: {
                    el: '#pnButtonsOpe',
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

        xgItensFinalizacao = new xGridV2.create({
            el: "#xgItensFinalizacao",
            height: 300,
            heightLine: 27,
            theme: "x-clownV2",

            columns: {

                Finalização: {
                    dataField: "DESCRICAO",
                }

            },
            onKeyDown: {
                '13': (ln) => {
                }
            },
            sideBySide: {
                frame: {
                    el: '#pnButtonsFin',
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
                    getMascaraProjetoFin(r.param.search, r.offset)

                },
            }
        })

        xgProdutos = new xGridV2.create({
            el: '#xgProdutos',
            height: 330,
            heightLine: 27,
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
            xgItensOperacinal.sourceAdd(r.data)
            xgItensOperacinal.focus()
        })

    }

    function getMascaraProjetoFin(param, offset) {

        axios.post(url, {
            call: 'getMascaraProjetoFin',
            param: {
                id_servico: id_servico,
                item: param,
                offset: offset
            }
        }).then(r => {
            xgItensFinalizacao.sourceAdd(r.data)
            xgItensFinalizacao.focus()
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
        if ($('#operacional').hasClass("active") == true) {
            let param = xgItensOperacinal.dataSource().ID_MASCARA_PROJETO
            confirma({
                msg: `Deseja deletar o item ${xgItensOperacinal.dataSource().DESCRICAO}`,
                call: () => {
                    axios.post(url, {
                        call: 'deleteProduto',
                        param: param
                    }).then(r => {
                        xgItensOperacinal.deleteLine()
                    })
                }
            })
        }
        if ($('#finalizacao').hasClass("active") == true) {
            let param = xgItensFinalizacao.dataSource().ID_MASCARA_PROJETO
            confirma({
                msg: `Deseja deletar o item ${xgItensFinalizacao.dataSource().DESCRICAO}`,
                call: () => {
                    axios.post(url, {
                        call: 'deleteProduto',
                        param: param
                    }).then(r => {
                        xgItensFinalizacao.deleteLine()
                    })
                }
            })
        }

    }

    function addProduto(ln) {
        let FINALIZACAO
        if ($('#operacional').hasClass("active") == true) {
            FINALIZACAO = 0
        }
        if ($('#finalizacao').hasClass("active") == true) {
            FINALIZACAO = 1
        }
        axios.post(url, {
            call: 'insertProduto',
            param: { ID_SERVICO: id_servico, ID_PRODUTO: ln.ID_PRODUTO, FINALIZACAO: FINALIZACAO }
        }).then(r => {
            if (r.data.msg) {
                show(r.data.msg)
                return false
            }
            if (FINALIZACAO == 0) {
                xgItensOperacinal.insertLine(ln)
            }
            if (FINALIZACAO == 1) {
                xgItensFinalizacao.insertLine(ln)
            }
            ln.ID_MASCARA_PROJETO = r.data[0].ID_MASCARA_PROJETO
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
        $('#xgItensOperacinal').keydown(function (e) {

            if (e.keyCode == 113) {
                $('#edtPesquisaOpe').focus()
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
    if ($('#operacional').hasClass("active") == true) {
        let cards = $('.servico')
        id_servico = param
        $('#pnButtonsOpe').removeAttr("hidden")
        $('#rowPesqOpe').removeAttr("hidden")
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.background = "#3e85c1"
        }
        document.getElementById(param).style.background = "#26679e"
        xgItensOperacinal.queryOpen({ search: '' })
        xgItensOperacinal.source([])
    }
    if ($('#finalizacao').hasClass("active") == true) {
        let cards = $('.servico')
        id_servico = param
        $('#pnButtonsFin').removeAttr("hidden")
        $('#rowPesqFin').removeAttr("hidden")
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.background = "#3e85c1"
        }
        document.getElementById(param).style.background = "#26679e"
        xgItensFinalizacao.queryOpen({ search: '' })
        xgItensFinalizacao.source([])
    }

}
