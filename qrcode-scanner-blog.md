---
title: "QR Code Scanner: Um Leitor de QR Codes e Códigos de Barras Grátis e Sem Anúncios"
description: Conheça o QR Code Scanner, um app para Android e iOS que lê QR Codes e códigos de barras sem anúncios, sem conta e sem enviar os seus dados para lado nenhum.
date: 2026-10-14
image: /qrcode-scanner.png
minRead: 6
author:
  name: Albino T. Calbe
  avatar:
    src: /profile.png
    alt: Albino T. Calbe
---

Ler um **QR Code** devia ser a coisa mais simples do mundo: apontar a câmara, ver o conteúdo, seguir em frente. Mas quem já procurou um leitor na Play Store ou na App Store sabe que a realidade é outra. A maioria dos apps gratuitos está cheia de **anúncios em ecrã inteiro**, banners que tapam a câmara, pedidos de subscrição e permissões que não fazem sentido nenhum para um simples leitor.

Foi por isso que criei o **QR Code Scanner**: um leitor de QR Codes e códigos de barras **100% grátis, sem anúncios** e focado apenas em fazer bem o seu trabalho.

Neste artigo, apresento o app, os seus recursos e o porquê de ter decidido mantê-lo livre de publicidade.

---

## O Problema dos Leitores "Grátis"

### 1. Anúncios em Todo o Lado

Em muitos leitores, cada leitura vem acompanhada de um anúncio. Às vezes é preciso esperar alguns segundos, ou encontrar um "X" minúsculo, só para ver o conteúdo de um código que já foi lido.

### 2. Permissões Exageradas

Um leitor de QR Codes precisa da câmara. Não precisa da sua localização, dos seus contactos nem de acesso permanente à internet para lhe mostrar publicidade.

### 3. Dados Enviados para Terceiros

Os códigos que lemos dizem muito sobre nós: os sites que visitamos, as redes Wi-Fi a que nos ligamos, os produtos que compramos. Em apps sustentados por publicidade, essa informação tem valor comercial.

### 4. Interfaces Confusas

Menus escondidos, botões de "Premium" em destaque e ecrãs carregados tornam uma tarefa de dois segundos numa experiência frustrante.

---

## A Solução: QR Code Scanner

O **QR Code Scanner** foi pensado para ser o oposto disso tudo. Abre direto na câmara, lê o código e mostra o resultado. **Sem anúncios, sem conta, sem pagamentos.**

O app foi desenvolvido com **Expo** e **React Native**, por isso funciona de forma nativa tanto em **Android** como em **iOS**.

---
---

# Recursos do App

## 1. Dois Modos de Leitura

No topo do ecrã, pode alternar entre dois modos, consoante o que pretende ler:

- **QR Code:** lê QR Codes, Data Matrix, Aztec e PDF417.
- **Código de Barras:** lê EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39, Code 93, ITF-14 e Codabar, os formatos que encontramos em produtos de supermercado, livros, caixas e etiquetas.

Separar os modos torna a leitura mais rápida e evita que a câmara apanhe o código errado quando há vários por perto.

## 2. Leitura a Partir da Galeria

Recebeu um QR Code numa imagem pelo WhatsApp? Tirou um print de um código? Não precisa de outro telemóvel para o ler. Basta tocar em **"Da galeria"**, escolher a foto, e o app procura o código na imagem.

- No **Android**, lê todos os formatos suportados.
- No **iPhone**, lê QR Codes (limitação do próprio sistema iOS).

E tudo isto funciona **offline**.

## 3. Resultado Claro e Fácil de Copiar

Quando um código é detetado, o resultado aparece numa **folha inferior nativa** com:

- O tipo de código lido (por exemplo, *QR Code* ou *EAN-13*);
- O conteúdo completo, que pode ser selecionado;
- Um botão para **copiar para a área de transferência**.

O app **não abre links automaticamente**. Mostra-lhe primeiro o conteúdo, para que possa decidir o que fazer com ele. É uma pequena proteção contra QR Codes maliciosos colados em locais públicos.

## 4. Histórico de Leituras

Todas as leituras ficam guardadas num **histórico local**, com as **últimas 100 leituras** organizadas por data ("Hoje", "Ontem", etc.).

- Se ler de novo um código que já está no histórico, ele passa para o topo da lista em vez de ficar duplicado.
- Pode **limpar o histórico** a qualquer momento.
- O histórico fica guardado **apenas no seu dispositivo**.

## 5. Controlos da Câmara

Para os códigos mais difíceis de ler:

- **Lanterna** para ambientes com pouca luz;
- **Zoom** de 1x, 2x e 3x para códigos pequenos ou distantes;
- **Troca entre câmara traseira e frontal**.

Também é possível **pausar a leitura** e retomá-la com um toque.

## 6. Português e Inglês

O app usa automaticamente o idioma do seu telemóvel, mas pode trocar entre **português** e **inglês** diretamente no app, sem ir às definições do sistema.

## 7. Detalhes que Fazem Diferença

- **Vibração (feedback háptico)** quando um código é detetado;
- **Animações suaves** que respeitam a opção "reduzir movimento" do sistema, para quem é sensível a animações;
- **Tema escuro**, confortável para os olhos e para a bateria.

---

# Grátis, Sem Anúncios e Privado

Este é o ponto mais importante: o **QR Code Scanner é totalmente gratuito e não tem anúncios**. Não há versão "Premium", não há funcionalidades bloqueadas e não há publicidade escondida.

Além disso:

- **Não precisa de criar conta.**
- **Não faz pedidos à internet.** O app não envia os seus dados para nenhum servidor.
- **Só pede as permissões necessárias:** a câmara, para ler códigos, e o acesso às fotos, apenas quando escolhe ler a partir da galeria.

Os códigos que lê são seus e ficam no seu telemóvel.

---

# Onde Descarregar

<!-- TODO: substituir pelos links reais quando o app estiver publicado -->
- **Android:** [Google Play Store](#)
- **iOS:** [App Store](#)

# Minha Conclusão

Nem todas as ferramentas precisam de ser um negócio. Um leitor de QR Codes é algo que usamos no dia a dia, em restaurantes, lojas, eventos ou para partilhar uma rede Wi-Fi, e merece ser simples, rápido e respeitar quem o usa.

O **QR Code Scanner** nasceu dessa ideia: fazer uma coisa e fazê-la bem, sem distrações e sem anúncios.

Se experimentar o app, deixe a sua opinião. O feedback de quem o usa é o que me ajuda a melhorá-lo.

<p align="right" style="font-size: 12px;"><i> texto aprimorado por IA</i>🤖</p>
