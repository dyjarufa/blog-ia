E por fim, talvez uma dúvida que você possa ter é, ah,

00:2.78
Matheus, mas eu vou ter que passar o meu Readme,

00:6.29
o acesso ao meu GitHub para alguém,

00:9.63
algum potencial cliente que um dia quer acessar as documentações da minha API?

00:15.41
Não. Não faz sentido você mandar um GitHub para o seu cliente,

00:18.75
um Readme, um Markdown para o seu cliente.

00:20.91
Mas como que o meu cliente,

00:22.35
como que pessoas podem descobrir a documentação da minha API? Como que a minha API funciona?

00:27.26
Como se autenticar. Quais endpoints existem. O que cada endpoint faz.

00:30.94
O que você tem que fornecer em cada endpoint.

00:32.58
O que você vai receber de volta em cada endpoint.

00:34.4
Como a gente pode criar uma documentação de API.

00:37.2
Para isso a gente pode criar um Swagger. Então vamos aprender aqui.

00:41.46
Precisamos adicionar um Swagger.

00:45.87
Para documentar nossa API.

00:49.59
Vamos adicionar em barra API barra docs. E barra API barra docs barra JSON.

00:57.12
Então, vamos pedir para a cursor. Então, a cursor,

00:59.42
ela vai entender, ela já tem conhecimento,

01:1.6400000000000006
ela vai entender sobre a nossa API e ela vai escrever esse documento de Swagger,

01:5.560000000000002
vai configurar o Swagger e a gente já vai entender o que é esse Swagger.

01:9.579999999999998
E ela terminou, mais uma vez. Então,

01:11.519999999999996
vamos ver o que ela fez. Então, ela adicionou o Swagger,

01:14.159999999999997
já escreveu os testes unitários, testes end -to -end. Excelente.

01:20.78
Vamos ver se a gente tem que instalar alguma coisa. Então, npm i.

01:25.75
Provavelmente tem que instalar alguma coisa. Vamos rodar aqui o npm run dev.

01:29.790000000000006
E vamos abrir agora o browser, nosso navegador, ó. Então, vamos abrir aqui, ó.

01:34.290000000000006
localhost 8080 barra api barra docs.

01:42.209999999999994
E tá lá. Então, isso daqui é o Swagger.

01:44.709999999999994
E veja também que o Swagger, ele também pode funcionar como um HTTP client.

01:49.290000000000006
Por quê? Porque a gente pode vir aqui e testar as requisições.

01:52.010000000000005
A gente pode executar uma requisição. Execute, ó.

01:54.730000000000004
Então, ele retornou um array vazio no nosso execut, ele funcionou.

01:59.39
Então, o Swagger, além de documentação,

02:2.549999999999997
ele também pode funcionar como um HTTP client.

02:5.640000000000001
E aqui tem todas as informações, então, nossa API, o que ela faz, o endpoint de cache,

02:12.280000000000001
o outro endpoint de get, buscar por ID, o post, o patch, o delete,

02:17.340000000000003
os esquemas que a gente pode receber, então, mensagem de erro, um post.

02:24.460000000000008
Aí aqui, o parâmetro, então,

02:26.419999999999987
utilize all para incluir rascunhos e postos na publicada, all, 200, 403,

02:32.599999999999994
autenticação e vale do ausente para include all.

02:34.860000000000014
Então, forbidden é uma documentação completa, authorization,

02:38.66
olha lá, então, chave da API configurada,

02:40.72
API key obrigatória apenas para include all.

02:43.46000000000001
Então, veja que é uma documentação completa, completa, completa.

02:47.120000000000005
E isso daqui é o Swagger UI, né, o Swagger UI,

02:50.099999999999994
ele já tem essa UI padronizada com o formato Swagger.

02:53.34
E também tem o JSON, né,

02:54.75999999999999
o JSON a gente pode pegar esse JSON e fornecer pra qualquer IA, qualquer agente,

02:59.84
qualquer LLM, que ele vai aprender sobre esse JSON,

03:2.6999999999999886
ou em cima desse JSON a gente

03:4.240000000000009
Consegue construir qualquer interface mais customizada,

03:7.02000000000001
Né, diferente do Swagger UI, que por padrão vai ter essa interface padronizada, né,

03:13.460000000000008
Todo Swagger UI, ele vai ser meio que igual por padrão,

03:16.22
E com isso a gente fecha mais uma aula.