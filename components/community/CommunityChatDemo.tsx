'use client';

import ChatComponent, { type ChatConfig, type UiConfig } from '@/components/ui/chat-interface';

const uiConfig: UiConfig = {
  containerWidth: 440,
  containerHeight: 420,
  backgroundColor: '#0A0F1A',
  autoRestart: true,
  restartDelay: 4000,
  loader: {
    dotColor: '#34D399',
  },
  linkBubbles: {
    backgroundColor: '#064E3B',
    textColor: '#6EE7B7',
    iconColor: '#34D399',
    borderColor: '#059669',
  },
  leftChat: {
    backgroundColor: '#1A1F2E',
    textColor: '#E2E8F0',
    borderColor: '#334155',
    showBorder: true,
    nameColor: '#34D399',
  },
  rightChat: {
    backgroundColor: '#065F46',
    textColor: '#ECFDF5',
    borderColor: '#047857',
    showBorder: false,
    nameColor: '#6EE7B7',
  },
};

const generateAvatarSvg = (name: string, bgColor: string, textColor: string): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="${bgColor}"/><text x="32" y="32" text-anchor="middle" dy=".1em" font-size="28" font-weight="600" font-family="sans-serif" fill="${textColor}">${name.charAt(0)}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const chatConfig: ChatConfig = {
  leftPerson: {
    name: 'Budi',
    avatar: generateAvatarSvg('Budi', '#065F46', '#6EE7B7'),
  },
  rightPerson: {
    name: 'Siti',
    avatar: generateAvatarSvg('Siti', '#34D399', '#064E3B'),
  },
  messages: [
    {
      id: 1,
      sender: 'left',
      type: 'text',
      content: 'Ada yang tahu range gaji harian untuk helper konstruksi di Jakarta?',
      maxWidth: 'max-w-xs',
      loader: { enabled: true, delay: 800, duration: 2000 },
    },
    {
      id: 2,
      sender: 'right',
      type: 'text',
      content: 'Saya barusan dapat Rp 150k/hari untuk proyek di Jaksel. Kalau area SCBD bisa Rp 175k lho!',
      loader: { enabled: true, delay: 3400, duration: 2000 },
    },
    {
      id: 3,
      sender: 'left',
      type: 'text-with-links',
      content: 'Wah lumayan! Ada tips nego gaji biar bisa lebih tinggi?',
      maxWidth: 'max-w-xs',
      links: [{ text: 'Tips Negosiasi' }, { text: 'Gaji Harian 2026' }],
      loader: { enabled: true, delay: 6000, duration: 2000 },
    },
    {
      id: 4,
      sender: 'left',
      type: 'text',
      content: 'Sama info project terbaru di area Jakpus ada?',
      maxWidth: 'max-w-xs',
      loader: { enabled: true, delay: 8600, duration: 1500 },
    },
    {
      id: 5,
      sender: 'right',
      type: 'text',
      content: 'Selalu tanya detail job desc dulu sebelum nego. Skill khusus = rate lebih tinggi! Untuk Jakpus coba cek di forum lowongan.',
      loader: { enabled: true, delay: 10700, duration: 2500 },
    },
    {
      id: 6,
      sender: 'left',
      type: 'text',
      content: 'Thanks Siti! Langsung saya cek forumnya sekarang. Komunitas ini sangat membantu 🙌',
      maxWidth: 'max-w-xs',
      loader: { enabled: true, delay: 13900, duration: 2000 },
    },
    {
      id: 7,
      sender: 'right',
      type: 'text',
      content: 'Sama-sama Budi! Semangat terus 💪',
      loader: { enabled: true, delay: 16500, duration: 1200 },
    },
  ],
};

export default function CommunityChatDemo() {
  return <ChatComponent config={chatConfig} uiConfig={uiConfig} />;
}
