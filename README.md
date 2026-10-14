# QR Code Scanner

Leitor de QR Codes e códigos de barras para Android e iOS, sem anúncios. Feito com [Expo](https://expo.dev) (SDK 57) e [Expo Router](https://docs.expo.dev/router/introduction/).

## Funcionalidades

- **Dois modos de leitura**
  - **QR:** QR Code, Data Matrix, Aztec e PDF417.
  - **Código de barras:** EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39, Code 93, ITF-14 e Codabar.
- **Leitura a partir da galeria:** procura todos os formatos numa foto escolhida, seja qual for o modo. No Android lê todos os formatos; no iOS só QR Codes, por limitação do sistema. Funciona offline.
- **Resultado numa folha inferior nativa**, com o tipo de código e um botão para copiar o conteúdo.
- **Histórico local** com as últimas 100 leituras, guardado no dispositivo com `expo-sqlite`. Ler de novo o mesmo código passa-o para o topo da lista. O histórico pode ser apagado.
- **Controlos da câmara:** lanterna, zoom (1x/2x/3x) e troca entre câmara traseira e frontal.
- **Idiomas:** português e inglês. Usa o idioma do dispositivo por omissão e permite trocar na app.
- Feedback háptico e animações que respeitam a opção "reduzir movimento" do sistema.

## Estrutura

```
src/
  app/            Rotas do Expo Router (index = scanner, history = histórico)
  screens/        Ecrãs e respetivos componentes (scanner/, history/)
  components/ui/  Componentes reutilizáveis (botões, badges)
  constants/      Design tokens (cores, espaçamentos, raios, animação)
  i18n/           Traduções PT/EN e idioma atual
  storage/        Histórico de leituras
  utils/          Tipos de código suportados, hápticos
locales/          Textos nativos traduzidos (ex.: pedido de permissão da câmara)
assets/images/    Ícones e splash screen
```

O ícone, o splash screen (ícone sobre fundo amarelo `#FFB900`) e as permissões são configurados em [app.json](app.json). As pastas `android/` e `ios/` são geradas automaticamente ([CNG](https://docs.expo.dev/workflow/continuous-native-generation/)) e não devem ser editadas à mão.

## Desenvolvimento

1. Instalar as dependências:

   ```bash
   npm install
   ```

2. Iniciar o servidor de desenvolvimento:

   ```bash
   npx expo start
   ```

   A app usa `expo-dev-client`, por isso deve ser aberta num **development build** (ver [Builds com EAS](#builds-com-eas)). O Expo Go não mostra o splash screen configurado e pode não suportar todos os módulos nativos.

3. Antes de fazer commit:

   ```bash
   npx expo lint       # lint
   npx tsc --noEmit    # verificação de tipos
   npx expo-doctor     # diagnóstico de dependências e configuração
   ```

Para adicionar dependências usa sempre `npx expo install <pacote>`, que escolhe versões compatíveis com o SDK.

## Builds com EAS

Os builds são feitos na cloud com o [EAS](https://docs.expo.dev/eas/). O projeto pertence à conta `mofer-it`.

### Preparação

```bash
npm install -g eas-cli   # instalar ou atualizar o EAS CLI (mínimo 24.13.0)
eas login                # iniciar sessão
eas whoami               # confirmar a conta (precisa de acesso a "mofer-it")
```

### Perfis

Os perfis estão definidos em [eas.json](eas.json):

| Perfil | Para que serve | Android |
| --- | --- | --- |
| `development` | Development build para usar com `npx expo start` | APK, distribuição interna |
| `development-simulator` | Development build para o simulador de iOS | — |
| `preview` | Testar a app final no telemóvel | APK, distribuição interna |
| `production` | Publicação nas lojas (o número de build aumenta automaticamente) | AAB |

### Comandos

```bash
# APK para instalar diretamente no telemóvel
eas build --profile preview --platform android

# Development build
eas build --profile development --platform android

# Development build para o simulador de iOS
eas build --profile development-simulator --platform ios

# AAB para a Play Store
eas build --profile production --platform android

# Enviar o último build de produção para a Play Store (track "internal")
eas submit --profile production --platform android

# Listar builds e obter os links de download
eas build:list --platform android
```

No fim de cada build, o EAS mostra um link e um QR code. Abre-o no telemóvel para descarregar e instalar.

> Alterações ao ícone, ao splash screen, às permissões ou a outros valores nativos em `app.json` só aparecem depois de um **build novo**. Não basta recarregar a app.

### Scripts npm equivalentes

```bash
npm run build:dev -- --platform android
npm run build:dev:simulator
npm run build:preview -- --platform android
npm run build:production -- --platform android
npm run submit:production -- --platform android
```

Sem `--platform`, o EAS pergunta para que plataforma fazer o build (Android, iOS ou ambas).
