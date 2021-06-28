// VARIAVEIS GRID
let xgServicos;
let xgCliente;
let xgProjeto;
let xgProduto;

// VARIAVEIS MODAL
let xmListaCliente;
let xmNovoServico;
let xmNovoItem;
let xmValor;

// VARIAVEIS GLOBAIS
let ID_LISTA_SERVICO;

$(function () {
  // CARREGANDO FUNCTIONS
  projetos.grid();

  projetos.modalCliente();
  projetos.modalNovoServico();
  projetos.modalNovoItem();
  projetos.modalConfirmaValor();

  getDataEmpresa();

  // EVENTO TABS
  $(".tabs").tabs();

  // LISTENNING
  $("#edtPesquisa").keydown(function (e) {
    if (e.keyCode == 13) {
      search = $(this).val().trim();
      xgServicos.queryOpen({ search: search.toUpperCase() });
    }

    if (e.keyCode == 40) {
      xgServicos.focus();
    }
  });

  $("#edtQtd").keydown(function (e) {
    if (e.keyCode == 13) {
      $("#btnFinalizar").click();
    }
  });

  $("#xmEdtProduto").keydown(function (e) {
    if (e.keyCode == 13) {
      let produto = $("#xmEdtProduto").val().trim().toUpperCase();
      xgProduto.queryOpen({ search: produto });
    }
    if (e.keyCode == 40) {
      xgProduto.focus();
    }
  });

  $("#icon_up").click(function (e) {
    if ($("#edtProjeto").val() != "") {
      $("#up_file").click();
    } else {
      show("Digite o número do projeto para conseguir lança-lo ao sistema.");
    }
  });

  $(document).on("change", "#up_file", function (e) {
    $("#icon_up").css("color", "green");
  });

  // CHECKBOX
  $("#checkAndamento").click(function (e) {
    let search = $("#edtPesquisa").val().trim().toUpperCase();

    xgServicos.queryOpen({ search: search });
    $("#xmEdtServico").focus();
  });

  $("#checkProjeto").click(function (e) {
    let search = $("#edtPesquisa").val().trim().toUpperCase();

    xgServicos.queryOpen({ search: search });
    $("#xmEdtFantasia").focus();
  });

  $("#checkFinalizado").click(function (e) {
    let search = $("#edtPesquisa").val().trim().toUpperCase();

    xgServicos.queryOpen({ search: search });
    $("#xmEdtFantasia").focus();
  });

  $("#checkOrcamento").click(function (e) {
    let search = $("#edtPesquisa").val().trim().toUpperCase();

    xgServicos.queryOpen({ search: search });
    $("#xmEdtFantasia").focus();
  });

  $("#checkAnalise").click(function (e) {
    let search = $("#edtPesquisa").val().trim().toUpperCase();

    xgServicos.queryOpen({ search: search });
    $("#xmEdtFantasia").focus();
  });

  // BTN
  $(".btnNovoServ").click(function () {
    $(".btnNR").attr("disabled", true);
    projetos.buscar();
  });

  $(".btnBS").click(function () {
    projetos.buscarServ();
  });

  $("#btnDeletar").click(function () {
    projetos.cancelar();
  });

  $("#btnFinalizar").click(function () {
    projetos.salvar();
  });

  $("#btnPropostas").click(function () {
    projetos.relatorio();
  });

  $("#btnAprovado").click(function () {
    projetos.aceitarOrçamento();
  });

  $("#btnReprovado").click(function () {
    projetos.recusarOrçamento();
  });

  $(".btnVR").click(function () {
    xmValor.open();

    $("#valorServico").focus();
  });

  // QUERYOPEN
  xgServicos.queryOpen({ search: "" });
});

