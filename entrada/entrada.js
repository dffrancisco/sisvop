let xgItens
$(function () {
    itens.grid()
});


const itens = (function () {

    let url = 'entrada/per.entrada.php'
    let controleGrid;

    function grid() {
        xgItens = new xGridV2.create({
            el: "#xgItens",
            height: 210,
            heightLine: 35,
            theme: "x-clownV2",

            columns: {
                CNPJ: {
                    dataField: "cnpj",
                    center: true,
                    width: "30%",
                },
                Fornecedor: {
                    dataField: "fornecedor",
                    width: "50%",
                },
                Data: {
                    dataField: "data",
                    width: "20%",
                }
            },
            sideBySide: {
                el: "#pnFields",

                frame: {
                    el: "#btnFornecedor",
                    buttons: {
                        novo: {
                            html: "Novo",
                            class: "btnP",
                        },

                    }
                },
            },
            query: {
                execute: (r) => {
                    getItens(r.param.search, r.offset)

                },
            },
        })
    }



    return {
        grid: grid
    }
})();
