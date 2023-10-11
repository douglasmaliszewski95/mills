const oracle_base_url = "https://p19894161c1prd-store.occa.ocs.oraclecloud.com";

export function lightEquipmentLayout(budget_data: any) {
  let html_base_layout = `
    <!doctype html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@500&family=Inter&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@700&family=Inter&display=swap" rel="stylesheet">
    
        <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
        <style>
            html {
                -webkit-text-size-adjust: 100%;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                font-family: 'IBM Plex Sans', sans-serif;
                line-height: 1.15;
            }
            body {
                background-color: #fff;
                color: #212529;
                font-family: 'IBM Plex Sans', sans-serif;
                font-size: 1rem;
                font-weight: 400;
                line-height: 1.5;
                margin: 0 auto;
                text-align: left;
                max-width: 680px;
            }
            .template {
                max-width: 680px;
                margin: 0 auto;
            }
            #template {
                max-width: 680px;
                margin: 0 auto;
            }
            .pa-0 {
                padding: 0 !important;
            }
            .w-100 { 
                width: 100%;
            }
            .banner {
                width: 100%;
                height: 430px;
                margin: 0 auto;
                text-align: center;
                background-color: #F17631;
            }
            .bannerImage {
                height: 364px;
                background-image: url(https://hml-nova-mills.mills.com.br/email/assets/desktop-leves.png);
                background-repeat: no-repeat;
                background-size: 306px 341px;
                background-position: 0 bottom;
            }
            .clsImgMills {
                width: 118px;
                height: 50px;
                padding-top: 10px;
            }
            .clsBannerGroupTitle {
                height: 90%;
                align-items: center;
                padding-left: 365px;
            }
            .clsBannerTitle {
                margin-right: 96px;
                height: 88%;
                vertical-align: middle;
                line-height: 39px;
                color: white;
                font-size: 32px;
                float: right;
                display: table;
            }
            .clsBannerTitle span {
                display: table-cell;
                vertical-align: middle;  
            }
            .bannerItemImg {
                width: 412px;
                display: block;
                margin-left: -4px;
            }
            .bannerItemImg img {
                width: 100%;
                height: 100%;
                max-width: 412px;
                max-height: 341px;
            }
            .clsGroupBannerItems {
                background-image: url(https://hml-nova-mills.mills.com.br/email/assets/dna-abaixo-header.png);
                background-repeat: no-repeat;
                background-position: right bottom;
                background-size: auto;
                height: 418px;
            }
            .verticalBottom {
                display: table-cell;
                vertical-align: bottom;
                height: 373px;
            }
            @media (max-width: 650px) {
                body {
                    width: 100%;
                }
                #template {
                    width: 100%;
                }
                .containerPadding {
                    padding: 0 20px;
                }
            }
            @media (max-width: 650px) {
                .bannerImage {
                    background-position: center bottom;
                    background-size: 300px 350px !important;
                    background-image: url(https://hml-nova-mills.mills.com.br/email/assets/mobile-leves.jpg);
                }
                .clsBannerTitle {
                    height: 335px;
                    vertical-align: bottom;
                    line-height: 39px;
                    color: white;
                    font-size: 32px;
                    display: table;
                    float: inherit;
                    margin-right: 0;
                    margin-left: 20px;
                }
                .clsBannerTitle span {
                    display: table-cell;
                    vertical-align: bottom;
                    padding-bottom: 0;
                }
                .verticalBottom {
                    height: 335px;
                }
            }
            @media (max-width: 550px) {
                .bannerImage {
                    background-position: center;
                    background-size: cover !important;
                }
                .bannerItemImg {
                    width: 100%;
                    display: none;
                }
                .bannerItemImg img {
                    max-width: 330px;
                    margin-top: 0;
                }
                .clsGroupBannerItems {
                    background-image: url(https://hml-nova-mills.mills.com.br/email/assets/dna-abaixo-header.png);
                    background-repeat: no-repeat;
                    background-position: right bottom;
                    background-size: auto;
                    height: 418px;
                }
            }
            .container {
                padding: 10px 0;
                border: none;
            }
            .main { 
                margin: auto;
                max-width: 643px;
            }
            .colorOrange {
                color: #F37021;
            }
            .colorGreen {
                color: #004042;
            }
            .fontWeight {
                font-weight: bold;
            }
            .groupData {
                background: #EBF6F5;
            }
            .clsInfoPhone {
                margin-left: 50px;
            }
            @media (max-width: 550px) {
                .clsInfoPhone {
                    margin-left: 0;
                }   
            }
            .block {
                padding: 20px;
            }
            .flex-container {
                display: grid;
            }
            .flex-nowrap {
                flex-wrap: nowrap;
            }
            .flex-wrap {
                flex-wrap: wrap;
                display: inline-block;
            }
            .flex-direction-column {
                flex-direction: column;
            }
            .flex-item {
                margin: 0;
            }
            .d-inline-block {
                display: inline-block;
            }
            .d-block {
                display: block;
            }
            .text-left {
                text-align: left;
            }
    
            .tableDesktop {
                display: block;
            }
            .tableMobile {
                display: none;
            }
            @media (max-width: 550px) {
                .tableDesktop {
                    display: none;
                }
                .tableMobile {
                    width: 100%;
                    display: inline-table;
                }
            }
    
            .groupItems {
                width: 100%;
                border-radius: 10px;
            }
            .clsGroupItem {
                padding: 10px 0;
                margin: 10px 0;
                background: #fff;
            }
            .itemImg {
                max-width: 224px;
                max-height: 201px;
                margin: 0 10px;
            }
            .itemImg img {
                width: 100%;
                height: 100%;
                margin: 0 auto;
            }
            @media (max-width: 550px) {
                .itemImg {
                    max-width: 100%;
                    margin: 0 10px;
                    text-align: center;
                }
                .itemImg img {
                    margin: 0 auto;
                }
            }
            .clsGroupInfo {
                padding: 10px;
                line-height: 25px;
                vertical-align: top;
            }
            .clsGroupInfo .clsGroupInfoTitle {
                font-size: 18px;
            }
            .clsGroupInfo .flex-item {
                font-size: 14px;
            }
            .clsGroupInfo p {
                color: #004042 !important;
            }
            .itemImgOthersServices {
                text-align: center;
                padding: 13px 0;
                margin-left: 13px;
            }
            .clsFontItemOtherService {
                font-size: 16px !important;
            }
            .itemImgTruck {
                padding: 4px 0;
            }
            .btn-orange {
                display: inline-block;
                background: #F17631;
                color: white;
                border-radius: 2px;
                border: none;
                height: 26px;
                padding: 2px 4px;
                margin: 0 4px;
                box-shadow: none;
                font-family: 'IBM Plex Sans', sans-serif;
                font-weight: 500;
                font-size: 14px;
            }
            @media (max-width: 550px) {
                .btn-orange {
                    width: 100%;
                    margin: 2px 0;
                }
            }
            .clsFooterInfo {
                width: 100%;
                text-align: center;
                font-family: 'Inter', sans-serif;
                font-weight: 400;
                font-size: 16px;
            }
            .footer {
                width: 100%;
                padding: 25px 0;
                text-align: center;
                background-color: #F17631;
            }
            .groupIconsFooter {
                margin-top: 16px;
            }
            .groupIconsFooter a {
                text-decoration: none;
                margin: 0 6px;
            }
            .linkSite {
                text-decoration: none;
            }
        </style>
      </head>
      <body>
        <section id="template" class="template">
            <div class="banner">
                <a class="linkSite" target="_blank" href="https://www.mills.com.br/">
                    <img class="clsImgMills" src="https://hml-nova-mills.mills.com.br/email/assets/iconMills.png" />
                </a>
                <div class="bannerImage">
                    <div class="clsGroupBannerItems">
                        <div class="clsBannerTitle text-left">
                            <span><b>Seu orçamento<br/>chegou!</b></span>
                        </div>    
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="main">
                    <div class="containerPadding">
                        <p class="colorGreen">Olá, ${budget_data.personalInformations.nome} <br /> Tudo bem?</p>
    
                        <br />
                
                        <p class="flex-item colorGreen">Ficamos felizes em saber que você se interessou pelos nossos produtos e queremos avisar que, em breve, um de nossos especialistas irá entrar em contato com você.</p>
                        
                        <br />
                
                        <p class="flex-item colorGreen">Abaixo segue o resumo do <span class="colorOrange"><b>orçamento</b>.</p>
                        
                        <br />
                    </div>
            
                    <div class="groupData">
                        <div class="block">
                            <span><b class="colorOrange fontWeight">Dados Gerais</b></span>
                        
                            <p>
                                <div class="flex-container flex-wrap">
                                    <p class="flex-item colorGreen"><b>Nome: </b>${budget_data.personalInformations.nome}</p>
                                    <p class="flex-item colorGreen"><b>E-mail: </b>${budget_data.personalInformations.email}</p>
                                </div>
                                <div class="flex-container clsInfoPhone flex-wrap">
                                    <p class="flex-item colorGreen"><b>Telefone: </b>${budget_data.personalInformations.telefone}</p>
                                    <p class="flex-item colorGreen"><b>CNPJ: </b>${budget_data.personalInformations.cnpj}</p>
                                </div>
                                <div style="display:block;">
                                    <div class="flex-container flex-wrap">
                                        <span class="flex-item colorGreen"><b>Comentários adicionais: </b>${budget_data.personalInformations.additionalComments}</span>
                                    </div>
                                </div>
                            </p>
    
                            <span><b class="colorOrange fontWeight">Equipamentos selecionados</b></span>
  `;

  budget_data?.items?.forEach((item: any) => {
    html_base_layout += `
      <div class="groupItems">
        <div class="flex-container w-100 flex-wrap clsGroupItem">
          <table class="tableDesktop">
            <tr>
              <td class="itemImg">
                <img src="${oracle_base_url + item.primaryFullImageURL}" />
              </td>
              <td class="clsGroupInfo">
                <span class="clsGroupInfoTitle"><b class="colorOrange fontWeight">${
                  item.brand
                } ${item.id}</b></span>
                <p class="flex-item colorGreen">${item.displayName}</p>
                <p class="flex-item colorGreen"><b>Altura de Trabalho: </b> ${
                  item.x_alturaDeTrabalhoM
                } m</p>
                <p class="flex-item colorGreen"><b>Alcance Horizontal: </b> ${
                  item.x_alcanceHorizontalM
                } m</p>
                <p class="flex-item colorGreen"><b>Peso: </b> ${
                  item.x_peso
                } kg</p>
                <p class="flex-item colorGreen"><b>Emissão Média: </b> ${
                  item.x_emissoMdiaKgDeCOH
                } Kg DE CO2 por hora</p>
                <p class="flex-item colorGreen"><b>Local de utilização: </b> ${
                  item.localUtility
                }</p>
                <p class="flex-item colorGreen"><b>Tempo de aluguel: </b> ${
                  item.timeToLocale
                } ${item.typeToLocale}</p>
                <p class="flex-item colorGreen"><b>Quantidade: </b> ${
                  item.quantity
                }</p>
              </td>
            </tr>
          </table>

          <table class="tableMobile">
            <tr>
              <td class="itemImg">
                <img src="${oracle_base_url + item.primaryFullImageURL}" />
              </td>
            </tr>
            <tr>
              <td class="clsGroupInfo">
                <span class="clsGroupInfoTitle"><b class="colorOrange fontWeight">${
                  item.brand
                } ${item.id}</b></span>
                <p class="flex-item colorGreen">${item.displayName}</p>
                <p class="flex-item colorGreen"><b>Altura de Trabalho: </b> ${
                  item.x_alturaDeTrabalhoM
                } m</p>
                <p class="flex-item colorGreen"><b>Alcance Horizontal: </b> ${
                  item.x_alcanceHorizontalM
                } m</p>
                <p class="flex-item colorGreen"><b>Peso: </b> ${
                  item.x_peso
                } kg</p>
                <p class="flex-item colorGreen"><b>Emissão Média: </b> ${
                  item.x_emissoMdiaKgDeCOH
                } Kg DE CO2 por hora</p>
                <p class="flex-item colorGreen"><b>Local de utilização: </b> ${
                  item.localUtility
                }</p>
                <p class="flex-item colorGreen"><b>Tempo de aluguel: </b> ${
                  item.timeToLocale
                } ${item.typeToLocale}</p>
                <p class="flex-item colorGreen"><b>Quantidade: </b> ${
                  item.quantity
                }</p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    `;
  });

  html_base_layout += `
                    <div class="clsFooterInfo">
                        <p class="colorGreen">
                            Precisa de ajuda? 
                            <br />
                            Ligue gratuitamente para <b>0800 944 1282</b>
                        </p>
                        <p class="colorGreen">
                            Um abraço,
                            <br />
                            <b>Equipe Mills</b>
                        </p>
                    </div>
            
                </div>
            </div>
    
            <div class="footer">
                <a class="linkSite" target="_blank" href="https://www.mills.com.br/">
                    <img class="clsImgMills" src="https://hml-nova-mills.mills.com.br/email/assets/iconMills.png" />
                </a>
                <div class="groupIconsFooter">
                    <a href="https://www.mills.com.br" target="_blank">
                        <img src="https://hml-nova-mills.mills.com.br/email/assets/iconInternet.png" />
                    </a>
                    <a href="https://www.instagram.com/millsoficial" target="_blank">
                        <img src="https://hml-nova-mills.mills.com.br/email/assets/iconInstagram.png" />    
                    </a>
                    <a href="https://www.linkedin.com/company/millsoficial" target="_blank">
                        <img src="https://hml-nova-mills.mills.com.br/email/assets/iconLinkedin.png" />
                    </a>
                    <a href="https://www.facebook.com/millsbr/?locale=pt_BR" target="_blank">
                        <img src="https://hml-nova-mills.mills.com.br/email/assets/iconFacebook.png" />
                    </a>
                    <a href="https://cliente.mills.com.br" target="_blank">
                        <img src="https://hml-nova-mills.mills.com.br/email/assets/iconSocialMedia.png" />
                    </a>
                </div>
            </div>
        </section>
      </body>
    </html>
  `;

  return html_base_layout;
}