const projetos = (function () {
  // ENDERECO REQUEST
  let url = "projetos/per.projeto.php";

  // VARIAVEIS LOCAIS
  let ControleGrid;
  let ID_ITENS_SERVICO;
  let STATUS;
  let andamento;
  let finalizado;
  let projeto;
  let orcamento;
  let analise;
  let margem;
  let valorMinimo;
  let valorIntercessao;
  let valorMaximo;

  let dados_servico = {
    FANTASIA: "",
    CNPJ: "",
    ENGENHEIRO: "",
    SERVICO: "",
    EXECUTORES: "",
    DATA_INICIO: "",
    DATA_FINALIZACAO: "",
    VALOR: ",",
  };

  let VALOR;

  // GRID
  function grid() {
    xgServicos = new xGridV2.create({
      el: "#xgServicos",
      theme: "x-clownV2",
      height: "320",
      columns: {
        SERVIÇO: { dataField: "SERVICO" },
        FANTASIA: { dataField: "FANTASIA" },
        "DATA INÍCIO": { dataField: "DATA_INICIO", width: "12%", center: true },
        "DATA FINAL": {
          dataField: "DATA_FINALIZACAO",
          width: "12%",
          center: true,
        },
        STATUS: { dataField: "STATUS", width: "20%" },
      },
      sideBySide: {
        frame: {
          el: "#pnButtons",
          buttons: {
            pesquisa: {
              html: `<i class="fa fa-search" aria-hidden="true"></i>`,
              class: "btnP btnPesq",
              style: "margin-left:0px !important; margin-top:14px !important;",
              click: searchCliente,
            },
          },
        },
      },
      onKeyDown: {
        13: (ln, e) => {
          getDadosServ(ln);
        },
      },

      dblClick: (ln) => {
        if (ln == false) return false;

        getDadosServ(ln);
      },

      query: {
        execute: (r) => {
          getServicos(r.param.search, r.offset);
        },
      },
    });

    xgCliente = new xGridV2.create({
      el: "#pnGridCliente",
      height: "330",
      theme: "x-clownV2",
      heightLine: "27",

      columns: {
        "Razão Social": { dataField: "FANTASIA" },
        CNPJ: { dataField: "CNPJ", center: true },
        UF: { dataField: "UF", center: true },
        Cidade: { dataField: "CIDADE" },
      },

      onKeyDown: {
        13: (ln, e) => {
          cliente = ln;
          ID_CLIENTE = cliente.ID_CLIENTE;

          $("#xmSpFantasia").html(cliente.FANTASIA);
          $("#xmSpCnpj").html(cliente.CNPJ);
          $("#xmInEngenheiro").val(usuario.NOME);

          getServico();

          xmNovoServico.open();

          $("#xmInEngenheiro").focus();
        },
      },

      dblClick: (ln) => {
        if (ln == false) return false;

        cliente = ln;
        ID_CLIENTE = cliente.ID_CLIENTE;

        $("#xmSpFantasia").html(cliente.FANTASIA);
        $("#xmSpCnpj").html(cliente.CNPJ);
        $("#xmInEngenheiro").val(usuario.NOME);

        getServico();

        xmNovoServico.open();

        $("#xmInEngenheiro").focus();
      },

      query: {
        execute: (r) => {
          getCliente(r.param.search, r.offset);
        },
      },
    });

    xgProjeto = new xGridV2.create({
      el: "#xgProjeto",
      height: "180",
      theme: "x-clownV2",
      heightLine: "27",

      columns: {
        Produto: { dataField: "DESCRICAO" },
        QTD: { dataField: "QTD", width: "20%" },
      },

      sideBySide: {
        frame: {
          el: "#pnButtonsP",
          buttons: {
            novo: {
              html: "Novo Item",
              class: "btnP btnNovo",
              click: novo,
            },

            finalizar: {
              html: "Finzalizar Projeto",
              class: "btnP btnFP",
              click: finalizarProjeto,
            },

            deletar: {
              html: "Deletar",
              class: "btnP btnDel",
              click: deletar,
            },
          },
        },
      },

      onSelectLine: (ln) => {
        if (STATUS == "PROJETO") {
          $(".btnDel").removeAttr("disabled", true);
        } else if (
          STATUS == "ORÇAMENTO" ||
          STATUS == "ANÁLISE" ||
          STATUS == "ANDAMENTO"
        ) {
          $(".btnDel").attr("disabled", true);
        } else {
          show("ERRO INTERNO!");
        }
      },

      dblClick: (ln) => {
        if (ln == false) return false;
        setQtd(ln);
      },

      onKeyDown: {
        13: (ln) => {
          setQtd(ln);
        },
        46: (ln) => {
          STATUS = $("#spStatus").html();

          if (STATUS != "PROJETO") {
            return false;
          }

          deletar();
        },
      },
      query: {
        execute: (r) => {
          getItensProjeto(r.param.search, r.offset);
        },
      },
    });

    xgProduto = new xGridV2.create({
      el: "#xgProdutos",
      height: "340",
      theme: "x-clownV2",
      heightLine: "27",

      columns: {
        Codigo: { dataField: "CODIGO", width: "10%" },
        Produto: { dataField: "DESCRICAO", width: "60%" },
        Marca: { dataField: "MARCA", width: "30%" },
      },

      onKeyDown: {
        13: (ln, e) => {
          addItem(ln);
        },
      },

      dblClick: (ln) => {
        if (ln == false) return false;

        addItem(ln);
      },

      query: {
        execute: (r) => {
          getProdutos(r.param.search, r.offset);
        },
      },
    });
  }

  // GETS
  const getServicos = async (search, offset) => {
    await validaCheckbox();

    let param = {
      search: search,
      offset: offset,
      andamento: andamento,
      projeto: projeto,
      finalizado: finalizado,
      orcamento: orcamento,
      analise: analise,
    };

    axios
      .post(url, {
        call: "getServicos",
        param: param,
      })
      .then((r) => {
        xgServicos.querySourceAdd(r.data);
      });
  };

  function searchCliente() {
    let search = $("#edtPesquisa").val().trim().toUpperCase();
    xgServicos.queryOpen({ search });
    xgServicos.focus();
  }

  function buscar() {
    xgCliente.queryOpen({ search: "" });

    xmListaCliente.open();

    $("#xmEdtFantasia").focus();
  }

  async function buscarServ() {
    await xgServicos.queryOpen({ search: "" });

    $("#xmEdtServico").focus();
    $("#dados_cliente").hide();
    $("#Servicos").show();
  }

  function getCliente(search, offset) {
    axios
      .post(url, {
        call: "getCliente",
        param: { search: search, offset: offset },
      })
      .then((rs) => {
        xgCliente.querySourceAdd(rs.data);
      });
  }

  function getServico() {
    $("#slctServico").html("");

    axios
      .post(url, {
        call: "getServ",
      })
      .then((rs) => {
        axios
          .post(url, {
            call: "getVendedor",
          })
          .then((r) => {
            $("#slctVendedor").html("");
            $("#slctVendedor").append(`<option value="">Selecione</option>`);
            for (let i in r.data) {
              let vendedor = `<option value="${r.data[i].ID_FUNCIONARIOS}"> ${r.data[i].NOME}</option>`;
              $("#slctVendedor").append(vendedor);
            }
          });
        axios
          .post(url, {
            call: "getExecutor",
          })
          .then((resp) => {
            $("#slctExecutor").html("");
            $("#slctExecutor").append(`<option value="">Selecione</option>`);
            for (let i in resp.data) {
              let executor = `<option value="${resp.data[i].ID_EXECUTORES}"> ${resp.data[i].LIDER} / ${resp.data[i].AUXILIAR}</option>`;
              $("#slctExecutor").append(executor);
            }
          });
        $("#slctServico").append(`<option value="">Selecione</option>`);

        for (let i in rs.data) {
          let table = `<option value="${rs.data[i].ID_SERVICO}"> ${rs.data[i].SERVICO}</option>`;
          $("#slctServico").append(table);
        }
      });
  }

  function getDadosServ(ln) {
    ID_LISTA_SERVICO = ln.ID_LISTA_SERVICO;
    STATUS = ln.STATUS;

    ControleGrid = "exist";

    getListaServicoX(ID_LISTA_SERVICO);

    xgProjeto.queryOpen({ search: ln.ID_SERVICO });

    $("#Servicos").hide();
    $("#dados_cliente").show();
  }

  function getItensProjeto(search, offset) {
    let param = {
      search: search,
      offset: offset,
      ID_LISTA_SERVICO: ID_LISTA_SERVICO,
      controle: ControleGrid,
    };

    if (ControleGrid == "new") {
      param.QTD_PRODUTO = 0;
      param.QTD_RETIRADA = 0;
      param.DATA = new Date().toLocaleDateString("pt-BR");
      param.ORIGEM = "PROJETO";
      param.ID_PRODUTO = 0;
    }

    axios
      .post(url, {
        call: "getItensProjeto",
        param: param,
      })
      .then((r) => {
        xgProjeto.querySourceAdd(r.data);
      });
  }

  function getListaServicoX(id_lista_servico) {
    axios
      .post(url, {
        call: "getListaServicoX",
        param: { id_lista_servico: id_lista_servico },
      })
      .then((rs) => {
        setServicoTela(rs.data[0]);
        STATUS = rs.data[0].STATUS;

        if (STATUS == "PROJETO") {
          ativaButtons();

          $("#btnAprovado").attr("disabled", true);
          $("#btnReprovado").attr("disabled", true);
          $(".btnVR").attr("disabled", true);
          $("#btnPropostas").attr("disabled", true);
        } else if (STATUS == "ORÇAMENTO") {
          bloqueiaButtons();

          margem = rs.data[0].MARGEM_PRODUTO;
          valorMinimo = rs.data[0].VALOR_MINIMO;
          valorIntercessao = rs.data[0].VALOR_INTERCESSAO;
          valorMaximo = rs.data[0].VALOR_MAXIMO;

          $("#margem").html("R$" + margem);
          $("#valorMinimo").html("R$" + valorMinimo);
          $("#valorIntercessao").html("R$" + valorIntercessao);
          $("#valorMaximo").html("R$" + valorMaximo);

          $(".btnVR").attr("disabled", true);
          $("#btnPropostas").attr("disabled", true);

          $("#btnAprovado").removeAttr("disabled", true);
          $("#btnReprovado").removeAttr("disabled", true);
        } else if (STATUS == "ANÁLISE" || STATUS == "ANDAMENTO") {
          bloqueiaButtons();

          margem = rs.data[0].MARGEM_PRODUTO;
          valorMinimo = rs.data[0].VALOR_MINIMO;
          valorIntercessao = rs.data[0].VALOR_INTERCESSAO;
          valorMaximo = rs.data[0].VALOR_MAXIMO;

          $("#margem").html("R$" + margem);
          $("#valorMinimo").html("R$" + valorMinimo);
          $("#valorIntercessao").html("R$" + valorIntercessao);
          $("#valorMaximo").html("R$" + valorMaximo);

          $(".btnVR").removeAttr("disabled", true);
          $("#btnPropostas").removeAttr("disabled", true);

          $("#btnAprovado").attr("disabled", true);
          $("#btnReprovado").attr("disabled", true);
        } else {
          show("ERRO INTERNO!");
        }
      });
  }

  function getProdutos(search, offset) {
    axios
      .post(url, {
        call: "getProdutos",
        param: { search: search, offset: offset },
      })
      .then((rs) => {
        xgProduto.querySourceAdd(rs.data);
      });
  }

  // DO
  function gerarServico() {
    let param = {
      ID_CLIENTE: xgCliente.dataSource().ID_CLIENTE,
      ID_SERVICO: $("#slctServico").val(),
      ID_VENDEDOR: $("#slctVendedor").val(),
      ENGENHEIRO: $("#xmInEngenheiro").val(),
      EXECUTORES: $("#slctExecutor").val(),
      PROJETO: $("#edtProjeto").val(),
      DATA: new Date().toLocaleDateString("pt-BR"),
      HORA: new Date().toLocaleTimeString("pt-BR"),
    };

    let projeto = $("#up_file")[0];

    for (let i in param) {
      if (param[i] == "" || param[i] == null || param == undefined) {
        show("Preencha corretamente todos os campos!");
        return false;
      }
    }

    if (projeto.files[0] == undefined) {
      show("Não há documento anexado ao formulário!");
      return false
    }

    if (projeto.files[0].type != "application/pdf") {
      show(`Documento inválido! <br>O documento não possui formato PDF.`);
      return false;
    }

    param.OBS = $("#xmInObs").val();

    var fReader = new FileReader();

    fReader.readAsDataURL(projeto.files[0]);

    let name = param.PROJETO + '.' + projeto.files[0].name.split(".")[1]

    fReader.onloadend = function (event) {

        projeto = {
            arquivo: event.target.result,
            name: name,
        }
        
        
        axios.post(url, {
        call: "gerarServico",
        param: {param:param , projeto: projeto},
        })
        .then((rs) => {

            return

            ID_LISTA_SERVICO = rs.data[0].ID_LISTA_SERVICO;

            getListaServicoX(ID_LISTA_SERVICO);

            xgProjeto.queryOpen({ search: param.ID_SERVICO });

            // xgProjeto.source([])
        });

    }

    // ControleGrid = "new";


    // $("#dados_cliente").show();
    // $("#Servicos").hide();

    // xmNovoServico.close();
    // xmListaCliente.close();
  }

  function cancelar() {
    $("#spDescricao").html("");
    $("#edtQtd").val("");

    $("#setQtd").hide();
    $(".btnAll").show();

    xgProjeto.enable();

    xgProjeto.focus();
  }

  function deletar(ln) {
    confirma({
      msg: 'VOCÊ DESEJA DELETAR O ITEM "' + ln.DESCRICAO + '"',
      call: () => {
        axios
          .post(url, {
            call: "deleteItem",
            param: ln.ID_ITENS_SERVICO,
          })
          .then((r) => {
            xgProjeto.deleteLine();
          });
      },
    });
  }

  function novo() {
    xgProduto.queryOpen({ search: "" });

    xmNovoItem.open();

    $("#xmEdtProduto").focus();
  }

  function deletar() {
    let descricao = xgProjeto.dataSource().DESCRICAO;
    confirma({
      msg: 'DESEJA EXCLUIR O ITEM "' + descricao + '"?',
      call: () => {
        ID_ITENS_SERVICO = xgProjeto.dataSource().ID_ITENS_SERVICO;

        axios
          .post(url, {
            call: "deleteItem",
            param: ID_ITENS_SERVICO,
          })
          .then((r) => {
            xgProjeto.deleteLine();
          });
      },
    });
  }

  function finalizarProjeto() {
    confirmaCodigo({
      msg: "DIGITE O CÓDIGO ABAIXO PARA FINALIZAR O PROJETO",
      call: () => {
        axios
          .post(url, {
            call: "statusServico",
            param: {
              ID_LISTA_SERVICO: ID_LISTA_SERVICO,
              STATUS: "ORÇAMENTO",
            },
          })
          .then((r) => {
            let TOTAL = 0;

            for (let i in xgProjeto.data()) {
              let QTD = Number(xgProjeto.data()[i].QTD);

              if (QTD == 0) {
                show("O projeto possui item sem quantidade!");
                return false;
              }

              let VALOR = Number(xgProjeto.data()[i].VALOR.replace(",", "."));

              TOTAL += QTD * VALOR;
            }

            margem = TOTAL * 0.1 + TOTAL;
            valorMinimo = margem * 0.5 + margem;
            valorIntercessao = margem * 0.67 + margem;
            valorMaximo = margem * 0.8 + margem;

            STATUS = "ORÇAMENTO";

            $("#spStatus").html(STATUS);

            $("#orcaIndispo").hide();
            $("#orcaDispo").show();

            axios
              .post(url, {
                call: "updateOrcamento",
                param: {
                  margem: margem.toFixed(2),
                  valorMinimo: valorMinimo.toFixed(2),
                  valorIntercessao: valorIntercessao.toFixed(2),
                  valorMaximo: valorMaximo.toFixed(2),
                  ID_LISTA_SERVICO: ID_LISTA_SERVICO,
                },
              })
              .then((r) => {
                bloqueiaButtons();

                $("#btnPropostas").attr("disabled", true);

                $("#btnAprovado").removeAttr("disabled", true);
                $("#btnReprovado").removeAttr("disabled", true);

                $("#margem").html("R$" + margem.toFixed(2));
                $("#valorMinimo").html("R$" + valorMinimo.toFixed(2));
                $("#valorIntercessao").html("R$" + valorIntercessao.toFixed(2));
                $("#valorMaximo").html("R$" + valorMaximo.toFixed(2));
              });
          });
      },
    });
  }

  function ativaButtons() {
    $(".btnNovo").removeAttr("disabled", true);
    $(".btnFP").removeAttr("disabled", true);
    $(".btnDel").attr("disabled", true);
    $("#orcaDispo").hide();
    $("#orcaIndispo").show();
  }

  function bloqueiaButtons() {
    $(".btnNovo").attr("disabled", true);
    $(".btnFP").attr("disabled", true);
    $(".btnDel").attr("disabled", true);
    $("#orcaIndispo").hide();
    $("#orcaDispo").show();
  }

  function recusarOrçamento() {
    confirmaCodigo({
      msg: "Digite o código abaixo para reprovar o orçamento.",
      call: () => {
        axios
          .post(url, {
            call: "statusServico",
            param: {
              ID_LISTA_SERVICO: ID_LISTA_SERVICO,
              STATUS: "PROJETO",
            },
          })
          .then((r) => {
            ativaButtons();
            STATUS = "PROJETO";
            $("#spStatus").html(STATUS);
          });
      },
    });
  }

  function aceitarOrçamento() {
    confirmaCodigo({
      msg: "Digite o código abaixo para aceitar o orçamento.",
      call: () => {
        axios
          .post(url, {
            call: "statusServico",
            param: {
              ID_LISTA_SERVICO: ID_LISTA_SERVICO,
              STATUS: "ANÁLISE",
            },
          })
          .then((r) => {
            STATUS = "ANÁLISE";

            $("#spStatus").html(STATUS);

            $(".btnVR").removeAttr("disabled", true);
            $("#btnPropostas").removeAttr("disabled", true);

            $("#btnAprovado").attr("disabled", true);
            $("#btnReprovado").attr("disabled", true);
          });
      },
    });
  }

  function validaCheckbox() {
    if ($("#checkAndamento").is(":checked") == true) {
      andamento = "ANDAMENTO";
    }

    if ($("#checkProjeto").is(":checked") == true) {
      projeto = "PROJETO";
    }

    if ($("#checkFinalizado").is(":checked") == true) {
      finalizado = "FINALIZADO";
    }

    if ($("#checkOrcamento").is(":checked") == true) {
      orcamento = "ORÇAMENTO";
    }

    if ($("#checkAnalise").is(":checked") == true) {
      analise = "ANÁLISE";
    }

    if ($("#checkFinalizado").is(":checked") == false) {
      finalizado = "";
    }

    if ($("#checkProjeto").is(":checked") == false) {
      projeto = "";
    }

    if ($("#checkAndamento").is(":checked") == false) {
      andamento = "";
    }

    if ($("#checkOrcamento").is(":checked") == false) {
      orcamento = "";
    }

    if ($("#checkAnalise").is(":checked") == false) {
      analise = "";
    }
  }

  function relatorio() {
    $("#rlFantasia").html(dados_servico.FANTASIA);
    $("#rlCnpj").html(dados_servico.CNPJ);
    $("#rlEngenheiro").html(dados_servico.ENGENHEIRO);
    $("#rlServico").html(dados_servico.SERVICO);
    $("#rlExecutores").html(dados_servico.EXECUTORES);
    $("#rlDataI").html(dados_servico.DATA_INICIO);
    $("#rlDataF").html(dados_servico.DATA_FINALIZACAO);

    $("#valorMenor").html("R$ " + valorMinimo);
    $("#intercessaoValor").html("R$ " + valorIntercessao);
    $("#valorMaior").html("R$ " + valorMaximo);

    $("#pdfOrcamento").xPrint();
  }

  // SET
  function setServicoTela(param) {
    $("#spId_lista_servico").html(param.ID_LISTA_SERVICO);
    $("#spFantasia").html(param.FANTASIA);
    $("#spCnpj").html(param.CNPJ);
    $("#spEngenheiro").html(param.ENGENHEIRO);
    $("#spServico").html(param.SERVICO);
    $("#spExecutores").html(param.EXECUTORES);
    $("#spDataI").html(param.DATA_INICIO);
    $("#spDataF").html(param.DATA_FINALIZACAO);
    $("#spStatus").html(param.STATUS);
    $("#spValor").html(param.VALOR);

    dados_servico = {
      FANTASIA: param.FANTASIA,
      CNPJ: param.CNPJ,
      ENGENHEIRO: param.ENGENHEIRO,
      SERVICO: param.SERVICO,
      EXECUTORES: param.EXECUTORES,
      DATA_INICIO: param.DATA_INICIO,
      DATA_FINALIZACAO: param.DATA_FINALIZACAO,
    };

    OBS = param.OBS;
  }

  function setQtd(ln) {
    if (STATUS != "PROJETO") {
      return false;
    }

    ID_ITENS_SERVICO = ln.ID_ITENS_SERVICO;

    $("#spDescricao").html(ln.DESCRICAO);
    $("#edtQtd").val(ln.QTD);

    $(".btnAll").hide();
    $("#setQtd").show();

    $("#edtQtd").focus();
    $("#edtQtd").select();

    xgProjeto.disable();
  }

  function salvar() {
    let QTD = $("#edtQtd").val();

    if (QTD == "") {
      show("QUANTIDADE INVÁLIDA!");
      return false;
    }

    if (QTD < 0) {
      show("QUANTIDADE INVÁLIDA!");
      return false;
    } else if (QTD >= 0) {
      axios
        .post(url, {
          call: "setQtd",
          param: {
            ID_ITENS_SERVICO: ID_ITENS_SERVICO,
            QTD: QTD,
          },
        })
        .then((r) => {
          xgProjeto.dataSource("QTD", QTD);
          cancelar();
        });
    }
  }

  function addItem(ln) {
    for (let i in xgProjeto.data()) {
      let id_produto = xgProjeto.data()[i].ID_PRODUTO;
      if (id_produto == ln.ID_PRODUTO) {
        show("ITEM JÁ INCLUSO!");
        return false;
      }
    }

    axios
      .post(url, {
        call: "inserirItem",
        param: {
          ID_LISTA_SERVICO: ID_LISTA_SERVICO,
          ID_PRODUTO: ln.ID_PRODUTO,
          ORIGEM: "PROJETO",
          QTD_PRODUTO: 0,
          DATA: new Date().toLocaleDateString("pt-BR"),
          QTD_RETIRADA: 0,
        },
      })
      .then((r) => {
        ln.ID_ITENS_SERVICO = r.data[0].ID_ITENS_SERVICO;
        ln.QTD = 0;
        xgProjeto.insertLine(ln);
      });
  }

  function salvarValorServico() {
    // validar o valor
    VALOR = $("#valorServico").val();
    console.log("VALOR :", VALOR);

    if (VALOR == "" || VALOR <= "0") {
      show("Valor inválido!");
      return false;
    }

    // else if (VALOR < valorMinimo) {

    //     show('O valor do serviço não pode ser menor que o orçamento mínimo!')
    //     return false
    // }
    else if (VALOR > "0") {
      VALOR = String(VALOR).replace(".", ",");
      STATUS = "PREPARO";
      axios
        .post(url, {
          call: "updateValorServico",
          param: {
            ID_LISTA_SERVICO: ID_LISTA_SERVICO,
            VALOR: VALOR,
            STATUS: STATUS,
          },
        })
        .then((r) => {
          xmValor.close();

          $("#spStatus").html(STATUS);

          $("#valorVendido").html("R$ " + VALOR);
        });
    } else {
      show("ERRO INTERNO!");
    }
  }

  // MODAL
  function modalCliente() {
    xmListaCliente = new xModal.create({
      el: "#xmListaCliente",
      title: "Clientes",
      width: "700",
      height: "500",
    });
  }

  function modalNovoServico() {
    xmNovoServico = new xModal.create({
      el: "#xmServico",
      title: "Novo Serviço",
      height: "525",
      width: "500",
      buttons: {
        btn1: {
          html: "Confirmar",
          class: "xmBtnNovoS",
          click: (e) => {
            gerarServico();
          },
        },
      },

      onClose: () => {
        $("#xmInEngenheiro").val("");
        $("#xmInEx").val("");
        $("#xmInDataI").val("");
        $("#xmInDataF").val("");
        $("#xmInObs").val("");
        $("#edtProjeto").val("");
        $("#icon_up").css("color", "black");
        $("#up_file").val("");
      },
    });
  }

  function modalNovoItem() {
    xmNovoItem = new xModal.create({
      el: "#xmProdutos",
      title: "Novo Item",
    });
  }

  function modalConfirmaValor() {
    xmValor = new xModal.create({
      el: "#xmConfirmaValor",
      title: "Confirmar Valor",
      height: "157",
      width: "200",
      buttons: {
        btn1: {
          html: "Confirmar",
          class: "xmBtnNovoS",
          click: (e) => {
            salvarValorServico();
          },
        },
      },
      onClose() {
        $("#valorServico").val("");
      },
    });
  }

  // RETURN
  return {
    grid: grid,
    buscar: buscar,
    modalCliente: modalCliente,
    modalNovoServico: modalNovoServico,
    buscarServ: buscarServ,
    cancelar: cancelar,
    salvar: salvar,
    modalNovoItem: modalNovoItem,
    recusarOrçamento: recusarOrçamento,
    modalConfirmaValor: modalConfirmaValor,
    aceitarOrçamento: aceitarOrçamento,
    relatorio: relatorio,
  };
})();
