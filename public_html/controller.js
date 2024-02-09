document.addEventListener('DOMContentLoaded', function() {
  const cepFilter = document.getElementById('cep');
  cepFilter.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, ''); 
  });

  const form = document.getElementById('form-endereco');
  const cepInput = document.getElementById('cep');

  form.addEventListener('submit', (event) => {
      event.preventDefault();

      const cep = cepInput.value.replace(/\D/g, '');

      if (cep.length !== 8) {
          alert('CEP inválido!');
          return;
      }

      fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(response => response.json())
          .then(data => {
              if (data.erro) {
                  alert('CEP não encontrado!');
                  return;
              }

              const rua = document.getElementById('rua');
              const bairro = document.getElementById('bairro');
              const cidade = document.getElementById('cidade');
              const estado = document.getElementById('estado');

              rua.value = data.logradouro;
              bairro.value = data.bairro;
              cidade.value = data.localidade;
              estado.value = data.uf;

              rua.disabled = false;
              bairro.disabled = false;
              cidade.disabled = false;
              estado.disabled = false;
          });
  });
});