export function adminLightLayout(budget_data: any) {
    let html_base_layout = `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
        .mills_logo {
            width: 116px;
            background-color: #F37021;
            padding: 6px 10px;
            border-radius: 6px;
        }
        .title {
            color: #F37021;
        }
        </style>
        </head>
        <body>
        <main>
            <p>
            <img class="mills_logo" src="https://hml-nova-mills.mills.com.br/email/assets/iconMills.png" />
            <h1 class="title">Solicitação de reserva</h1>
            <b>Nome: ${budget_data.personalInformations.nome}</b>
            <br>
            <b>E-mail: ${budget_data.personalInformations.email}</b>
            <br>
            <b>Telefone: ${budget_data.personalInformations.telefone}</b>
            <br>
            <b>CNPJ: ${budget_data.personalInformations.cnpj}</b>
            <br>
            <b>Comentários: ${budget_data.personalInformations.additionalComments}</b>
            </p>
            <p>
            <h1 class="title">Detalhes do carrinho:</h1>
            ${budget_data.items.map((item: any) => {
                return `
                    <b>${item.displayName}</b>
                    <br>
                    <b>Local de utilização: ${item.localUtility}</b>
                    <br>
                    <b>Período: ${item.timeToLocale} ${item.typeToLocale}</b>
                    <br>
                    <b>Quantidade: ${item.quantity}</b>
                    <br>
                    <br>
                `
            }).join("")}
            </p>
            ------------------------------------
            <p>
            <b>Origem: Mídia</b>
            <br>
            <b>Formulário: Carrinho de orçamento de compra</b>
            </p>
        </main>
        </body>
        </html>
    `;

    return html_base_layout;
}

