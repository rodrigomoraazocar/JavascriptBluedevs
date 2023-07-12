$(document).ready(function() {
  $('#cep').mask('00000-000');

  $('#cep').keydown(function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      var cep = $(this).val().replace(/\D/g, '');
      if (cep.length === 8) {
        consultarCEP(cep);
      }
    }
  });

  function consultarCEP(cep) {
    $.ajax({
      url: `https://viacep.com.br/ws/${cep}/json/`,
      dataType: 'json',
      success: function(data) {
        if (!data.erro) {
          $('#rua').val(data.logradouro);
          $('#complemento').val(data.complemento);
          $('#bairro').val(data.bairro);
          $('#cidade').val(data.localidade);
          $('#estado').val(data.uf);
        } else {
          limparCampos();
          alert('CEP não encontrado.');
        }
      },
      error: function() {
        limparCampos();
        alert('Erro ao consultar o CEP.');
      }
    });
  }

  function limparCampos() {
    $('#rua').val('');
    $('#complemento').val('');
    $('#bairro').val('');
    $('#cidade').val('');
    $('#estado').val('');
  }
});

  