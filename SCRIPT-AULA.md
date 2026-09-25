
00:00
Voltando aqui no projeto, então só uma coisinha que eu tive que fazer que eu não fiz,

00:3.88
eu fiz aqui fora da aula,

00:6.18
que eu vim aqui no nosso Git Ignore e eu adicionei o Node Modules.

00:11.42
Por que eu coloquei o Node Modules?

00:13.2
Porque eu estou fazendo todos os commits por aula.

00:15.88
E aí, quando eu fui fazer o commit, eu vi lá que o Node Modules não estava,

00:18.74
ele estava verdinho, porém a gente não quer subir esse Node Modules.

00:22.2
Então, eu simplesmente vim aqui no Git Ignore,

00:23.98
adicionei o Node Modules e fiz o commit ali da nossa aula anterior. Nada demais.

00:30.59
Vamos fazer o seguinte, agora eu vou parar isso aqui,

00:32.83
vou limpar e vou rodar novamente.

00:36.13
Rodando novamente, nós temos aqui, vamos buscar e não achou nada.

00:41.27
Só que a gente tinha um post. Por que não achou? Porque tudo está em memória.

00:45.21
Então, a primeira coisa que a gente vai começar a fazer agora é,

00:47.65
vamos começar a trabalhar ali com o banco de dados.

00:50.71
E qual banco de dados nós iremos utilizar?

00:54.21
Nós vamos utilizar o Postgres. Estaremos utilizando o Postgres.

00:58.58
Então, eu vou parar esse servidor,

01:0.3400000000000034
vou mais uma vez abrir aqui o agente e a gente vai começar a falar algumas coisas.

01:3.8599999999999994
Olha, precisamos começar a persistir os

01:9.560000000000002
dados em uma

01:12.230000000000004
camada de dados persistente.

01:18.14
Vamos utilizar o banco de dados Postgres.

01:28.349999999999994
O que mais que a gente precisa falar? O banco de dados Postgres.

01:31.230000000000004
A tabela de post

01:33.93000000000001
deve seguir a estrutura,

01:38.55
a

01:40.58
estrutura atual para a criação de um post conforme,

01:47.480000000000004
ali é o nosso src / services,

01:52.22
opa, bati um enter, não pude bater um enter.

01:55.58
src / services

02:0.12999999999999545
createPostDraft, createPostDraft, isso. Então,

02:5.609999999999999
a gente vai ter lá o nosso banco de dados.

02:8.150000000000006
Para integração e conexão de banco de dados,

02:13.969999999999999
devemos utilizar a biblioteca PG,

02:20.849999999999994
que é o tal do NodePostOS. Deixa eu só confirmar aqui.

02:26.72999999999999
NPM, deixa eu colocar o browser aqui na tela.

02:30.97
Então, barra package é o pg, né? Vamos só confirmar. 27 milhões de downloads.

02:38.27000000000001
Documentação. Don't blocking. Deixa eu ver se é esse daqui mesmo.

02:42.59
Cadê a documentação? Vamos abrir a documentação. Ah,

02:45.77000000000001
é esse aqui mesmo. Node Postgres. Excelente.

02:49.33000000000001
Então, Node Postgres.

02:53.09
O que mais que a gente precisa fazer?

02:59.900000000000006
Precisamos atualizar o get para fazer

03:4.939999999999998
um select de todos os posts. E

03:9.819999999999993
o post, né,

03:15.099999999999994
barra posts, barra draft.

03:17.669999999999987
Esse aqui eu vou colocar barra posts.

03:21.189999999999998
Opa, posts.

03:23.25
Para inserir novos registros.

03:30.25
Com insert.

03:34.33000000000001
Perfeito. Eu acho que é isso. Então vamos configurar o Postgres.

03:39.28999999999999
Seguindo esse contrato. Vamos utilizar o pg.

03:42.43000000000001
E vamos atualizar o get para fazer um select.

03:44.97
E o post para fazer um insert.

03:49.75
Vamos pedir para o cursor fazer isso. E como de costume.

