let xgSaida;
let xgProduto;
let xgRomaneios;
let xgRomaneiosItens;
let xgServicos;
let xgProdRomaneio;
let xgDevolucao;
let xgRomaneiosItensD;

let xmEdtQtd;
let xmInsProduto;
let xmInserirRomaneio;
let xmModalPDevolucao;
let xmModalDataFin

let total = 0;
// let valorT = 0
let newEstoque = 0;
var evento;
let OBS;
let view = 0;
let andamento = "";
let projeto = "";
let finalizado = "";

let ID_LISTA_SERVICO;
let ID_CLIENTE;

$(function () {
  saida.modalInsProduto();
  saida.grid();
  saida.modalInserirRomaneio();
  saida.modalDataFin();

  devolucao.grid();
  devolucao.modalPDevolucao();

  produtos.grid();
  produtos.modalEdtQtd();

  getDataEmpresa();

  $(".tabs").tabs();

  $(".btnDel").attr("disabled", true);
  // $('.btnAF').attr("disabled", true);
  // $('.btnV').attr("disabled", true);
  // $('.btnObra').attr("disabled", true);
  // $('.btnInsP').attr("disabled", true);
  // $('.btnNR').attr("disabled", true);
  // $('.btnPR').attr("disabled", true);
  // $('.btnFR').attr("disabled", true);
  // $('.btnPDF').attr("disabled", true);
  // $('.btnDI').attr("disabled", true);
  // $('.btnRG').attr("disabled", true);

  $("#xmEdtProduto").keydown(function (e) {
    if (e.keyCode == 13) {
      search = $(this).val().trim();
      xgProduto.queryOpen({ search: search.toUpperCase() });
    }

    if (e.keyCode == 40) {
      xgProduto.focus();
      $("#xmEdtProduto").val("");
    }
  });

  $("#xmEdtServico").keydown(function (e) {
    if (e.keyCode == 13) {
      search = $(this).val().trim();
      xgServicos.queryOpen({ search: search.toUpperCase() });
    }

    if (e.keyCode == 40) {
      xgServicos.focus();
    }
  });

  $("#xmEdtIRomaneio").keydown(function (e) {
    if (e.keyCode == 13) {
      search = $(this).val().trim();
      xgProdRomaneio.queryOpen({ search: search.toUpperCase() });
    }

    if (e.keyCode == 40) {
      xgProdRomaneio.focus();
    }
  });

  $(".btnBS").click(function () {
    saida.buscarServ();
  });

  $("#xmQtd").keydown(function (e) {
    if (e.keyCode == 13) {
      $(".xmQtdBtn").click();
    }
  });

  $("#spObs").click(function (e) {
    show(OBS);
  });

  $("#btnEncerrarServ").click(function (e) {
    saida.encerrarServico()
  });

  $(".btnRG").click(function (e) {
    saida.relatorioGeral();
  });

  $("#checkAndamento").click(function (e) {
    let search = $("#xmEdtServico").val().trim().toUpperCase();
    xgServicos.queryOpen({ search: search });
    $("#xmEdtServico").focus();
  });

  $("#checkPreparo").click(function (e) {
    let search = $("#xmEdtServico").val().trim().toUpperCase();
    xgServicos.queryOpen({ search: search });
    $("#xmEdtServico").focus();
  });

  $("#checkEncerrado").click(function (e) {
    let search = $("#xmEdtServico").val().trim().toUpperCase();
    xgServicos.queryOpen({ search: search });
    $("#xmEdtServico").focus();
  });

  $("#checkFinalizacao").click(function (e) {
    let search = $("#xmEdtServico").val().trim().toUpperCase();
    xgServicos.queryOpen({ search: search });
    $("#xmEdtServico").focus();
  });
  $("#spStatus").click(function (e) {
    saida.validaSpStatus()
  });

  $("#checkAtrasado").click(function (e) {
    let search = $("#xmEdtServico").val().trim().toUpperCase();
    xgServicos.queryOpen({ search: search });
    $("#xmEdtServico").focus();
  });

  $("#liPdfProjeto").click(function () {
    $("#tabPdfProjeto").html("")
    saida.setIframe()
});

  xgServicos.queryOpen({ search: "" });
  $("#xmEdtServico").focus();
});

