00:00
E uma coisa que nós podemos ter reparado é o seguinte,

00:2.22
às vezes a gente está formatando o código,

00:7.32
às vezes eu pulo uma linha,

00:9.76
às vezes eu estou dando uns tabs aqui,

00:11.46
então aqui nesse arquivo tem essa string muito grande,

00:16.88
aqui ele está quebrando, aqui ele está quebrando também.

00:20.48
Então como que a gente pode fazer para a gente

00:22.82
respeitar um único formato de escrita de código?

00:26.78
Para isso a gente pode utilizar os famosos linters. O ESLint é um tradicional.

00:31.64
E esse linter basicamente vai ajudar a gente a garantir

00:36.3
que o código está sendo escrito de uma forma padronizada.

00:40.38
Então eu vou parar aqui o nosso servidor.

00:43.1
E nós vamos fazer o seguinte.

00:45.06
Precisamos adicionar e configurar

00:48.18
algumas ferramentas de desenvolvimento.

00:54.05
A primeira, o ESLint mais o Prettier.

01:1.240000000000002
E o que é esse ESLint e Prettier? São bibliotecas que vão fazer justamente isso.

01:6.040000000000006
Elas vão lintar nosso código. Elas vão verificar o padrão do nosso código.

01:9.36
Se tem algum erro, ela vai verificar. Então, por exemplo,

01:11.519999999999996
a variável que não está sendo utilizada, ponto e vírgula sobrando.

01:16.659999999999997
E o Prettier, ele vai formatar automaticamente para nós.

01:20.299999999999997
E esse Prettier é muito bom porque... São ferramentas novas,

01:23.560000000000002
são ferramentas extremamente rápidas, porque seguem o Rust-based tools,

01:29.78
que é uma ferramenta desenvolvida com o Rust.

01:32.480000000000004
É diferente do S-Lint,

01:33.959999999999994
que ele utiliza o próprio JavaScript para fazer toda a parte de formatação.

01:37.64
Então, num projeto de grande escala, tem uma diferença enorme.

01:41.480000000000004
A gente pode rodar o S-Lint e vai demorar, sei lá, 10 minutos.

01:45.019999999999996
O Prettier vai rodar 10 minutos. O S-Lint vai rodar instantaneamente.

01:50.56999999999999
Então, o ESLint substitui o TSLint, o ESLint,

01:55.150000000000006
o ESLint substitui o TSLint, que é uma ferramenta de formatação de código.

02:3.6500000000000057
Além desse do ESLint, também tem o Prettier, que é uma outra ferramenta muito famosa.

02:8.800000000000011
E aproveitando que a gente vai adicionar ferramentas de desenvolvimento,

02:12.199999999999989
eu vou pedir para adicionar algumas outras a mais. Então, crie um arquivo .envrc.

02:19.879999999999995
para definir a versão de suporte do Node.js do projeto.

02:26.939999999999998
Pode ser a LTS

02:30.939999999999998
atual / minha versão atual.

02:35.56
O 3, a gente vai configurar aqui o commit-lint,

02:39.52000000000001
commit-lint mais convencional commits,

02:44.099999999999994
mais só isso.

02:48.06
Vamos definir aqui o Husky, git hooks, calma que eu já vou explicar.

02:55.25999999999999
O 5 vai ser lint,

02:58.31999999999999
lint staged, tem

03:3.1899999999999977
alguma outra?

03:5.4199999999999875
Não, acho que é essa.

03:7.939999999999998
Então eu vou bater o Enter enquanto ela configura e eu vou explicar para vocês.

03:12.159999999999997
Beleza, deixa ela rodar dessa vez,

03:14.360000000000014
vamos ver se a gente consegue terminar a execução dela sem fazer um corte.

03:19.129999999999995
O ESLint, o Prettier, já expliquei. O .nvmrc, para que ele serve? Para que ele serve?

03:25.47
A gente consegue definir a versão do Node no arquivo.

03:27.870000000000005
E o nvm é o Node Version Manager,

03:32.44999999999999
que é um pacote que faz gestão de Node,

03:35.03
que é esse daqui. Vamos abrir aqui para vocês verem.

03:37.33000000000001
Então, nvm é esse carinha aqui, Node Version Manager.

03:42.849999999999994
E tem o fnm, que é um fast.

03:47.66
É um Node Version Manager Fast, que é escrito em Rust.

03:51.96000000000001
E aí, sempre que a gente entrar no projeto,