03:53.150000000000006
Assim que ela terminar, eu volto aqui.

03:55.53
O cursor terminou o nosso prompt. E ela mexeu em seis arquivos.

03:59.870000000000005
Olha só. Coincidência em seis de novo.

04:2.469999999999999
Eu não vi nada, não aceitei nada, acabei de aceitar tudo.

04:5.289999999999992
Vamos ver o que ela mandou aqui então, ó.

04:7.069999999999993
Comando npm, então npm install pg, variável de ambiente.

04:12.669999999999987
Adicione no seu env local, database URL, ajuste o usuário,

04:17.670000000000016
senha, host, cria banco de dados.

04:20.889999999999986
A tabela posts é criada automaticamente na

04:24.189999999999998
inicialização do servidor via init database.

04:27.850000000000023
O que foi implementado, então o src database pool.js, um pool de conexões,

04:33.85000000000002
um schema de banco de dados .sql, o DDL da tabela posts.

04:39.35000000000002
Calma que a gente já vai entender isso.

04:41.43000000000001
O src database init.js, então ele vai inicializar o schema,

04:46.629999999999995
e aí vai ter ali um repositório post-repository,

04:51.52999999999997
e ele vai ter ali um src index.js.

04:59.370000000000005
Vamos fechar. Deixa eu ver o que ele fez.

05:1.8500000000000227
Repository, post repository.

05:4.389999999999986
Esse repositório na verdade é só um arquivo que está fazendo a busca

05:9.550000000000011
de todos os posts e o insert de todos os posts. Não é uma classe, nada.

05:12.610000000000014
É simplesmente um arquivo que vai retornar funções para

05:14.970000000000027
gente inserir posts e retornar todos os posts.

05:20.350000000000023
Só para a gente não ter que ficar escrevendo tudo na mão

05:22.70999999999998
no nosso arquivo e nosso arquivo ficar muito grande.

05:25.269999999999982
Então, na verdade, não está seguindo o padrão de repositório,

05:30.620000000000005
por exemplo, mas sim um arquivo que está exportando funções diferentes,

05:34.74000000000001
como se fosse um utils.

05:35.839999999999975
Se esse arquivo fosse um utils, seria a mesma coisa.

05:39.27999999999997
Mais para frente, na formação,

05:41.5
quando a gente começar a avançar e adicionar complexidade,

05:44.160000000000025
nós vamos, de fato,

05:45.160000000000025
implementar um padrão de repositório certinho, bonitinho,

05:48.420000000000016
com classes e dependências, tudo conforme deve ser.

05:52.56
Mas, por ora, eu entendo que isso aqui é um arquivo...

05:54.81999999999999
que exporta duas funções diferentes,

05:56.45999999999998
e ele está englobando todas as funções de banco de dados em um só lugar.

06:0.6200000000000045
O que mais que ele criou? Então, database.init, tem ali o nosso init,

06:4.680000000000007
ele está criando um novo banco de dados,

06:7.220000000000027
vai pegar o pool aqui e vai executar essa query,

06:13.779999999999973
e essa query vai ser o que a gente colocou lá no schema.sql.

06:18.54000000000002
Esse schema.sql está fazendo um create table if not exists,

06:22.220000000000027
então ele vai criar toda esta tabela aqui para nós. O pool,

06:28.839999999999975
então basicamente ele faz o new pool passando a connection string do

06:32.45999999999998
que a gente definiu ali de connection string no nosso arquivo de configuração.

06:36.24000000000001
Arquivo de configuração não, o nosso .env do .env.local.

06:41.70999999999998
O que mais que ele mexeu, aí vai mexer no index,

06:44.94999999999999
Obviamente ele vai ter que importar essas funções,

06:46.79000000000002
Então find all posts, insert post, aí aqui se for post é get,

06:52.97000000000003
Ele vai fazer um find all, e no then ele vai de fato executar,

06:58.56999999999999
Vai retornar a nossa requisição,

07:1.5699999999999932
E no post ele está fazendo um await de insert post.

07:08
Perfeito, perfeito, perfeito. Está muito bom,

