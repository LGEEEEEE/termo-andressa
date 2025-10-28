// Função para gerar um hash SHA-256 de uma string
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Credenciais de acesso com hash (mais seguro que texto puro)
    const emailCorreto = "equipe@andressa.com";
    const senhaHashCorreta = "6df66466d69a28f772ac4549256fc68b37dd8827943b213c7faf00107d451f5e";

    // Gera o hash da senha inserida pelo usuário
    const senhaHashDigitada = await hashPassword(password);
    

    if (email === emailCorreto && senhaHashDigitada === senhaHashCorreta) {
        localStorage.setItem('isAuthenticated', 'true');
        window.location.href = 'termo.html';
    } else {
        errorMessage.textContent = "E-mail ou senha incorretos.";
        errorMessage.classList.remove('hidden');
    }
});