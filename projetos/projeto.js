let xgServicos;
let xgCliente;
let xgProjeto;

let xmListaCliente;
let xmNovoServico;

let ID_LISTA_SERVICO

$(function () {
    projetos.grid()
    projetos.modalCliente()
    projetos.modalNovoServico()

    $("#xmEdtServico").keydown(function (e) {

        if (e.keyCode == 13) {
            search = $(this).val().trim()
            xgServicos.queryOpen({ search: search.toUpperCase() })
        }

        if (e.keyCode == 40) {
            xgServicos.focus()
        }
    })

    $('#checkAndamento').click(function (e) {
        let search = $('#xmEdtFantasia').val().trim().toUpperCase()

        xgServicos.queryOpen({ search: search })
        $('#xmEdtServico').focus()

    })

    $('#checkProjeto').click(function (e) {
        let search = $('#xmEdtFantasia').val().trim().toUpperCase()

        xgServicos.queryOpen({ search: search })
        $('#xmEdtFantasia').focus()

    })

    $('#checkFinalizado').click(function (e) {
        let search = $('#xmEdtFantasia').val().trim().toUpperCase()

        xgServicos.queryOpen({ search: search })
        $('#xmEdtFantasia').focus()

    })

    $(".btnPesq").click(function () {
        $('.btnNR').attr("disabled", true);
        projetos.buscar()
    })

    $(".btnBS").click(function () {
        projetos.buscarServ()

    })

    xgServicos.queryOpen({ search: '' })


});