03:53.74000000000001
ele automaticamente consegue fazer a instalação do Node,

03:55.69999999999999
baseado na versão que foi definida nesse arquivo.

03:59.58000000000001
O commit -link mais conventional commits, o que é isso? O commit -link,

04:3.1399999999999864
quando a gente faz commit, git commit, o git add,

04:5.960000000000008
que a gente passa aquela mensagem, então o commit -link faz o link daquela mensagem.

04:10.780000000000001
E o conventional commits, então, opa, conventional commits,

04:17.45999999999998
ele vai seguir ali um padrão.

04:19.339999999999975
Ele foi muito famoso e introduzido pelo Engler, se eu não me engano.

04:23.620000000000005
Então, por exemplo, quando a gente está implementando uma funcionalidade,

04:26.120000000000005
a gente coloca fit dois pontos.

04:28.819999999999993
Quando tem break change, quando exige atenção, a gente coloca exclamação.

04:32.68000000000001
Quando a gente quer colocar algum escopo, a gente coloca entre parênteses o escopo.

04:37.30000000000001
Documentação. Então, assim, tem várias e várias especificações.

04:41.339999999999975
Que esse conventional commit. Ele vai seguir.

04:44.77999999999997
Deixa eu ver aqui. O full documentation.

04:46.54000000000002
A fit. O fix.

04:50.879999999999995
Tem refactoring. Tem config.

04:54.89999999999998
E o commit lint. Opa. E o commit lint. Ele vai fazer o lint.

04:58.72000000000003
Ele vai pegar a mensagem que a gente colocou ali.

05:0.4399999999999977
E vai fazer o lint dessa mensagem. O left hooks.

05:4.220000000000027
O que o left hooks faz? Eu vou rodar o npm. O npm.

05:11.160000000000025
Então eu estou tendo alguns problemas ali com o meu NPM e a cursor.

05:15.910000000000025
O left hook é o que a gente chama de git hook,

05:18.20999999999998
né? E um famoso, bem famoso, é o rusk.

05:22.410000000000025
Então esse rusk o que ele faz?

05:24.310000000000002
Ele roda comandos do nosso projeto em momentos específicos do git,

05:29.879999999999995
em triggers do git. Ou seja,

05:31.95999999999998
eu quero formatar todos os meus arquivos quando eu fizer um git add. A gente consegue?

05:38.74000000000001
Ah, eu quero rodar o commit link quando eu fizer um commit message.

05:42.27999999999997
A gente consegue. Quero rodar todos os testes quando eu fizer um git push.

05:46.379999999999995
A gente consegue. Ou seja, a gente tem lá os hooks do git,

05:50.01999999999998
que são triggers do git, que são momentos e eventos do git.

05:53.379999999999995
E esses eventos e momentos vão triggar alguma função. Qual é a função?

05:57.89999999999998
A função que a gente configurou através da husk. Então, a husk,

06:1.4800000000000182
a gente ouve esses eventos do git, esses comandos do git,

06:5.180000000000007
e a gente configura e a gente pede para executar alguma coisa nesses eventos.

06:9.720000000000027
A left hook é basicamente o que a husk faz.

06:14.5
Porém, ela é mais nova, ela é mais famosa, e ela é...

06:18.439999999999998
Não vou chamar mais famosa, não. Ela é mais nova e ela é rápida.

06:21.620000000000005
Ela é bem mais rápida porque ela está utilizando...

06:24.19999999999999
Se eu não me engano, ela utiliza o Rush também.

06:31.480000000000018
Deixa eu ver aqui.

06:33.860000000000014
Se eu não me engano, ela também utiliza o Rush.

06:36.379999999999995
Será que no Git dela tem alguma informação?

06:40.579999999999984
Vamos ver. Fast, Power... Ah, ela foi escrita em Go.

06:46.06
Então, é uma ferramenta que foi escrita em Go,

06:48.079999999999984
por isso que ela é extremamente rápida.

06:51.01999999999998
Mas, basicamente, ela faz a mesma coisa que o Rusk vai fazer.

06:54.75
E o lint -staged, para que serve esse lint -staged? Para a gente,

06:58.76999999999998
quando a gente estiver mandando o nosso arquivo para a stage,

07:3.589999999999975
ou seja, quando a gente está fazendo o git add,

07:5.509999999999991
a gente vai conseguir formatar o arquivo antes de mandar ele para a stage.

07:9.629999999999995
Então, o lint -staged,

