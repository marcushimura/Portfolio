# Assistente do portfólio — integração local

O site continua estático. O serviço Node atende `/api/guide/status` e `/api/guide`, usando a API Chat Completions da Groq com saída estruturada.

## Ativação local

1. Copie `backend/.env.example` para `backend/.env`.
2. Configure `GROQ_API_KEY` e `GROQ_MODEL` nesse arquivo local. O modelo preparado é `openai/gpt-oss-20b`, hospedado na Groq e com suporte a saída estruturada. O nome `openai/` identifica a família aberta do modelo, não uma chamada à API paga da OpenAI. Não cole a chave em mensagens, JSX ou arquivos públicos.
3. Reinicie `npm run dev -- --host 0.0.0.0 --port 4173`.
4. `/api/guide/status` deve retornar `mode: ai`. Sem ambos os valores, o guia permanece em busca local e não chama o provedor.

Use uma conta no plano Free da Groq. A implementação não consegue garantir o plano da conta pela chave: não ative upgrade para Developer. Ela não cria conta, compra créditos nem altera cobrança. Não há mais chamadas à OpenAI nem reaproveitamento da chave antiga.

## Contexto e fontes

Um contexto compacto de até 8.500 caracteres é selecionado por pergunta e histórico a partir de sete documentos públicos construídos dos arquivos de dados: apresentação profissional e seis cases. Imagens, HTML, protótipos e exemplos de código são excluídos. O PDF do currículo ainda não é extraído para esta base. Alterar os dados e reiniciar o servidor atualiza o contexto. Até duas duplas anteriores de pergunta/resposta, limitadas a 900 caracteres por mensagem, são enviadas para continuidade da conversa; o servidor não persiste as conversas. A chave fica no servidor; as políticas de tratamento de dados são as da Groq.

A resposta do modelo inclui texto e até oito identificadores de trechos, agrupados em no máximo dois cases. O servidor valida esses IDs e monta as citações a partir do conteúdo original, sem pedir à IA que reescreva fontes. Isso valida referências, não garante que cada frase gerada esteja correta. Metadados de duração/time e métricas são preservados no contexto compacto. O conteúdo e as regras precisam de avaliação real com o modelo escolhido antes da publicação.

## Limites

- Até 600 caracteres por pergunta na API (300 na interface), oito mensagens de histórico, 16 KiB no corpo, 900 tokens de geração.
- Até seis chamadas por IP/minuto, três simultâneas e 50 por dia por processo por padrão.
- Tempo máximo de 20 segundos; desconexão do cliente cancela a requisição.
- Origens explícitas; credenciais apenas no servidor; respostas de erro não expõem mensagens internas do provedor.

Os limites são em memória e reiniciam com o processo. Antes de exposição pública é necessário controle persistente de consumo/rate limit na hospedagem e orçamento do provedor. CORS não impede chamadas feitas fora do navegador.

## Hospedagem futura

GitHub Pages não executa este backend. Não habilite `backend/.env` no GitHub. Hospede o serviço separado, configure `GUIDE_ALLOWED_ORIGINS` com `https://marcushimura.com.br` e mantenha a chave nos segredos da hospedagem. O frontend aceita `window.PORTFOLIO_GUIDE_API` com a URL HTTPS do serviço antes do bundle; sem isso usa o mesmo host para a integração local.

## Verificação

`node --test qa/guide-api.test.cjs`: 33 testes de contrato HTTP, validação, limites e falhas com provedor simulado.

`NODE_ENV=development node qa/guide-ai-ui.cjs`: 19 verificações de estado do frontend com API simulada (requer o jsdom temporário da revisão).

`NODE_ENV=development node qa/guide-integration.cjs`: 135 verificações do guia local.

Houve consultas reais à Groq e revisão de respostas durante a rodada de QA de 29/10. Os detalhes e limites estão em qa/guide-deep-review.md. Não houve teste visual em navegador real.

## Preencher a chave sem expô-la

No Terminal do Mac, execute `python3 backend/configure-groq.py` na pasta do projeto. O campo é oculto e não ecoa o valor. Crie a chave em https://console.groq.com/keys e não a envie por chat ou comentário. Após salvar, reinicie o servidor.

Documentação: https://console.groq.com/docs/structured-outputs e https://console.groq.com/docs/rate-limits .


## Entrada isolada para hospedagem

`npm run start:api` inicia apenas a API, sem servir arquivos estáticos ou carregar arquivos .env. A hospedagem deve injetar GROQ_API_KEY, GROQ_MODEL, GUIDE_ALLOWED_ORIGINS, NODE_ENV e PORT no processo. Em produção, chave e origens explícitas são obrigatórias. O endpoint /api/guide/status pode ser usado na verificação do serviço. O contexto ainda depende dos três arquivos portfolio-*-data.js na raiz do repositório.

A configuração final da plataforma, limites persistentes e URL pública ainda estão pendentes. Não interpretar esta entrada como deploy concluído.
