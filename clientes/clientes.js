let xgCliente;
$(function () {
    cliente.grid()
    cliente.getUf()
    xgCliente.queryOpen({ search: '' })

});


const cliente = (function () {

    let url = 'clientes/per.clientes.php'
    let controleGrid;

    function grid() {
        xgCliente = new xGridV2.create({
            el: "#xgCliente",
            height: 210,
            heightLine: 27,
            theme: "x-clownV2",

            columns: {
                CNPJ: {
                    dataField: "CNPJ",
                    center: true,
                    width: "30%",
                },
                Razão: {
                    dataField: "RAZAO",
                    width: "70%",
                }
            },
            sideBySide: {
                el: "#pnFields",

                frame: {
                    el: "#pnButtons",
                    buttons: {
                        pesquisar: {
                            html: "Pesquisar",
                            class: "btnP btnPesq",
                            click: pesquisar
                        },
                        novo: {
                            html: "Novo",
                            class: "btnP",
                            state: xGridV2.state.insert,
                            click: novo
                        },
                        edit: {
                            html: "Editar",
                            class: "btnP",
                            state: xGridV2.state.update,
                            click: editar
                        },
                        deletar: {
                            html: "Deletar",
                            class: "btnP btnDel",
                            state: xGridV2.state.delete,
                            click: deletar
                        },
                        save: {
                            html: "Salvar",
                            class: "btnP",
                            state: xGridV2.state.save,
                            click: salvar
                        },
                        cancelar: {
                            html: "Cancelar",
                            class: "btnP",
                            state: xGridV2.state.cancel,
                            click: cancelar
                        },

                    }
                },
                duplicity: {
                    dataField: ['RAZAO'],

                    execute: (r) => {
                        let param = {}
                        param.RAZAO = r.value,
                            axios.post(url, {
                                call: 'duplicity',
                                param: param

                            })
                                .then(rs => {

                                    if (rs.data[0]) {
                                        xgCliente.showMessageDuplicity('Cliente já cadastrado')
                                        xgCliente.focusField(r.field);
                                    }
                                })
                    }
                },
            },

            query: {
                execute: (r) => {
                    getCliente(r.param.search, r.offset)

                },
            },
        })
    }

    function getCliente(search, offset) {

        axios.post(url, {
            call: 'getCliente',
            param: { search: search.toUpperCase(), offset: offset }
        })
            .then(rs => {


                xgCliente.querySourceAdd(rs.data);
                if (rs.data[0]) xgCliente.focus();
            })

    }


    function pesquisar() {
        let search = $('#edtPesquisa').val().trim().toUpperCase();
        xgCliente.queryOpen({ search: search })
    }

    function novo() {
        controleGrid = 'insert';
        xgCliente.clearElementSideBySide()
        xgCliente.focusField()
        xgCliente.disable()
        let date = new Date().toLocaleDateString('pt-BR')
        $('#edtData').val(date)
        $('#edtPesquisa').prop("disabled", true)
        $('.btnPesq').prop("disabled", true)

    }

    function editar() {
        controleGrid = 'edit';
        $('#edtPesquisa').prop("disabled", true)
        $('.btnPesq').prop("disabled", true)
    }

    function deletar() {
        let param;
        if (xgCliente.dataSource().ID_CLIENTE) {
            param = xgCliente.dataSource().ID_CLIENTE
            confirmaCodigo({
                msg: 'Digite o código de confirmação',
                call: () => {

                    axios.post(url, {
                        call: 'delete',
                        param: param
                    })
                        .then(r => {
                            xgCliente.deleteLine()
                        })
                }
            })
        }
    }

    const salvar = async () => {

        let param = xgCliente.getElementSideBySideJson()

        if ($('#edtInscricao').val() == "") {
            param.INSCRICAO = ""
        }
        if ($('#edtFixo').val() == "") {
            param.FIXO = ""
        }
        if ($('#edtTel').val() == "") {
            param.TEL = ""
        }
        if ($('#edtRepresentante').val() == "") {
            param.REPRESENTANTE = ""
        }
        if ($('#edtEmail').val() == "") {
            param.EMAIL = ""
        }
        if ($('#edtCnpj').val() == "") {
            param.CNPJ = ""
        }

        param.DATA_CADASTRO = $('#edtData').val()
        // let allDuplicty = await xgCliente.getDuplicityAll()
        // if (allDuplicty == false) {
        //     return false;
        // }



        let valCampos = {
            razao: $('#edtRazao').val(),
            fantasia: $('#edtFantasia').val(),
            data_cadastro: $('#edtData').val(),
            cep: $('#edtCep').val(),
            endereco: $('#edtEndereco').val(),
            id_uf: $('#slctUf').val(),
            cidade: $('#edtCidade').val(),
            bairro: $('#edtBairro').val(),
        }

        for (let i in param) {
            param[i] = param[i].toUpperCase()
        }

        for (let i in valCampos) {
            if (valCampos[i] == '' || valCampos.id_uf == null) {
                show('Por favor preencha todos os campos')
                return false
            }
        }

        if (controleGrid == 'edit') {
            param.ID_CLIENTE = xgCliente.dataSource().ID_CLIENTE;
        }

        if (controleGrid == 'insert') {
            param.ID_CLIENTE = ''
        }

        axios.post(url, {
            call: 'save',
            param: param

        })
            .then(r => {

                if (r.data == 'edit') {
                    xgCliente.dataSource(param)

                }
                if (r.data[0].ID_CLIENTE) {
                    param.ID_CLIENTE = r.data[0].ID_CLIENTE
                    xgCliente.insertLine(param)
                }

            })

        xgCliente.enable()
        xgCliente.focus()
    }

    function cancelar() {
        $('.btnPesq').removeAttr("disabled")
        $('#edtPesquisa').removeAttr("disabled")
        $('').prop("disabled", true)
        xgCliente.enable()
        xgCliente.focus()
    }

    function getUf() {
        axios.post(url, {
            call: 'getUf',

        }).then(rs => {

            for (let i in rs.data) {
                let uf = `<option value="${rs.data[i].ID_UF}"> ${rs.data[i].UF}</option>`
                $('#slctUf').append(uf)
            }

        })
    }



    return {
        grid: grid,
        getUf: getUf,
    }
})();