07:11.470000000000027
ele vive entre o add e o arquivo de fato quando ele está no nosso stage.

07:17.149999999999977
Aqui no meio, ele vai executar o lint -staged, ou seja... Nosso arquivo original.

07:23.639999999999986
Roda o lint staged. O que ele vai fazer? Ele vai rodar o oxfmt.

07:28.439999999999998
Formatou todos os arquivos. Manda ali para o stage do git.

07:33.69
Então parece que ela terminou. Vamos aceitar tudo.

07:36.20999999999998
Vamos fechar e vamos ver o que ela fez.

07:38.75
Então ela criou ali esse oxfmt. Com algumas regras de formatação.

07:43.00999999999999
O oxlint com algumas regras de lint.

07:46.35000000000002
o left hook com alguns comandos, então um pré -commit,

07:49.610000000000014
então antes de comitar ele vai rodar o lint -staged e

07:52.81
o commit -message ele vai rodar o commit -lint.

07:57.47000000000003
Provavelmente ela vai ter colocado alguma coisa no JSON, olha lá,

08:0.12999999999999545
commit -lint, ele está utilizando o conventional commits, a configuração padrão,

08:5.230000000000018
o lint -staged ele vai rodar o x -lint e o x -fmt para todos esses arquivos aqui.

08:12.70999999999998
E aí ele instalou ali as dependências para nós.

08:16.439999999999998
Além disso, ele configurou ali o lint e o lint fix.

08:21.220000000000027
Ele configurou o format e o format check.

08:25.100000000000023
E agora a gente tem que instalar essas versões da biblioteca.

08:29.370000000000005
Vamos instalar tudo.

08:31.629999999999995
Vamos aguardar, vamos aguardar, vamos aguardar.

08:34.870000000000005
Bastante coisa foi instalada pelo jeito.

08:37.629999999999995
Vamos limpar, então, npm run lint. Olha lá, rodou o lint.

08:43.47000000000003
Que tá falando a PG também tem um name de export, ó. Vamos ver aqui.

08:48.17999999999995
Ah, tá. Porque a gente fez...

08:50
A gente tá importando PG e depois a gente tá fazendo um const PG do pool,

08:54.559999999999945
ó. Então a gente poderia fazer simplesmente isso aqui, ó.

08:56.98000000000002
Deixa eu ver se ele consegue fazer o fix desse.

09:1.0900000000000318
Ah... Fix. Beleza. É,

09:5.139999999999986
não fez o fix porque provavelmente isso aqui não tá marcado como consertável,

09:8.620000000000005
como fixable. Então vamos tirar isso daqui e vamos fazer desta forma.

09:13.730000000000018
Vamos rodar o lint.

09:15.370000000000005
Rodamos o lint perfeito. Vamos rodar o format.

09:22.82000000000005
Beleza. Deu um erro. Vamos mandar aqui para a cursor. Opa.

09:27.600000000000023
Cursor fez alguma cagada. Vamos mandar para ela. Conserta aí, cursor.

09:31.960000000000036
Conserta aí que não deveria ter um write aqui.

09:37.98000000000002
Beleza. Vou checar se ela é instalada e corrigir os scripts.

09:42.22000000000003
Provavelmente deve ser alguma versão.

09:44.610000000000014
de problema de versão.

09:46.210000000000036
Talvez a cursor tenha um conhecimento de uma versão mais antiga.

09:49.710000000000036
A versão mais antiga, por algum motivo, pode ser que ela tenha ou não tenha write.

09:55.76999999999998
Olha lá. Na versão 0 .16,

10:1.1299999999999955
o write foi removido. Então, é exatamente isso.

10:4.740000000000009
O que ele está falando aqui? Ele está executando o fmt para ver se deu certo.

10:10.870000000000005
A fmt, a flag foi movida,

10:12.92999999999995
a forma anterior a gravar no disco já é o comportamento padrão,

10:15.049999999999955
então a gente não precisa mais explicitamente pedir para pedir se write agora,

10:20.129999999999995
pelo padrão ela já faz isso.

10:22.210000000000036
Perfeito. E com isso nós temos ferramentas de

10:24.57000000000005
desenvolvimento prontas para preparar o nosso

10:26.75
projeto para crescer e para escalar com múltiplas

10:29.309999999999945
pessoas trabalhando na base de código.

10:31.66999999999996
E por último, vou mostrar para vocês, então, git add, git commit,

10:40.309999999999945
Aula... Acho que é a aula 6 essa daqui.

