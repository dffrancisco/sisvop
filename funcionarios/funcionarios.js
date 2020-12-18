let xgFuncionarios;

$(function () {
    funcionario.grid();
    xgFuncionarios.queryOpen({ search: '' })

});





const funcionario = (function () {
    let url = 'funcionarios/per.funcionarios.php'

    function grid() {
        xgFuncionarios = new xGridV2.create({
            el: "#xgFuncionarios",
            height: 210,
            heightLine: 35,
            theme: "x-clownV2",
            columns: {
                Nome: {
                    dataField: "nome",
                    width: "60%",
                },
                CPF: {
                    dataField: "cpf",
                    center: true,
                }
            },
            sideBySide: {
                el: "#pnFields",
                frame: {
                    el: "#pnButtons",
                    buttons: {
                        novo: {
                            html: "Novo",
                            class: "btnP",
                            state: xGridV2.state.insert,
                            click: novo,
                        },

                        edit: {
                            html: "Editar",
                            class: "btnP",
                            state: xGridV2.state.update,
                            click: edit,
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
                            click: () => {

                                xgFuncionarios.enable()
                                xgFuncionarios.focus()
                            },
                        },

                        pesquisar: {
                            html: "Pesquisar",
                            class: "btnP btnPesq",
                            click: search,
                        },
                    }
                },
                duplicity: {
                    dataField: ['cpf', 'rg'],
                    execute: (r) => {
                        axios.post(url, {
                            call: 'duplicity',
                            param: r
                        })


                            .then(rs => {

                                if (rs.data[0]) {
                                    xgFuncionarios.showMessageDuplicity(`O campo ${r.text} foi cadastrado`)
                                    xgFuncionarios.focusField(r.field);
                                }
                                else {
                                    let validCpf = $('#edtCpf').val()
                                    validCpf = validCpf.replace('.', '');
                                    validCpf = validCpf.replace('.', '');
                                    let cpf = validCpf.replace('-', '');
                                    console.log(cpf)
                                    let Soma;
                                    let Resto;
                                    Soma = 0;
                                    if (cpf == "00000000000") return false;
                                    

                                    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
                                    Resto = (Soma * 10) % 11;

                                    if ((Resto == 10) || (Resto == 11)) Resto = 0;
                                    if (Resto != parseInt(cpf.substring(9, 10))) return false;

                                    Soma = 0;
                                    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
                                    Resto = (Soma * 10) % 11;

                                    if ((Resto == 10) || (Resto == 11)) Resto = 0;

                                    if (Resto != parseInt(cpf.substring(10, 11))) {

                                        xgFuncionarios.showMessageDuplicity(`CPF inválido`)
                                        xgFuncionarios.focusField(r.field);

                                    }


                                }


                            })

                    }
                }

            },
            query: {
                execute: (r) => {
                    getFuncionarios(r.param.search, r.offset)
                }

            }

        });
    }

    function getFuncionarios(search, offset) {
        axios.post(url, {
            call: 'getFuncionarios',
            param: { search: search, offset: offset }
        })
            .then(rs => {
                xgFuncionarios.querySourceAdd(rs.data);
                if (rs.data[0]) xgFuncionarios.focus();
            })

    }

    return {
        grid: grid,
    };


    function search() {

        let search = $('#edtPesquisa').val()

        xgFuncionarios.queryOpen({ search })


    }

    function novo() {
        controleGrid = 'insert';
        xgFuncionarios.clearElementSideBySide()
        xgFuncionarios.focusField()
        xgFuncionarios.disable()
        $('.container .validate').removeAttr("disabled")
        

    }

    function edit() {
        controleGrid = 'edit';
        xgFuncionarios.focusField()
        xgFuncionarios.disable()
        $('.container .validate').removeAttr("disabled")

    }

    function salvar() {


        let param = xgFuncionarios.getElementSideBySideJson()

        // xgFuncionarios.getDuplicityAll()

        // if (xgFuncionarios.getDuplicityAll() == false) {
        //     return false
        // }

        if (controleGrid == 'edit') {
            param.id_funcionario = xgFuncionarios.dataSource().id_funcionario;
        }

       
        axios.post(url, {
            call: 'save',
            param: param

        })
            .then(r => {
                if (r.data.id_funcionario) {
                    param.id_funcionario = r.data.id_funcionario
                    xgFuncionarios.insertLine(param)
                } else {
                    xgFuncionarios.dataSource(param)
                }

            })

        xgFuncionarios.enable()
        xgFuncionarios.focus()
    }

    function deletar() {
        let param;
        if (xgFuncionarios.dataSource().id_funcionario) {
            param = xgFuncionarios.dataSource().id_funcionario
            confirmaCodigo({
                msg: 'Dígite o código de confirmação',
                call: () => {
                    axios.post(url, {
                        call: 'delete',
                        param: param
                    })
                        .then(r => {
                            xgFuncionarios.deleteLine()
                        })
                }
            })
        }

    }

    function TestaCPF() {
        let strCPF = $('#edtCpf').val()
        let Soma;
        let Resto;
        Soma = 0;
        if (strCPF == "00000000000") return false;

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;


        return true;
    }

})();

