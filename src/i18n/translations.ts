const pt = {
  locale: 'pt-PT',
  scanner: {
    subtitle: 'QR Code e Código de Barras',
    modeQr: 'QR Code',
    modeBarcode: 'Código de Barras',
    hintQr: 'Aponte a câmara para um QR Code',
    hintBarcode: 'Aponte a câmara para um código de barras',
    paused: 'Leitura em pausa. Toque no botão para continuar.',
    detected: 'Código detetado',
    pause: 'Pausar leitura',
    resume: 'Ler novamente',
    useFrontCamera: 'Usar câmara frontal',
    useBackCamera: 'Usar câmara traseira',
    history: 'Histórico',
    switchLanguage: 'Mudar idioma para inglês',
    gallery: 'Da galeria',
    galleryAction: 'Ler da galeria',
    galleryNotFound: 'Não foi encontrado nenhum código na imagem.',
    galleryNotFoundIos:
      'Não foi encontrado nenhum QR Code na imagem. No iPhone, só é possível ler QR Codes a partir de fotos.',
    galleryError: 'Não foi possível abrir a imagem. Tente novamente.',
    torch: 'Lanterna',
    torchOn: 'Ligar lanterna',
    torchOff: 'Desligar lanterna',
  },
  permission: {
    title: 'Acesso à câmara',
    message: 'Precisamos da câmara para ler QR Codes e códigos de barras.',
    blockedMessage:
      'O acesso à câmara foi recusado. Ative-o nas definições para ler QR Codes e códigos de barras.',
    allow: 'Permitir câmara',
    openSettings: 'Abrir definições',
  },
  result: {
    qrDetected: 'QR Code detetado',
    barcodeDetected: 'Código de barras detetado',
    close: 'Fechar',
  },
  clipboard: {
    copy: 'Copiar',
    copied: 'Copiado',
    copyAction: 'Copiar para a área de transferência',
    copiedAction: 'Copiado para a área de transferência',
  },
  history: {
    title: 'Histórico',
    emptyTitle: 'Sem leituras',
    emptyMessage: 'Os códigos que ler aparecem aqui.',
    clear: 'Limpar histórico',
    clearTitle: 'Limpar histórico?',
    clearMessage: 'Todas as leituras serão apagadas. Esta ação não pode ser desfeita.',
    clearConfirm: 'Limpar',
    cancel: 'Cancelar',
    today: 'Hoje',
    yesterday: 'Ontem',
  },
};

export type Translations = typeof pt;

const en: Translations = {
  locale: 'en-US',
  scanner: {
    subtitle: 'QR Code & Barcode',
    modeQr: 'QR Code',
    modeBarcode: 'Barcode',
    hintQr: 'Point the camera at a QR code',
    hintBarcode: 'Point the camera at a barcode',
    paused: 'Scanning paused. Tap the button to continue.',
    detected: 'Code detected',
    pause: 'Pause scanning',
    resume: 'Scan again',
    useFrontCamera: 'Use front camera',
    useBackCamera: 'Use back camera',
    history: 'History',
    switchLanguage: 'Switch language to Portuguese',
    gallery: 'From gallery',
    galleryAction: 'Scan from gallery',
    galleryNotFound: 'No code was found in the image.',
    galleryNotFoundIos:
      'No QR code was found in the image. On iPhone, only QR codes can be read from photos.',
    galleryError: "Couldn't open the image. Please try again.",
    torch: 'Flashlight',
    torchOn: 'Turn on flashlight',
    torchOff: 'Turn off flashlight',
  },
  permission: {
    title: 'Camera access',
    message: 'We need the camera to scan QR codes and barcodes.',
    blockedMessage:
      'Camera access was denied. Turn it on in Settings to scan QR codes and barcodes.',
    allow: 'Allow camera',
    openSettings: 'Open Settings',
  },
  result: {
    qrDetected: 'QR code detected',
    barcodeDetected: 'Barcode detected',
    close: 'Close',
  },
  clipboard: {
    copy: 'Copy',
    copied: 'Copied',
    copyAction: 'Copy to clipboard',
    copiedAction: 'Copied to clipboard',
  },
  history: {
    title: 'History',
    emptyTitle: 'No scans yet',
    emptyMessage: 'Codes you scan will appear here.',
    clear: 'Clear history',
    clearTitle: 'Clear history?',
    clearMessage: 'All scans will be deleted. This cannot be undone.',
    clearConfirm: 'Clear',
    cancel: 'Cancel',
    today: 'Today',
    yesterday: 'Yesterday',
  },
};

export const translations = { pt, en };

export type Language = keyof typeof translations;
