# Publicação — preparação Vercel

Estado: preparação para revisão, ainda não ativada em produção.

- GitHub Pages continua atendendo marcushimura.com.br.
- Vercel executa /api/guide e /api/guide/status em Node, com os dados públicos incluídos no bundle da função.
- A saída estática em public/ usa uma lista permitida: não inclui backend, .env, QA ou scripts de desenvolvimento.
- portfolio-api-config.js ainda precisa receber a URL HTTPS estável da API.

## Pendências obrigatórias antes da ativação

1. Concluir link do projeto Vercel portfolio, equipe projeto-pessoal12.
2. Configurar GROQ_API_KEY como segredo na Vercel, sem incluir a chave no repositório. O usuário deve preencher o campo, sem enviar o valor pelo chat.
3. Configurar GROQ_MODEL=openai/gpt-oss-20b e GUIDE_ALLOWED_ORIGINS com as origens HTTPS exatas (domínio principal, www se usado e domínio Vercel do projeto).
4. Substituir os contadores em memória por limites persistentes compartilhados entre instâncias serverless, ou configurar controles equivalentes da plataforma. Os limites atuais por processo não garantem orçamento global na Vercel.
5. Verificar status, POST, CORS, fallback, cotas e ausência de arquivos privados no preview da Vercel.
6. Definir URL da API no frontend; aprovar e integrar a branch somente após testes no preview.

A configuração global temporária do CLI ficou em /tmp/portfolio-vercel-config; não versionar seu conteúdo. O login encontrou bloqueio de rede para api.vercel.com nesta sessão. A autorização no navegador não comprova que o CLI recebeu uma credencial.
