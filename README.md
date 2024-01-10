# HSS RENTAL - Frontend

Bem-vindo à documentação do frontend da HSS RENTAL - sua interface para a locadora de veículos desenvolvida com Vue, Vite, e Typescript. Esta aplicação proporciona aos clientes (CUSTOMER) uma experiência intuitiva para locar veículos, enquanto os funcionários (COMMOM) gerenciam e confirmam as locações. Os administradores (ADMIN) têm permissões adicionais para gerenciar usuários e veículos.

**Conheça a HSS RENTAL:** [Acesse](https://hssrental.netlify.app)

## Funcionalidades Principais

1. **Cadastro e Locação de Veículos:**
   - Os clientes (CUSTOMER) podem se cadastrar na plataforma e escolher veículos para locação, especificando as datas de retirada e devolução.
   - Notificações via e-mail e push são enviadas aos clientes quando as locações são confirmadas pelos funcionários (COMMOM).

2. **Permissões de Usuários:**
   - **CUSTOMER:** Pode realizar locações e visualizar seu histórico de locações.
   - **COMMOM:** Funcionário sem permissões administrativas, confirma locações e verifica o histórico geral de locações.
   - **ADMIN:** Tem todas as permissões do COMMOM e pode listar, editar e cadastrar usuários e veículos.

3. **Disponibilidade de Veículos:**
   - A aplicação garante que apenas veículos disponíveis na data escolhida estejam disponíveis para locação, evitando conflitos de reservas.

4. **Notificações e Promoções:**
   - Os clientes recebem notificações push e e-mails para locações confirmadas, além de promoções e avisos programados pela equipe de marketing.

## Como Rodar o Projeto

**LEMBRE-SE DE CONFIGURAR O PROJETO BACKEND:** [REPOSITÓRIO](https://github.com/Ruberson1/hss-rental-api-public)

1. Faça o clone do projeto em sua máquina.
2. Execute o comando `yarn install` ou `npm install` para instalar as dependências.
3. Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente conforme suas credenciais.
4. Execute o comando `yarn dev` ou `npm run dev` para iniciar a aplicação.

## Tecnologias Utilizadas

- **Vue, Vite, e Typescript:** Plataforma poderosa e eficiente para o desenvolvimento de interfaces modernas.
- **Axios:** Cliente HTTP para comunicação eficiente com o backend.
- **Pinia:** Gerenciamento de estado para uma arquitetura robusta e escalável.
- **Tailwind CSS:** Framework de estilização para uma abordagem prática e consistente.
- **PrimeVue:** Biblioteca Vue para elementos de interface pré-configurados, proporcionando uma experiência de usuário aprimorada.

Divirta-se explorando a HSS RENTAL!