10:43.309999999999945
Olha lá. Então ele tá executando o left hook, ó.

10:45.889999999999986
E o que ele fez? Ele deu erro. Por que ele deu erro?

10:48.35000000000002
Porque a gente não tá... Deve ser alguma configuração.

10:51.35000000000002
Deixa eu ver aqui como que ele configurou o lint -staged. Opa.

10:57.370000000000005
É, não consigo terminar aqui. Vamos diminuir o terminal.

11:3.2799999999999727
O lint -staged. Talvez ele colocou o javascript. Não, ele colocou o javascript. Javascript.

11:11.580000000000041
Left hook.

11:14.580000000000041
Commit lint. Pre -commit. Ele vai rodar o lint staged.

11:22.840000000000032
E o commit master ele vai rodar. Bom.

11:27.32000000000005
Bom, bom, bom, bom, bom. Deixa ele fazer o que ele quer fazer aí. Bom,

11:31.620000000000005
o cursor terminou de consertar o problema.

11:34
E basicamente o problema era esse JSON -MD -GAMON aqui.

11:38.42999999999995
Né, por quê? Porque o FMT,

11:39.85000000000002
ele só formata arquivos JavaScript, então tava chegando JSON,

11:44.47000000000003
YEMO, arquivos que ele não conhece, então estava dando este erro.

11:50.32000000000005
Vamos fazer o teste, então git add, funcionou, git commit,

11:54.77999999999997
ó lá, funcionou, porém agora deu erro de commit link,

11:58.97000000000003
por quê? Porque a gente tá seguindo um formato que a gente não espera,

12:1.3899999999999864
então eu vou colocar aqui, ó, shore,

12:4.470000000000027
esse shore eu vou colocar aula 6, agora deu certo, ó.

12:9.17999999999995
Então veja que está tudo configuradinho e bonitinho.

12:11.67999999999995
Uma última coisa que eu não expliquei para vocês foi o NVMSC. Ele colocou o 22.

12:18.139999999999986
O 22 vai pegar a versão LTS 22 mais atualizada.

12:25.340000000000032
Por quê? Porque às vezes pode ser 22 .1, às vezes pode ser 22 .2,

12:29.100000000000023
às vezes pode ser 22 .3, .45 ou .47.

12:32.879999999999995
Então o 22 vai pegar a versão LTS do 22.

12:38.460000000000036
Porém, eu, Matheus, não gosto de deixar a versão definida.

12:42.75999999999999
Eu gosto de definir as versões atrás do Elias. Então,

12:45.799999999999955
Node .js Elias. A gente pode vir aqui. Deixa eu ver aqui.

12:57.01999999999998
Sempre quando eu tenho que achar isso daqui, eu apanho. Então, Node .js org.

13:3.25
Sempre, sempre quando eu tenho que achar isso daqui, eu apanho. Então, releases. 22.

13:10.75
22 é o jódia. Então, a gente pega aqui o Codename,

13:14.549999999999955
a gente coloca aqui LTS barra George.

13:20.74000000000001
E aí, se a gente fechar isso daqui e abrir de novo,

13:23.899999999999977
veja que a minha máquina não instalou.

13:26.279999999999973
Na verdade, eu estou utilizando o 24. Então, o 24 é o Krypton.

13:30.299999999999955
Então, Krypton.

13:33.27999999999997
Olha lá. Então, eu vou sair, vou voltar para cá. Ainda assim,

13:36.940000000000055
não instalou. Estão usando Node.js LTS Krypton. Ou seja...

13:42.690000000000055
Ele entendeu que aqui tem o LTS Krypton e automaticamente meu

13:46.75
shell está configurado para sempre que ele ver um arquivo NVMRC,

13:50.52999999999997
ele vai ver a versão que está aqui e vai ativar no terminal.

13:54.370000000000005
Se por acaso a minha versão atual, o terminal A15,

13:58.16999999999996
e aqui tivesse, sei lá, para utilizar a versão 18,

14:1.6900000000000546
automaticamente ele ia fazer essa troca,

14:3.730000000000018
porque o meu terminal com o Fish shell está configurado para ele fazer isso.

14:10.82000000000005
E agora sim, de fato,

14:12.980000000000018
finalmente acho que nós terminamos as configurações

14:17.019999999999982
de ferramenta de desenvolvimento e

14:18.32000000000005
a gente pode continuar o desenvolvimento da nossa API nas próximas aulas.
