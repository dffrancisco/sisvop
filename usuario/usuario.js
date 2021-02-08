let xgUsuario;
let xmSenha;

$(function () {
    senha.xGridUsuario()
    senha.keydown()
    senha.xModalSenha()
    senha.xModalNovaSenha()
    senha.eyes()
    xgUsuario.queryOpen({ search: '' })

    $('.btnEyes').click(function () {
        senha.eyes()
    })

    $('.btnNovoEyes').click(function () {
        senha.eyesNovo()
    })

});


const senha = (function () {

    let url = 'usuario/per.usuario.php';

    //xgrid
    function xGridUsuario() {

        xgUsuario = new xGridV2.create({

            el: '#xgUsuario',
            height: '200',
            theme: 'x-clownV2',
            heightLine: '35',
            columns: {
                ID: {
                    dataField: "ID_FUNCIONARIOS",
                    width: "10%",
                    center: true,
                },
                NOME: {
                    dataField: "NOME",
                    width: "50%",
                },
                CPF: {
                    dataField: "CPF",
                    width: "40%",
                    center: true,
                },
            },
            sideBySide: {
                frame: {
                    el: '#pnButtons',
                    buttons: {
                        pesquisar: {
                            html: "Pesquisar(F2)",
                            class: "btnP btnPesq",
                            click: pesquisar,
                        },
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
                            click: editar,
                        },
                        deletar: {
                            html: "Deletar",
                            class: "btnP btnDel",
                            state: xGridV2.state.delete,
                            click: deletar,
                        },

                    }
                }
            },

            query: {
                execute: (r) => {
                    getSenhaFuncionarios(r.param.search, r.offset);
                }
            }
        })
    }

    //xmodal
    function xModalSenha() {
        xmSenha = new xModal.create({
            el: '#xmEditSenha',
            title: "Atualize sua senha",
            width: 300,
            height: 210,
            onOpen: () => {
                let e = $('#edtSenha')[0]
                if (e.type === "text") {
                    e.type = "password";
                    $('.btnEyes').removeClass('eyeSee')
                    $('.btnEyes').removeClass('fa-eye')
                    $('.btnEyes').addClass('fa-eye-slash')
                }
            },
            onClose: () => {
                $('#edtSenha').val('')
                $('#edtConfSenha').val('')
                xgUsuario.focus()
            },
            buttons: {
                salvar: {
                    html: 'Salvar',
                    class: 'btnXmEdit',
                    click: btnXmEdit
                }
            },
        })
    }

    function xModalNovaSenha() {
        xmNovaSenha = new xModal.create({
            el: '#xmNovaSenha',
            title: "Cadastre sua senha",
            width: 350,
            height: 300,
            onOpen: () => {
                let e = $('#edtNovoSenha')[0]
                senha.getFuncionarios()

                if (e.type === "text") {
                    e.type = "password";
                    $('.btnEyes').removeClass('eyeSee')
                    $('.btnEyes').removeClass('fa-eye')
                    $('.btnEyes').addClass('fa-eye-slash')
                }
            },
            onClose: () => {
                $('#edtNovoSenha').val('')
                $('#edtNovoConfSenha').val('')
                xgUsuario.focus()
            },
            buttons: {
                salvar: {
                    html: 'Salvar',
                    class: 'btnXmSalvar',
                    click: btnXmSalvar
                }
            },
        })
    }





    //Btn
    function pesquisar() {
        let search = $('#edtPesquisa').val().trim();
        xgUsuario.queryOpen({ search });
        xgUsuario.focus();
    }

    function deletar() {
        if (xgUsuario.dataSource().ID_FUNCIONARIOS) {
            let param = {
                ID_USUARIO: xgUsuario.dataSource().ID_USUARIO,
                ID_FUNCIONARIOS: xgUsuario.dataSource().ID_FUNCIONARIOS
            }
            confirmaCodigo({
                msg: 'Digite o código de confirmação para deletar a senha',
                call: () => {
                    axios.post(url, {
                        call: 'delete',
                        param: param
                    })
                        .then(r => {
                            xgUsuario.deleteLine()
                        })
                }
            })
        }
    }


    function novo() {
        xmNovaSenha.open()
        $('#slctFuncionario').focus()
    }

    function editar() {
        xmSenha.open()
        $('#edtSenha').focus()
    }




    //Ver senha
    function eyes() {
        let e = $('#edtSenha')[0]


        if (e.type === "password") {
            e.type = "text";

        } else {
            e.type = "password";
        }

        if (e.type === "text") {
            $('.btnEyes').addClass('eyeSee')
            $('.btnEyes').addClass('fa-eye')
            $('.btnEyes').removeClass('fa-eye-slash')
        }
        if (e.type === "password") {
            $('.btnEyes').removeClass('eyeSee')
            $('.btnEyes').removeClass('fa-eye')
            $('.btnEyes').addClass('fa-eye-slash')
        }
    }

    function eyesNovo() {
        let a = $('#edtNovoSenha')[0]

        if (a.type === "password") {
            a.type = "text";

        } else {
            a.type = "password";
        }

        if (a.type === "text") {
            $('.btnNovoEyes').addClass('eyeSee')
            $('.btnNovoEyes').addClass('fa-eye')
            $('.btnNovoEyes').removeClass('fa-eye-slash')
        }
        if (a.type === "password") {
            $('.btnNovoEyes').removeClass('eyeSee')
            $('.btnNovoEyes').removeClass('fa-eye')
            $('.btnNovoEyes').addClass('fa-eye-slash')
        }
    }



    //keydown
    function keydown() {

        $('#xgUsuario').keydown(function (e) {
            if (e.keyCode == 13) {
                xmSenha.open()
                $('#edtSenha').focus()
            }
        })

        $('#slctFuncionario').keydown(function (e) {
            if (e.keyCode == 13) {
                $('#edtNovoSenha').focus()
            }
        })

        $('#edtSenha').keydown(function (e) {
            if (e.keyCode == 13) {
                $('#edtConfSenha').focus()
            }

            if (e.keyCode == 17) {
                eyes()
            }
        })

        $('#edtConfSenha').keydown(function (e) {
            if (e.keyCode == 13) {
                $('.btnXmEdit').click()
            }
        })


        $('#edtNovoSenha').keydown(function (e) {
            if (e.keyCode == 13) {
                $('#edtNovoConfSenha').focus()

            }

            if (e.keyCode == 17) {
                eyesNovo()
            }
        })

        $('#edtNovoConfSenha').keydown(function (e) {
            if (e.keyCode == 13) {
                btnXmSalvar()
            }
        })


        $("#edtPesquisa").keydown(function (e) {

            if (e.keyCode == 13) {
                search = $(this).val().trim()
                xgUsuario.queryOpen({ search: search })
                xgUsuario.focus();
            }
        })

        $(document).keydown(function (e) {
            if (e.keyCode == 113) {
                $("#edtPesquisa").focus()
            }
        })

    }


    //rotas
    function getSenhaFuncionarios(search, offset) {
        axios.post(url, {
            call: 'getSenhaFuncionarios',
            param: { search: search, offset: offset }
        })
            .then(rs => {
                xgUsuario.querySourceAdd(rs.data);
                if (rs.data[0]) xgUsuario.focus();

            })
    }

    function getFuncionarios() {
        $('#slctFuncionario').html('')

        axios.post(url, {
            call: 'getFuncionarios',

        }).then(rs => {

            for (let i in rs.data) {

                let table = `<option value="${rs.data[i].ID_FUNCIONARIOS}"> ${rs.data[i].NOME}</option>`
                $('#slctFuncionario').append(table)

            }

        })
    }

    function btnXmEdit() {
        let senha = $('#edtSenha').val()
        let senhaConf = $('#edtConfSenha').val()

        if (senha != senhaConf) {
            setTimeout(function () {
                show("As senhas são diferentes")
            }, 1);
            return false
        }

        if (senha == '' || senhaConf == '') {
            setTimeout(function () {
                show("O campo senha deve ser preencido")


            }, 1);
            return false
        }

        if (senha.length < 6) {
            setTimeout(function () {
                show("A senha é muito curta, a senha deve ter pelo menos 6 digitos")
            }, 1);
            return false
        }


        let param = {
            SENHA: senha,
            ID_USUARIO: xgUsuario.dataSource().ID_USUARIO,
            ID_FUNCIONARIOS: xgUsuario.dataSource().ID_FUNCIONARIOS
        }


        axios.post(url, {
            call: 'insertSenha',
            param: param
        }).then(r => {
            $('#edtSenha').val('')
            $('#edtConfSenha').val('')
            xmSenha.close()
            show('A sua senha foi editada')

        })
    }

    function btnXmSalvar() {
        let senha = $('#edtNovoSenha').val()
        let senhaConf = $('#edtNovoConfSenha').val()

        if (senha != senhaConf) {
            setTimeout(function () {
                show("As senhas são diferentes")
            }, 1);
            return false
        }

        if (senha == '' || senhaConf == '') {
            setTimeout(function () {
                show("O campo senha deve ser preenchido")
            }, 1);
            return false
        }

        if (senha.length < 6) {
            setTimeout(function () {
                show("A senha é muito curta, a senha deve ter pelo menos 6 digitos")
            }, 1);
            return false
        }



        let param = {
            SENHA: senha,
            ID_FUNCIONARIOS: $("#slctFuncionario option:selected").val()
        }
        let search = ''
        let funcionario = $("#slctFuncionario option:selected").html()
        setTimeout(function () {
            confirma({
                msg: `A senha é para ${funcionario}?`,
                call: () => {
                    axios.post(url, {
                        call: 'insertSenha',
                        param: param
                    }).then(r => {
                        $('#edtNovoSenha').val('')
                        $('#edtNovoConfSenha').val('')
                        xgUsuario.clear()
                        getSenhaFuncionarios(search)

                        xmNovaSenha.close()
                        show('A senha foi cadastrada')

                    })
                }
            })
        }, 1)
    }

    return {
        xGridUsuario: xGridUsuario,
        keydown: keydown,
        xModalSenha: xModalSenha,
        eyes: eyes,
        pesquisar: pesquisar,
        xModalNovaSenha: xModalNovaSenha,
        getFuncionarios: getFuncionarios,
        eyesNovo: eyesNovo,

    }
})();
