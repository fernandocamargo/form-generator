# Pré-requisitos

Não é permitido o uso de nenhuma biblioteca ou framework externo. Tudo será feito com [Vanilla.js](http://vanilla-js.com/).

Não utilize nenhuma biblioteca de CSS externa, mas você pode utilizar qualquer metodologia de arquitetura de código.

Se preferir, o uso de Sass é liberado, contanto que seu uso seja justificável.

O objetivo desse teste é avaliar:
- organização;
- semântica;
- uso e abuso das features das linguagens (HTML, CSS e JS);
- uso de patterns;

# Teste

Utilizando o JSON `fields.json` que está na raiz do repositório, renderizar o formulário de pedidos da forma que é exibido [aqui](https://www.getninjas.com.br/moda-e-beleza/cabeleireiros).

# Informações adicionais

- No exemplo, na pergunta "Qual será o serviço", o último campo é um `input` do tipo `text`, para este exemplo não é necessário faze-lo. (só é preciso exibir os `checkbox`);
- É necessário exibir a mensagem "este campo é requerido" para os marcados como `required: true`;
- Campos do tipo `enumerable` podem ser tanto `checkbox` quanto `select`, o que diferencia um do outro é a opção `allow_multiple_value`, quando essa opção estiver como `true` é um campo do tipo `checkbox` quando estiver como `false` é do tipo `select`.;
- O formulário não precisa fazer `POST`;