export function heavyEquipmentLayout(budget_data: any) {
  let html_base_layout = `
    <!doctype html>
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@700&display=swap" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@500&family=Inter&display=swap" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@700&family=Inter&display=swap" rel="stylesheet">
      
          <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
          <style>
              html {
                  -webkit-text-size-adjust: 100%;
                  -webkit-tap-highlight-color: rgba(0,0,0,0);
                  font-family: 'IBM Plex Sans', sans-serif;
                  line-height: 1.15;
              }
              body {
                  background-color: #fff;
                  color: #212529;
                  font-family: 'IBM Plex Sans', sans-serif;
                  font-size: 1rem;
                  font-weight: 400;
                  line-height: 1.5;
                  margin: 0 auto;
                  text-align: left;
                  max-width: 680px;
              }
              .template {
                  max-width: 680px;
                  margin: 0 auto;
              }
              #template {
                  max-width: 680px;
                  margin: 0 auto;
              }
              .pa-0 {
                  padding: 0 !important;
              }
              .w-100 { 
                  width: 100%;
              }
              .banner {
                  width: 100%;
                  height: 430px;
                  margin: 0 auto;
                  text-align: center;
                  background-color: #023F41;
              }
              .bannerImage {
                  height: 364px;
                  background-image: url(https://hml-nova-mills.mills.com.br/email/assets/desktop-pesados.png);
                  background-repeat: no-repeat;
                  background-size: 395px 341px;
                  background-position: 0 bottom;
              }
              .clsImgMills {
                  width: 118px;
                  height: 50px;
                  padding-top: 10px;
              }
              .clsBannerGroupTitle {
                  height: 90%;
                  align-items: center;
                  padding-left: 365px;
              }
              .clsBannerTitle {
                  margin-right: 32px;
                  height: 88%;
                  vertical-align: middle;
                  line-height: 39px;
                  color: white;
                  font-size: 32px;
                  float: right;
                  display: table;
              }
              .clsBannerTitle span {
                  display: table-cell;
                  vertical-align: middle;  
              }
              .bannerItemImg {
                  width: 412px;
                  display: block;
                  margin-left: -4px;
              }
              .bannerItemImg img {
                  width: 100%;
                  height: 100%;
                  max-width: 412px;
                  max-height: 341px;
              }
              .clsGroupBannerItems {
                  background-image: url(https://hml-nova-mills.mills.com.br/email/assets/dna-abaixo-header2.png);
                  background-repeat: no-repeat;
                  background-position: right bottom;
                  background-size: auto;
                  height: 418px;
              }
              .verticalBottom {
                  display: table-cell;
                  vertical-align: bottom;
                  height: 373px;
              }
              @media (max-width: 650px) {
                  body {
                      width: 100%;
                  }
                  #template {
                      width: 100%;
                  }
                  .containerPadding {
                      padding: 0 20px;
                  }
                  .bannerImage {
                      background-position: center bottom;
                      background-size: 300px 350px !important;
                      background-image: url(https://hml-nova-mills.mills.com.br/email/assets/mobile-pesados.jpg);
                  }
                  .clsBannerTitle {
                      height: 335px;
                      vertical-align: bottom;
                      line-height: 39px;
                      color: white;
                      font-size: 32px;
                      display: table;
                      float: inherit;
                      margin-right: 0;
                      margin-left: 20px;
                  }
                  .clsBannerTitle span {
                      display: table-cell;
                      vertical-align: bottom;
                      padding-bottom: 0;
                  }
                  .verticalBottom {
                      height: 335px;
                  }
              }
              @media (max-width: 550px) {
                  .bannerImage {
                      background-position: center;
                      background-size: cover !important;
                  }
                  .bannerItemImg {
                      width: 100%;
                      display: none;
                  }
                  .bannerItemImg img {
                      max-width: 330px;
                      margin-top: 0;
                  }
                  .clsGroupBannerItems {
                      background-image: url(https://hml-nova-mills.mills.com.br/email/assets/dna-abaixo-header2.png);
                      background-repeat: no-repeat;
                      background-position: right bottom;
                      background-size: auto;
                      height: 418px;
                  }
              }
              .container {
                  padding: 10px 0;
                  border: none;
              }
              .main { 
                  margin: auto;
                  max-width: 622px;
              }
              .colorOrange {
                  color: #F37021;
              }
              .colorGreen {
                  color: #004042;
              }
              .fontWeight {
                  font-weight: bold;
              }
              .groupData {
                  background: #EAE3C8;
              }
              .clsInfoPhone {
                  margin-left: 50px;
              }
              @media (max-width: 650px) {
                  .clsInfoPhone {
                      margin-left: 0;
                  }   
              }
              .block {
                  padding: 20px;
              }
              .flex-container {
                  display: grid;
              }
              .flex-nowrap {
                  flex-wrap: nowrap;
              }
              .flex-wrap {
                  flex-wrap: wrap;
                  display: inline-block;
              }
              .flex-direction-column {
                  flex-direction: column;
              }
              .flex-item {
                  margin: 0;
              }
              .d-inline-block {
                  display: inline-block;
              }
              .d-block {
                  display: block;
              }
              .text-left {
                  text-align: left;
              }
      
              .tableDesktop {
                  display: block;
              }
              .tableMobile {
                  display: none;
              }
              @media (max-width: 650px) {
                  .tableDesktop {
                      display: none;
                  }
                  .tableMobile {
                      width: 100%;
                      display: inline-table;
                  }
              }
      
              .groupItems {
                  width: 100%;
                  border-radius: 10px;
              }
              .clsGroupItem {
                  padding: 10px 0;
                  margin: 10px 0;
                  background: #fff;
              }
              .itemImg {
                  max-width: 224px;
                  max-height: 201px;
                  margin: 0 10px;
              }
              .itemImg img {
                  width: 100%;
                  height: 100%;
                  margin: 0 auto;
              }
              @media (max-width: 650px) {
                  .itemImg {
                      max-width: 100%;
                      margin: 0 10px;
                      text-align: center;
                  }
                  .itemImg img {
                      margin: 0 auto;
                  }
              }
              .clsGroupInfo {
                  padding: 10px;
                  line-height: 25px;
                  vertical-align: top;
              }
              .clsGroupInfo .clsGroupInfoTitle {
                  font-size: 18px;
              }
              .clsGroupInfo .flex-item {
                  font-size: 14px;
              }
              .clsGroupInfo p {
                  color: #004042 !important;
              }
              .itemImgOthersServices {
                  text-align: center;
                  margin-left: 13px;
                  vertical-align: top;
              }
              .clsFontItemOtherService {
                  font-size: 16px !important;
                  padding-left: 5px;
              }
              .itemImgTruck {
                  padding: 4px 0;
              }
              .clsBlockOtherServiceSelected {
                  padding: 15px 10px;
                  width: 96.5%;
              }
              @media (max-width: 650px) {
                  .clsBlockOtherServiceSelected {
                      padding: 15px 9px;
                      width: 96%;
                  }
              }
              .btn-orange {
                  display: inline-block;
                  background: #F17631;
                  color: white;
                  border-radius: 2px;
                  border: none;
                  height: 26px;
                  padding: 2px 4px;
                  margin: 0 4px;
                  box-shadow: none;
                  font-family: 'IBM Plex Sans', sans-serif;
                  font-weight: 500;
                  font-size: 14px;
              }
              @media (max-width: 650px) {
                  .btn-orange {
                      width: 100%;
                      margin: 2px 0;
                  }
              }
              .clsFooterInfo {
                  width: 100%;
                  text-align: center;
                  font-family: 'Inter', sans-serif;
                  color: #023F41;
                  font-weight: 400;
                  font-size: 16px;
              }
              .footer {
                  width: 100%;
                  padding: 25px 0;
                  text-align: center;
                  background-color: #023F41;
              }
              .groupIconsFooter {
                  margin-top: 16px;
              }
              .groupIconsFooter a {
                  text-decoration: none;
                  margin: 0 6px;
              }
              .linkSite {
                  text-decoration: none;
              }
          </style>
        </head>
        <body>
          <section id="template" class="template">
              <div class="banner">
                  <a class="linkSite" target="_blank" href="https://www.mills.com.br/">
                      <img class="clsImgMills" src="https://hml-nova-mills.mills.com.br/email/assets/iconMills.png" />
                  </a>
                  <div class="bannerImage">
                      <div class="clsGroupBannerItems">
                          <div class="clsBannerTitle text-left">
                              <span><b>Seu orçamento<br/>chegou!</b></span>
                          </div>    
                      </div>
                  </div>
              </div>
              <div class="container">
                  <div class="main">
                      <div class="containerPadding">
                          <p class="colorGreen">Olá, ${budget_data.personalInformations.nome} <br /> Tudo bem?</p>
                          
                          <br />
      
                          <p class="flex-item colorGreen">Ficamos felizes em saber que você se interessou pelos nossos produtos e queremos avisar que, em breve, um de nossos especialistas irá entrar em contato com você.</p>
                  
                          <br />
      
                          <p class="flex-item colorGreen">Abaixo segue o resumo do <span class="colorOrange"><b>orçamento</b>.</p>
                          
                          <br />
                      </div>
                      <div class="groupData">
                          <div class="block">
                              <span><b class="colorOrange fontWeight">Dados Gerais</b></span>
                          
                              <p>
                                  <div class="flex-container flex-wrap">
                                      <p class="flex-item colorGreen"><b>Nome: </b>${budget_data.personalInformations.nome}</p>
                                      <p class="flex-item colorGreen"><b>E-mail: </b>${budget_data.personalInformations.email}</p>
                                  </div>
                                  <div class="flex-container clsInfoPhone flex-wrap">
                                      <p class="flex-item colorGreen"><b>Telefone: </b>${budget_data.personalInformations.telefone}</p>
                                      <p class="flex-item colorGreen"><b>CNPJ: </b>${budget_data.personalInformations.cnpj}</p>
                                  </div>
                                  <div style="display:block;">
                                      <div class="flex-container flex-wrap">
                                          <span class="flex-item colorGreen"><b>Comentários adicionais: </b>${budget_data.personalInformations.additionalComments}</span>
                                      </div>
                                  </div>
                              </p>
              
                              <span><b class="colorOrange fontWeight">Equipamentos selecionados</b></span>
  `;

  budget_data.items.forEach((item: any) => {
    html_base_layout += `
      <div class="groupItems">
        <div class="flex-container w-100 flex-wrap clsGroupItem">
            <table class="tableDesktop">
                <tr>
                    <td class="itemImg">
                        <img src="${
                          oracle_base_url + item.primaryFullImageURL
                        }" />
                    </td>
                    <td class="clsGroupInfo">
                        <span class="clsGroupInfoTitle"><b class="colorOrange fontWeight">${
                          item.brand
                        } ${item.id}</b></span>
                        <p class="flex-item colorGreen">${item.displayName}</p>
                        <p class="flex-item colorGreen"><b>Peso operacional: </b> ${
                          item.weight
                        } t</p>
                        <p class="flex-item colorGreen"><b>Potência do motor: </b> ${
                          item.x_potenciaDoMotor
                        } HP</p>
                        <p class="flex-item colorGreen"><b>Cabine: </b> ${
                          item.x_cabine
                        }</p>
                        <p class="flex-item colorGreen"><b>Local de utilização: </b> ${
                          item.localUtility
                        }</p>
                        <p class="flex-item colorGreen"><b>Tempo de aluguel: </b> ${
                          item.timeToLocale
                        } ${item.typeToLocale}</p>
                        <p class="flex-item colorGreen"><b>Quantidade: </b> ${
                          item.quantity
                        }</p>
                    </td>
                </tr>
            </table>

            <table class="tableMobile">
                <tr>
                    <td class="itemImg">
                        <img src="${
                          oracle_base_url + item.primaryFullImageURL
                        }" />
                    </td>
                </tr>
                <tr>
                    <td class="clsGroupInfo">
                        <span class="clsGroupInfoTitle"><b class="colorOrange fontWeight">${
                          item.brand
                        } ${item.id}</b></span>
                        <p class="flex-item colorGreen">${item.displayName}</p>
                        <p class="flex-item colorGreen"><b>Altura de Trabalho: </b> ${
                          item.x_alturaDeTrabalhoM
                        } m</p>
                        <p class="flex-item colorGreen"><b>Alcance Horizontal: </b> ${
                          item.x_alcanceHorizontalM
                        } m</p>
                        <p class="flex-item colorGreen"><b>Peso: </b> ${
                          item.x_peso
                        } kg</p>
                        <p class="flex-item colorGreen"><b>Emissão Média: </b> ${
                          item.x_emissoMdiaKgDeCOH
                        } Kg DE CO2 por hora</p>
                        <p class="flex-item colorGreen"><b>Local de utilização: </b> ${
                          item.localUtility
                        }</p>
                        <p class="flex-item colorGreen"><b>Tempo de aluguel: </b> ${
                          item.timeToLocale
                        } ${item.typeToLocale}</p>
                        <p class="flex-item colorGreen"><b>Quantidade: </b> ${
                          item.quantity
                        }</p>
                    </td>
                </tr>
            </table>
        </div>
      </div>
    `;
  });

  html_base_layout += `
                        <div class="clsFooterInfo">
                            <p>
                                Precisa de ajuda? 
                                <br />
                                Ligue gratuitamente para <b>0800 948 9100</b>
                            </p>
                            <p>
                                Um abraço,
                                <br />
                                <b>Equipe Mills</b>
                            </p>
                        </div>
        
                
                    </div>
                </div>
        
                <div class="footer">
                    <a class="linkSite" target="_blank" href="https://www.mills.com.br/">
                        <img class="clsImgMills" src="https://hml-nova-mills.mills.com.br/email/assets/iconMills.png" />
                    </a>
                    <div class="groupIconsFooter">
                        <a href="https://www.mills.com.br" target="_blank">
                            <img src="https://hml-nova-mills.mills.com.br/email/assets/iconInternet2.png" />
                        </a>
                        <a href="https://www.instagram.com/millsoficial" target="_blank">
                            <img src="https://hml-nova-mills.mills.com.br/email/assets/iconInstagram2.png" />    
                        </a>
                        <a href="https://www.linkedin.com/company/millsoficial" target="_blank">
                            <img src="https://hml-nova-mills.mills.com.br/email/assets/iconLinkedin2.png" />
                        </a>
                        <a href="https://www.facebook.com/millsbr/?locale=pt_BR" target="_blank">
                            <img src="https://hml-nova-mills.mills.com.br/email/assets/iconFacebook2.png" />
                        </a>
                        <a href="https://cliente.mills.com.br" target="_blank">
                            <img src="https://hml-nova-mills.mills.com.br/email/assets/iconSocialMedia2.png" />
                        </a>
                    </div>
                </div>
            </section>
          </body>
        </html>
    `;

  return html_base_layout;
}