07:11.529999999999973
Mas tem algumas coisas que a gente vai fazer ainda

07:12.949999999999989
E tem algumas coisas que a gente vai mudar.

07:14.529999999999973
A primeira coisa que a gente vai mudar.

07:16.110000000000014
Nós não vamos trabalhar com esse formato de init manual que ele está fazendo aqui.

07:21.370000000000005
Então, eu vou abrir aqui o cursor.

07:23.430000000000007
Deixa eu restaurar a mesma conexão que a gente tinha.

07:26.29000000000002
E a gente vai começar a fazer um refinamento. O que a gente vai fazer? Para

07:30.629999999999995
inicialização do

07:38.23000000000002
banco de dados.

07:40.420000000000016
Vamos utilizar o conceito de migrations.

07:47.74000000000001
Podemos utilizar o PostgreSQL. Deixa eu ver se é PostgreSQL mesmo.

07:54.94999999999999
Vou trazer o navegador para cá.

07:57.97000000000003
npm, npm, opa, npm.com,

08:2.1299999999999955
package PostgreSQL, PostgreSQL CLI.

08:9.110000000000014
88 milhões de downloads.

08:12.189999999999998
É lá, PostgreSQL CLI.

08:16.089999999999975
Beleza. É isso daí. Então,

08:18.370000000000005
PostgreSQL publicado dois anos atrás e esse daqui publicado nove meses atrás.

08:25.560000000000002
Então, parece que faz sentido utilizar este daqui e não o outro.

08:31.079999999999984
PostgreSQL CLI.

08:34.75999999999999
Vamos ver se esse repositório é GitHub.

08:39.60000000000002
Só tem, ué,

08:41.39999999999998
Era pra ser mais famoso daqui, PostgreSQL, vamos

08:48.559999999999945
ver, e

08:51.22000000000003
De fato, 467 stars só, ué,

08:56.09000000000003
NPM install, PostgreSQL, migrations, é de fato essa daqui,

09:3.1399999999999864
Ó, então dois anos atrás,

09:5.519999999999982
PostgreSQL,

09:10.82000000000005
Um minuto, gente. Só estou confirmando se essa daqui é a biblioteca.

09:14.340000000000032
É 88 mil downloads. Então vamos utilizar essa PostgreSQL e não a PostgreSQL CLI.

09:21.440000000000055
Vamos utilizar o PostgreSQL, o pacote.

09:28.529999999999973
Pacote PostgreSQL.

09:31.129999999999995
O que mais que a gente fazer?

09:35.01999999999998
Acho que por enquanto é só isso.

09:36.39999999999998
Depois a gente tem que preparar o nosso banco de dados, subir ele.

09:38.60000000000002
Mas por enquanto vamos pedir só esse ajuste de... De migrations.

09:41.860000000000014
Esse schema aqui. Esse init não ficou muito bom.

09:44.91999999999996
Vamos migrar. Como de costume. Já que eu volto naquela terminar.

09:48.84000000000003
Mais uma vez. Ela terminou. Vou aceitar tudo.

09:51.75999999999999
E vamos ver ali o que ela fez. Vamos fechar por enquanto.

09:56.51999999999998
Então ele criou essa pasta aqui. Migrations. E a migrations de do.

10:0.82000000000005
É a criação da tabela. Então create table posts.

10:5.019999999999982
E one do add drop.

10:7.789999999999964
Post, né? Aqui só faltou create table, vamos colocar aqui if not exists.

10:13.809999999999945
O que aconteceu aqui? Não sei o que aconteceu,

10:17.269999999999982
Beleza? Então, o ID é um varchar, o título,

10:20.389999999999986
O content, created_at, reported e rejected, perfeito.

10:23.710000000000036
E ali o Android vai fazer o processo.

10:28.049999999999955
O que que é esse migrate? Migrations.

10:33.799999999999955
Basicamente, não sei quem tá fazendo isso,

10:35.72000000000003
Eu vou apagar isso aqui porque não precisa disso daqui,

