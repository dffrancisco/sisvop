let xgProduto;

$(function () {
    produto.grid();
    produto.getMarca();
    produto.keydown();
    xgProduto.queryOpen({ search: '' })

});

const produto = (function () {

    let url = 'produtos/per.produtos.php'
    let controleGrid;

    function grid() {
        xgProduto = new xGridV2.create({
            el: "#xgProduto",
            height: 210,
            heightLine: 35,
            theme: "x-clownV2",

            columns: {
                Código: {
                    dataField: "CODIGO",
                    center: true,
                    width: "10%",
                },
                Descrição: {
                    dataField: "DESCRICAO",
                    width: "60%",
                    style: "font-size: 16px;",

                },
                QTD: {
                    dataField: "QTD",
                    width: "15%",
                    center: true,
                },
                Valor: {
                    dataField: "VALOR",
                    render: addReal,
                    width: "15%",
                },
            },

            dblClick: () => {
                $('.btnEdit').click()
            },
            sideBySide: {
                el: "#pnFields",

                frame: {
                    el: "#pnButtons",
                    buttons: {

                        pesquisar: {
                            html: "Pesquisar",
                            class: "btnP btnPesq",
                            click: searchConf,
                        },
                        novo: {
                            html: "Novo(F2)",
                            class: "btnP btnNovo",
                            state: xGridV2.state.insert,
                            click: novo,
                        },
                        edit: {
                            html: "Editar",
                            class: "btnP btnEdit",
                            state: xGridV2.state.update,
                            click: editar,
                        },
                        deletar: {
                            html: "Deletar",
                            class: "btnP btnDel",
                            state: xGridV2.state.delete,
                            click: deletar,
                        },
                        save: {
                            html: "Salvar",
                            class: "btnP btnSave",
                            state: xGridV2.state.save,
                            click: salvar
                        },
                        cancelar: {
                            html: "Cancelar",
                            class: "btnP",
                            state: xGridV2.state.cancel,
                            click: cancelar,
                        },

                    },
                },
                duplicity: {
                    dataField: ['CODIGO'],

                    execute: (r) => {
                        let param = {}
                        param.CODIGO = r.value,
                            axios.post(url, {
                                call: 'getCodigo',
                                param: param

                            })
                                .then(rs => {
                                    if (rs.data[0]) {
                                        xgProduto.showMessageDuplicity('O campo ' + r.text + ' está com valor duplicado ou vazio!')
                                        xgProduto.focusField(r.field);
                                        return false
                                    }
                                })
                    }
                },
            },

            query: {
                execute: (r) => {
                    getProdutos(r.param.search, r.offset)

                },
            },
        });
    }

    function getProdutos(search, offset) {
        axios.post(url, {
            call: 'getProdutos',
            param: { search: search.toUpperCase(), offset: offset }
        })
            .then(rs => {
                xgProduto.querySourceAdd(rs.data);
                if (rs.data[0]) xgProduto.focus();
            })

    }

    function deletar() {
        let param;
        if (xgProduto.dataSource().ID_PRODUTO) {
            param = xgProduto.dataSource().ID_PRODUTO
            confirmaCodigo({
                msg: 'Digite o código de confirmação',
                call: () => {
                    axios.post(url, {
                        call: 'delete',
                        param: param
                    })
                        .then(r => {
                            xgProduto.deleteLine()
                        })
                }
            })
        }

    }

    const salvar = async () => {
        let param = xgProduto.getElementSideBySideJson()
        param.QTD = Number(param.QTD)
        param.ID_MARCA = Number(param.ID_MARCA)
        param.MARCA = xgProduto.dataSource().MARCA

        param.DATA_CADASTRO = $('#edtData').val()



        let valCampos = {
            codigo: $('#editCodigo').val(),
            descricao: $('#editDescricao').val(),
            valor: $('#editValor').val(),
            qtd: $('#editQtd').val(),
            marca: $('#editMarca').val(),
        }
        valCampos.valor = valCampos.valor.replace(',', '');

        for (let i in valCampos) {
            if (valCampos[i] == '' || valCampos.valor == 0) {
                show('Por favor preencha todos os campos')
                return false;
            }
        }

        if (controleGrid == 'insert') {
            param.ID_PRODUTO = ''
            let allDuplicty = await xgProduto.getDuplicityAll()

            if (allDuplicty == false) {
                show('Código já cadastrado!')
                return false;
            }
        }

        if (controleGrid == 'edit') {
            param.ID_PRODUTO = xgProduto.dataSource().ID_PRODUTO;
        }

        param.DESCRICAO = param.DESCRICAO.toUpperCase()
        if (param.ENDERECO != undefined) {
            param.ENDERECO = param.ENDERECO.toUpperCase()
        } else {
            param.ENDERECO = ''
        }
        axios.post(url, {
            call: 'save',
            param: param
        })
            .then(r => {

                cancelar()

                if (r.data == 'edit') {
                    xgProduto.dataSource("QTD", param.QTD)
                    xgProduto.dataSource("CODIGO", param.CODIGO)
                    xgProduto.dataSource("DESCRICAO", param.DESCRICAO)
                    xgProduto.dataSource("VALOR", param.VALOR)
                }

                else if (r.data[0].ID_PRODUTO) {
                    param.ID_PRODUTO = r.data[0]
                    xgProduto.insertLine(param)

                }

                else {
                    show('ERRO INTERNO')
                }

            })

    }

    function addReal(value) {
        return "R$ " + value;
    }

    function novo() {
        controleGrid = 'insert';
        xgProduto.clearElementSideBySide()
        xgProduto.focusField()
        xgProduto.disable()
        let date = new Date().toLocaleDateString('pt-BR')
        $('#edtData').val(date)
        $('#edtPesquisa').prop("disabled", true)
        $('.btnPesq').prop("disabled", true)

        $('#editCodigo').val()
    }

    function editar() {
        controleGrid = 'edit';
        xgProduto.disable()
        $('#edtPesquisa').prop("disabled", true)
        $('.btnPesq').prop("disabled", true)

    }

    function searchConf() {

        let search = $('#edtPesquisa').val().trim();
        xgProduto.queryOpen({ search })

    }

    function getMarca() {
        axios.post(url, {
            call: 'getMarca',

        }).then(rs => {
            for (let i in rs.data) {
                let table = `<option value="${rs.data[i].ID_MARCA}"> ${rs.data[i].MARCA}</option>`
                $('#slctMarca').append(table)
            }

        })
    }

    function cancelar() {
        $('.btnPesq').removeAttr("disabled")
        $('#edtPesquisa').removeAttr("disabled")
        xgProduto.enable()
        xgProduto.focus()
    }

    function keydown() {
        $("#slctMarca").keydown(function (e) {
            if (e.keyCode == 13) {
                $('.btnSave').click()

            }
        })

        $("#edtPesquisa").keydown(function (e) {
            if (e.keyCode == 13) {
                $('.btnPesq').click()
            }
        })

        $(document).keydown(function (e) {
            if (e.keyCode == 113) {
                $('.btnNovo').click()
            }
        })
    }

    return {
        grid: grid,
        getMarca: getMarca,
        keydown: keydown
    };
})();