const projetos = (function () {

    let url = 'projetos/per.projeto.php';
    let ControleGrid;

    // GRID
    function grid() {

        xgServicos = new xGridV2.create({
            el: '#xgServicos',
            theme: 'x-clownV2',
            height: '320',
            columns: {

                'SERVIÇO': { dataField: 'SERVICO' },
                FANTASIA: { dataField: 'FANTASIA' },
                'DATA INÍCIO': { dataField: 'DATA_INICIO', center: true },
                'DATA FINAL': { dataField: 'DATA_FINALIZACAO', center: true },
                STATUS: { dataField: 'STATUS' },

            },

            onKeyDown: {
                '13': (ln, e) => {

                    getDadosServ(ln)
                }

            },

            dblClick: (ln) => {
                if (ln == false)
                    return false

                getDadosServ(ln)

            },

            query: {
                execute: (r) => {
                    getServicos(r.param.search, r.offset);
                }
            }
        })

        xgCliente = new xGridV2.create({

            el: '#pnGridCliente',
            height: '330',
            theme: 'x-clownV2',
            heightLine: '35',

            columns: {

                'Razão Social': { dataField: 'FANTASIA' },
                CNPJ: { dataField: 'CNPJ', center: true },
                UF: { dataField: 'UF', center: true },
                Cidade: { dataField: 'CIDADE' },
            },

            onKeyDown: {
                '13': (ln, e) => {

                    cliente = ln
                    ID_CLIENTE = cliente.ID_CLIENTE

                    $("#xmSpFantasia").html(cliente.FANTASIA);
                    $("#xmSpCnpj").html(cliente.CNPJ);
                    $("#xmInEngenheiro").val(usuario.NOME)
                    getServico();

                    xmNovoServico.open();

                    $("#xmInEngenheiro").focus()

                },
            },

            dblClick: (ln) => {

                cliente = ln
                ID_CLIENTE = cliente.ID_CLIENTE

                $("#xmSpFantasia").html(cliente.FANTASIA);
                $("#xmSpCnpj").html(cliente.CNPJ);
                $("#xmInEngenheiro").val(usuario.NOME)


                getServico();

                xmNovoServico.open();

                $("#xmInEngenheiro").focus()

            },

            query: {
                execute: (r) => {

                    getCliente(r.param.search, r.offset);
                }
            }
        })


    }

    // GETS
    function getServicos(search, offset) {
        if ($('#checkAndamento').is(':checked') == true) {
            andamento = 'ANDAMENTO'
        }

        if ($('#checkProjeto').is(':checked') == true) {
            projeto = 'PROJETO'
        }

        if ($('#checkFinalizado').is(':checked') == true) {
            finalizado = 'FINALIZADO'
        }

        if ($('#checkFinalizado').is(':checked') == false) {
            finalizado = ''
        }
        if ($('#checkProjeto').is(':checked') == false) {
            projeto = ''
        }
        if ($('#checkAndamento').is(':checked') == false) {
            andamento = ''
        }

        axios.post(url, {
            call: 'getServicos',
            param: {
                search: search,
                offset: offset,
                andamento: andamento,
                projeto: projeto,
                finalizado: finalizado
            }
        }).then(r => {

            xgServicos.querySourceAdd(r.data)
        })
    }

    function buscar() {

        xgCliente.queryOpen({ search: '' });

        xmListaCliente.open();

        $('#xmEdtFantasia').focus()

    }

    async function buscarServ() {

        await xgServicos.queryOpen({ search: '' })

        $('#xmEdtServico').focus()
        $('#dados_cliente').hide()
        $('#Servicos').show()
    }

    function getCliente(search, offset) {

        axios.post(url, {

            call: 'getCliente',
            param: { search: search, offset: offset },

        })
            .then(rs => {

                xgCliente.querySourceAdd(rs.data);
            })
    }

    function getServico() {

        $('#slctServico').html('')

        axios.post(url, {

            call: 'getServ',

        }).then(rs => {

            for (let i in rs.data) {

                let table = `<option value="${rs.data[i].ID_SERVICO}"> ${rs.data[i].SERVICO}</option>`
                $('#slctServico').append(table)
            }
        })
    }

    function getDadosServ(ln) {

        getListaServicoX(ln.ID_LISTA_SERVICO);

        ID_LISTA_SERVICO = ln.ID_LISTA_SERVICO

        $('#Servicos').hide()
        $('#dados_cliente').show()
    }

    function gerarServico() {
        let param = {
            ID_CLIENTE: xgCliente.dataSource().ID_CLIENTE,
            ID_SERVICO: $('#slctServico').val(),
            ENGENHEIRO: $('#xmInEngenheiro').val(),
            EXECUTORES: $('#xmInEx').val(),
            DATA_INICIO: $('#xmInDataI').val(),
            DATA_FINAL: $('#xmInDataF').val(),
            DATA: new Date().toLocaleDateString('pt-BR'),
            HORA: new Date().toLocaleTimeString('pt-BR'),

        }


        for (let i in param) {
            if (param[i] == "" || param[i] == null || param == undefined) {
                show("Preencha corretamente todos os campos!")
                return false
            }
        }

        if (param.DATA_INICIO.length != 10) {
            show("Data de início inválida")
            return false

        }

        if (param.DATA_INICIO.length != 10) {
            show("Data de finalização inválida")
            return false

        }

        param.OBS = $('#xmInObs').val()

        axios.post(url, {

            call: 'gerarServico',
            param: param

        }).then(rs => {

            ID_LISTA_SERVICO = rs.data[0].ID_LISTA_SERVICO
            getListaServicoX(ID_LISTA_SERVICO)
            // xgProjeto.source([])

        })

        $('#dados_cliente').show()
        $('#Servicos').hide()

        xmNovoServico.close()
        xmListaCliente.close()
    }

    function getListaServicoX(id_lista_servico) {

        axios.post(url, {

            call: 'getListaServicoX',
            param: { id_lista_servico: id_lista_servico }

        })
            .then(rs => {

                setServicoTela(rs.data[0])

            })

    }

    function setServicoTela(param) {

        $('#spId_lista_servico').html(param.ID_LISTA_SERVICO)
        $('#spFantasia').html(param.FANTASIA)
        $('#spCnpj').html(param.CNPJ)
        $('#spEngenheiro').html(param.ENGENHEIRO)
        $('#spServico').html(param.SERVICO)
        $('#spExecutores').html(param.EXECUTORES)
        $('#spDataI').html(param.DATA_INICIO)
        $('#spDataF').html(param.DATA_FINALIZACAO)
        $('#spStatus').html(param.STATUS)
        $('#spValor').html(param.VALOR)

        OBS = param.OBS

    }

    // MODAL

    function modalCliente() {

        xmListaCliente = new xModal.create({
            el: '#xmListaCliente',
            title: 'Clientes',
            width: '700',
        })
    }

    function modalNovoServico() {

        xmNovoServico = new xModal.create({
            el: '#xmServico',
            title: 'Novo Serviço',
            height: '525',
            width: '500',
            buttons: {
                btn1: {

                    html: 'Confirmar',
                    class: 'xmBtnNovoS',
                    click: (e) => {
                        gerarServico()
                    }
                }
            },

            onClose: () => {
                $('#xmInEngenheiro').val('')
                $('#xmInEx').val('')
                $('#xmInDataI').val('')
                $('#xmInDataF').val('')
                $('#xmInObs').val('')
            }
        })
    }

    return {
        grid: grid,
        buscar: buscar,
        modalCliente: modalCliente,
        modalNovoServico: modalNovoServico,
        buscarServ: buscarServ,
    }
})()