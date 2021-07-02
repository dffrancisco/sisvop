
let xgVendas
$(function () {
    vendas.grid()

    xgVendas.queryOpen({ search: '' })

});


const vendas = (function () {
    let url = 'vendas/per.vendas.php';

    function grid() {
        xgVendas = new xGridV2.create({
            el: '#pnGridVendas',
            height: '200',
            theme: 'x-clownV2',
            heightLine: 27,
            columns: {
                Cliente: { dataField: 'FANTASIA' },
                Serviço: { dataField: 'SERVICO' },
            },
            query: {
                execute: (r) => {
                    getVenda(r.param.search, r.offset);
                }
            },
        });
    }

    function getVenda(search, offset) {
        axios.post(url, {
            call: 'getVenda',
            param: { search: search, offset: offset }

        }).then(r => {
            xgVendas.querySourceAdd(r.data);

            if (r.data[0]) {
                xgVendas.focus();
            }
        });
    }

    return {
        grid: grid,
    }
})();