const saida = (function () {
  let url = "obras/per.obras.php";
  let ControleGrid;

  let itensOpeFin = {}

  let andamento;
  let projeto;
  let finalizado;

  let STATUS;
  let dados_servico = {
    FANTASIA: "",
    CNPJ: "",
    ENGENHEIRO: "",
    SERVICO: "",
    EXECUTORES: "",
    DATA_INICIO: "",
    DATA_FINALIZACAO: "",
    STATUS: "",
  };

  function grid() {
    // GRID SERVICOS
    xgServicos = new xGridV2.create({
      el: `#xgServicos`,
      theme: "x-clownV2",
      height: "320",
      columns: {
        SERVIÇO: { dataField: "SERVICO" },
        FANTASIA: { dataField: "FANTASIA" },
        "DATA INÍCIO": { dataField: "DATA_INICIO", center: true },
        "DATA FINAL": { dataField: "DATA_FINALIZACAO", center: true },
        STATUS: { dataField: "STATUS" },
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

    // GRID LISTA DE ITENS
    xgSaida = new xGridV2.create({
      el: "#pnGridSaida",
      height: "180",
      theme: "x-clownV2",
      heightLine: "27",

      columns: {
        Produto: { dataField: "DESCRICAO" },
        Marca: { dataField: "MARCA" },
        QTD: { dataField: "QTD", width: "10%" },
        Retirado: { dataField: "QTD_RETIRADA", width: "10%" },
        Data: { dataField: "DATA", center: true },
        ORIGEM: { dataField: "ORIGEM", center: true },
      },

      sideBySide: {
        el: "#pnFields",

        frame: {
          el: "#pnButtonsP",
          buttons: {
            newProduto: {
              html: "Inserir Produto",
              class: "btnP btnInsP",
              click: novo,
            },

            deletar: {
              html: "Deletar",
              class: "btnP btnDel",
              state: xGridV2.state.delete,
              click: deletar,
            },
          },
        },
      },

      onSelectLine: (r) => {
        let origem = r.ORIGEM;

        if (origem == "PROJETO" && dados_servico.STATUS == "PREPARO") {
          $(".btnDel").attr("disabled", true);
        } else if (origem == "PROJETO" && dados_servico.STATUS == "ANDAMENTO") {
          $(".btnDel").attr("disabled", true);
        } else if (origem == "PROJETO" && dados_servico.STATUS == "FINALIZACAO") {
          $(".btnDel").attr("disabled", true);
        } else if (origem == "PROJETO" && dados_servico.STATUS == "ATRASADO") {
          $(".btnDel").attr("disabled", true);
        } else if (origem == "PROJETO" && dados_servico.STATUS == "ENCERRADO") {
          $(".btnDel").attr("disabled", true);
        } else if (origem == "ADICIONAL" && dados_servico.STATUS == "ENCERRADO") {
          $(".btnDel").attr("disabled", true);
        } else if (origem == "ADICIONAL" && dados_servico.STATUS == "PREPARO") {
          $(".btnDel").removeAttr("disabled", true);
        } else if (origem == "ADICIONAL" && dados_servico.STATUS == "ATRASADO") {
          $(".btnDel").removeAttr("disabled", true);
        } 
        else if (origem == "ADICIONAL" && dados_servico.STATUS == "FINALIZACAO") {
          $(".btnDel").removeAttr("disabled", true);
        }

        else if (origem == "ADICIONAL" && dados_servico.STATUS == "ANDAMENTO") {
          $(".btnDel").removeAttr("disabled", true);
        } else {
          show("erro interno");
        }
      },

      onKeyDown: {
        46: (ln) => {
          let ORIGEM = ln.ORIGEM;

          if (ORIGEM == "PROJETO" && dados_servico.STATUS == "PREPARO") {
            return false;
          }

          if (ORIGEM == "PROJETO" && dados_servico.STATUS == "ANDAMENTO") {
            return false;
          }

          if (ORIGEM == "PROJETO" && dados_servico.STATUS == "FINALIZACAO") {
            return false;
          }

          if (ORIGEM == "PROJETO" && dados_servico.STATUS == "ATRASADO") {
            return false;
          }

          if (ORIGEM == "PROJETO" && dados_servico.STATUS == "ENCERRADO") {
            return false;
          }

          if (ORIGEM == "ADICIONAL" && dados_servico.STATUS == "ENCERRADO") {
            return false;
          }

          deletar(ln);
        },
      },

      query: {
        execute: (r) => {
          getItens1(r.param.search, r.offset);
        },
      },
    });

    // GRID LISTA DE ITENS PARA IR PARA O ROMANEIO
    xgProdRomaneio = new xGridV2.create({
      el: "#xgProdRomaneio",
      height: "390",
      theme: "x-clownV2",
      heightLine: "27",

      columns: {
        Produto: { dataField: "DESCRICAO" },
        Marca: { dataField: "MARCA", width: "20%" },
        Origem: { dataField: "ORIGEM", width: "13%" },
        ESTOQUE: { dataField: "QTD", width: "13%" },
        PROJETADO: { dataField: "QTD_P", width: "13%" },
        RETIRADO: { dataField: "QTD_RETIRADA", width: "13%" },
      },

      onKeyDown: {
        13: (ln) => {
          edtQtd(ln);
        },
      },

      dblClick: (ln) => {

        if (ln == false) return false;
        edtQtd(ln);
      },

      query: {
        execute: (r) => {
          getItens2(r.param.search, r.offset);
        },
      },
    });

    // GRID ROMANEIO
    xgRomaneios = new xGridV2.create({
      el: `#xgRomaneios`,
      theme: "x-clownV2",
      height: "120",

      columns: {
        Responsável: { dataField: "NOME", width: "40%" },
        Data: { dataField: "DATA", center: true, width: "15%" },
        Hora: { dataField: "HORA", center: true, width: "15%" },
        Status: { dataField: "STATUS" },
      },

      onSelectLine: (r) => {
        xgRomaneiosItens.queryOpen({ search: r.ID_ROMANEIO });

        if (r.STATUS == "PREPARO") {
          $(".btnPR").removeAttr("disabled");
          $(".btnPDF").attr("disabled", true);
          $(".btnFR").removeAttr("disabled");
        }
        if (r.STATUS == "PRONTO") {
          $(".btnPR").attr("disabled", true);
          $(".btnFR").attr("disabled", true);
          $(".btnPDF").removeAttr("disabled");
        }

        if (dados_servico.STATUS == "ENCERRADO") {
              $(".btnPDF").attr("disabled", true);
              $(".btnPR").attr("disabled", true);
              $(".btnFR").attr("disabled", true);
        }
      },

      query: {
        execute: (r) => {
          getRomaneio(r.param.search, r.offset);
        },
      },
    });

    // GRID ITENS DO ROMANEIOS
    xgRomaneiosItens = new xGridV2.create({
      el: `#xgRomaneiosItens`,
      theme: "x-clownV2",
      height: "150",

      columns: {
        Produto: { dataField: "DESCRICAO" },
        Marca: { dataField: "MARCA", width: "30%"  },
        QTD: { dataField: "QTD", width: "10%" },
      },

      sideBySide: {
        frame: {
          el: "#pnButtonsR",
          buttons: {
            Novo: {
              html: "Novo Romaneio",
              class: "btnP btnNR",
              click: novoRomaneio,
            },

            Inserir: {
              html: "Inserir Produto",
              class: "btnP btnPR",
              click: InserirRomaneio,
            },

            Salvar: {
              html: "Finalizar Romaneio",
              class: "btnP btnFR",
              click: finalizarRomaneio,
            },
            PDF: {
              html: "Gerar PDF",
              class: "btnP btnPDF",
              click: gerarPDF,
            },
          },
        },
      },

      onKeyDown: {
        46: (r) => {
          deletarItemRomaneio(r);
        },
      },

      query: {
        execute: (r) => {
          getItensRomaneio(r.param.search, r.offset);
        },
      },
    });
  }

  // FUNCTION SERVICOS

  function getDadosServ(ln) {
    ID_LISTA_SERVICO = ln.ID_LISTA_SERVICO;

    STATUS = ln.STATUS;

    $(".btnInsP").removeAttr("disabled");

    if (STATUS == "ANDAMENTO") {
      $(".btnNR").removeAttr("disabled");
      $(".btnObra").removeAttr("disabled");
      $(".btnRG").prop("disabled", true);
      $(".btnFR").prop("disabled", true);
      $("#btnEncerrarServ").hide();
      $("#btnEncerrarServ").prop("disabled",true);

    }
    if (STATUS == "FINALIZACAO" || STATUS == "ATRASADO") {
      $(".btnNR").removeAttr("disabled");
      $(".btnObra").removeAttr("disabled");
      $(".btnRG").prop("disabled", true);
      $(".btnFR").prop("disabled", true);
      $("#btnEncerrarServ").show();
      $("#btnEncerrarServ").removeAttr("disabled",true);

    }

    if (STATUS == "PREPARO") {
      $(".btnFR").prop("disabled", true);
      $(".btnRG").prop("disabled", true);
      $(".btnPDF").prop("disabled", true);
      $(".btnObra").prop("disabled", true);
      $("#btnEncerrarServ").hide();
      $("#btnEncerrarServ").prop("disabled",true);
    }

    if (STATUS == "ENCERRADO") {
      $(".btnInsP").prop("disabled", true);
      $(".btnDel").prop("disabled", true);
      $(".btnNR").prop("disabled", true);
      $(".btnPR").prop("disabled", true);
      $(".btnFR").prop("disabled", true);
      $(".btnPDF").prop("disabled", true);
      $(".btnDI").prop("disabled", true);
      $(".btnObra").prop("disabled", true);
      $(".btnRG").removeAttr("disabled", true);
      $("#btnEncerrarServ").hide();
      $("#btnEncerrarServ").prop("disabled",true);
    }

    xgSaida.queryOpen({ search: ln.ID_LISTA_SERVICO });
    xgRomaneios.queryOpen({ search: ln.ID_LISTA_SERVICO });
    xgDevolucao.queryOpen({ search: ln.ID_LISTA_SERVICO });
    getItensOpeFin(ln.ID_SERVICO)


    getListaServicoX(ID_LISTA_SERVICO);

    $("#Servicos").hide();
    $("#dados_cliente").show();
  }

  function getItensOpeFin(param){

    axios.post(url,{
      call:"getItensOpeFin",
      param: param,
    }).then(r=>{
      itensOpeFin = r.data
    })

  }

  function separarItensOpeFin(produto){
    let permitido = "sim"

      for(let i in itensOpeFin){

        let id_produto = itensOpeFin[i].ID_PRODUTO

        if(id_produto == produto.ID_PRODUTO){
            
          if(STATUS == "PREPARO"){

            if(itensOpeFin[i].FINALIZACAO == 1){
              permitido = "nao"

            }
            
          }

          if(STATUS == "ANDAMENTO"){

            if(itensOpeFin[i].FINALIZACAO == 0){
              permitido = "nao"

            }
          }
          
        }
        
        // if(id_produto == itensOpeFin[i].ID_PRODUTO){}
      }
      return permitido

  }

  function encerrarServico(){

    if(dados_servico.STATUS == "FINALIZACAO" ||
      dados_servico.STATUS == "ATRASADO"){

      confirmaCodigo({
        msg:"Digite o código abaixo para encerrar o serviço.",
        call: ()=>{

          let data = new Date().toLocaleDateString("pt-BR")
          $("#xmEdtDateFin").val(data)
          xmModalDataFin.open()

        }
      })
    }

  }

  function validaSpStatus(){

    if(dados_servico.STATUS == "ANDAMENTO" || dados_servico.STATUS == "FINALIZACAO"){
      confirmaCodigo({
        msg: "Digite o código abaixo para trocar o status do servico.",
        call: () =>{
    
          axios.post(url,{
            call: "atualizaStatus",
            param:{
              ID_LISTA_SERVICO: ID_LISTA_SERVICO,
              STATUS: "ATRASADO",
              DATA: dados_servico.DATA_INICIO,
              DATA_FINALIZACAO: "",
            },
          }).then(r =>{
            $("#spStatus").html("ATRASADO")
            dados_servico.STATUS = "ATRASADO"
            $("#btnEncerrarServ").show();
            $("#btnEncerrarServ").removeAttr("disabled",true);
          })
    
        }
      })
    }
  }

  // FUNCTION PRODUTOS SERVICO

  function getItens1(search, offset) {
    axios
      .post(url, {
        call: "getItens",
        param: { search: search, offset: offset },
      })
      .then((rs) => {
        xgSaida.querySourceAdd(rs.data);
      });
  }

  function getItens2(search, offset) {
    axios
      .post(url, {
        call: "getItens2",
        param: { search: search, offset: offset },
      })
      .then((rs) => {
        xgProdRomaneio.querySourceAdd(rs.data);
        xgProdRomaneio.focus();
      });
  }

  const getServicos = async (search, offset) => {
    validaCheckbox();

    let param = {
      search: search,
      offset: offset,
      andamento: andamento,
      preparo: preparo,
      encerrado: encerrado,
      finalizacao: finalizacao,
      atrasado: atrasado,
    };
    axios
      .post(url, {
        call: "getServicos",
        param: param,
      })
      .then((rs) => {
        xgServicos.querySourceAdd(rs.data);
      });
  };

  async function buscarServ() {
    await xgServicos.queryOpen({ search: "" });

    $("#xmEdtServico").focus();
    $("#dados_cliente").hide();
    $("#Servicos").show();
  }

  function novo() {
    xgProduto.queryOpen({ search: "" });

    xmInsProduto.open();

    $(".xmBtnRetirar").attr("disabled", true);

    $("#xmEdtProduto").focus();
  }

  function deletar(ln) {
    if (xgSaida.data().length > 0) {
      confirmaCodigo({
        msg: "Digite o código de confirmação!",
        call: () => {
          axios.post(url, {
            call: "deletarItem",
            param: ln.ID_ITENS_SERVICO,
          });

          if (xgSaida.data().length - 1 <= 0) {
            $(".btnDel").prop("disabled", true);
          } else {
            $(".btnDel").removeAttr("disabled");
          }
          xgSaida.deleteLine();
        },
      });
    }
  }

  function edtQtd(ln) {

    for (let i in xgRomaneiosItens.data()) {
      if (xgRomaneiosItens.data()[i].ID_PRODUTO == ln.ID_PRODUTO) {
        setTimeout(function () {
          show("Item já incluso!");
        }, 1);
        return false;
      }
    }

    if (ln.QTD == 0) {
      setTimeout(function () {
        show("Item esgotado!");
      }, 1);
      return false;
    }

    $("#pnFieldQtdRetirado").show();

    $("#xmBQtdRetirado").html(ln.QTD_RETIRADA);
    $("#xmBQtd").html(ln.QTD);
    $("#xmSpId").html(ln.ID_PRODUTO);
    $("#xmSpCodigo").html(ln.CODIGO);
    $("#xmSpProd").html(ln.DESCRICAO);
    $("#xmSpMarca").html(ln.MARCA);
    $("#xmSpValor").html(ln.VALOR);

    xmEdtQtd.open();

    $("#xmEdtQtd").focus();
  }

  function validaCheckbox() {
    if ($("#checkAndamento").is(":checked") == true) {
      andamento = "ANDAMENTO";
    }

    if ($("#checkPreparo").is(":checked") == true) {
      preparo = "PREPARO";
    }

    if ($("#checkEncerrado").is(":checked") == true) {
      encerrado = "ENCERRADO";
    }

    if ($("#checkFinalizacao").is(":checked") == true) {
      finalizacao = "FINALIZACAO";
    }

    if ($("#checkAtrasado").is(":checked") == true) {
      atrasado = "ATRASADO";
    }

    if ($("#checkEncerrado").is(":checked") == false) {
      encerrado = "";
    }
    if ($("#checkPreparo").is(":checked") == false) {
      preparo = "";
    }
    if ($("#checkAndamento").is(":checked") == false) {
      andamento = "";
    }
    if ($("#checkFinalizacao").is(":checked") == false) {
      finalizacao = "";
    }
    if ($("#checkAtrasado").is(":checked") == false) {
      atrasado = "";
    }
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
      });
  }

  function setServicoTela(param) {
    $("#tabPdfProjeto").html("")

    $("#spId_lista_servico").html(param.ID_LISTA_SERVICO);
    $("#spFantasia").html(param.FANTASIA);
    $("#spCnpj").html(param.CNPJ);
    $("#spEngenheiro").html(param.ENGENHEIRO);
    $("#spServico").html(param.SERVICO);
    $("#spExecutores").html(param.LIDER + ", " + param.AUXILIAR);
    $("#spDataI").html(param.DATA_INICIO);
    $("#spDataF").html(param.DATA_FINALIZACAO);
    $("#spStatus").html(param.STATUS);
    $("#spValor").html(param.VALOR);

    dados_servico = {
      FANTASIA: param.FANTASIA,
      CNPJ: param.CNPJ,
      ENGENHEIRO: param.ENGENHEIRO,
      SERVICO: param.SERVICO,
      ID_SERVICO: param.ID_SERVICO,
      EXECUTORES: param.EXECUTORES,
      DATA_INICIO: param.DATA_INICIO,
      DATA_FINALIZACAO: param.DATA_FINALIZACAO,
      STATUS: param.STATUS,
      ID_LISTA_SERVICO: param.ID_LISTA_SERVICO,
      PROJETO: param.PROJETADO
    };

    OBS = param.OBS;

    setIframe()
  }

  function setIframe() {
    let iframe = `<iframe src="../arquivos_projetos/${dados_servico.ID_LISTA_SERVICO}/${dados_servico.PROJETO}.pdf" style="height: 450px; width: 100%; margin-top: 5px;"></iframe>`
    $("#tabPdfProjeto").append(iframe)
}

  // FUNCTIONS DO ROMANEIO

  function getRomaneio(ID_LISTA_SERVICO, offset) {
    axios
      .post(url, {
        call: "getRomaneio",
        param: { ID_LISTA_SERVICO, offset },
      })
      .then((rs) => {
        $(".btnPR").attr("disabled", true);
        xgRomaneios.querySourceAdd(rs.data);
      });
  }

  function finalizarRomaneio() {
    confirma({
      msg:
        "Digite o código abaixo caso deseja finalizar o romaneio <br>" +
        "(APÓS ISSO, O ROMANEIO NÃO PODERÁ SER FINALIZADO NOVAMENTE)",
      call: () => {
        let romaneio = xgRomaneios.dataSource();

        romaneio.STATUS = "PRONTO";

        axios.post(url, {
          call: "finalizarRomaneio",
          param: romaneio,
        }).then(()=>{

          if (STATUS == "PREPARO") {
            axios
              .post(url, {
                call: "atualizaStatus",
                param: {
                  ID_LISTA_SERVICO: ID_LISTA_SERVICO,
                  STATUS: "ANDAMENTO",
                  DATA: new Date().toLocaleDateString("pt-BR"),
                  DATA_FINALIZACAO: "",
                },
              })
              .then((r) => {

                $("#spDataI").html(new Date().toLocaleDateString("pt-BR"));
                $("#spStatus").html("ANDAMENTO");

                dados_servico.STATUS = "ANDAMENTO"
              });
          }
          else if (STATUS == "ANDAMENTO") {

            let ID_ROMANEIO = xgRomaneios.dataSource().ID_ROMANEIO
            let offset = 0
            let tem_finalicao = 'nao'

            axios.post(url, {
              call: "getItensRomaneio",
              param: { ID_ROMANEIO, offset },
            }).then((rs) => {
              
              for(let i in rs.data){

                let item_romaneio = rs.data[i]

                for(let j in itensOpeFin){

                  if(itensOpeFin[j].FINALIZACAO == 0 && 
                    itensOpeFin[j].ID_PRODUTO == item_romaneio.ID_PRODUTO){

                      axios.post(url, {
                        call: "atualizaStatus",
                        param: {
                          ID_LISTA_SERVICO: ID_LISTA_SERVICO,
                          STATUS: "FINALIZACAO",
                          DATA: dados_servico.DATA_INICIO,
                          DATA_FINALIZACAO: "",
                        },
                      })
                      .then(r => {
  
                        $("#spStatus").html("FINALIZACAO");

                        dados_servico.STATUS = "FINALIZACAO"
                      });
                      tem_finalicao = 'sim'
                      break
  
                  }

                }

                if(tem_finalicao == 'sim'){
                  break
                }
              }
              
            });

          }

          xgRomaneios.dataSource("STATUS", romaneio.STATUS);

          $(".btnPR").attr("disabled", true);
          $(".btnFR").attr("disabled", true);
          $(".btnObra").removeAttr("disabled");

        });

        
      },
    });
  }

  function InserirRomaneio() {
    evento = "Inserir Romaneio";

    xgProdRomaneio.queryOpen({ search: ID_LISTA_SERVICO });

    xmInserirRomaneio.open();
  }

  function novoRomaneio() {
    confirmaCodigo({
      msg: "Digite o código abaixo para criar um novo romaneio",
      call: () => {
        param = {
          ID_FUNCIONARIOS: usuario.ID_FUNCIONARIOS,
          ID_LISTA_SERVICO: ID_LISTA_SERVICO,
          DATA: new Date().toLocaleDateString("pt-BR"),
          HORA: new Date().toLocaleTimeString("pt-BR"),
          STATUS: "PREPARO",
        };

        axios
          .post(url, {
            call: "novoRomaneio",
            param: param,
          })
          .then((rs) => {
            $(".btnPR").attr("disabled", true);

            xgRomaneios.queryOpen({ search: ID_LISTA_SERVICO });
            xgRomaneios.focus();
          });
      },
    });
  }

  async function gerarPDF() {
    let dt = xgRomaneiosItens.data();

    let dados_servico = {
      FANTASIA: $("#spFantasia").html(),
      CNPJ: $("#spCnpj").html(),
      ENGENHEIRO: $("#spEngenheiro").html(),
      SERVICO: $("#spServico").html(),
      EXECUTORES: $("#spExecutores").html(),
      DATA_INICIO: $("#spDataI").html(),
      DATA_FINALIZACAO: $("#spDataF").html(),
    };

    $("#rl_representante").html(xgRomaneios.dataSource().NOME);
    $("#rl_executores").html(dados_servico.EXECUTORES);
    $("#rlFantasia").html(dados_servico.FANTASIA);
    $("#rlCnpj").html(dados_servico.CNPJ);
    $("#rlEngenheiro").html(dados_servico.ENGENHEIRO);
    $("#rlServico").html(dados_servico.SERVICO);
    $("#rlExecutores").html(dados_servico.EXECUTORES);
    $("#rlDataI").html(dados_servico.DATA_INICIO);
    $("#rlDataF").html(dados_servico.DATA_FINALIZACAO);

    await setTable(dt);

    $(".rlRomaneio").xPrint();

    $(".tb_produto").html("");
  }

  function setTable() {
    /* cabeçalho dos itens*/
    let tableItensR = $("<table>", { class: "tbl_itens_r" });
    tr = $("<thead>", { style: "font-size: 9px !important;" });

    tr.append($("<th>", { html: "PRODUTO" }));
    tr.append($("<th>", { html: "MARCA" }));
    tr.append($("<th>", { html: "QTD" }));

    tableItensR.append(tr);

    /* DADOS ITENS DO ROMANEIO */
    for (let i in xgRomaneiosItens.data()) {
      tr = $("<tr>", { style: "font-size: 9px !important;" });
      tr.append($("<td>", { html: xgRomaneiosItens.data()[i].DESCRICAO }));
      tr.append($("<td>", { html: xgRomaneiosItens.data()[i].MARCA }));
      tr.append($("<td>", { html: xgRomaneiosItens.data()[i].QTD }));
      tableItensR.append(tr);
    }

    $(".tb_produto").append(tableItensR);
  }

  async function deletarItemRomaneio(r) {
  
    let status = xgRomaneios.dataSource().STATUS;

    if (status == "PREPARO" && dados_servico.STATUS != "ENCERRADO") {
      await confirma({
        msg: `Deseja excluir o item "${r.DESCRICAO}"?`,
        call: () => {
          axios
            .post(url, {
              call: "getProduto",
              param: r.ID_PRODUTO,
            })
            .then((rs) => {
                

                  axios.post(url,{
                      call:"checarItemProjeto",
                      param:{
                          ID_PRODUTO: r.ID_PRODUTO,
                          ID_LISTA_SERVICO: dados_servico.ID_LISTA_SERVICO,
                        },
                  }).then(rss =>{
                    //   CHECAR SE O ITEM PARA DELETAR EXISTE EM PROJETO,
                    //   SE TIVER REDUZIR A QUANTIDADE RETIRADA,
                    //   SE NÃO TIVER, TIRAR SÓ DO ROMANEIO

                    let param = {
                        ID_PRODUTO: r.ID_PRODUTO,
                        newEstoque: newEstoque,
                        ID_ITEM_ROMANEIO: r.ID_ITEM_ROMANEIO,
                      };

                      param.newEstoque = rs.data[0].QTD + r.QTD;

                    if(rss.data[0]==undefined){

                        axios.post(url, {
                            call: "deletarItemRomaneioX",
                            param: param,
                        });

                        
                    }else{

                        let QTD_RETIRADA = rss.data[0].QTD_RETIRADA;

                        param.QTD_RETIRADA = QTD_RETIRADA - r.QTD;
                        param.ID_ITENS_SERVICO = rss.data[0].ID_ITENS_SERVICO

                        axios.post(url, {
                            call: "deletarItemRomaneio",
                            param: param,
                          }).then(r=>{
                          xgSaida.queryOpen({ search: ID_LISTA_SERVICO });
                        });
        
                    }
                    xgRomaneiosItens.deleteLine();
                  })
            });
        },
      });
    } else {
      return false;
    }
  }

  // FUNCTIONS ROMANEIO ITENS

  function getItensRomaneio(ID_ROMANEIO, offset) {
    axios
      .post(url, {
        call: "getItensRomaneio",
        param: { ID_ROMANEIO, offset },
      })
      .then((rs) => {
        xgRomaneiosItens.querySourceAdd(rs.data);
      });
  }

  function todosProdutos() {
    confirmaCodigo({
      msg: "Digite o código abaixo para selecionar todos os itens",
      call: async () => {
        for (let i in xgProdRomaneio.data()) {
          let existe = "nao";
          let estoque_qtd = xgProdRomaneio.data()[i].QTD

          let param = {
            ID_ITENS_SERVICO: xgProdRomaneio.data()[i].ID_ITENS_SERVICO,
            DESCRICAO: xgProdRomaneio.data()[i].DESCRICAO,
            ORIGEM: xgProdRomaneio.data()[i].ORIGEM,
            ID_PRODUTO: xgProdRomaneio.data()[i].ID_PRODUTO,
            QTD: Number(xgProdRomaneio.data()[i].QTD_P),
            QTD_RETIRADA: Number(xgProdRomaneio.data()[i].QTD_P) + Number(xgProdRomaneio.data()[i].QTD_RETIRADA),
            ID_ROMANEIO: xgRomaneios.dataSource().ID_ROMANEIO,
            MARCA: xgProdRomaneio.data()[i].MARCA,
            ID_TIPO_ITEM: Number(xgProdRomaneio.data()[i].ID_TIPO),
          };

          let permitido = separarItensOpeFin(param)

          for (let j in xgRomaneiosItens.data()) {

            if (param.ID_PRODUTO == xgRomaneiosItens.data()[j].ID_PRODUTO) {
              
              existe = "sim";

              show(param.DESCRICAO + " já foi inserido! O item não será cadastrado novamente!");
            }

          }

          setTimeout(() => {
          
            if (existe == 'nao') {

              if(permitido == 'sim'){
              
                if (param.QTD > xgProdRomaneio.data()[i].QTD) {
                  
                  let produto_compensado = {
                    ID_PRODUTO: param.ID_PRODUTO,
                    ID_TIPO_ITEM: param.ID_TIPO_ITEM,
                    QTD_FALTA: param.QTD - Number(xgProdRomaneio.data()[i].QTD),
                  };

                  axios.post(url, {
                      call: "compesar_qtd_produto",
                      param: produto_compensado,
                    })
                    .then((r) => {
                      
                      if(r.data[0] == undefined){
  
                        show('Quantidade projetada de ' + param.DESCRICAO + ' é maior do que a existente, e não há item no estoque para compensar!')
                        
                      }else{
  
                        let compensador_existe = 'nao'

                        let param_compensador = {
                          ID_SERVICO: ID_LISTA_SERVICO,
                          ID_PRODUTO: r.data[0].ID_PRODUTO,
                          DESCRICAO: r.data[0].DESCRICAO,
                          newEstoque: r.data[0].QTD - produto_compensado.QTD_FALTA ,
                          DATA: new Date().toLocaleDateString("pt-BR"),
                          QTD: produto_compensado.QTD_FALTA,
                          ID_ROMANEIO: xgRomaneios.dataSource().ID_ROMANEIO,
                          ID_MARCA: r.data[0].ID_MARCA,
                          MARCA: r.data[0].MARCA,
                        };
  
                        for(let i in xgRomaneiosItens.data()){
  
                          if(param_compensador.ID_PRODUTO == xgRomaneiosItens.data()[i].ID_PRODUTO){
                            compensador_existe = 'sim'
                            show(
                              param.DESCRICAO +
                                " já foi inserido! O item não será cadastrado novamente!"
                            );
  
                          }
  
                        }
  
                          if(compensador_existe = 'nao'){

                            produtos.atualizaProduto(param_compensador.ID_PRODUTO, param_compensador.newEstoque)
  
                            axios.post(url, {
                                call: "inserirItemRomaneioX",
                                param: param_compensador,
                              }).then(r =>{
                                xgRomaneiosItens.insertLine(param_compensador);
                              });
  
                          }
                      }
                      
                    });
  
                }
  
              }

              if(estoque_qtd > 0){

                insertTodosProdutos(param)
              }
            }
        }, 1);

        }

      },
    });
  }

  async function insertTodosProdutos(param) {
    await axios
      .post(url, {
        call: "inserirItemRomaneio",
        param: param,
      })
      .then((rs) => {
        param.ID_ITEM_ROMANEIO = rs.data[0].ID_ITEM_ROMANEIO;

        xgProdRomaneio.queryOpen({ search: ID_LISTA_SERVICO });

        xgRomaneiosItens.insertLine(param);
      });

    axios
      .post(url, {
        call: "getProduto",
        param: param.ID_PRODUTO,
      })
      .then((rs) => {
        let newEstoque = rs.data[0].QTD - param.QTD;

        produtos.atualizaProduto(param.ID_PRODUTO, newEstoque);
      });

    xgSaida.queryOpen({ search: ID_LISTA_SERVICO });
  }

  // RELATORIOS
  async function relatorioGeral() {
    let dados_servico = {
      FANTASIA: $("#spFantasia").html(),
      CNPJ: $("#spCnpj").html(),
      ENGENHEIRO: $("#spEngenheiro").html(),
      SERVICO: $("#spServico").html(),
      EXECUTORES: $("#spExecutores").html(),
      DATA_INICIO: $("#spDataI").html(),
      DATA_FINALIZACAO: $("#spDataF").html(),
    };

    $("#rl_geralFantasia").html(dados_servico.FANTASIA);
    $("#rl_geralCnpj").html(dados_servico.CNPJ);
    $("#rl_geralEngenheiro").html(dados_servico.ENGENHEIRO);
    $("#rl_geralServico").html(dados_servico.SERVICO);
    $("#rl_geralExecutores").html(dados_servico.EXECUTORES);
    $("#rl_geralDataI").html(dados_servico.DATA_INICIO);
    $("#rl_geralDataF").html(dados_servico.DATA_FINALIZACAO);

    // CABECALHO ITENS PROJETADO
    let tb_produto = $("<table>", { class: "tbl_produtos_projetado" });
    let trS = $("<thead>", { style: " font-size: 9px !important;" });

    trS.append($("<th>", { html: "PRODUTO" }));
    trS.append($("<th>", { html: "MARCA" }));
    trS.append($("<th>", { html: "QTD PLANEJADO" }));
    trS.append($("<th>", { html: "QTD RETIRADA" }));
    trS.append($("<th>", { html: "DATA" }));
    trS.append($("<th>", { html: "ORIGEM" }));

    tb_produto.append(trS);

    for (let i in xgSaida.data()) {
      // DADOS DOS ITENS PROJETADOS
      trS = $("<tr>", { style: "font-size: 9px !important;" });
      trS.append($("<td>", { html: xgSaida.data()[i].DESCRICAO }));
      trS.append($("<td>", { html: xgSaida.data()[i].MARCA }));
      trS.append($("<td>", { html: xgSaida.data()[i].QTD }));
      trS.append($("<td>", { html: xgSaida.data()[i].QTD_RETIRADA }));
      trS.append($("<td>", { html: xgSaida.data()[i].DATA }));
      trS.append($("<td>", { html: xgSaida.data()[i].ORIGEM }));

      tb_produto.append(trS);

      $(".tb_produto_saida").append(tb_produto);
    }

    await axios
      .post(url, {
        call: "getRomaneioRela",
        param: {
          ID_LISTA_SERVICO,
          offset: 0,
        },
      })
      .then((rs) => {
        for (let i in rs.data) {
          // CABECALHO ROMANEIO
          let tableRomaneio = $("<table>", { class: "tbl_romaneio" });
          let tr = $("<thead>", { style: " font-size: 9px !important;" });
          tr.append($("<th>", { html: "ID" }));
          tr.append($("<th>", { html: "RESPONSÁVEL" }));
          tr.append($("<th>", { html: "DATA" }));
          tr.append($("<th>", { html: "HORA" }));

          tableRomaneio.append(tr);

          // DADOS ROMANEIO
          tr = $("<tr>", { style: "font-size: 9px !important;" });
          tr.append($("<td>", { html: rs.data[i].ID_ROMANEIO }));
          tr.append($("<td>", { html: rs.data[i].NOME }));
          tr.append($("<td>", { html: rs.data[i].DATA }));
          tr.append($("<td>", { html: rs.data[i].HORA }));

          tableRomaneio.append(tr);

          /* cabeçalho dos itens*/
          let tableRomaneioItens = $("<table>", {
            class: "tbl_itens_romaneio",
          });
          tr = $("<thead>", { style: "font-size: 9px !important;" });

          tr.append($("<th>", { html: "PRODUTO" }));
          tr.append($("<th>", { html: "MARCA" }));
          tr.append($("<th>", { html: "QTD" }));
          tr.append($("<th>", { html: "ORIGEM" }));

          tableRomaneioItens.append(tr);

          /* DADOS ITENS DO ROMANEIO */
          for (let a in rs.data[i].ITENS) {
            tr = $("<tr>", { style: "font-size: 9px !important;" });
            tr.append($("<td>", { html: rs.data[i].ITENS[a].DESCRICAO }));
            tr.append($("<td>", { html: rs.data[i].ITENS[a].MARCA }));
            tr.append($("<td>", { html: rs.data[i].ITENS[a].QTD }));
            tr.append($("<td>", { html: rs.data[i].ITENS[a].ORIGEM }));
            tableRomaneioItens.append(tr);
          }

          $(".romaneio_itens_romaneio").append(tableRomaneio);
          $(".romaneio_itens_romaneio").append(tableRomaneioItens);
          $(".romaneio_itens_romaneio").append("<br/>");
        }
      });

    // CABECALHO DEVOLUCAO
    let tb_devolucao = $("<table>", { class: "tbl_produtos_projetado" });
    let trD = $("<thead>", { style: " font-size: 9px !important;" });

    trD.append($("<th>", { html: "PRODUTO" }));
    trD.append($("<th>", { html: "MARCA" }));
    trD.append($("<th>", { html: "DEVOLVIDO" }));
    trD.append($("<th>", { html: "DATA" }));
    trD.append($("<th>", { html: "HORA" }));

    tb_devolucao.append(trD);

    for (let i in xgDevolucao.data()) {
      trD = $("<tr>", { style: "font-size: 9px !important;" });
      trD.append($("<td>", { html: xgDevolucao.data()[i].DESCRICAO }));
      trD.append($("<td>", { html: xgDevolucao.data()[i].MARCA }));
      trD.append($("<td>", { html: xgDevolucao.data()[i].QTD }));
      trD.append($("<td>", { html: xgDevolucao.data()[i].DATA }));
      trD.append($("<td>", { html: xgDevolucao.data()[i].HORA }));

      tb_devolucao.append(trD);

      $(".tb_devolucao").append(tb_devolucao);
    }

    $(".rl_geral").xPrint();

    $(".tbl_produtos_projetado").html("");
    $(".romaneio_itens_romaneio").html("");
    $(".tb_devolucao").html("");
  }

  // MODAIS
  function modalDataFin() {
    xmModalDataFin = new xModal.create({
      el: "#xmDataFin",
      title: "Finalizar Serviço",
      width: "300",
      height: "155",

      buttons: {
        btn1: {
          html: "Concluir",
          click: () => {
            if(dados_servico.STATUS == "FINALIZACAO" ||
              dados_servico.STATUS == "ATRASADO"){

                dados_servico.DATA_FINALIZACAO = $("#xmEdtDateFin").val()

              axios.post(url, {
                call: "atualizaStatus",
                param: {
                  ID_LISTA_SERVICO: ID_LISTA_SERVICO,
                  STATUS: "ENCERRADO",
                  DATA: dados_servico.DATA_INICIO,
                  DATA_FINALIZACAO: dados_servico.DATA_FINALIZACAO,
                  
                },
              }).then(() =>{
    
                $(".btnInsP").prop("disabled", true);
                $(".btnDel").prop("disabled", true);
                $(".btnNR").prop("disabled", true);
                $(".btnPR").prop("disabled", true);
                $(".btnFR").prop("disabled", true);
                $(".btnPDF").prop("disabled", true);
                $(".btnDI").prop("disabled", true);
                $(".btnObra").prop("disabled", true);
                $(".btnRG").removeAttr("disabled", true);
                $("#btnEncerrarServ").hide();
                $("#btnEncerrarServ").prop("disabled",true);
                $("#spStatus").html("ENCERRADO");
                $("#btnEncerrarServ").hide();
                $("#btnEncerrarServ").attr("disabled",true);
    
                dados_servico.STATUS = "ENCERRADO"

                $("#spDataF").html(dados_servico.DATA_FINALIZACAO)

                xmModalDataFin.close()
    
              })
            }
            
          },
        },
      },

      onClose: () => {
        $("#xmEdtDateFin").val("")
      },
    });
  }

  function modalInsProduto() {
    xmInsProduto = new xModal.create({
      el: "#xmInsProduto",
      title: "Produtos",

      onClose: () => {
        total = 0;

        if (xgSaida.data().length > 0) {
          xgSaida.focus();
        }
      },
    });
  }
  
  function modalInserirRomaneio() {
    xmInserirRomaneio = new xModal.create({
      el: "#xmIRomaneio",
      title: "Produtos",
      width: "1000",

      buttons: {
        btn1: {
          html: "Pegar Todos",
          click: () => {
            todosProdutos();
          },
        },
      },
      onClose: () => {
        $("#xmEdtIRomaneio").val("");
      },
    });
  }

  return {
    grid: grid,
    modalInsProduto: modalInsProduto,
    buscarServ: buscarServ,
    modalInserirRomaneio: modalInserirRomaneio,
    relatorioGeral: relatorioGeral,
    insertTodosProdutos: insertTodosProdutos,
    encerrarServico: encerrarServico,
    validaSpStatus: validaSpStatus,
    modalDataFin: modalDataFin,
    setIframe: setIframe,
  };
})();

const produtos = (function () {
  let url = "obras/per.obras.php";
  let ControleGrid;

  function grid() {
    // GRID DE PRODUTOS
    xgProduto = new xGridV2.create({
      el: "#xmPnGridProduto",
      height: "340",
      theme: "x-clownV2",
      heightLine: "27",

      columns: {
        Codigo: { dataField: "CODIGO", width: "10%" },
        Produto: { dataField: "DESCRICAO" },
        Marca: { dataField: "MARCA", width: "25%" },
        QTD: { dataField: "QTD", width: "10%" },
      },

      onKeyDown: {
        13: (ln, e) => {

          for (let i = 0; i < 11; i++) {
            delete ln[i];
          }

          for (let i in xgSaida.data()) {
            if (xgSaida.data()[i].ID_PRODUTO == ln.ID_PRODUTO) {
              setTimeout(function () {
                show("Item já incluso!");
              }, 1);

              xgProduto.focus();

              return false;
            }
          }

          if (ln.qtd == 0) {
            setTimeout(function () {
              show("Quantidade inválida!");
            }, 1);

            xgProduto.focus();

            return false;
          }

          $("#xmBQtd").html(ln.QTD);
          $("#xmSpId").html(ln.ID_PRODUTO);
          $("#xmSpCodigo").html(ln.CODIGO);
          $("#xmSpProd").html(ln.DESCRICAO);
          $("#xmSpMarca").html(ln.MARCA);
          $("#xmSpValor").html(ln.VALOR);

          xmEdtQtd.open();

          evento = "Inserir";

          $("#xmEdtQtd").focus();

          $("#pnFieldQtdRetirado").hide();

        },
      },

      dblClick: (ln) => {
        
        if (ln == false) return false;

        for (let i = 0; i < 11; i++) {
          delete ln[i];
        }

        for (let i in xgSaida.data()) {
          if (xgSaida.data()[i].ID_PRODUTO == ln.ID_PRODUTO) {
            setTimeout(function () {
              show("Item já incluso!");
            }, 1);

            xgProduto.focus();

            return false;
          }
        }

        if (ln.qtd == 0) {
          setTimeout(function () {
            show("Quantidade inválida!");
          }, 1);

          xgProduto.focus();

          return false;
        }

        $("#xmBQtd").html(ln.QTD);
        $("#xmSpId").html(ln.ID_PRODUTO);
        $("#xmSpCodigo").html(ln.CODIGO);
        $("#xmSpProd").html(ln.DESCRICAO);
        $("#xmSpMarca").html(ln.MARCA);
        $("#xmSpValor").html(ln.VALOR);

        xmEdtQtd.open();

        evento = "Inserir";

        $("#xmEdtQtd").focus();
      },
      query: {
        execute: (r) => {
          getProdutos(r.param.search, r.offset);
        },
      },
    });
  }

  // DO DE PRODUTOS
  function getProdutos(search, offset) {
    axios
      .post(url, {
        call: "getProdutos",
        param: { search: search, offset: offset },
      })
      .then((rs) => {
        xgProduto.querySourceAdd(rs.data);
      });

    getServico();
  }

  const salvarCarrinho = async () => {

    let origem;
    let status = $("#spStatus").text();

    valProduto = {
      CODIGO: $("#xmSpCodigo").text(),
      DESCRICAO: $("#xmSpProd").text(),
      ID_PRODUTO: $("#xmSpId").text(),
      MARCA: $("#xmSpMarca").text(),
      QTD: Number($("#xmEdtQtd").val().trim()),
      VALOR: Number($("#xmSpValor").text().replace(",", ".")),
    };

    if (valProduto.QTD == "" || valProduto.QTD == null) {
      setTimeout(function () {
        show("Quantidade inválida!");
      }, 1);
      return false;
    }

    if (status == "ANDAMENTO" || status == "PREPARO" ||
      status == "FINALIZACAO" || status == "ATRASADO") {
        origem = "ADICIONAL";
    }

    param = {
      ID_SERVICO: ID_LISTA_SERVICO,
      ID_PRODUTO: valProduto.ID_PRODUTO,
      QTD_PRODUTO: valProduto.QTD,
      DATA: new Date().toLocaleDateString("pt-BR"),
      ORIGEM: origem,
      QTD_RETIRADA: 0,
    };

    await axios.post(url, {
      call: "inserirItens",
      param: param,
    });

    xgSaida.queryOpen({ search: ID_LISTA_SERVICO });

    xmEdtQtd.close();

  };

  async function InserirItemRomaneio() {
    let qtdServico = Number($("#xmBQtd").html());

    item = {
      ID_ITENS_SERVICO: xgProdRomaneio.dataSource().ID_ITENS_SERVICO,
      DESCRICAO: $("#xmSpProd").text(),
      ID_PRODUTO: $("#xmSpId").text(),
      MARCA: $("#xmSpMarca").text(),
      QTD: Number($("#xmEdtQtd").val().trim()),
      ORIGEM: xgProdRomaneio.dataSource().ORIGEM,
      ID_ROMANEIO: xgRomaneios.dataSource().ID_ROMANEIO,
      ID_TIPO_ITEM: xgProdRomaneio.dataSource().ID_TIPO,
    };

    if (item.QTD == null || item.QTD == "" || item.QTD <= 0) {
      setTimeout(function () {
        show("Quantidade inválida!");
      }, 1);
      return false;
    }

    if (item.QTD > qtdServico) {

      if (item.QTD > xgProdRomaneio.dataSource().QTD) {
            
          let produto_compensado = {
            ID_PRODUTO: item.ID_PRODUTO,
            ID_TIPO_ITEM: item.ID_TIPO_ITEM,
            QTD_FALTA: item.QTD - Number(xgProdRomaneio.dataSource().QTD),
          };

          await axios.post(url, {
              call: "compesar_qtd_produto",
              param: produto_compensado,
            })
            .then((r) => {
              
              if(r.data[0] == undefined){

                show('Quantidade projetada de ' + item.DESCRICAO + ' é maior do que a existente, e não há item no estoque para compensar!')
                
              }else{

                let compensador_existe = 'nao'
                let param_compensador = {
                  ID_SERVICO: ID_LISTA_SERVICO,
                  ID_PRODUTO: r.data[0].ID_PRODUTO,
                  DESCRICAO: r.data[0].DESCRICAO,
                  newEstoque: r.data[0].QTD - produto_compensado.QTD_FALTA ,
                  DATA: new Date().toLocaleDateString("pt-BR"),
                  QTD: produto_compensado.QTD_FALTA,
                  ID_ROMANEIO: xgRomaneios.dataSource().ID_ROMANEIO,
                  ID_MARCA: r.data[0].ID_MARCA,
                  MARCA: r.data[0].MARCA,
                };

                for(let i in xgRomaneiosItens.data()){

                  if(param_compensador.ID_PRODUTO == xgRomaneiosItens.dataSource().ID_PRODUTO){
                    compensador_existe = 'sim'
                    show(
                      r.DESCRICAO +
                        ` já foi inserido! O item não será cadastrado novamente!`);

                  }

                }

                  if(compensador_existe = 'nao'){

                    atualizaProduto(param_compensador.ID_PRODUTO, param_compensador.newEstoque)

                    axios.post(url, {
                        call: "inserirItemRomaneioX",
                        param: param_compensador,
                      }).then(r =>{
                        xgRomaneiosItens.insertLine(param_compensador);
                      });


                      if(item.QTD > 0){

                        // saida.insertTodosProdutos(item)
                      }

                  }
              }

              item.QTD -= produto_compensado.QTD_FALTA
              
            });

            

        }

        else if (existe == 'nao') {

            await saida.insertTodosProdutos(param)
        }

        
    }
        

    xmEdtQtd.close();

    xgRomaneiosItens.insertLine(item);

    xgProdRomaneio.dataSource("QTD", qtdServico - item.QTD);

    qtdServico = xgProdRomaneio.dataSource().QTD_RETIRADA;
    item.QTD_RETIRADA = qtdServico + item.QTD;

    await axios
      .post(url, {
        call: "inserirItemRomaneio",
        param: item,
      })
      .then((rs) => {
        item.ID_ITEM_ROMANEIO = rs.data[0].ID_ITEM_ROMANEIO;
      });

    axios
      .post(url, {
        call: "getProduto",
        param: item.ID_PRODUTO,
      })
      .then((rs) => {
        let newEstoque = rs.data[0].QTD - item.QTD;

        atualizaProduto(item.ID_PRODUTO, newEstoque);
      });

    xgProdRomaneio.dataSource("QTD_RETIRADA", item.QTD_RETIRADA);

    xgSaida.queryOpen({ search: ID_LISTA_SERVICO });
  }

  // GET DE PRODUTOS
  function getServico() {
    axios
      .post(url, {
        call: "getServ",
      })
      .then((rs) => {
        for (let i in rs.data) {
          let table = `<option value="${rs.data[i].ID_SERVICO}"> ${rs.data[i].SERVICO}</option>`;
          $("#slctServico").append(table);
        }
      });
  }

  // UPDATE DE PRODUTOS
  function atualizaProduto(ID_PRODUTO, newEstoque) {
    axios.post(url, {
      call: "atualizaProduto",
      param: { ID_PRODUTO: ID_PRODUTO, newEstoque: newEstoque },
    });
  }

  // MODAL DO PRODUTO
  function modalEdtQtd() {
    xmEdtQtd = new xModal.create({
      el: "#xmQtd",
      title: "Produto",
      height: "285",
      width: "400",
      buttons: {
        btn1: {
          html: "Confirma",
          class: "xmQtdBtn",
          click: (e) => {
            if (evento == "Inserir") {
              if ($("#xmEdtQtd").val() > xgProduto.dataSource().QTD) {
                confirma({
                  msg: "Quantidade maior que a existente, deseja inserir?!",
                  call: () => {
                    salvarCarrinho();
                  },
                });
              } else {
                salvarCarrinho();
              }

              $("#xmEdtProduto").focus();
            }
            if (evento == "Inserir Romaneio") {
              InserirItemRomaneio();
            }

            if (evento == "DEVOLVER") {
              devolucao.devolverItem();
            }
          },
        },
      },
      onClose: () => {
        $("#xmEdtQtd").val("");
      },
    });
  }

  return {
    grid: grid,
    modalEdtQtd: modalEdtQtd,
    atualizaProduto: atualizaProduto,
  };
})();

const devolucao = (function () {
  let url = "obras/per.obras.php";
  let ControleGrid;

  function grid() {
    // GRID DE DEVOLUCAO
    xgDevolucao = new xGridV2.create({
      el: "#xgDevolucao",
      height: "180",
      theme: "x-clownV2",
      heightLine: "27",

      columns: {
        Produto: { dataField: "DESCRICAO" },
        Marca: { dataField: "MARCA", width: "20%" },
        Devolvido: { dataField: "QTD", width: "13%" },
        Data: { dataField: "DATA", center: true, width: "15%" },
        Hora: { dataField: "HORA", center: true, width: "15%" },
      },

      sideBySide: {
        frame: {
          el: "#pnButtonD",

          buttons: {
            devolucao: {
              html: "Devolver Item",
              class: "btnP btnDI",
              click: () => {
                getModalPDevolucao();
              },
            },
          },
        },
      },

      query: {
        execute: (r) => {
          getDevolucao(r.param.search, r.offset);
        },
      },
    });

    xgRomaneiosItensD = new xGridV2.create({
      el: "#xgRomaneioItensD",
      height: "420",
      theme: "x-clownV2",
      heightLine: "27",

      columns: {
        Produto: { dataField: "DESCRICAO" },
        Marca: { dataField: "MARCA", width: "25%" },
        Origem: { dataField: "ORIGEM", width: "20%" },
        Retirado: { dataField: "QTD_RETIRADA", width: "13%" },
      },

      onKeyDown: {
        13: (ln) => {
          edtQtd(ln);
        },
      },

      dblClick: (ln) => {
        if (ln == false) return false;
        edtQtd(ln);
      },

      query: {
        execute: (r) => {
          getItens(r.param.search, r.offset);
        },
      },
    });
  }

  // GET DE DEVOLUCAO
  function getDevolucao(search, offset) {
    axios
      .post(url, {
        call: "getDevolucao",
        param: { search: search, offset: offset },
      })
      .then((rs) => {
        xgDevolucao.querySourceAdd(rs.data);
      });
  }

  function getItens(search, offset) {
    if (search == undefined) {
      return false;
    }

    axios
      .post(url, {
        call: "getItens2",
        param: { search: search, offset: offset },
      })
      .then((rs) => {
        xgRomaneiosItensD.querySourceAdd(rs.data);
        xgRomaneiosItensD.focus();
      });
  }

  function getModalPDevolucao() {
    xmModalPDevolucao.open();

    xgRomaneiosItensD.queryOpen({ search: ID_LISTA_SERVICO });
  }

  // DO DE DEVOLVER ITEM

  function devolverItem() {
    let qtdServico = Number($("#xmBQtd").html());

    item = {
      ID_PRODUTO: $("#xmSpId").text(),
      QTD: Number($("#xmEdtQtd").val().trim()),
      DESCRICAO: $("#xmSpProd").text(),
      MARCA: $("#xmSpMarca").text(),
      ID_LISTA_SERVICO: ID_LISTA_SERVICO,
      DATA: new Date().toLocaleDateString("pt-BR"),
      HORA: new Date().toLocaleTimeString("pt-BR"),
    };

    if (item.QTD > qtdServico) {
      setTimeout(function () {
        show("Quantidade maior que a existente!");
      }, 1);
      return false;
    }

    if (item.QTD == null || item.QTD == "" || item.QTD <= 0) {
      setTimeout(function () {
        show("Quantidade inválida!");
      }, 1);
      return false;
    }

    axios
      .post(url, {
        call: "getProduto",
        param: item.ID_PRODUTO,
      })
      .then((rs) => {
        let newEstoque = rs.data[0].QTD + item.QTD;

        produtos.atualizaProduto(item.ID_PRODUTO, newEstoque);
      });

    axios.post(url, {
      call: "inserirDevolucao",
      param: item,
    });

    xgDevolucao.insertLine(item);
    xmEdtQtd.close();
  }

  function edtQtd(ln) {
    if (ln.QTD_RETIRADA <= 0) {
      setTimeout(function () {
        show("Item sem devolução disponível!");
      }, 1);
      return false;
    }

    let count = 0;
    for (let i in xgDevolucao.data()) {
      if (xgDevolucao.data()[i].ID_PRODUTO == ln.ID_PRODUTO) {
        count += xgDevolucao.data()[i].QTD;
      }
    }

    let dispo = ln.QTD_RETIRADA - count;
    if (dispo <= 0) {
      setTimeout(function () {
        show("Item sem devolução disponível!");
      }, 1);
      return false;
    }

    $("#pnFieldQtdRetirado").hide();

    $("#xmBQtd").html(dispo);
    $("#xmSpId").html(ln.ID_PRODUTO);
    $("#xmSpCodigo").html(ln.CODIGO);
    $("#xmSpProd").html(ln.DESCRICAO);
    $("#xmSpMarca").html(ln.MARCA);
    $("#xmSpValor").html(ln.VALOR);

    xmEdtQtd.open();

    $("#xmEdtQtd").focus();

    evento = "DEVOLVER";
  }

  // MODAL DE DEVOLUCAO

  function modalPDevolucao() {
    xmModalPDevolucao = new xModal.create({
      el: "#xmModalPDevolucao",
      title: "Itens Romaneio",
      width: "700",
    });
  }

  return {
    grid: grid,
    modalPDevolucao: modalPDevolucao,
    devolverItem: devolverItem,
  };
})();
