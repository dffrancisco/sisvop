let xgProduto;

$(function () {
  produto.grid();
  produto.getProduto();
  xgProduto.queryOpen(0,'')
});

const produto = (function () {

  let url = 'produtos/per.produtos.php'

  function getProduto() {
    console.log("getprodutosfasdfa");
  }

  function addReal(value) {
    return "R$ " + value;
  }

  function novo(){
    xgProduto.clearElementSideBySide()
    xgProduto.focusField()
    xgProduto.disable()
    }

    function savar(){
      axios.post(url,{
        call:'insert',
        param:xgProduto.getElementSideBySideJson()
      })
    }
  
  function grid() {
    xgProduto = new xGridV2.create({
      el: "#xgProduto",
      height: 220,
      heightLine: 40,
      theme: "x-clownV2",
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
              click: () => {
               // if (grid.dataSource()) console.log(grid.dataSource().descricao);

                //grid.disableFieldsSideBySide(true);
              },
            },            

            deletar: {
              html: "Deletar",
              class: "btnP btnDel",
              state: xGridV2.state.delete,
              click: () => {
                if (grid.dataSource().id) {

                }
              },
            },
            save: {
              html: "Salvar",
              class: "btnP",
              state: xGridV2.state.save,
              click: savar
            },

            cancelar: {
              html: "Cancelar",
              class: "btnP",
              state: xGridV2.state.cancel,
              click: () => {
                
                xgProduto.enable()
                xgProduto.focus()
              },
            },

          },
        },
      },
      columns: {
        Código: {
          dataField: "codigo",
          center: true,
          width: "10%",
        },
        Descrição: {
          dataField: "descricao",
          width: "60%",
          style: "font-size: 16px;",
        },
        QTD: {
          dataField: "qtd",
          width: "15%",
          center: true,
        },
        // 'Marca': { dataField: 'marca', width: '17%', class: 'fontGrid' },
        // 'Departamento': { dataField: 'departamento', class: 'fontGrid' },
        Valor: {
          dataField: "valor",
          render: addReal,
          width: "15%",
          center: true,
        },
      },
      query: {
        execute: (r) => {

          getProdutos(r.offset, r.param.search)

        },
      },
    });
  }

  function getProdutos(offset, search) {

    axios.post(url, {
      call: 'getProdutos',
      param: { offset: offset, search: search }
    })
      .then(rs => {
        xgProduto.querySourceAdd(rs.data);
        if (offset == 0) xgProduto.focus();
      })

  }

  return {
    getProduto: getProduto,
    grid: grid,
  };
})();



var exemplo = (function () {
  function getExemplo() {
    $.ajax({
      data: {
        call: "exemplo",
        param: {},
      },
      success: function (r) {
        console.log(r);
      },
    });
  }

  return {
    getExemplo: getExemplo,
  };
})();


var json = [{
  name: '#################################',
  login: 'Meire <br>Legal',
  cpf: '444',
  old: 40,
  tel: '845-453',
  qto: 13,
  cidade: 'SIA',
  casado: 1
}, {
  name: 'Kallebe Alves',
  login: 'Kallebe',
  cpf: '654654',
  old: 16,
  tel: '888-345',
  qto: 98,
  cidade: 'Recando da Emas',
  casado: 0

}, {
  name: 'Alves Xico',
  login: 'Alves',
  cpf: '11577',
  old: 37,
  tel: '466-664',
  qto: 8,
  cidade: 'Taguatinga',
  casado: 0
}, {
  name: 'Sousa Alves',
  login: 'Sousa',
  cpf: '874465',
  old: 22,
  tel: '858-999',
  qto: 21,
  cidade: 'Setor O',
  casado: 0
}, {
  name: 'Kalline Rocha',
  login: 'Kalline',
  cpf: '1111',
  old: 11,
  tel: '787-995',
  qto: 11,
  cidade: 'Gura',
  casado: 1
}, {
  name: 'Francisco Alves',
  login: 'Francisco',
  cpf: '778.583.951-48',
  old: 37,
  tel: '999-999',
  qto: 7,
  cidade: 'Brasilia',
  casado: 1
}, {
  name: 'Meire Clecia',
  login: 'Meire <br>Legal',
  cpf: '222',
  old: 40,
  tel: '845-453',
  qto: 13,
  cidade: 'SIA',
  casado: 1
}, {
  name: 'Kallebe Alves',
  login: 'Kallebe',
  cpf: '654654',
  old: 16,
  tel: '888-345',
  qto: 98,
  cidade: 'Recando da Emas',
  casado: 1
}, {
  name: 'Alves Xico',
  login: 'Alves',
  cpf: '11577',
  old: 37,
  tel: '466-664',
  qto: 8,
  cidade: 'Taguatinga',
  casado: 1
}, {
  name: 'Sousa Alves',
  login: 'Sousa',
  cpf: '874465',
  old: 22,
  tel: '858-999',
  qto: 21,
  cidade: 'Setor O',
  casado: 1
}, {
  name: 'Kalline Rocha',
  login: 'Kalline',
  cpf: '1111',
  old: 11,
  tel: '787-995',
  qto: 11,
  cidade: 'Gura',
  casado: 1
}, {
  name: 'Francisco Alves',
  login: 'Francisco',
  cpf: '778.583.951-48',
  old: 37,
  tel: '999-999',
  qto: 7,
  cidade: 'Brasilia',
  casado: 1
}, {
  name: 'Meire Clecia',
  login: 'Meire <br>Legal',
  cpf: '222',
  old: 40,
  tel: '845-453',
  qto: 13,
  cidade: 'SIA',
  casado: 1
}, {
  name: 'Kallebe Alves',
  login: 'Kallebe',
  cpf: '654654',
  old: 16,
  tel: '888-345',
  qto: 98,
  cidade: 'Recando da Emas',
  casado: 1
}, {
  name: 'Alves Xico',
  login: 'Alves',
  cpf: '11577',
  old: 37,
  tel: '466-664',
  qto: 8,
  cidade: 'Taguatinga',
  casado: 1
}, {
  name: 'Sousa Alves',
  login: 'Sousa',
  cpf: '874465',
  old: 22,
  tel: '858-999',
  qto: 21,
  cidade: 'Setor O',
  casado: 1
}, {
  name: 'Kalline Rocha',
  login: 'Kalline',
  cpf: '1111',
  old: 11,
  tel: '787-995',
  qto: 11,
  cidade: 'Gura',
  casado: 1
}, {
  name: 'Francisco Alves',
  login: 'Francisco',
  cpf: '778.583.951-48',
  old: 37,
  tel: '999-999',
  qto: 7,
  cidade: 'Brasilia',
  casado: 1
}];