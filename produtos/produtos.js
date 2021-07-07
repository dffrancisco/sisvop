let xgProduto;

$(function () {
    produto.grid();
    produto.getMarca();
    produto.getTipoItem();
    produto.keydown();
    xgProduto.queryOpen({ search: '' })



    // $('.xGridV2-col:eq(5)').attr('style', 'color: red !important; font font-size: 16px !important; width: 60% !important;')

    // $('#editDescricao').attr('style', 'color: red !important')

});

const produto = (function () {

    let url = 'produtos/per.produtos.php'
    let controleGrid;

    function grid() {
        xgProduto = new xGridV2.create({
            el: "#xgProduto",
            height: 210,
            heightLine: 27,
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
                            html: "Novo(F8)",
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
                            class: "btnP btnCancel",
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

                destacarProd()
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
        param.ID_TIPO_ITEM = Number(param.ID_TIPO_ITEM)

        console.log('param :', param);
        
        let valCampos = {
            codigo: $('#editCodigo').val(),
            descricao: $('#editDescricao').val(),
            valor: $('#editValor').val(),
            qtd: $('#editQtd').val(),
            marca: $('#slctMarca').val(),
            medida: $('#slctMedida').val(),
            tipo_item: $('#slctTipoItem').val(),

        }
        valCampos.valor = valCampos.valor.replace(',', '');

        for (let i in valCampos) {
            if (valCampos[i] == '' || valCampos.valor == 0 || valCampos.medida == null || valCampos.marca == null) {
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

        if (param.QTD_MINIMA == undefined || param.QTD_MINIMA == '.') {
            param.QTD_MINIMA = -1
        } else {
            param.QTD_MINIMA = Number(param.QTD_MINIMA)
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
                destacarProd()

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
    function getTipoItem() {
        axios.post(url, {
            call: 'getTipoItem',

        }).then(rs => {
            for (let i in rs.data) {
                let table = `<option value="${rs.data[i].ID_TIPO}"> ${rs.data[i].TIPO_ITEM}</option>`
                $('#slctTipoItem').append(table)
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
                $('#edtPesquisa').focus()
            }

            if (e.keyCode == 119) {
                $('.btnNovo').click()
            }

            if (e.keyCode == 27) {
                $('.btnCancel').click()
            }
        })
    }

    function destacarProd() {
        for (let i in xgProduto.data()) {

            if (xgProduto.data()[i].QTD == 0) {
                i++
                $('.xGridV2-row:eq(' + i + ')').attr('style', 'color: #DAA520 !important;')
            }
            else if (xgProduto.data()[i].QTD <= xgProduto.data()[i].QTD_MINIMA) {
                i++
                $('.xGridV2-row:eq(' + i + ')').attr('style', 'color:  #8B4513 !important;')
            }
        }
    }
    return {
        grid: grid,
        getMarca: getMarca,
        keydown: keydown,
        getTipoItem:getTipoItem,
    };
})();