export function adminHeavyLayout(budget_data: any) {
    let html_base_layout = `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
        .mills_logo {
            width: 116px;
            background-color: #F37021;
            padding: 6px 10px;
            border-radius: 6px;
        }
        .title {
            color: #F37021;
        }
        </style>
        </head>
        <body>
        <main>
            <p>
            <img class="mills_logo" src="https://hml-nova-mills.mills.com.br/email/assets/iconMills.png" />
            <h1 class="title">Solicitação de reserva</h1>
            <b>Nome: ${budget_data.personalInformations.nome}</b>
            <br>
            <b>E-mail: ${budget_data.personalInformations.email}</b>
            <br>
            <b>Telefone: ${budget_data.personalInformations.telefone}</b>
            <br>
            <b>CNPJ: ${budget_data.personalInformations.cnpj}</b>
            <br>
            <b>Comentários: ${budget_data.personalInformations.additionalComments}</b>
            </p>
            <p>
            <h1 class="title">Detalhes do carrinho:</h1>
            ${budget_data.items.map((item: any) => {
                return `
                    <b>${item.displayName}</b>
                    <br>
                    <b>Local de utilização: ${item.localUtility}</b>
                    <br>
                    <b>Período: ${item.timeToLocale} ${item.typeToLocale}</b>
                    <br>
                    <b>Quantidade: ${item.quantity}</b>
                    <br>
                    <br>
                `
            }).join("")}
            </p>
            ------------------------------------
            <p>
            <b>Origem: Mídia</b>
            <br>
            <b>Formulário: Carrinho de orçamento</b>
            </p>
        </main>
        </body>
        </html>
    `;

    return html_base_layout;
}

export function quickBudgetLayout(budget_data: any) {
  let html_base_layout = `
    <!DOCTYPE html>
      <html>
      <head>
      <style>
        .mills_logo {
          width: 116px;
          background-color: #F37021;
          padding: 6px 10px;
          border-radius: 6px;
        }
        .title {
          color: #F37021;
        }
      </style>
      </head>
      <body>
        <main>
          <p>
            <img class="mills_logo" src="https://hml-nova-mills.mills.com.br/email/assets/iconMills.png" />
            <h1 class="title">Fale conosco!</h1>
            <b>Nome: ${budget_data.name}</b>
            <br>
            <b>E-mail: ${budget_data.email}</b>
            <br>
            <b>Telefone: ${budget_data.phone}</b>
            ${budget_data.cnpj ? `<br><b>CNPJ: ${budget_data.cnpj}</b>` : ``}
            <br>
            <b>Comentários: ${budget_data.comment}</b>
          </p>
          ------------------------------------
          <p>
            <b>Origem: Mídia</b>
            <br>
            <b>Formulário: Fale com um especialista</b>
          </p>
        </main>
      </body>
      </html>  
  `;

  return html_base_layout;
}
