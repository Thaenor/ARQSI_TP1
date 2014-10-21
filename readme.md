#Trabalho 1 - widget last.fm client.#

O objectivo deste projecto consiste no desenvolvimento de um servidor, que pela API fornecida pelo last.fm efectua pesquisas de artistas, “tags” e músicas, mostrando também os eventos musicais mais próximos.

1. Pesquisar “tags” de um artista:
  Pela introdução do nome de um artista, são apresentadas as “tags” (estilos musicais) associados a esse artista numa caixa de selecção.

2. Pesquisar as faixas de uma “tag”:
  Uma vez selecionado uma “tag”, o widget mostra o número introduzido de músicas associadas a essa tag, estas podem ou não pertencer ao artista inicialmente selecionado.

3. Apresentar informação das faixas:
  Assim que selecionadas as faixas, a informação mais relevante sobre estas é mostrada numa caixa de texto, incluindo a imagem do artista e a capa do álbum. Este é o pedido ao servidor que leva mais tempo de resposta, uma vez que o próprio servidor necessita de fazer vários pedidos à API. O serviço usado para recolha da imagem da capa do album nem sempre é fidedigno, podendo prejudicar o funcionamento deste método.

4. Database logging:
  O input do utilizador é controlado. São guardados numa base de dados local, o pedido efectuado (sob a forma de um *url*) assim como a data e hora do pedido. São feitas algumas validações para impedirem abusos, quer à base de dados local, quer à própria API do last.fm

5. Eventos:
  Utilizando a posição actual do utilizador (tal deve ser permitido no browser) são selecionados os eventos mais próximos, podendo ver também um mapa (usando o *Google Maps*) para apresentar graficamente a localização.

***
Trabalho realizado por:
Francisco Santos (1111315)
Ana Sofia Sá  (1100537)

***

links uteis:
http://w3schools.com
http://php.net/
http://sweerdenburg.wordpress.com/2011/10/22/converting-a-string-to-xml-in-javascript/
