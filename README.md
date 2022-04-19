# Good-Glasses
Final assignment for web development class

## Requisitos

### Tipos de Conta
O sistema deve ter 2 tipos de usuários: Clientes e Administradores.
- Administradores são responsáveis por registrar/gerenciar outros administradores,
clientes e produtos fornecidos. O aplicativo já possui uma conta `admin`
com senha `admin`.
- Clientes são usuários que acessam o sistema para comprar produtos

### Registros
O registro do Administrador contém nome, CPF, endereço, telefone e email.

O registro do Cliente contém nome, CPF, endereço, telefone e email.

O registo dos produtos contém nome, ID, foto, descrição, preço, quantidade(em estoque)
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
- O sitema deve ser responsivo.

## Decrição do Projeto
Good Glasses (GG) é uma ótica responsável por vender os mais variados tipos de óculos e lentes
destinados ao público geral.

Implementado com HTML, CSS, Javascript com React no front-end, Node.js para o back-end e MongoDB
para o banco de dados.

### Diagrama de Navegação
<img src="https://github.com/pedromonici/Good-Glasses/blob/main/mockups/diagrama_navegacao.pdf" width=600px>
As imagens do mockup estão na pasta `/mockups`.

### Funcionalidades
- Criar uma nova conta;
- Realizar login com email e senha na plataforma;
- Visualizar as informações da conta de cada cliente, com a opção de alterar cadastro;
- Visualizar página de administrador, com opção de administrar os produtos e usuários na loja;
- Acesso a página inicial da loja 
- Acesso da página de compra de produtos, onde todos os produtos são listados.
- Acesso ao carrinho de compras, com opção de excluir ou alterar a quantidadade de um item, conferir
o preço total e o preço de cada produto, além de finalizar a compra.
- Visualização de um determinado produto, mostrando seu nome, foto, preço, descrição e botão para
adicionar ao carrinho.
- Opção de inserir informações de cartão de crédito quando se finaliza a compra no carrinho
- Um questionário para saber qual o melhor tipo de óculos para o tipo de rosto do cliente

### Servidor

#### Contas:
- ID (identificador do usuário, valor único)
- Nome
- Email
- Senha
- Admin (0 ou 1)
- CPF
- Endereço
- Número de Telefone

#### Produtos:
- ID (identificador de cada produto, valor único)
- Título
- Categoria (utilizada para o questionário)
- Preço
- Descrição
- Imagem
- Quantidade vendida
- Quantidade disponível para compra

## Comentários sobre o código

## Plano de Teste

## Resultado dos Testes

## Building

## Problemas

## Comentários
