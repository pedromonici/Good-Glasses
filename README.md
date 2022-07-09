# Good-Glasses
Final assignment for web development class (Milestone2)
### Integrantes:
|Nome|NUSP|
|----|----|
|Pedro Henrique Borges Monici | 10816732 |
|Guilherme Machado Rios | 11222839 |
|Gabriel Victor Cardoso Fernandes | 11878296 |

## Requisitos

### Tipos de Conta
O sistema deve ter 2 tipos de usuários: Clientes e Administradores.
- Administradores são responsáveis por registrar/gerenciar outros administradores,
clientes e produtos fornecidos. O aplicativo já possui uma conta de administrador com 
as seguintes credenciais:

```
CPF: 12345678910
Senha: administrador
```

- Clientes são usuários que acessam o sistema para comprar produtos

### Registros
O registro do Administrador contém nome, CPF, endereço, telefone e email.

O registro do Cliente contém nome, CPF, endereço, telefone e email.

O registo dos produtos contém nome (chave primária), foto, descrição, preço, quantidade(em estoque)
e quantidade vendida.

### O que é possível fazer?
- Venda de produtos: Os produtos selecionados, são incluídos em um carrinho e sua quantidade é
escolhida. Os produtos são comprados usando um número de cartão de crédito (qualquer número é
aceito pelo sistema). A quantidade de produto vendida é subtraída da quantidade em estoque e 
adicionada à quantidade vendida. Os carrinhos somente são esvaziados qundo o pagamento é efetuado
ou quando os clientes removem manualmente todos os produtos.

- Gerenciamento de produto: Os administradores podem [criar/atualizar/ler/excluir] (CRUD) novos
produtos. Por exemplo, eles podem alterar a quantidade em estoque.

- Funcionalidade extra: Um cliente deve ser capaz de visualizar uma página com as informações de cada
produto cadastrado no sistema. Além disso, cada cliente pode realizar um questionário sobre o formato
de seu rosto, para decidir qual o melhor tipo de óculos para determinado cliente.

### Acessibilidade
- O sistema deve prover uma boa acessibilidade e boa usabilidade.
- O sistema deve ser responsivo.

## Decrição do Projeto
Good Glasses (GG) é uma ótica responsável por vender os mais variados tipos de óculos e lentes
destinados ao público geral.

Implementado com HTML, CSS, Javascript com React no front-end, Node.js para o back-end e MongoDB
para o banco de dados.

### Diagrama de Navegação
<img src="https://github.com/pedromonici/Good-Glasses/blob/main/mockups/navegation_diagram.jpg" width=600px>
As imagens do mockup estão na pasta `/mockups`.

### Funcionalidades
- Criar uma nova conta.
- Realizar login com cpf e senha na plataforma.
- Visualizar as informações da conta de cada cliente, com a opção de alterar cadastro.
- Visualizar página de administrador, com opção de administrar os produtos e usuários na loja.
- Acesso a página inicial da loja.
- Acesso da página de compra de produtos, onde todos os produtos são listados.
- Acesso ao carrinho de compras, com opção de alterar a quantidadade de um item, conferir
o preço total e o preço de cada produto, além de finalizar a compra.
- Visualização de um determinado produto, mostrando seu nome, foto, preço, descrição e botão para
adicionar ao carrinho.
- Opção de inserir informações de cartão de crédito quando se finaliza a compra no carrinho.
- Um questionário para saber qual o melhor tipo de óculos para o tipo de rosto do cliente (Homepage).

### Servidor

#### Contas:
- CPF (chave primária)
- Nome
- Email
- Senha
- Role (User ou Admin)
- Endereço
- Número de Telefone

#### Produtos:
- Nome (chave primária)
- Categoria (utilizada para o questionário)
- Preço
- Descrição
- Imagem
- Quantidade vendida
- Quantidade disponível para compra

## Comentários sobre o código
Para o Milestone3, foi realizada toda a parte de Front-End e Back-End do sistema. Para tal, foi
utilizado React para o Front-End e Node para o Back-End. O código desenvolvido com framework React foi divido em componentes
de forma modularizada e estão disponíveis no diretório `client/src/Components`.
O código do Back-End está disponível no diretório `server` e é válido ressaltar que 
o arquivo `.env` presente nesse diretório é de extrema importância para a conexão ao MongoDB e dos processos de autenticação.

## Plano de Teste
Foram realizados alguns testes manuais de cada funcionalidade do sistema de forma que conseguimos
autenticar que todo o sistema está funcionando corretamente.

## Resultado dos Testes
Todos os recursos do sistema estão funcionando corretamente.

## Building
Para o Milestone03, é necessário apenas clonar o repositório, instalar as dependências com
`npm install` no diretório `client` e `server`. Depois é necessário entrar no diretório do servidor e executá-lo:
```
cd server
nodemon src/server.js
```

Em seguida, é necessário entrar no diretório do cliente e executar o react:
```
cd client
npm start
```
Finalmente, o site será aberto e é possível realizar todas as funcionalidades!

## Problemas
Não há problemas!

## Comentários
Não há comentários!