10:37.58000000000004
Que a PostgreSQL já vai fazer isso pra nós.

10:40.379999999999995
No pack de JSON, então tem ali o Migrate, LocalSetup,

10:44.25999999999999
MigrationUp, MigrationDown. Sim, tem que ter os dois.

10:48.360000000000014
Porém, ele tá tentando rodar aquele comando.

10:50.700000000000045
Vamos selecionar esse trecho e vamos falar o seguinte, ó.

10:54.539999999999964
Precisamos utilizar a PostgreSQL para rodar...

11:1.1000000000000227
E desfazer as migrations.

11:5.730000000000018
Será que tinha que ser aquele CLI?

11:10.009999999999991
Available as a CLI tool. Ah, é exatamente isso aqui,

11:13.850000000000023
Gente. Calma, calma, calma, calma. Para.

11:17.700000000000045
Então, o PostgreSQL CLI e o PostgreSQL é a mesma coisa,

11:21.08000000000004
Só que daí utilize o pacote

11:26.340000000000032
CLI para rodar através de comando.

11:31.720000000000027
Então, as duas bibliotecas no final estavam certas,

11:33.940000000000055
É que uma é o CLI e a outra é a biblioteca PostgreSQL de forma nativa,

11:39.620000000000005
Caso a gente queira utilizar ela de forma nativa. Mas,

11:42.32000000000005
Para o nosso caso, nós queremos utilizar o PostgreSQL CLI.

11:46.75999999999999
Mais uma vez, assim que o cursor terminar,

11:48.74000000000001
Eu volto aqui. Mais uma vez, ela terminou,

11:51.460000000000036
Vou acertar tudo e vamos ver aqui o que ela fez. Então,

11:54.120000000000005
Instalar dependências, PostgreSQL CLI, e aí vai ter lá o MigrationUp, MigrationDown.

12:0.17999999999994998
O arquivo de configuração, ele lê o database URL do WAV local.

12:8.080000000000041
Então, é isso. Olha lá, o migration up, ele vai executar o node,

12:12.360000000000014
Ele vai rodar ali o PostgreSQL, migration migrate,

12:16.279999999999973
E o outro vai rodar o migrate zero.

12:20.120000000000005
Vamos limpar isso daqui, npm i, para instalar todas as dependências.

12:27.340000000000032
Vamos limpar, npm run migrate:up.

12:32.49000000000001
E, de fato, deu erro. Qual foi o erro que deu aqui?

12:36.07000000000005
Invalid URL.

12:38.5
Vamos ver aqui. .env .local. Exatamente.

12:41.200000000000045
A gente não definiu. Vamos copiar isso daqui.

12:44.24000000000001
Vamos voltar para cá. E vamos colar. E vamos salvar. E tentar executar.

12:49.289999999999964
Migration up. Deu outro erro.

12:51.00999999999999
O que deu? Então, o password falhou para o usuário Postgres.

12:56.60000000000002
Agora, o que a gente precisa fazer?

12:57.77999999999997
A gente precisa começar a subir o manual do Postgres.

13:0.22000000000002728
Ah, mas eu vou ter que instalar o banco de dados Postgres, fazer um monte de coisa. Não,

13:2.7999999999999545
O que a gente vai fazer? Nós vamos utilizar um Docker Compose, né? Então, vamos lá.

13:9.539999999999964
Criar um arquivo docker-compose.yml

13:13.440000000000055
Para iniciar um banco de dados

13:16.840000000000032
Postgres com usuário, senha e configuração mais

13:22.539999999999964
Banco de dados conforme nosso ponto.

13:29.980000000000018
.env.example definido na URL de conexão. Então,

13:37.33000000000004
ele vai ler a URL de conexão,

13:38.73000000000002
tipo assim, ah, usuário é post, senha é post, o nome do banco de dados é x,

13:41.85000000000002
então ele vai preparar o Dockerfile para subir tudo bonitinho para nós.

13:46.83000000000004
Adicione um comando, dois comandos,

13:49.49000000000001
dois novos comandos, infra up e

