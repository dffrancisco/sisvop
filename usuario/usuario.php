<script src="usuario/usuario.js" type="text/javascript"></script>

<title>Usuário</title>

<div class="container">
    <div class="row">
        <div class="col s3">
            <input type="text" class="margintop " placeholder="Pesquisar" id="edtPesquisa">
        </div>
        <div id="pnButtons" class="right-align col s9"></div>
    </div>

    <div id="xgUsuario" class="list"></div>



    <div id="xmEditSenha">
        <div class="row">
            <div class="col s11">
                <label>Senha</label>
                <input type="password" placeholder="" style="width: 94% !important;" class="validate" id="edtSenha">
            </div>
            <div class="s1">
                <i class="fa fa-eye-slash btnEyes" style="font-size: 21px; margin-top: 18px"></i>
            </div>

        </div>

        <div class="row">
            <div class="col s11">
                <label>Confirme sua senha</label>
                <input type="password" placeholder="" style="width: 94% !important;" class="validate" id="edtConfSenha">
            </div>


        </div>
    </div>

    <div id="xmNovaSenha">
        <div class="row">
            <select id="slctFuncionario"></select>
        </div>
        <div class="row">
            <div class="col s11">
                <label>Senha</label>
                <input type="password" placeholder="" style="width: 94% !important;" class="validate" id="edtNovoSenha">
            </div>
            <div class="s1">
                <i class="fa fa-eye-slash btnNovoEyes" style="font-size: 21px; margin-top: 18px"></i>
            </div>

        </div>

        <div class="row">
            <div class="col s11">
                <label>Confirme sua senha</label>
                <input type="password" placeholder="" style="width: 94% !important;" class="validate"
                    id="edtNovoConfSenha">
            </div>

        </div>
    </div>

    <div id="pnCodigoTela">usuario</div>