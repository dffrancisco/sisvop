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
                    width: "40%",
                },
                Razão: {
                    dataField: "RAZAO",
                    width: "60%",
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
                    dataField: ['cnpj'],

                    execute: (r) => {
                        let param = {}
                        param.cnpj = r.value,
                        validarCpnj(param.cnpj),
                            axios.post(url, {
                                call: 'duplicity',
                                param: param

                            })
                                .then(rs => {
                                    if (rs.data[0]) {
                                        xgCliente.showMessageDuplicity('CNPJ inválido')
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
            param: { search: search, offset: offset }
        })
            .then(rs => {
                xgCliente.querySourceAdd(rs.data);
                if (rs.data[0]) xgCliente.focus();
            })

    }


    function pesquisar() {
        let search = $('#edtPesquisa').val().trim();
        xgCliente.queryOpen({ search })
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
        if (xgCliente.dataSource().id_cliente) {
            param = xgCliente.dataSource().id_cliente
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
        param.data_cadastro = $('#edtData').val()

        // let allDuplicty = await xgCliente.getDuplicityAll()
        // if (allDuplicty == false) {
        //     console.log('travei')
        //     return false;
        // }

        let valCampos = {
            cnpj: $('#edtCnpj').val(),
            razao: $('#edtRazao').val(),
            email: $('#edtEmail').val(),
            inscricao: $('#edtInscricao').val(),
            fixo: $('#edtFixo').val(),
            tel: $('#edtTel').val(),
            representante: $('#edtRepresentante').val(),
            data_cadastro: $('#edtData').val(),
            cep: $('#edtCep').val(),
            endereco: $('#edtEndereco').val(),
            id_uf: $('#slctUf').val(),
            cidade: $('#edtCidade').val(),
            bairro: $('#edtBairro').val(),
        }   


        for (let i in valCampos) {
            if (valCampos[i] == '' || valCampos.id_uf == null) {
              show('Por favor preencha todos os campos')
              return false
            }
          }

        if (controleGrid == 'edit') {
            param.id_cliente = xgCliente.dataSource().id_cliente;
        }

        if (controleGrid == 'insert') {
            param.id_cliente = ''
        }

        axios.post(url, {
            call: 'save',
            param: param

        })
            .then(r => {
                if (r.data.id_cliente) {
                    param.id_cliente = r.data.id_cliente
                    xgCliente.insertLine(param)
                } else {
                    xgCliente.dataSource(param)
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
                let uf = `<option value="${rs.data[i].id_uf}"> ${rs.data[i].uf}</option>`
                $('#slctUf').append(uf)
            }

        })
    }

    function validarCpnj(cnpj) {

        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj == '') return false;

        if (cnpj.length != 14) if (cnpj.length < 14) {
            xgCliente.showMessageDuplicity(`CNPJ inválido`);
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