13:54.76999999999998
infra down para subir e

13:59.10000000000002
derrubar o Compose.

14:2.82000000000005
E mais uma vez, assim que a cursor terminar, nós voltaremos aqui. Bom, ela terminou,

14:8.480000000000018
dessa vez foi rápido, e vamos ver o que ela fez.

14:11.559999999999945
Então temos ali o nosso Docker Compose,

14:13.67999999999995
serviços, o Postgres Alpine, container name, restart,

14:19.379999999999995
a mesa está parada, a porta, o usuário Postgres,

14:22.659999999999968
assim é Postgres, o banco de dados, blog, e um volumezinho que ele está criando ali.

14:28.059999999999945
Maravilha, vamos voltar aqui na nossa linha de comando,

14:30.960000000000036
vamos fechar a aba do agente,

14:32.620000000000005
vamos limpar isso daqui, npm run infra2.up,

14:35.960000000000036
eu não tenho essa imagem do Postgres,

14:40.17999999999995
então ele está baixando a imagem do Postgres,

14:41.91999999999996
e está tentando criar, a porta está alocada,

14:46.549999999999955
então docker rm $(docker ps -qa),

14:51.870000000000005
vamos limpar tudo isso daqui,

14:54.64999999999998
opa, vamos colocar rm -f,

14:58.50999999999999
não tem problema. Posso parar tudo que está rodando na minha máquina.

15:2.4500000000000455
Vamos pedir para subir de novo.

15:4.730000000000018
Subiu. Docker ps. Parece bom.

15:8.350000000000023
Ele tem o run migrate up. E deu um outro erro. Vamos ver o erro que deu aqui agora.

15:16.600000000000023
Syntax error próximo do if.

15:20.590000000000032
Então, provavelmente quando eu coloquei aquele if not exist,

15:23.33000000000004
eu fiz alguma coisa errada. Create table if

15:29.779999999999973
not exists.

15:33.460000000000036
Posts, beleza, coloquei o if depois, estava errado, é,

15:38.27999999999997
parece que criou, muito bom. Vamos fechar,

15:43.10000000000002
vamos fechar e agora vamos de fato rodar nossa aplicação,

15:46.22000000000003
npm run dev, ainda tudo está funcionando e vamos ao que interessa,

15:50.90999999999997
vamos executar de novo ali o nosso find, está retornando vazio,

15:55.25
a gente esperava isso porque a gente acabou de subir o banco de dados, a gente acabou de criar o banco de dados,

15:58.450000000000045
a gente não criou um post, vamos pedir para ele criar um post.

16:1.8700000000000045
Vai demorar um pouquinho, porque ele tem que bater lá na OpenAI,

16:4.75
processar e esperar a resposta. Então, deixa ele processar aí um post novo para nós.

16:12.649999999999977
Criou um post novo e nessa lista listou um post novo.

16:17.210000000000036
Agora que vai morar o perigo, hein? Vamos tentar

16:23.720000000000027
fazer nova busca e perfeita. Então, ele buscou o nosso...

16:28.590000000000032
post que a gente já tinha criado.

16:29.730000000000018
Dessa forma, nós estamos inserindo esse post no banco de dados.

16:34.50999999999999
Alguns ajustes que a gente vai fazer, né?

16:35.92999999999995
Tá muito complicado ficar rodando esse setup local.

16:39.190000000000055
Então, o setup local que a gente vai fazer,

16:40.85000000000002
ele vai fazer, ele vai copiar o .env para o .local.

16:45.66999999999996
ele vai subir a infra e ele vai rodar o migrate.

16:50
Então, eu vou parar isso daqui, vou limpar. Então,

16:53.75999999999999
quando a pessoa tá configurando o ambiente local,

16:57.35000000000002
ela vai rodar ali o npm run local setup,

17:0.92999999999995
o local setup vai rodar o env setup, o infra up e o migration up,

17:6.210000000000036
dessa forma a gente vai conseguir copiar o .env .example para o .env .local,

17:11.769999999999982
a gente vai rodar o infra up,

