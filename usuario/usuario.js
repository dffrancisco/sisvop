let xgUsuario;
let xmSenha;

$(function () {
    senha.xGridUsuario()
    senha.keydown()
    senha.xModalSenha()
    senha.eyes()
    senha.pesquisar()
    xgUsuario.queryOpen({ search: '' });

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
            query: {
                execute: (r) => {
                    getFuncionarios(r.param.search, r.offset);
                }
            }
        })
    }

    //xmodal
    function xModalSenha() {
        xmSenha = new xModal.create({
            el: '#xmSenha',
            title: "Cadastre sua senha",
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



    //Ver senha
    function eyes() {
        let e = $('#edtSenha')[0]

        $('.btnEyes').click(function () {

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
        })

    }




    //keydown
    function keydown() {

        $('#xgUsuario').keydown(function (e) {
            if (e.keyCode == 13) {
                xmSenha.open()
                $('#edtSenha').focus()
            }
        })

        $('#edtSenha').keydown(function (e) {
            if (e.keyCode == 13) {
                $('#edtConfSenha').focus()

            }

            if (e.keyCode == 17) {
                $('.btnEyes').click()

            }
        })

        $('#edtConfSenha').keydown(function (e) {
            if (e.keyCode == 13) {
                $('.btnXmSalvar').click()
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
    function getFuncionarios(search, offset) {
        axios.post(url, {
            call: 'getFuncionarios',
            param: { search: search, offset: offset }
        })
            .then(rs => {
                xgUsuario.querySourceAdd(rs.data);
                if (rs.data[0]) xgUsuario.focus();

            })
    }


    function btnXmSalvar() {
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
            show('A senha foi cadastrada')

        })
    }



    return {
        xGridUsuario: xGridUsuario,
        keydown: keydown,
        xModalSenha: xModalSenha,
        eyes: eyes,
        pesquisar: pesquisar

    }
})();
