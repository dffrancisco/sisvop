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
            heightLine: 35,
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
                    dataField: ['CNPJ'],

                    execute: (r) => {
                        let param = {}
                        param.CNPJ = r.value,
                            validarCpnj(param.CNPJ),
                            axios.post(url, {
                                call: 'duplicity',
                                param: param

                            })
                                .then(rs => {

                                    if (rs.data[0]) {
                                        xgCliente.showMessageDuplicity('CNPJ inválido DUP')
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
        let search = $('#edtPesquisa').val().trim();
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
        param.DATA_CADASTRO = $('#edtData').val()

        // let allDuplicty = await xgCliente.getDuplicityAll()
        // if (allDuplicty == false) {
        //     return false;
        // }

        let valCampos = {
            razao: $('#edtRazao').val(),
            data_cadastro: $('#edtData').val(),
            cep: $('#edtCep').val(),
            endereco: $('#edtEndereco').val(),
            id_uf: $('#slctUf').val(),
            cidade: $('#edtCidade').val(),
            bairro: $('#edtBairro').val(),
        }

        param.RAZAO = param.RAZAO.toUpperCase()
        param.FANTASIA = param.FANTASIA.toUpperCase()
        param.EMAIL = param.EMAIL.toUpperCase()
        param.REPRESENTANTE = param.REPRESENTANTE.toUpperCase()
        param.ENDERECO = param.ENDERECO.toUpperCase()
        param.CIDADE = param.CIDADE.toUpperCase()
        param.BAIRRO = param.BAIRRO.toUpperCase()




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
                } else {
                    show('ERRO INTERNO')
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

    function validarCpnj(cnpj) {

        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj == '') return false;

        if (cnpj.length != 14) {
            xgCliente.showMessageDuplicity(`Digite um CNPJ com tamanho válido`);
            xgCliente.focusField();
            return false;
        }

        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999") {
            xgCliente.showMessageDuplicity("CNPJ inválido");
            xgCliente.focusField();
            return false;
        }

        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            xgCliente.showMessageDuplicity("CNPJ inválido!");
            xgCliente.focusField();
            return false;
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            xgCliente.showMessageDuplicity("CNPJ inválido!");
            xgCliente.focusField();
            return false;
        }

        return true;


    }

    return {
        grid: grid,
        getUf: getUf,
    }
})();