17:13.509999999999991
a gente vai subir esse doc, vai subir esse postgres, a gente vai rodar as migrações,

17:17.3900000000001
vai criar a nossa tabela e a aplicação vai estar pronta para ser executada,

17:20.6099999999999
ou seja, clonou o repositório, npm ci para instalar as bibliotecas,

17:26.329999999999927
local setup, dispel o terminal local setup, .env,

17:30.529999999999973
npm run dev e começa a trabalhar.

17:34.809999999999945
Claro que a pessoa vai ter que configurar ali a chave da OpenAI,

17:38.809999999999945
porque esse daqui a gente não vai versionar para ela.

17:43.539999999999964
Deixa eu ver se a gente precisa fazer mais algum ajuste,

17:45.539999999999964
então migrations ficou bom, temos a migration de criação e de...

17:49.819999999999936
De migration up, de migration down.

17:52.27999999999997
Temos a condição para não quebrar caso a tabela exista.

17:55.83999999999992
Excelente. O nosso undo também tem o if exists.

18:0.07999999999992724
Temos o nosso pool de conexão,

18:1.8199999999999363
que está ali no nosso arquivo da nossa variável de ambiente.

18:6.7000000000000455
O nosso agente a gente não mexeu, o massa a gente não mexeu.

18:10.11999999999989
O repositório, que de novo, mais uma vez,

18:12.680000000000064
não é um repositório,

18:13.960000000000036
é simplesmente um arquivo exportando funções que estão

18:17.079999999999927
conversando com o banco de dados.

18:19.569999999999936
O nosso serviço agora, ele é igual, a única diferença é que,

18:24.36999999999989
na verdade ele é igual porque é um serviço que

18:26.970000000000027
vai falar com a OpenAI através do Mastra.

18:31.86999999999989
E aí o index de fato está utilizando as nossas funções de banco de dados,

18:34.97000000000003
tanto o insert quanto o find.

18:38.23000000000002
E eu acabei não explicando o que essa função está fazendo, então vamos lá.

18:42.00999999999999
destrinchar esse arquivo. Então, essa função map row to post, o que ele vai fazer?

18:47.08999999999992
É quando a gente quer ler todos os arquivos do

18:49.47000000000003
banco de dados de volta para a aplicação.

18:52.32999999999993
Então, a gente vai chamar essa função para cada linha do nosso banco de dados.

18:57.049999999999955
E a gente faz isso justamente no find all posts.

19:0.08999999999991815
Ou seja, a gente está fazendo await pool .query. Então,

19:3.1099999999999
toda SQL que a gente quer executar,

19:5.170000000000073
a gente vai executar através desse comando query.

19:7.480000000000018
E o que a gente está fazendo aqui? Um select de id,

19:9.680000000000064
título, conteúdo do post por ordem de criação.

19:16.700000000000045
Na verdade, essa ordem de criação está errada, né?

19:19.180000000000064
Devia ser por published edge. Então, published edge.

19:24.339999999999918
E aí, então, a gente está retornando esse rows. Esse rows são todas as linhas,

19:28.440000000000055
todos os registros do nosso banco de dados. A gente faz o ponto map.

19:32.559999999999945
Esse ponto map a gente está chamando a função map row.

19:36.15000000000009
toPost, que basicamente vai transformar ele ali para esse

19:38.289999999999964
objeto JSON e está verificando se tem data,

19:41.08999999999992
se não tem data, se não tem, está retornando um nulo.

19:45.59999999999991
Depois a gente tem a função insertPost, que também está chamando o ponto query.

19:50.72000000000003
Esse ponto query está fazendo um insert into posts,

19:53.440000000000055
passando todos os campos da tabela. O valor ele está colocando,

19:56.57999999999993
o que é esse $1, $2, $3? São parâmetros.

19:59.88000000000011
Então eu vou ter parâmetro 1, parâmetro 2, parâmetro 3, parâmetro 4.

20:3.660000000000082
Por que a gente faz dessa forma?

20:4.900000000000091
Para a gente deixar isso aqui mais seguro, para a gente prevenir SQL injection.

