# MyAirConditioner

## Descrição
Projeto feito para simular um sistema de monitoramento de ar condicionado com sensor de temperatura para evitar gastos em momentos em que o clima está frio.

O sistema foi dividido em 3 partes:
- Sensor de temperatura / Controlador do ar condicionado:
  - Sensor de temperatura:
    - inicia fazendo uma requisição para o servidor armazenar a informação de que ele está ativo;
    - a cada um tempo X, determinado no código:
      - gera uma temperatura aleatoriamente,
      - e faz uma requisição para o servidor salvar essa temperatura.
  - Controlador do ar condicionado:
    - inicia ligando o ar condicionado e inicializando uma data fictícia, determinado no código. Após isso faz uma requisição para o servidor armazenar a informação de que ele está ativo;
    - a cada um tempo X, determinado no código: 
      - acrescenta uma hora na data fictícia,
      - pede ao servidor para salvar histórico da última hora,
      - pergunda ao servidor qual próximo estado que o ar condicionado vai receber,
      - e após mudar o estado do ar condicioanado faz uma requisição para que o servidor guarde esse novo estado.
- Servidor: 
  - responsável por receber a temperatura recebida pelo sensor e distribuir essa informaçao para o aplicativo web quando solicitada;
  - responder ao controlador do ar condicionado indicando o próximo estado que o ar condicionado deve ter baseado na última temperatura recebida pelo sensor;
  - salvar o histórico diário contendo as horas em que o ar condicionado esteve ligado;
  - salvar a data e hora em que as simulações do sensor e controlador estão no momento;
- Aplicativo web:
  - responsável por buscar e mostrar frequentemente, num período determinado no código, as seguintes informações:
    - data e hora em que as simulações do sensor e controlador estão;
    - se o sensor de temperatura está em funcionamento;
    - a última temperatura registrada no servidor;
    - se o controlador do ar condicionado está em funcionamento;
    - o último registro do estado do ar condicionado;
  - pegar um período de espaço de dias no histórico e trazer as seguintes análises:
    - os dias no espaço de tempo selecionado que possuem histórico salvo;
    - quantidade de horas que o ar condicionado ficou ligado;
    - quantidade de dinheiro total gasto;
    - quantidade de dinheiro que seria gasto caso não houvesse o sistema para realizar o desligamento do ar condicionado;
    - quantidade de dinheiro salvo no processo;

## Como rodar 

### Servidor:
  - abra a pasta /api em alguma IDE de sua preferência com o Spring configurado

### Sensor de temperatura / Controlador do ar condicionado:
  ``` cd temperatureSensor-airConditioner ```
  
  ``` npm install ```
  
  ``` npm start ```

### Aplicativo web:
  ``` cd temperatureSensor-airConditioner ```
  
  ``` npm install ```
  
  ``` npm start ```

## Configurações adicionais:
  
### Servidor
Você precisará configurar seu banco de dados em api/src/main/resources/application.properties

### Sensor de temperatura / Controlador do ar condicionado:
No arquivo temperatureSensor-airConditioner/index.js você pode configurar o tempo de espera para que as horas passem na simulação e você também pode mudar a data em que começa a simulação
  