20:9.539999999999964
O que é um SQL injection? É quando alguém, alguma pessoa mal-intencionada,

20:13.200000000000045
ela consegue injetar o comando SQL na nossa aplicação.

20:16.980000000000018
Como que ela faz isso? Ela vai lá no campo, por exemplo, de... Ela

20:21.710000000000036
viria aqui no campo de criação de post,

20:24.13000000000011
é que ela tentaria injetar mais uma SQL. Então, é select...

20:29.700000000000045
Sei lá, posts where 1 igual a 1.

20:35.16000000000008
Isso aqui sem vai ser true, porque 1 sem vai ser 1.

20:39.930000000000064
Porém, nessa forma de parâmetro, a gente consegue prevenir o SQL injection,

20:43.190000000000055
porque a própria biblioteca, por debaixo das páginas,

20:45.3900000000001
já vai lidar com isso para nós.

20:47.3900000000001
E aí, para cada posição que a gente colocou aqui,

20:49.67000000000007
a gente precisa passar um parâmetro através desse array.

20:52.26999999999998
Então esse array é o segundo parâmetro,

20:53.82999999999993
o primeiro é a string, que vai conter a nossa SQL,

20:57.34999999999991
o segundo é um array com todos os parâmetros.

20:59.690000000000055
E é muito importante que esse parâmetro siga a posição exata aqui.

21:2.990000000000009
Então a gente colocou id aqui,

21:4.589999999999918
id aqui, então é o número 1, o id é a primeira posição.

21:7.690000000000055
O 2 é o título, então tem que ser o título aqui. O 3 tem que ser o conteúdo.

21:11.809999999999945
Se eu mudar isso daqui, ele vai passar o título na primeira posição,

21:14.490000000000009
que vai ser o id. Então é primordial que...

21:17.809999999999945
A posição que a gente colocou aqui,

21:19.470000000000027
a gente siga fielmente aqui nessa array que a gente está informando.

21:24.720000000000027
E a gente faz um returning. O que é esse returning?

21:27.61999999999989
O returning é para que a própria SQL de insert retorne esse registro para nós.

21:32.77999999999997
E aqui nesse row, ele vai retornar esse registro.

21:35.25999999999999
Esse registro vai ser 1, porque a gente está criando sempre um registro.

21:37.960000000000036
A gente está fazendo múltiplos inserts uma vez.

21:40.27999999999997
É um insert único por vez que a gente está fazendo.

21:42.75999999999999
Então, a gente está pegando o... O registro zero.

21:45.77999999999997
Que é esse insert que a gente acabou de fazer.

21:47.539999999999964
E esse retorno. E ele está retornando aqui através do zero.

21:50.8599999999999
Porque a gente colocou o nosso returning aqui. Se a gente tirar esse returning,

21:54.57999999999993
esse zero aqui não vai funcionar. Porque esses rows aqui não vão ter retorno nenhum.

22:0.2799999999999727
Beleza. E aí com isso a gente tem aqui. Uma última coisa que eu vou fazer aqui.

22:3.619999999999891
Eu vou utilizar o nosso async/await também. Então, const posts.

22:9.200000000000045
Await. Vamos colocar aqui um async.

22:12.5
Async aqui em cima.

22:15.940000000000055
Beleza, beleza. Temos o async/await aqui também.

22:18.579999999999927
E dessa forma ficou muito melhor do que a nossa promise.

22:22.6400000000001
Vamos subir a aplicação. Vamos voltar aqui no HTTP.

22:27.74000000000001
Vamos tentar listar um post. E tudo está funcionando como antes.

22:31.700000000000045
Eu não vou criar de novo esse post, porque senão vai ter um post repetido.

22:35.59999999999991
Mas dessa forma a gente conseguiu fazer bastante coisa.

22:38.819999999999936
Então agora a gente tem o banco ligado rodando.

22:40.16000000000008
E a gente consegue seguir com as próximas implementações da nossa API.

22:43.48000000000002
Com isso a gente fecha mais uma aula.